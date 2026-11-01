-- Step: 01
-- Goal: Create a new database Jamin
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Update Opdracht 2 + Stored Procedures
-- **********************************************************************************/

-- Check if the database exists
DROP DATABASE IF EXISTS `Jamin`;

-- Create a new Database
CREATE DATABASE IF NOT EXISTS `Jamin`;

-- Use database Jamin
USE `Jamin`;


-- ==================================================================================
-- STAMTABELLEN (Tabellen met alleen een Primary Key (PK) en GEEN Foreign Keys)
-- ==================================================================================

-- Step: 02
-- Goal: Create a new stamtabel Product
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Systeemvelden Opdracht 2
-- **********************************************************************************/

DROP TABLE IF EXISTS `Product`;

CREATE TABLE IF NOT EXISTS `Product`
(
    `Id`                INT             UNSIGNED        NOT NULL    AUTO_INCREMENT
   ,`Naam`              VARCHAR(50)                     NOT NULL
   ,`Barcode`           VARCHAR(13)                     NOT NULL
   ,`IsActief`          BIT                             NOT NULL    DEFAULT 1
   ,`Opmerking`         VARCHAR(255)                        NULL    DEFAULT NULL
   ,`DatumAangemaakt`   DATETIME(6)                     NOT NULL    DEFAULT NOW(6)
   ,`DatumGewijzigd`    DATETIME(6)                     NOT NULL    DEFAULT NOW(6)

   ,CONSTRAINT          PK_Product_Id   PRIMARY KEY CLUSTERED(`Id`)
) ENGINE=InnoDB;


-- Step: 03
-- Goal: Fill stamtabel Product with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Winegums IsActief = 0
-- **********************************************************************************/

INSERT INTO `Product`
(
     `Naam`
    ,`Barcode`
    ,`IsActief`
    ,`Opmerking`
    ,`DatumAangemaakt`
    ,`DatumGewijzigd`
)
VALUES
     ('Mintnopjes', '8719587231278', 1, NULL, SYSDATE(6), NOW(6))
    ,('Schoolkrijt', '8719587326713', 1, NULL, SYSDATE(6), NOW(6))
    ,('Honingdrop', '8719587327836', 1, NULL, SYSDATE(6), NOW(6))
    ,('Zure Beren', '8719587321441', 1, NULL, SYSDATE(6), NOW(6))
    ,('Cola Flesjes', '8719587321237', 1, NULL, SYSDATE(6), NOW(6))
    ,('Turtles', '8719587322245', 1, NULL, SYSDATE(6), NOW(6))
    ,('Witte Muizen', '8719587328256', 1, NULL, SYSDATE(6), NOW(6))
    ,('Reuzen Slangen', '8719587325641', 1, NULL, SYSDATE(6), NOW(6))
    ,('Zoute Rijen', '8719587322739', 1, NULL, SYSDATE(6), NOW(6))
    ,('Winegums', '8719587327527', 0, NULL, SYSDATE(6), NOW(6))
    ,('Drop Munten', '8719587322345', 1, NULL, SYSDATE(6), NOW(6))
    ,('Kruis Drop', '8719587322265', 1, NULL, SYSDATE(6), NOW(6))
    ,('Zoute Ruitjes', '8719587323256', 1, NULL, SYSDATE(6), NOW(6));


-- Step: 04
-- Goal: Create a new stamtabel Allergeen
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Systeemvelden Opdracht 2
-- **********************************************************************************/

DROP TABLE IF EXISTS `Allergeen`;

CREATE TABLE IF NOT EXISTS `Allergeen`
(
    `Id`                INT             UNSIGNED        NOT NULL    AUTO_INCREMENT
   ,`Naam`              VARCHAR(50)                     NOT NULL
   ,`Omschrijving`      VARCHAR(255)                    NOT NULL
   ,`IsActief`          BIT                             NOT NULL    DEFAULT 1
   ,`Opmerking`         VARCHAR(255)                        NULL    DEFAULT NULL
   ,`DatumAangemaakt`   DATETIME(6)                     NOT NULL    DEFAULT NOW(6)
   ,`DatumGewijzigd`    DATETIME(6)                     NOT NULL    DEFAULT NOW(6)

   ,CONSTRAINT          PK_Allergeen_Id PRIMARY KEY CLUSTERED(`Id`)
) ENGINE=InnoDB;


-- Step: 05
-- Goal: Fill stamtabel Allergeen with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- **********************************************************************************/

