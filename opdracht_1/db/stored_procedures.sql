-- ==================================================================================
-- STORED PROCEDURES (Opdracht 2 - User Story 01 & User Story 02)
-- ==================================================================================

-- Step: 14
-- Goal: Stored Procedure sp_GetAllLeveranciers (User Story 01 - Scenario 01 & 02)
-- Haalt alle leveranciers op inclusief het aantal verschillende geleverde producten,
-- gesorteerd op AantalVerschillendeProducten aflopend.
-- **********************************************************************************

DROP PROCEDURE IF EXISTS `sp_GetAllLeveranciers`;

DELIMITER $$
CREATE PROCEDURE `sp_GetAllLeveranciers`()
BEGIN
    SELECT
         l.`Id`
        ,l.`Naam`
        ,l.`ContactPersoon`
        ,l.`LeverancierNummer`
        ,l.`Mobiel`
        ,COUNT(DISTINCT ppl.`ProductId`) AS `AantalVerschillendeProducten`
    FROM `Leverancier` AS l
    LEFT JOIN `ProductPerLeverancier` AS ppl
        ON l.`Id` = ppl.`LeverancierId`
    WHERE l.`IsActief` = 1
    GROUP BY
         l.`Id`
        ,l.`Naam`
        ,l.`ContactPersoon`
        ,l.`LeverancierNummer`
        ,l.`Mobiel`
    ORDER BY
         `AantalVerschillendeProducten` DESC
        ,l.`Id` ASC;
END$$
DELIMITER ;


-- Step: 15
-- Goal: Stored Procedure sp_GetLeverancierById (User Story 01 - Scenario 01 & 02)
-- Haalt de gegevens van een specifieke leverancier op.
-- **********************************************************************************

DROP PROCEDURE IF EXISTS `sp_GetLeverancierById`;

DELIMITER $$
CREATE PROCEDURE `sp_GetLeverancierById`(
    IN p_LeverancierId INT UNSIGNED
)
BEGIN
    SELECT
         l.`Id`
        ,l.`Naam`
        ,l.`ContactPersoon`
        ,l.`LeverancierNummer`
        ,l.`Mobiel`
        ,CAST(l.`IsActief` AS UNSIGNED) AS `IsActief`
    FROM `Leverancier` AS l
    WHERE l.`Id` = p_LeverancierId
    LIMIT 1;
END$$
DELIMITER ;


-- Step: 16
-- Goal: Stored Procedure sp_GetProductsByLeverancier (User Story 01 - Scenario 01 & 02)
-- Haalt alle geleverde producten van een specifieke leverancier op met magazijnvoorraad,
-- verpakkingseenheid en datum van de laatste levering, gesorteerd op AantalAanwezig aflopend.
-- **********************************************************************************

DROP PROCEDURE IF EXISTS `sp_GetProductsByLeverancier`;

DELIMITER $$
CREATE PROCEDURE `sp_GetProductsByLeverancier`(
    IN p_LeverancierId INT UNSIGNED
)
BEGIN
    SELECT
         p.`Id` AS `ProductId`
        ,p.`Naam` AS `ProductNaam`
        ,p.`Barcode`
        ,CAST(p.`IsActief` AS UNSIGNED) AS `IsActief`
        ,m.`AantalAanwezig`
        ,m.`VerpakkingsEenheid`
        ,MAX(ppl.`DatumLevering`) AS `LaatsteLevering`
    FROM `ProductPerLeverancier` AS ppl
    INNER JOIN `Product` AS p
        ON ppl.`ProductId` = p.`Id`
    LEFT JOIN `Magazijn` AS m
        ON p.`Id` = m.`ProductId`
    WHERE ppl.`LeverancierId` = p_LeverancierId
    GROUP BY
         p.`Id`
        ,p.`Naam`
        ,p.`Barcode`
        ,p.`IsActief`
        ,m.`AantalAanwezig`
        ,m.`VerpakkingsEenheid`
    ORDER BY
         m.`AantalAanwezig` DESC;
END$$
DELIMITER ;


-- Step: 17
-- Goal: Stored Procedure sp_GetProductLeverancierInfo (User Story 02 - Scenario 01 & 02)
-- Haalt product- en leveranciergegevens op voor het scherm Levering Product (Wireframe-04).
-- **********************************************************************************

DROP PROCEDURE IF EXISTS `sp_GetProductLeverancierInfo`;

DELIMITER $$
CREATE PROCEDURE `sp_GetProductLeverancierInfo`(
    IN p_LeverancierId INT UNSIGNED,
    IN p_ProductId INT UNSIGNED
)
BEGIN
    SELECT
         p.`Id` AS `ProductId`
        ,p.`Naam` AS `ProductNaam`
        ,p.`Barcode`
        ,CAST(p.`IsActief` AS UNSIGNED) AS `ProductIsActief`
        ,m.`AantalAanwezig`
        ,m.`VerpakkingsEenheid`
        ,l.`Id` AS `LeverancierId`
        ,l.`Naam` AS `LeverancierNaam`
        ,l.`ContactPersoon`
        ,l.`LeverancierNummer`
        ,l.`Mobiel`
    FROM `Product` AS p
    INNER JOIN `Leverancier` AS l
        ON l.`Id` = p_LeverancierId
    LEFT JOIN `Magazijn` AS m
        ON p.`Id` = m.`ProductId`
    WHERE p.`Id` = p_ProductId
    LIMIT 1;
END$$
DELIMITER ;


-- Step: 18
-- Goal: Stored Procedure sp_AddProductLevering (User Story 02 - Scenario 01 & 02)
-- Voegt een nieuwe levering toe voor een actief product en verhoogt de voorraad in Magazijn.
-- Wanneer het product niet meer actief is (IsActief = 0), wordt er niets gewijzigd en Success = 0 teruggegeven.
-- **********************************************************************************

DROP PROCEDURE IF EXISTS `sp_AddProductLevering`;

DELIMITER $$
CREATE PROCEDURE `sp_AddProductLevering`(
    IN p_LeverancierId INT UNSIGNED,
    IN p_ProductId INT UNSIGNED,
    IN p_Aantal INT,
    IN p_DatumEerstVolgendeLevering DATE
)
BEGIN
    DECLARE v_IsActief INT DEFAULT 0;

    SELECT CAST(`IsActief` AS UNSIGNED)
    INTO v_IsActief
    FROM `Product`
    WHERE `Id` = p_ProductId
    LIMIT 1;

    IF v_IsActief = 1 THEN
        INSERT INTO `ProductPerLeverancier`
        (
             `LeverancierId`
            ,`ProductId`
            ,`DatumLevering`
            ,`Aantal`
            ,`DatumEerstVolgendeLevering`
            ,`IsActief`
            ,`Opmerking`
            ,`DatumAangemaakt`
            ,`DatumGewijzigd`
        )
        VALUES
        (
             p_LeverancierId
            ,p_ProductId
            ,CURDATE()
            ,p_Aantal
            ,p_DatumEerstVolgendeLevering
            ,1
            ,NULL
            ,SYSDATE(6)
            ,NOW(6)
        );

        UPDATE `Magazijn`
        SET `AantalAanwezig` = COALESCE(`AantalAanwezig`, 0) + p_Aantal
           ,`DatumGewijzigd` = NOW(6)
        WHERE `ProductId` = p_ProductId;

        SELECT 1 AS `Success`;
    ELSE
        SELECT 0 AS `Success`;
    END IF;
END$$
DELIMITER ;

