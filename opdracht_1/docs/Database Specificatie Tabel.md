# Database Specificatie Tabel - Magazijn Jamin

**Auteur:** Timo Swart  
**Datum:** 30-09-2026  
**Opdracht:** BE-opdracht 02 - Realiseren van User Stories  
**Database:** `Jamin`  

---

## 1. Stamtabellen

### Tabel 1: Product
Bevat alle unieke snoep- en drop-producten van Jamin.

| Veldnaam | Datatype | Nullable | Sleutel | Omschrijving |
|---|---|---|---|---|
| **Id** | INT UNSIGNED | NOT NULL | **PK** | Uniek productnummer (AUTO_INCREMENT) |
| **Naam** | VARCHAR(50) | NOT NULL | | Naam van het product |
| **Barcode** | VARCHAR(13) | NOT NULL | | 13-cijferige EAN-barcode |
| **IsActief** | BIT | NOT NULL | | Systeemveld: 1 = Actief, 0 = Inactief (DEFAULT 1, Winegums = 0) |
| **Opmerking** | VARCHAR(255) | NULL | | Systeemveld: Eventuele opmerking |
| **DatumAangemaakt** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van aanmaken |
| **DatumGewijzigd** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van laatste wijziging (DEFAULT NOW(6)) |

---

### Tabel 2: Allergeen
Bevat alle geregistreerde allergenen.

| Veldnaam | Datatype | Nullable | Sleutel | Omschrijving |
|---|---|---|---|---|
| **Id** | INT UNSIGNED | NOT NULL | **PK** | Uniek allergeennummer (AUTO_INCREMENT) |
| **Naam** | VARCHAR(50) | NOT NULL | | Naam van het allergeen (bijv. Gluten, Lactose) |
| **Omschrijving** | VARCHAR(255) | NOT NULL | | Toelichting op het allergeen |
| **IsActief** | BIT | NOT NULL | | Systeemveld: 1 = Actief, 0 = Inactief (DEFAULT 1) |
| **Opmerking** | VARCHAR(255) | NULL | | Systeemveld: Eventuele opmerking |
| **DatumAangemaakt** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van aanmaken |
| **DatumGewijzigd** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van laatste wijziging (DEFAULT NOW(6)) |

---

### Tabel 3: Leverancier
Bevat de contactgegevens van alle leveranciers van Jamin (inclusief Quality Street).

| Veldnaam | Datatype | Nullable | Sleutel | Omschrijving |
|---|---|---|---|---|
| **Id** | INT UNSIGNED | NOT NULL | **PK** | Uniek leveranciernummer (AUTO_INCREMENT) |
| **Naam** | VARCHAR(50) | NOT NULL | | Bedrijfsnaam leverancier (bijv. Venco, Haribo, Quality Street) |
| **ContactPersoon** | VARCHAR(50) | NOT NULL | | Naam van de contactpersoon |
| **LeverancierNummer** | VARCHAR(20) | NOT NULL | | Zakelijk leveranciernummer (bijv. L1029384719) |
| **Mobiel** | VARCHAR(15) | NOT NULL | | Telefoonnummer van de contactpersoon |
| **IsActief** | BIT | NOT NULL | | Systeemveld: 1 = Actief, 0 = Inactief (DEFAULT 1) |
| **Opmerking** | VARCHAR(255) | NULL | | Systeemveld: Eventuele opmerking |
| **DatumAangemaakt** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van aanmaken |
| **DatumGewijzigd** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van laatste wijziging (DEFAULT NOW(6)) |

---

## 2. Koppeltabellen

### Tabel 4: Magazijn
Koppelt de producten aan de fysieke voorraad en verpakkingseenheden in het magazijn.

| Veldnaam | Datatype | Nullable | Sleutel | Omschrijving |
|---|---|---|---|---|
| **Id** | INT UNSIGNED | NOT NULL | **PK** | Unieke magazijnregel (AUTO_INCREMENT) |
| **ProductId** | INT UNSIGNED | NOT NULL | **FK** | Verwijst naar `Product.Id` (ON DELETE CASCADE) |
| **VerpakkingsEenheid** | DECIMAL(4,1) | NOT NULL | | Gewicht per verpakking in kilogrammen |
| **AantalAanwezig** | INT | NULL | | Huidig aantal op voorraad (NULL = niet voorradig) |
| **IsActief** | BIT | NOT NULL | | Systeemveld: 1 = Actief, 0 = Inactief (DEFAULT 1) |
| **Opmerking** | VARCHAR(255) | NULL | | Systeemveld: Eventuele opmerking |
| **DatumAangemaakt** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van aanmaken |
| **DatumGewijzigd** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van laatste wijziging (DEFAULT NOW(6)) |

---

### Tabel 5: ProductPerAllergeen
Koppeltabel voor de veel-op-veel (n:m) relatie tussen `Product` en `Allergeen`.

| Veldnaam | Datatype | Nullable | Sleutel | Omschrijving |
|---|---|---|---|---|
| **Id** | INT UNSIGNED | NOT NULL | **PK** | Unieke koppel-id (AUTO_INCREMENT) |
| **ProductId** | INT UNSIGNED | NOT NULL | **FK** | Verwijst naar `Product.Id` (ON DELETE CASCADE) |
| **AllergeenId** | INT UNSIGNED | NOT NULL | **FK** | Verwijst naar `Allergeen.Id` (ON DELETE CASCADE) |
| **IsActief** | BIT | NOT NULL | | Systeemveld: 1 = Actief, 0 = Inactief (DEFAULT 1) |
| **Opmerking** | VARCHAR(255) | NULL | | Systeemveld: Eventuele opmerking |
| **DatumAangemaakt** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van aanmaken |
| **DatumGewijzigd** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van laatste wijziging (DEFAULT NOW(6)) |

---

### Tabel 6: ProductPerLeverancier
Koppeltabel voor de veel-op-veel (n:m) relatie tussen `Product` en `Leverancier` met leveringshistorie.

| Veldnaam | Datatype | Nullable | Sleutel | Omschrijving |
|---|---|---|---|---|
| **Id** | INT UNSIGNED | NOT NULL | **PK** | Unieke leveringsregel (AUTO_INCREMENT) |
| **LeverancierId** | INT UNSIGNED | NOT NULL | **FK** | Verwijst naar `Leverancier.Id` (ON DELETE CASCADE) |
| **ProductId** | INT UNSIGNED | NOT NULL | **FK** | Verwijst naar `Product.Id` (ON DELETE CASCADE) |
| **DatumLevering** | DATE | NOT NULL | | Datum waarop de levering heeft plaatsgevonden |
| **Aantal** | INT | NOT NULL | | Aantal geleverde eenheden |
| **DatumEerstVolgendeLevering** | DATE | NULL | | Verwachte volgende leverdatum (kan NULL zijn) |
| **IsActief** | BIT | NOT NULL | | Systeemveld: 1 = Actief, 0 = Inactief (DEFAULT 1) |
| **Opmerking** | VARCHAR(255) | NULL | | Systeemveld: Eventuele opmerking |
| **DatumAangemaakt** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van aanmaken |
| **DatumGewijzigd** | DATETIME(6) | NOT NULL | | Systeemveld: Tijdstip van laatste wijziging (DEFAULT NOW(6)) |