INSERT INTO `Allergeen`
(
     `Naam`
    ,`Omschrijving`
    ,`IsActief`
    ,`Opmerking`
    ,`DatumAangemaakt`
    ,`DatumGewijzigd`
)
VALUES
     ('Gluten', 'Dit product bevat gluten', 1, NULL, SYSDATE(6), NOW(6))
    ,('Gelatine', 'Dit product bevat gelatine', 1, NULL, SYSDATE(6), NOW(6))
    ,('AZO-Kleurstof', 'Dit product bevat AZO-kleurstoffen', 1, NULL, SYSDATE(6), NOW(6))
    ,('Lactose', 'Dit product bevat lactose', 1, NULL, SYSDATE(6), NOW(6))
    ,('Soja', 'Dit product bevat soja', 1, NULL, SYSDATE(6), NOW(6));


-- Step: 06
-- Goal: Create a new stamtabel Leverancier
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Systeemvelden Opdracht 2
-- **********************************************************************************/

DROP TABLE IF EXISTS `Leverancier`;

CREATE TABLE IF NOT EXISTS `Leverancier`
(
    `Id`                    INT             UNSIGNED        NOT NULL    AUTO_INCREMENT
   ,`Naam`                  VARCHAR(50)                     NOT NULL
   ,`ContactPersoon`        VARCHAR(50)                     NOT NULL
   ,`LeverancierNummer`     VARCHAR(20)                     NOT NULL
   ,`Mobiel`                VARCHAR(15)                     NOT NULL
   ,`IsActief`              BIT                             NOT NULL    DEFAULT 1
   ,`Opmerking`             VARCHAR(255)                        NULL    DEFAULT NULL
   ,`DatumAangemaakt`       DATETIME(6)                     NOT NULL    DEFAULT NOW(6)
   ,`DatumGewijzigd`        DATETIME(6)                     NOT NULL    DEFAULT NOW(6)

   ,CONSTRAINT              PK_Leverancier_Id   PRIMARY KEY CLUSTERED(`Id`)
) ENGINE=InnoDB;


-- Step: 07
-- Goal: Fill stamtabel Leverancier with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Quality Street toegevoegd
-- **********************************************************************************/

INSERT INTO `Leverancier`
(
     `Naam`
    ,`ContactPersoon`
    ,`LeverancierNummer`
    ,`Mobiel`
    ,`IsActief`
    ,`Opmerking`
    ,`DatumAangemaakt`
    ,`DatumGewijzigd`
)
VALUES
     ('Venco', 'Bert van Linge', 'L1029384719', '06-28493827', 1, NULL, SYSDATE(6), NOW(6))
    ,('Astra Sweets', 'Jasper del Monte', 'L1029284315', '06-39398734', 1, NULL, SYSDATE(6), NOW(6))
    ,('Haribo', 'Sven Stalman', 'L1029324748', '06-24383291', 1, NULL, SYSDATE(6), NOW(6))
    ,('Basset', 'Joyce Stelterberg', 'L1023845773', '06-48293823', 1, NULL, SYSDATE(6), NOW(6))
    ,('De Bron', 'Remco Veenstra', 'L1023857736', '06-34291234', 1, NULL, SYSDATE(6), NOW(6))
    ,('Quality Street', 'Johan Nooij', 'L1029234586', '06-23458456', 1, NULL, SYSDATE(6), NOW(6));


-- ==================================================================================
-- KOPPELTABELLEN (Tabellen met een Primary Key (PK) en één of meerdere Foreign Keys)
-- ==================================================================================

-- Step: 08
-- Goal: Create a new koppeltabel Magazijn
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Systeemvelden Opdracht 2
-- **********************************************************************************/

DROP TABLE IF EXISTS `Magazijn`;

CREATE TABLE IF NOT EXISTS `Magazijn`
(
    `Id`                    INT             UNSIGNED        NOT NULL    AUTO_INCREMENT
   ,`ProductId`             INT             UNSIGNED        NOT NULL
   ,`VerpakkingsEenheid`    DECIMAL(4,1)                    NOT NULL
   ,`AantalAanwezig`        INT                                 NULL    DEFAULT NULL
   ,`IsActief`              BIT                             NOT NULL    DEFAULT 1
   ,`Opmerking`             VARCHAR(255)                        NULL    DEFAULT NULL
   ,`DatumAangemaakt`       DATETIME(6)                     NOT NULL    DEFAULT NOW(6)
   ,`DatumGewijzigd`        DATETIME(6)                     NOT NULL    DEFAULT NOW(6)

   ,CONSTRAINT  PK_Magazijn_Id                          PRIMARY KEY CLUSTERED(`Id`)
   ,CONSTRAINT  FK_Magazijn_ProductId_Product_Id        FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON DELETE CASCADE
) ENGINE=InnoDB;


