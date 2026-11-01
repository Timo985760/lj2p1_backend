<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use PDO;

/**
 * Class LeverancierModel
 *
 * Model verantwoordelijk voor alle database-operaties met betrekking tot leveranciers,
 * geleverde producten en het toevoegen van nieuwe productleveringen (Opdracht 2).
 * Volledig gerealiseerd met behulp van OOP, Stored Procedures en native PHP PDO.
 */
class LeverancierModel
{
    /**
     * Native PDO databaseverbinding.
     */
    private PDO $pdo;

    /**
     * LeverancierModel constructor.
     * Initialiseert de PDO connectie.
     */
    public function __construct()
    {
        $this->pdo = DB::connection()->getPdo();
        $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        $this->pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    }

    /**
     * User Story 01 - Scenario 01 & 02:
     * Haalt alle leveranciers op met het aantal verschillende producten dat zij leveren,
     * gesorteerd op AantalVerschillendeProducten aflopend via Stored Procedure sp_GetAllLeveranciers.
     *
     * @return array Lijst van leveranciers met productaantal.
     */
    public function getAllLeveranciersWithProductCount(): array
    {
        $sql = 'CALL sp_GetAllLeveranciers()';

        $statement = $this->pdo->prepare($sql);
        $statement->execute();
        $result = $statement->fetchAll();
        $statement->closeCursor();

        return $result;
    }

    /**
     * Haalt een specifieke leverancier op via Stored Procedure sp_GetLeverancierById.
     *
     * @param int $leverancierId
     * @return object|null
     */
    public function getLeverancierById(int $leverancierId): ?object
    {
        $sql = 'CALL sp_GetLeverancierById(:leverancierId)';

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':leverancierId', $leverancierId, PDO::PARAM_INT);
        $statement->execute();
        $leverancier = $statement->fetch();
        $statement->closeCursor();

        return $leverancier ?: null;
    }

    /**
     * User Story 01 - Scenario 01 & 02:
     * Haalt de leverancier en alle door deze leverancier geleverde verschillende producten op,
     * gesorteerd op AantalAanwezig (Aantal in Magazijn) aflopend via Stored Procedures.
     *
     * @param int $leverancierId
     * @return object|null
     */
    public function getGeleverdeProductenByLeverancier(int $leverancierId): ?object
    {
        $leverancier = $this->getLeverancierById($leverancierId);

        if (!$leverancier) {
            return null;
        }

        $sql = 'CALL sp_GetProductsByLeverancier(:leverancierId)';

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':leverancierId', $leverancierId, PDO::PARAM_INT);
        $statement->execute();
        $producten = $statement->fetchAll();
        $statement->closeCursor();

        return (object) [
            'leverancier' => $leverancier,
            'producten' => $producten,
            'hasProducts' => count($producten) > 0,
        ];
    }

    /**
     * User Story 02 - Scenario 01 & 02:
     * Haalt product- en leveranciergegevens op voor het scherm Levering Product (Wireframe-04)
     * via Stored Procedure sp_GetProductLeverancierInfo.
     *
     * @param int $leverancierId
     * @param int $productId
     * @return object|null
     */
    public function getProductLeverancierInfo(int $leverancierId, int $productId): ?object
    {
        $sql = 'CALL sp_GetProductLeverancierInfo(:leverancierId, :productId)';

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':leverancierId', $leverancierId, PDO::PARAM_INT);
        $statement->bindValue(':productId', $productId, PDO::PARAM_INT);
        $statement->execute();
        $info = $statement->fetch();
        $statement->closeCursor();

        return $info ?: null;
    }

    /**
     * User Story 02 - Scenario 01 & 02:
     * Voegt een nieuwe levering van een product toe via Stored Procedure sp_AddProductLevering.
     * Als het product niet meer geproduceerd wordt (IsActief = 0), geeft de procedure Success = 0 terug.
     *
     * @param int $leverancierId
     * @param int $productId
     * @param int $aantal
     * @param string $datumEerstVolgendeLevering (Y-m-d)
     * @return bool True als de levering succesvol is toegevoegd, False als het product inactief is.
     */
    public function addProductLevering(
        int $leverancierId,
        int $productId,
        int $aantal,
        string $datumEerstVolgendeLevering
    ): bool {
        $sql = 'CALL sp_AddProductLevering(:leverancierId, :productId, :aantal, :datumEerstVolgendeLevering)';

        $statement = $this->pdo->prepare($sql);
        $statement->bindValue(':leverancierId', $leverancierId, PDO::PARAM_INT);
        $statement->bindValue(':productId', $productId, PDO::PARAM_INT);
        $statement->bindValue(':aantal', $aantal, PDO::PARAM_INT);
        $statement->bindValue(':datumEerstVolgendeLevering', $datumEerstVolgendeLevering, PDO::PARAM_STR);
        $statement->execute();

        $row = $statement->fetch();
        $statement->closeCursor();

        return $row && (int) $row->Success === 1;
    }
}

