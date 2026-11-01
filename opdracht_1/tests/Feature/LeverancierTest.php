<?php

namespace Tests\Feature;

use App\Models\LeverancierModel;
use App\Models\User;
use Illuminate\Support\Facades\DB;
use Tests\TestCase;

class LeverancierTest extends TestCase
{
    /**
     * Helper om een ingelogde Magazijnmedewerker te verkrijgen.
     */
    private function getMagazijnUser(): User
    {
        $user = User::where('email', 'magazijn@jamin.nl')->first();
        if (! $user) {
            $user = User::factory()->create([
                'name' => 'Timo Swart',
                'email' => 'magazijn@jamin.nl',
                'password' => bcrypt('password'),
                'rolename' => 'Magazijnmedewerker',
            ]);
        }

        return $user;
    }

    /**
     * Test: Gast zonder inloggen wordt doorgestuurd naar login.
     */
    public function test_guest_cannot_view_leveranciers_and_is_redirected_to_login(): void
    {
        $response = $this->get('/leveranciers');

        $response->assertRedirect('/login');
    }

    /**
     * Test: Gebruiker zonder rol Magazijnmedewerker krijgt 403 Forbidden.
     */
    public function test_user_without_magazijnmedewerker_role_cannot_view_leveranciers(): void
    {
        $otherUser = User::factory()->make([
            'rolename' => 'Klant',
        ]);

        $response = $this->actingAs($otherUser)->get('/leveranciers');

        $response->assertStatus(403);
    }

    /**
     * Test User Story 1 - Scenario 01 (Deel 1):
     * Overzicht leveranciers toont alle 6 leveranciers gesorteerd op Aantal verschillende producten aflopend.
     */
    public function test_user_story_1_scenario_01_leveranciers_overview_sorted_descending(): void
    {
        $user = $this->getMagazijnUser();

        $response = $this->actingAs($user)->get('/leveranciers');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Leverancier/Index')
            ->has('leveranciers', 6)
        );

        $model = new LeverancierModel;
        $leveranciers = $model->getAllLeveranciersWithProductCount();

        $this->assertCount(6, $leveranciers);

        $counts = array_map(fn ($l) => (int) $l->AantalVerschillendeProducten, $leveranciers);
        $sortedCounts = $counts;
        rsort($sortedCounts);

        $this->assertSame($sortedCounts, $counts);
    }

    /**
     * Test User Story 1 - Scenario 01 (Deel 2):
     * Geleverde producten van Venco toont 3 producten gesorteerd op Aantal in Magazijn aflopend.
     */
    public function test_user_story_1_scenario_01_venco_delivered_products_sorted_by_stock_descending(): void
    {
        $user = $this->getMagazijnUser();

        // Venco heeft LeverancierId = 1
        $response = $this->actingAs($user)->get('/leveranciers/1/producten');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Leverancier/Producten')
            ->where('leverancier.naam', 'Venco')
            ->where('hasProducts', true)
            ->has('producten', 3)
            ->where('producten.0.naam', 'Mintnopjes')
            ->where('producten.1.naam', 'Schoolkrijt')
            ->where('producten.2.naam', 'Honingdrop')
        );
    }

    /**
     * Test User Story 1 - Scenario 02:
     * Quality Street (LeverancierId = 6) heeft nog geen producten geleverd aan Jamin.
     */
    public function test_user_story_1_scenario_02_quality_street_has_no_delivered_products(): void
    {
        $user = $this->getMagazijnUser();

        // Quality Street heeft LeverancierId = 6
        $response = $this->actingAs($user)->get('/leveranciers/6/producten');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => $page->component('Leverancier/Producten')
            ->where('leverancier.naam', 'Quality Street')
            ->where('hasProducts', false)
            ->has('producten', 0)
        );
    }

    /**
     * Test User Story 2 - Scenario 01:
     * Nieuwe levering van 25 eenheden toevoegen aan Mintnopjes (ProductId = 1) van Venco (LeverancierId = 1)
     * met eerstvolgende levering 2024-05-29 verhoogt de voorraad en werkt laatste levering bij.
     */
    public function test_user_story_2_scenario_01_add_delivery_for_mintnopjes_venco(): void
    {
        $user = $this->getMagazijnUser();

        // Zet voorraad Mintnopjes vooraf op 453 zodat de test idempotent is
        DB::statement('UPDATE Magazijn SET AantalAanwezig = 453 WHERE ProductId = 1');

        $getResponse = $this->actingAs($user)->get('/leveranciers/1/producten/1/levering');
        $getResponse->assertStatus(200);
        $getResponse->assertInertia(fn ($page) => $page->component('Leverancier/Levering')
            ->where('product.naam', 'Mintnopjes')
            ->where('leverancier.naam', 'Venco')
            ->where('errorMessage', null)
        );

        $postResponse = $this->actingAs($user)->post('/leveranciers/1/producten/1/levering', [
            'aantal' => 25,
            'datumEerstVolgendeLevering' => '2024-05-29',
        ]);

        $postResponse->assertRedirect('/leveranciers/1/producten');

        // Controleer dat Aantal in Magazijn nu 453 + 25 = 478 is en Laatste levering vandaag is
        $overviewResponse = $this->actingAs($user)->get('/leveranciers/1/producten');
        $overviewResponse->assertStatus(200);
        $overviewResponse->assertInertia(fn ($page) => $page->component('Leverancier/Producten')
            ->where('producten.0.naam', 'Mintnopjes')
            ->where('producten.0.aantalInMagazijn', 478)
            ->where('producten.0.laatsteLevering', date('d-m-Y'))
        );

        // Herstel naar originele testdata na afloop
        DB::statement('DELETE FROM ProductPerLeverancier WHERE LeverancierId = 1 AND ProductId = 1 AND Aantal = 25 AND DatumEerstVolgendeLevering = "2024-05-29"');
        DB::statement('UPDATE Magazijn SET AantalAanwezig = 453 WHERE ProductId = 1');
    }

    /**
     * Test User Story 2 - Scenario 02:
     * Nieuwe levering van 30 eenheden toevoegen aan Winegums (ProductId = 10, IsActief = 0)
     * van Basset (LeverancierId = 4) is niet succesvol en toont de exacte foutmelding.
     */
    public function test_user_story_2_scenario_02_add_delivery_for_inactive_winegums_basset_fails_with_message(): void
    {
        $user = $this->getMagazijnUser();

        $postResponse = $this->actingAs($user)->post('/leveranciers/4/producten/10/levering', [
            'aantal' => 30,
            'datumEerstVolgendeLevering' => date('Y-m-d'),
        ]);

        $postResponse->assertStatus(200);
        $postResponse->assertInertia(fn ($page) => $page->component('Leverancier/Levering')
            ->where('product.naam', 'Winegums')
            ->where('leverancier.naam', 'Basset')
            ->where('errorMessage', 'Het product Winegums van de leverancier Basset wordt niet meer geproduceerd')
        );
    }
}