-- Step: 09
-- Goal: Fill koppeltabel Magazijn with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- **********************************************************************************/

INSERT INTO `Magazijn`
(
     `ProductId`
    ,`VerpakkingsEenheid`
    ,`AantalAanwezig`
    ,`IsActief`
    ,`Opmerking`
    ,`DatumAangemaakt`
    ,`DatumGewijzigd`
)
VALUES
     (1, 5.0, 453, 1, NULL, SYSDATE(6), NOW(6))
    ,(2, 2.5, 400, 1, NULL, SYSDATE(6), NOW(6))
    ,(3, 5.0, 1, 1, NULL, SYSDATE(6), NOW(6))
    ,(4, 1.0, 800, 1, NULL, SYSDATE(6), NOW(6))
    ,(5, 3.0, 234, 1, NULL, SYSDATE(6), NOW(6))
    ,(6, 2.0, 345, 1, NULL, SYSDATE(6), NOW(6))
    ,(7, 1.0, 795, 1, NULL, SYSDATE(6), NOW(6))
    ,(8, 10.0, 233, 1, NULL, SYSDATE(6), NOW(6))
    ,(9, 2.5, 123, 1, NULL, SYSDATE(6), NOW(6))
    ,(10, 3.0, NULL, 1, NULL, SYSDATE(6), NOW(6))
    ,(11, 2.0, 367, 1, NULL, SYSDATE(6), NOW(6))
    ,(12, 1.0, 467, 1, NULL, SYSDATE(6), NOW(6))
    ,(13, 5.0, 20, 1, NULL, SYSDATE(6), NOW(6));


-- Step: 10
-- Goal: Create a new koppeltabel ProductPerAllergeen
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Systeemvelden Opdracht 2
-- **********************************************************************************/

DROP TABLE IF EXISTS `ProductPerAllergeen`;

CREATE TABLE IF NOT EXISTS `ProductPerAllergeen`
(
    `Id`                INT             UNSIGNED        NOT NULL    AUTO_INCREMENT
   ,`ProductId`         INT             UNSIGNED        NOT NULL
   ,`AllergeenId`       INT             UNSIGNED        NOT NULL
   ,`IsActief`          BIT                             NOT NULL    DEFAULT 1
   ,`Opmerking`         VARCHAR(255)                        NULL    DEFAULT NULL
   ,`DatumAangemaakt`   DATETIME(6)                     NOT NULL    DEFAULT NOW(6)
   ,`DatumGewijzigd`    DATETIME(6)                     NOT NULL    DEFAULT NOW(6)

   ,CONSTRAINT  PK_ProductPerAllergeen_Id               PRIMARY KEY CLUSTERED(`Id`)
   ,CONSTRAINT  FK_PPA_ProductId_Product_Id             FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON DELETE CASCADE
   ,CONSTRAINT  FK_PPA_AllergeenId_Allergeen_Id         FOREIGN KEY (`AllergeenId`) REFERENCES `Allergeen`(`Id`) ON DELETE CASCADE
) ENGINE=InnoDB;


-- Step: 11
-- Goal: Fill koppeltabel ProductPerAllergeen with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- **********************************************************************************/

INSERT INTO `ProductPerAllergeen`
(
     `ProductId`
    ,`AllergeenId`
    ,`IsActief`
    ,`Opmerking`
    ,`DatumAangemaakt`
    ,`DatumGewijzigd`
)
VALUES
     (1, 2, 1, NULL, SYSDATE(6), NOW(6))
    ,(1, 1, 1, NULL, SYSDATE(6), NOW(6))
    ,(1, 3, 1, NULL, SYSDATE(6), NOW(6))
    ,(3, 4, 1, NULL, SYSDATE(6), NOW(6))
    ,(6, 5, 1, NULL, SYSDATE(6), NOW(6))
    ,(9, 2, 1, NULL, SYSDATE(6), NOW(6))
    ,(9, 5, 1, NULL, SYSDATE(6), NOW(6))
    ,(10, 2, 1, NULL, SYSDATE(6), NOW(6))
    ,(12, 4, 1, NULL, SYSDATE(6), NOW(6))
    ,(13, 1, 1, NULL, SYSDATE(6), NOW(6))
    ,(13, 4, 1, NULL, SYSDATE(6), NOW(6))
    ,(13, 5, 1, NULL, SYSDATE(6), NOW(6));


