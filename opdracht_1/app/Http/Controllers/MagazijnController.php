<?php

namespace App\Http\Controllers;

use App\Models\MagazijnModel;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

/**
 * Class MagazijnController
 *
 * Beheert de weergave en acties voor het Magazijn Jamin systeem.
 * Volledig MVC conform.
 */
class MagazijnController extends Controller
{
    /**
     * @var MagazijnModel
     */
    private MagazijnModel $magazijnModel;

    /**
     * MagazijnController constructor.
     * Injecteert het OOP MagazijnModel.
     */
    public function __construct()
    {
        $this->magazijnModel = new MagazijnModel();
    }

    /**
     * Scherm 1: Overzicht Magazijn Jamin
     * Toont alle producten gesorteerd op Barcode oplopend.
     *
     * @return Response
     */
    public function index(): Response
    {
        $products = $this->magazijnModel->getAllProductsWithStock();

        return Inertia::render('Magazijn/Index', [
            'products' => $products,
        ]);
    }

    /**
     * Scherm 2: Levering Informatie
     * Toont leveranciergegevens en leveringstabel (User Story 1 - Scenario 01 & 02).
     *
     * @param int $productId
     * @return Response
     */
    public function levering(int $productId): Response
    {
        $deliveryData = $this->magazijnModel->getProductDeliveryInfo($productId);

        if (!$deliveryData) {
            abort(404, 'Product niet gevonden');
        }

        // Formatteer de verwachte datum naar d-m-Y
        $verwachteDatumGeformatteerd = null;
        if (!empty($deliveryData->verwachteLevering)) {
            $verwachteDatumGeformatteerd = date('d-m-Y', strtotime($deliveryData->verwachteLevering));
        }

        // Formatteer de datums in leveringen naar d-m-Y
        $leveringenGeformatteerd = array_map(function ($lev) {
            return [
                'id' => $lev->Id,
                'productNaam' => $lev->ProductNaam,
                'datumLevering' => !empty($lev->DatumLevering) ? date('d-m-Y', strtotime($lev->DatumLevering)) : '-',
                'aantal' => $lev->Aantal,
                'datumEerstVolgendeLevering' => !empty($lev->DatumEerstVolgendeLevering) ? date('d-m-Y', strtotime($lev->DatumEerstVolgendeLevering)) : '-',
            ];
        }, $deliveryData->leveringen);

        return Inertia::render('Magazijn/Levering', [
            'product' => [
                'id' => $deliveryData->product->ProductId,
                'naam' => $deliveryData->product->ProductNaam,
                'barcode' => $deliveryData->product->Barcode,
                'aantalAanwezig' => $deliveryData->aantalAanwezig,
            ],
            'leverancier' => $deliveryData->leverancier,
            'leveringen' => $leveringenGeformatteerd,
            'hasStock' => $deliveryData->hasStock,
            'verwachteLevering' => $verwachteDatumGeformatteerd,
        ]);
    }
}
