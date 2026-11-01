# BE-opdracht 01 & 02 - Magazijn Jamin

**Student:** Timo Swart  
**Klas:** IO-SD-2509AB  
**Vak:** Backend Development  
**Framework:** Laravel MVC, OOP, Stored Procedures & PDO  
**Database:** `jamin` (MySQL)

---

## Inhoudsopgave
1. [Inleiding & Architectuur](#inleiding--architectuur)
2. [Gerealiseerde User Stories (Opdracht 2)](#gerealiseerde-user-stories-opdracht-2)
3. [Gerealiseerde User Stories (Opdracht 1)](#gerealiseerde-user-stories-opdracht-1)
4. [Database, Stored Procedures & Specificatietabellen](#database-stored-procedures--specificatietabellen)
5. [Installatie & Uitvoeren](#installatie--uitvoeren)
6. [Inloggegevens](#inloggegevens)
7. [Geautomatiseerde Tests](#geautomatiseerde-tests)

---

## Inleiding & Architectuur

Deze applicatie is gebouwd ter vervulling van **BE-opdracht 01** en **BE-opdracht 02**. De implementatie volgt strikt alle vereisten:
- **MVC-Framework:** Laravel 11/12 met duidelijke scheiding tussen Model (`LeverancierModel`, `MagazijnModel`), View (Inertia React pagina's) en Controller (`LeverancierController`, `MagazijnController`).
- **OOP (Object-Oriented Programming):** Alle models en controllers zijn volledig objectgeoriënteerd opgezet met getypeerde properties, methoden en constructors.
- **Stored Procedures:** Alle database-operaties voor Opdracht 2 verlopen via MySQL Stored Procedures (`sp_GetAllLeveranciers`, `sp_GetLeverancierById`, `sp_GetProductsByLeverancier`, `sp_GetProductLeverancierInfo`, `sp_AddProductLevering`).
- **PDO (PHP Data Objects):** Alle interacties met de database verlopen via native PHP PDO met prepared statements (`PDO::prepare`, `PDOStatement::bindValue`, `PDOStatement::execute`, `PDO::FETCH_OBJ`).
- **Frontend / Views:** Volledig conform alle meegeleverde wireframes gebouwd.

---

## Gerealiseerde User Stories (Opdracht 2)

### User Story 1: Overzicht leveranciers
*Als Magazijnmedewerker wil ik een informatieoverzicht kunnen zien van de verschillende leveranciers met het aantal verschillende producten dat zij aan Jamin leveren, zodat ik kan zien welke leveranciers een diversiteit aan producten aanbieden.*

* **Scenario 01 (Geleverde producten inzien, bijv. Venco):**
  - Op het scherm **Overzicht leveranciers** (Wireframe-01) staan alle leveranciers gesorteerd op `Aantal verschillende producten` aflopend.
  - Klik op het **box-icoon** in de kolom *Toon producten* bij een leverancier (bijv. *Venco*).
  - Het detailscherm **Geleverde producten** (Wireframe-02) toont de leveranciergegevens bovenaan en een tabel met alle geleverde producten, hun actuele magazijnvoorraad (`Aantal in Magazijn`), `Verpakkingseenheid` en `Laatste levering`, gesorteerd op `Aantal in Magazijn` aflopend.
* **Scenario 02 (Geen producten geleverd, bijv. Quality Street):**
  - Klik op het **box-icoon** in de kolom *Toon producten* bij *Quality Street* (0 producten).
  - Het detailscherm **Geleverde producten** (Wireframe-03) toont in de tabel de melding:  
    `"Dit bedrijf heeft tot nu toe geen producten geleverd aan Jamin"`
  - Na **3 seconden** wordt het scherm *Overzicht leveranciers* (Wireframe-01) automatisch weer geladen.

---

### User Story 2: Toevoegen producten
*Als Magazijnmedewerker wil ik een nieuwe zending van een product geleverd door een leverancier kunnen toevoegen aan het aantal van dit product in het magazijn, zodat ik de voorraad in het magazijn kan verhogen en actueel kan houden.*

* **Scenario 01 (Nieuwe zending toevoegen, bijv. Mintnopjes van Venco):**
  - Open het detailscherm **Geleverde producten** van *Venco* en klik op het **plus-icoon (+)** in de kolom *Nieuwe levering* bij *Mintnopjes*.
  - Op het scherm **Levering Product** (Wireframe-04) vul je bij *Aantal producteenheden* `25` in en bij *Datum eerstvolgende levering* `29-05-2024` en klik je op **Sla op**.
  - Je keert terug naar **Geleverde producten** (Wireframe-02) waar `Aantal in Magazijn` bij *Mintnopjes* is verhoogd en `Laatste levering` is bijgewerkt.
* **Scenario 02 (Product wordt niet meer geproduceerd, Winegums van Basset):**
  - Open **Geleverde producten** van *Basset* en klik op het **plus-icoon (+)** bij *Winegums* (`IsActief = 0`).
  - Vul op **Levering Product** (Wireframe-04) bij *Aantal producteenheden* `30` in en bij *Datum eerstvolgende levering* de datum van vandaag en klik op **Sla op**.
  - Op de pagina verschijnt de melding:  
    `"Het product Winegums van de leverancier Basset wordt niet meer geproduceerd"`
  - Na **4 seconden** word je automatisch doorgestuurd naar het overzicht **Geleverde producten** van *Basset*.

---

## Gerealiseerde User Stories (Opdracht 1)

### User Story 1: Inzien leveringsinformatie product
* **Scenario 01 (Mintnopjes - Id 1):** Toont leveranciergegevens en leveringshistorie gesorteerd op `DatumLevering` oplopend.
* **Scenario 02 (Winegums - Id 10):** Toont melding geen voorraad aanwezig en stuurt na 4 seconden door naar *Overzicht Magazijn Jamin*.

### User Story 2: Inzien allergeneninformatie van product
* **Scenario 01 (Zoute Ruitjes - Id 13):** Toont allergenen gesorteerd op `Naam` oplopend.
* **Scenario 02 (Cola Flesjes - Id 5):** Toont melding dat er geen allergenen aanwezig zijn en stuurt na 4 seconden door naar *Overzicht Magazijn Jamin*.

---

## Database, Stored Procedures & Specificatietabellen

De database `jamin` bevat de zes vereiste specificatietabellen en vijf Stored Procedures in `db/jamin.sql` (en `db/stored_procedures.sql`), gedocumenteerd in `docs/Database Specificatie Tabel.md`:
1. `Product` (`Id`, `Naam`, `Barcode` + systeemvelden; *Winegums* heeft `IsActief = 0`)
2. `Allergeen` (`Id`, `Naam`, `Omschrijving` + systeemvelden)
3. `Leverancier` (`Id`, `Naam`, `ContactPersoon`, `LeverancierNummer`, `Mobiel` + systeemvelden; inclusief *Quality Street*)
4. `Magazijn` (`Id`, `ProductId` [FK], `VerpakkingsEenheid`, `AantalAanwezig` + systeemvelden)
5. `ProductPerAllergeen` (`Id`, `ProductId` [FK], `AllergeenId` [FK] + systeemvelden)
6. `ProductPerLeverancier` (`Id`, `LeverancierId` [FK], `ProductId` [FK], `DatumLevering`, `Aantal`, `DatumEerstVolgendeLevering` + systeemvelden)

*Alle tabellen bevatten de verplichte systeemvelden:* `IsActief` (BIT), `Opmerking` (VARCHAR(255)), `DatumAangemaakt` (DATETIME(6)) en `DatumGewijzigd` (DATETIME(6) DEFAULT NOW(6)).

---

## Installatie & Uitvoeren

1. **Database & Stored Procedures importeren:**  
   Importeer `db/jamin.sql` in phpMyAdmin of voer de Laravel migraties en seeder uit:
   ```bash
   php artisan migrate:fresh --seed
   ```
2. **Build assets & start applicatie:**
   ```bash
   npm run build
   php artisan serve
   ```

---

## Inloggegevens

- **E-mailadres:** `magazijn@jamin.nl`
- **Wachtwoord:** `password`
- **Rol:** `Magazijnmedewerker`

---

## Geautomatiseerde Tests

Voer de testsuite uit met:
```bash
php artisan test --filter=LeverancierTest
php artisan test --filter=MagazijnTest
```