-- Step: 12
-- Goal: Create a new koppeltabel ProductPerLeverancier
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Systeemvelden Opdracht 2
-- **********************************************************************************/

DROP TABLE IF EXISTS `ProductPerLeverancier`;

CREATE TABLE IF NOT EXISTS `ProductPerLeverancier`
(
    `Id`                            INT             UNSIGNED        NOT NULL    AUTO_INCREMENT
   ,`LeverancierId`                 INT             UNSIGNED        NOT NULL
   ,`ProductId`                     INT             UNSIGNED        NOT NULL
   ,`DatumLevering`                 DATE                            NOT NULL
   ,`Aantal`                        INT                             NOT NULL
   ,`DatumEerstVolgendeLevering`    DATE                                NULL    DEFAULT NULL
   ,`IsActief`                      BIT                             NOT NULL    DEFAULT 1
   ,`Opmerking`                     VARCHAR(255)                        NULL    DEFAULT NULL
   ,`DatumAangemaakt`               DATETIME(6)                     NOT NULL    DEFAULT NOW(6)
   ,`DatumGewijzigd`                DATETIME(6)                     NOT NULL    DEFAULT NOW(6)

   ,CONSTRAINT  PK_ProductPerLeverancier_Id             PRIMARY KEY CLUSTERED(`Id`)
   ,CONSTRAINT  FK_PPL_LeverancierId_Leverancier_Id     FOREIGN KEY (`LeverancierId`) REFERENCES `Leverancier`(`Id`) ON DELETE CASCADE
   ,CONSTRAINT  FK_PPL_ProductId_Product_Id             FOREIGN KEY (`ProductId`) REFERENCES `Product`(`Id`) ON DELETE CASCADE
) ENGINE=InnoDB;


-- Step: 13
-- Goal: Fill koppeltabel ProductPerLeverancier with data
-- **********************************************************************************
-- Version       Date:           Author:                     Description:
-- *******       **********      ****************            ******************
-- 01            13-09-2026      Timo Swart                  New
-- 02            30-09-2026      Timo Swart                  Datums aangepast voor Opdracht 2
-- **********************************************************************************/

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
     (1, 1, '2024-11-09', 23, '2024-11-16', 1, NULL, SYSDATE(6), NOW(6))
    ,(1, 1, '2024-11-18', 21, '2024-11-25', 1, NULL, SYSDATE(6), NOW(6))
    ,(1, 2, '2024-11-09', 12, '2024-11-16', 1, NULL, SYSDATE(6), NOW(6))
    ,(1, 3, '2024-11-10', 11, '2024-11-17', 1, NULL, SYSDATE(6), NOW(6))
    ,(2, 4, '2024-11-14', 16, '2024-11-21', 1, NULL, SYSDATE(6), NOW(6))
    ,(2, 4, '2024-11-21', 23, '2024-11-28', 1, NULL, SYSDATE(6), NOW(6))
    ,(2, 5, '2024-11-14', 45, '2024-11-21', 1, NULL, SYSDATE(6), NOW(6))
    ,(2, 6, '2024-11-14', 30, '2024-11-21', 1, NULL, SYSDATE(6), NOW(6))
    ,(3, 7, '2024-11-12', 12, '2024-11-19', 1, NULL, SYSDATE(6), NOW(6))
    ,(3, 7, '2024-11-19', 23, '2024-11-26', 1, NULL, SYSDATE(6), NOW(6))
    ,(3, 8, '2024-11-10', 12, '2024-11-17', 1, NULL, SYSDATE(6), NOW(6))
    ,(3, 9, '2024-11-11', 1, '2024-11-18', 1, NULL, SYSDATE(6), NOW(6))
    ,(4, 10, '2024-11-16', 24, '2024-11-30', 1, NULL, SYSDATE(6), NOW(6))
    ,(5, 11, '2024-11-10', 47, '2024-11-17', 1, NULL, SYSDATE(6), NOW(6))
    ,(5, 11, '2024-11-19', 60, '2024-11-26', 1, NULL, SYSDATE(6), NOW(6))
    ,(5, 12, '2024-11-11', 45, NULL, 1, NULL, SYSDATE(6), NOW(6))
    ,(5, 13, '2024-11-12', 23, NULL, 1, NULL, SYSDATE(6), NOW(6));


-- ==================================================================================
-- STORED PROCEDURES (Opdracht 2 - User Story 01 & User Story 02)
-- ==================================================================================

-- Step: 14
-- Goal: Stored Procedure sp_GetAllLeveranciers (User Story 01 - Scenario 01 & 02)
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
