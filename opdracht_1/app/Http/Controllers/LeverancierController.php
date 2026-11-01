<?php

namespace App\Http\Controllers;

use App\Models\LeverancierModel;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class LeverancierController
 *
 * Beheert de weergave en acties voor User Story 1 (Overzicht leveranciers & Geleverde producten)
 * en User Story 2 (Toevoegen producten / Levering product) van Opdracht 2.
 * Volledig MVC en OOP conform.
 */
class LeverancierController extends Controller
{
    /**
     * @var LeverancierModel
     */
    private LeverancierModel $leverancierModel;

    /**
     * LeverancierController constructor.
     * Injecteert het OOP LeverancierModel.
     */
    public function __construct()
    {
        $this->leverancierModel = new LeverancierModel();
    }

    /**
     * Wireframe-01: Overzicht leveranciers
     * Toont alle leveranciers met het aantal verschillende producten dat zij leveren,
     * gesorteerd op Aantal verschillende producten aflopend.
     *
     * @return Response
     */
    public function index(): Response
    {
        $leveranciers = $this->leverancierModel->getAllLeveranciersWithProductCount();

        return Inertia::render('Leverancier/Index', [
            'leveranciers' => $leveranciers,
        ]);
    }

    /**
     * Wireframe-02 & Wireframe-03: Geleverde producten
     * Toont de door een specifieke leverancier geleverde producten,
     * gesorteerd op Aantal in Magazijn aflopend (Scenario 01),
     * of een melding met redirect na 3 seconden indien er nog geen producten zijn geleverd (Scenario 02).
     *
     * @param int|string $leverancierId
     * @return Response
     */
    public function producten(int|string $leverancierId): Response
    {
        $id = (int) $leverancierId;
        if ($id <= 0) {
            abort(404, 'Ongeldig leverancier ID opgegeven');
        }

        $data = $this->leverancierModel->getGeleverdeProductenByLeverancier($id);

        if (!$data) {
            abort(404, 'Leverancier niet gevonden');
        }

        $productenGeformatteerd = array_map(function ($prod) {
            return [
                'id' => (int) $prod->ProductId,
                'naam' => $prod->ProductNaam,
                'barcode' => $prod->Barcode,
                'isActief' => (int) $prod->IsActief === 1,
                'aantalInMagazijn' => $prod->AantalAanwezig,
                'verpakkingsEenheid' => $prod->VerpakkingsEenheid,
                'laatsteLevering' => !empty($prod->LaatsteLevering)
                    ? date('d-m-Y', strtotime($prod->LaatsteLevering))
                    : '-',
            ];
        }, $data->producten);

        return Inertia::render('Leverancier/Producten', [
            'leverancier' => [
                'id' => (int) $data->leverancier->Id,
                'naam' => $data->leverancier->Naam,
                'contactpersoon' => $data->leverancier->ContactPersoon,
                'leveranciernummer' => $data->leverancier->LeverancierNummer,
                'mobiel' => $data->leverancier->Mobiel,
            ],
            'producten' => $productenGeformatteerd,
            'hasProducts' => $data->hasProducts,
        ]);
    }

    /**
     * Wireframe-04: Levering Product (GET formulier)
     * Toont het formulier om een nieuwe zending van een product toe te voegen.
     *
     * @param int|string $leverancierId
     * @param int|string $productId
     * @return Response
     */
    public function createLevering(int|string $leverancierId, int|string $productId): Response
    {
        $levId = (int) $leverancierId;
        $prodId = (int) $productId;

        if ($levId <= 0 || $prodId <= 0) {
            abort(404, 'Ongeldige parameters opgegeven');
        }

        $info = $this->leverancierModel->getProductLeverancierInfo($levId, $prodId);

        if (!$info) {
            abort(404, 'Product of leverancier niet gevonden');
        }

        return Inertia::render('Leverancier/Levering', [
            'product' => [
                'id' => (int) $info->ProductId,
                'naam' => $info->ProductNaam,
                'barcode' => $info->Barcode,
                'isActief' => (int) $info->ProductIsActief === 1,
            ],
            'leverancier' => [
                'id' => (int) $info->LeverancierId,
                'naam' => $info->LeverancierNaam,
                'contactpersoon' => $info->ContactPersoon,
                'leveranciernummer' => $info->LeverancierNummer,
                'mobiel' => $info->Mobiel,
            ],
            'errorMessage' => null,
        ]);
    }

    /**
     * Wireframe-04: Levering Product (POST verwerking)
     * Verwerkt het toevoegen van een nieuwe zending van een product (User Story 2 - Scenario 01 & 02).
     *
     * @param Request $request
     * @param int|string $leverancierId
     * @param int|string $productId
     * @return RedirectResponse|Response
     */
    public function storeLevering(Request $request, int|string $leverancierId, int|string $productId): RedirectResponse|Response
    {
        $levId = (int) $leverancierId;
        $prodId = (int) $productId;

        if ($levId <= 0 || $prodId <= 0) {
            abort(404, 'Ongeldige parameters opgegeven');
        }

        $validated = $request->validate([
            'aantal' => ['required', 'integer', 'min:1'],
            'datumEerstVolgendeLevering' => ['required', 'date'],
        ]);

        $info = $this->leverancierModel->getProductLeverancierInfo($levId, $prodId);

        if (!$info) {
            abort(404, 'Product of leverancier niet gevonden');
        }

        $success = $this->leverancierModel->addProductLevering(
            $levId,
            $prodId,
            (int) $validated['aantal'],
            $validated['datumEerstVolgendeLevering']
        );

        if (!$success) {
            // Scenario 02: Product wordt niet meer geproduceerd (IsActief = 0)
            $melding = "Het product {$info->ProductNaam} van de leverancier {$info->LeverancierNaam} wordt niet meer geproduceerd";

            return Inertia::render('Leverancier/Levering', [
                'product' => [
                    'id' => (int) $info->ProductId,
                    'naam' => $info->ProductNaam,
                    'barcode' => $info->Barcode,
                    'isActief' => false,
                ],
                'leverancier' => [
                    'id' => (int) $info->LeverancierId,
                    'naam' => $info->LeverancierNaam,
                    'contactpersoon' => $info->ContactPersoon,
                    'leveranciernummer' => $info->LeverancierNummer,
                    'mobiel' => $info->Mobiel,
                ],
                'errorMessage' => $melding,
                'submittedAantal' => (int) $validated['aantal'],
                'submittedDatum' => $validated['datumEerstVolgendeLevering'],
            ]);
        }

        // Scenario 01: Succesvol toegevoegd -> terug naar de pagina Geleverde producten
        return redirect()->route('leverancier.producten', ['leverancierId' => $levId]);
    }
}

