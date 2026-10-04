# BE-opdracht 01 - Magazijn Jamin (User Stories 1 & 2)

**Student:** Timo Swart  
**Klas:** IO-SD-2509*  
**Vak:** Backend Development  
**Framework:** Laravel MVC, OOP & PDO  
**Database:** `jamin` (MySQL)

---

## Inhoudsopgave
1. [Inleiding & Architectuur](#inleiding--architectuur)
2. [Gerealiseerde User Stories](#gerealiseerde-user-stories)
3. [Database & Specificatietabellen](#database--specificatietabellen)
4. [Installatie & Uitvoeren](#installatie--uitvoeren)
5. [Inloggegevens](#inloggegevens)
6. [Geautomatiseerde Tests](#geautomatiseerde-tests)
7. [Inleverproducten Checklist](#inleverproducten-checklist)

---

## Inleiding & Architectuur

Deze applicatie is gebouwd ter vervulling van **BE-opdracht 01**. De implementatie volgt strikt de vereisten:
- **MVC-Framework:** Laravel 11/12 met duidelijke scheiding tussen Model, View en Controller.
- **OOP (Object-Oriented Programming):** `MagazijnModel` is volledig objectgeoriënteerd opgezet met getypeerde properties, methoden en constructordependency.
- **PDO (PHP Data Objects):** Alle interacties met de database verlopen via native PDO met prepared statements (`PDO::prepare`, `PDOStatement::execute`, `PDO::FETCH_OBJ`).
- **Frontend / Views:** Volledig conform de drie meegeleverde wireframes gebouwd met moderne, overzichtelijke UI styling.

---

## Gerealiseerde User Stories

### User Story 1: Inzien leveringsinformatie product
*Als magazijnmedewerker wil ik de leveringsdata zien aan het magazijn van het gekozen product, met de bijbehorende aantallen en wat de verwachte eerstvolgende leveringsdata zijn van het product, zodat ik kan zien of een leverancier ook daadwerkelijk een product op tijd levert aan het magazijn.*

* **Scenario 01 (Mintnopjes - Id 1):**
  - Klik op het **blauwe vraagteken-icoon** in de kolom *Leverantie Info*.
  - Detailscherm **Levering Informatie** toont de leveranciergegevens bovenaan (`Naam Leverancier: Venco`, `Contactpersoon leverancier: Bert van Linge`, `Leverancier nummer: L1029384719`, `Mobiel: 06-28493827`).
  - De tabel toont de leveringen gesorteerd op `Datum laatste levering` oplopend.
* **Scenario 02 (Winegums - Id 10):**
  - Klik op het **blauwe vraagteken-icoon** bij *Winegums*. Omdat er geen voorraad is (`AantalAanwezig` is NULL/0), toont de tabel de melding:  
    `"Er is van dit product op dit moment geen voorraad aanwezig, de verwachte eerstvolgende levering is: 30-10-2024"`
  - Na **4 seconden** wordt de gebruiker automatisch teruggestuurd naar de pagina *Overzicht Magazijn Jamin*.

---

### User Story 2: Inzien allergeneninformatie van product
*Als magazijnmedewerker wil ik de allergenen informatie zien van een product, zodat ik kan zien of een product geschikt is voor klanten met een allergie.*

* **Scenario 01 (Zoute Ruitjes - Id 13):**
  - Klik op het **rode kruis-icoon** in de kolom *Allergenen Info*.
  - Detailscherm **Overzicht Allergenen** toont bovenaan `Naam: Zoute Ruitjes` en `Barcode: 8719587323256`.
  - De rijen in de tabel tonen de allergenen gesorteerd op `Naam` oplopend (`Gluten`, `Lactose`, `Soja`).
* **Scenario 02 (Cola Flesjes - Id 5):**
  - Klik op het **rode kruis-icoon** bij *Cola Flesjes*. Omdat er geen allergenen geregistreerd zijn, toont de tabel de melding:  
    `"In dit product zitten geen stoffen die een allergische reactie kunnen veroorzaken"`
  - Na **4 seconden** wordt de gebruiker automatisch teruggestuurd naar de pagina *Overzicht Magazijn Jamin*.

---

## Database & Specificatietabellen

De database `jamin` bevat de zes vereiste specificatietabellen conform het specificatiescript in `db/jamin.sql` en de specificaties in `docs/Database Specificatie Tabel.md`:
1. `Product` (Stamtabel: Id, Naam, Barcode + systeemvelden)
2. `Allergeen` (Stamtabel: Id, Naam, Omschrijving + systeemvelden)
3. `Leverancier` (Stamtabel: Id, Naam, ContactPersoon, LeverancierNummer, Mobiel + systeemvelden)
4. `Magazijn` (Koppeltabel: Id, ProductId [FK], VerpakkingsEenheid, AantalAanwezig + systeemvelden)
5. `ProductPerAllergeen` (Koppeltabel: Id, ProductId [FK], AllergeenId [FK] + systeemvelden)
6. `ProductPerLeverancier` (Koppeltabel: Id, LeverancierId [FK], ProductId [FK], DatumLevering, Aantal, DatumEerstVolgendeLevering + systeemvelden)

*Alle tabellen bevatten de verplichte systeemvelden:* `IsActief` (BIT), `Opmerkingen` (VARCHAR(250)), `DatumAangemaakt` (DATETIME(6)) en `DatumGewijzigd` (DATETIME(6)).

---

## Installatie & Uitvoeren

1. **Database importeren:**  
   Importeer het bestand `db/jamin.sql` in phpMyAdmin of via MySQL CLI:
   ```bash
   mysql -u root -p < db/jamin.sql
   ```
2. **Afhankelijkheden installeren:**
   ```bash
   composer install
   npm install
   ```
3. **Omgeving instellen (`.env`):**
   ```env
   DB_CONNECTION=mysql
   DB_HOST=127.0.0.1
   DB_PORT=3306
   DB_DATABASE=jamin
   DB_USERNAME=root
   DB_PASSWORD=
   ```
4. **Build assets & start applicatie:**
   ```bash
   npm run build
   php artisan serve
   ```
   Open de browser op: `http://127.0.0.1:8000`

---

## Inloggegevens

Voor de magazijnmedewerker is een account aangemaakt via de database seeder:
- **E-mailadres:** `magazijn@jamin.nl`
- **Wachtwoord:** `password`
- **Rol:** `Magazijnmedewerker`

---

## Geautomatiseerde Tests

Voer de volledige testsuite uit met:
```bash
php artisan test --filter=MagazijnTest
```
Resultaat: **6 tests passed, 68 assertions**.

---

## Inleverproducten Checklist

- [x] **Link op homepage** naar het scherm *Overzicht Magazijn Jamin*.
- [x] **Create-script** voor de zes specificatietabellen met relaties en systeemvelden (`db/jamin.sql`).
- [x] **Database specificatie tabel documentatie** in `docs/Database Specificatie Tabel.md`.
- [x] **Branching workflow:**
  - Branch `feature_leveringsinformatie_product` met Scenario 01 & 02 van User Story 1.
  - Branch `feature_allergeneninformatie_product` met Scenario 01 & 02 van User Story 2.
- [x] **Minimaal 20 commits** gedurende de ontwikkeling.
- [x] **Directory `vids/`** voor het schermopname-filmpje (max 60 sec via Xbox Game Bar `Win + G`).
- [x] **Directory `db/`** met database dump `db/jamin.sql`.
