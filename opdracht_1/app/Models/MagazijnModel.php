<?php

namespace App\Models;

use PDO;
use Illuminate\Support\Facades\DB;

/**
 * Class MagazijnModel
 *
 * Model verantwoordelijk voor database-operaties met betrekking tot het magazijn,
 * producten, leveranciers en leveringsinformatie.
 * Volledig gerealiseerd met behulp van OOP en native PHP PDO.
 */
class MagazijnModel
{
    /**
     * Native PDO databaseverbinding.
     */
    private PDO $pdo;

    /**
     * MagazijnModel constructor.
     * Initialiseert de PDO connectie.
     */
    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    }

    /**
     * Haalt alle producten op met magazijnvoorraad, gesorteerd op Barcode oplopend.
     *
     * @return array Lijst van producten met magazijnvoorraad.
     */
    public function getAllProductsWithStock(): array
    {
        $sql = "
            SELECT 
                p.Id AS ProductId,
                p.Barcode,
                p.Naam,
                m.VerpakkingsEenheid,
                m.AantalAanwezig
            FROM Product p
            LEFT JOIN Magazijn m ON p.Id = m.ProductId
            ORDER BY p.Barcode ASC
        ";

        $statement = $this->pdo->prepare($sql);
        $statement->execute();

        return $statement->fetchAll();
    }

    /**
     * Haalt leveringsinformatie en leveranciergegevens op voor een specifiek product.
     * Leveringen worden gesorteerd op DatumLevering oplopend.
     *
     * @param int $productId
     * @return object|null
     */
    public function getProductDeliveryInfo(int $productId): ?object
    {
        // 1. Haal product- en leveranciergegevens op
        $productSql = "
            SELECT 
                p.Id AS ProductId,
                p.Naam AS ProductNaam,
                p.Barcode,
                m.AantalAanwezig,
                l.Id AS LeverancierId,
                l.Naam AS LeverancierNaam,
                l.ContactPersoon,
                l.LeverancierNummer,
                l.Mobiel
            FROM Product p
            LEFT JOIN Magazijn m ON p.Id = m.ProductId
            LEFT JOIN ProductPerLeverancier ppl ON p.Id = ppl.ProductId
            LEFT JOIN Leverancier l ON ppl.LeverancierId = l.Id
            WHERE p.Id = :productId
            LIMIT 1
        ";

        $productStmt = $this->pdo->prepare($productSql);
        $productStmt->bindValue(':productId', $productId, PDO::PARAM_INT);
        $productStmt->execute();

        $productInfo = $productStmt->fetch();

        if (!$productInfo) {
            return null;
        }

        // 2. Haal alle leveringen op voor dit product, gesorteerd op DatumLevering oplopend
        $deliverySql = "
            SELECT 
                ppl.Id,
                p.Naam AS ProductNaam,
                ppl.DatumLevering,
                ppl.Aantal,
                ppl.DatumEerstVolgendeLevering
            FROM ProductPerLeverancier ppl
            INNER JOIN Product p ON ppl.ProductId = p.Id
            WHERE ppl.ProductId = :productId
            ORDER BY ppl.DatumLevering ASC
        ";

        $deliveryStmt = $this->pdo->prepare($deliverySql);
        $deliveryStmt->bindValue(':productId', $productId, PDO::PARAM_INT);
        $deliveryStmt->execute();

        $leveringen = $deliveryStmt->fetchAll();

        // 3. Bepaal de verwachte eerstvolgende leverdatum
        // Zoek de meest relevante DatumEerstVolgendeLevering uit de leveringen
        $verwachteLevering = null;
        foreach ($leveringen as $lev) {
            if (!empty($lev->DatumEerstVolgendeLevering)) {
                $verwachteLevering = $lev->DatumEerstVolgendeLevering;
            }
        }

        return (object) [
            'product' => $productInfo,
            'leverancier' => (object) [
                'naam' => $productInfo->LeverancierNaam ?? 'Onbekend',
                'contactpersoon' => $productInfo->ContactPersoon ?? 'Onbekend',
                'leveranciernummer' => $productInfo->LeverancierNummer ?? 'Onbekend',
                'mobiel' => $productInfo->Mobiel ?? 'Onbekend',
            ],
            'leveringen' => $leveringen,
            'hasStock' => !is_null($productInfo->AantalAanwezig) && (int)$productInfo->AantalAanwezig > 0,
            'aantalAanwezig' => $productInfo->AantalAanwezig,
            'verwachteLevering' => $verwachteLevering,
        ];
    }

    /**
     * Haalt allergeneninformatie op voor een specifiek product (User Story 2).
     * De allergenen worden gesorteerd op Naam oplopend.
     *
     * @param int $productId
     * @return object|null
     */
    public function getProductAllergensInfo(int $productId): ?object
    {
        // 1. Haal productgegevens op
        $productSql = "
            SELECT 
                p.Id AS ProductId,
                p.Naam AS ProductNaam,
                p.Barcode
            FROM Product p
            WHERE p.Id = :productId
            LIMIT 1
        ";

        $productStmt = $this->pdo->prepare($productSql);
        $productStmt->bindValue(':productId', $productId, PDO::PARAM_INT);
        $productStmt->execute();

        $product = $productStmt->fetch();

        if (!$product) {
            return null;
        }

        // 2. Haal alle allergenen op voor dit product, gesorteerd op Naam oplopend
        $allergenenSql = "
            SELECT 
                a.Id,
                a.Naam,
                a.Omschrijving
            FROM ProductPerAllergeen ppa
            INNER JOIN Allergeen a ON ppa.AllergeenId = a.Id
            WHERE ppa.ProductId = :productId
              AND a.IsActief = 1
            ORDER BY a.Naam ASC
        ";

        $allergenenStmt = $this->pdo->prepare($allergenenSql);
        $allergenenStmt->bindValue(':productId', $productId, PDO::PARAM_INT);
        $allergenenStmt->execute();

        $allergenen = $allergenenStmt->fetchAll();

        return (object) [
            'product' => $product,
            'allergenen' => $allergenen,
            'hasAllergens' => count($allergenen) > 0,
        ];
    }
}
