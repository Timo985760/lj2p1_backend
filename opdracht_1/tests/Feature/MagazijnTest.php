<?php

namespace Tests\Feature;

use App\Models\MagazijnModel;
use Tests\TestCase;

class MagazijnTest extends TestCase
{
    /**
     * Test 1: Scherm Overzicht Magazijn Jamin kan worden geladen.
     */
    public function test_magazijn_overview_page_can_be_rendered(): void
    {
        $response = $this->get('/magazijn');

        $response->assertStatus(200);
    }

    /**
     * Test 2: MagazijnModel haalt producten op gesorteerd op Barcode oplopend.
     */
    public function test_magazijn_model_returns_products_sorted_by_barcode(): void
    {
        $model = new MagazijnModel();
        $products = $model->getAllProductsWithStock();

        $this->assertNotEmpty($products);

        $barcodes = array_map(fn($p) => $p->Barcode, $products);
        $sortedBarcodes = $barcodes;
        sort($sortedBarcodes);

        $this->assertSame($sortedBarcodes, $barcodes);
    }

    /**
     * Test 3: User Story 1 - Scenario 01 (Mintnopjes leveringsinformatie).
     */
    public function test_user_story_1_scenario_01_mintnopjes_delivery(): void
    {
        // Mintnopjes heeft ProductId 1
        $response = $this->get('/magazijn/levering/1');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Magazijn/Levering')
                ->where('product.naam', 'Mintnopjes')
                ->where('hasStock', true)
                ->where('leverancier.naam', 'Venco')
                ->has('leveringen', 2)
        );
    }

    /**
     * Test 4: User Story 1 - Scenario 02 (Winegums geen voorraad en redirect data).
     */
    public function test_user_story_1_scenario_02_winegums_no_stock(): void
    {
        // Winegums heeft ProductId 10, AantalAanwezig is NULL/0
        $response = $this->get('/magazijn/levering/10');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Magazijn/Levering')
                ->where('product.naam', 'Winegums')
                ->where('hasStock', false)
                ->has('verwachteLevering')
        );
    }

    /**
     * Test 5: User Story 2 - Scenario 01 (Zoute Ruitjes allergeneninformatie).
     */
    public function test_user_story_2_scenario_01_zoute_ruitjes_allergens(): void
    {
        // Zoute Ruitjes heeft ProductId 13
        $response = $this->get('/magazijn/allergenen/13');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Magazijn/Allergenen')
                ->where('product.naam', 'Zoute Ruitjes')
                ->where('hasAllergens', true)
                ->has('allergenen', 3)
        );
    }

    /**
     * Test 6: User Story 2 - Scenario 02 (Cola Flesjes geen allergenen).
     */
    public function test_user_story_2_scenario_02_cola_flesjes_no_allergens(): void
    {
        // Cola Flesjes heeft ProductId 5
        $response = $this->get('/magazijn/allergenen/5');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Magazijn/Allergenen')
                ->where('product.naam', 'Cola Flesjes')
                ->where('hasAllergens', false)
                ->has('allergenen', 0)
        );
    }
}
