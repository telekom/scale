# Design Updates

Diese Seite dokumentiert Updates der visuellen Erscheinung von Scale

## Visual Design Updates

21.06.2023

Kleinere Bugfixes und Optimierungen des Visual Designs folgender Komponenten:

- Accordion
- Breadcrump
- Button
- Checkbox Group
- Card
- Data Grid
- Date Picker
- Dropdown Select
- Footer
- Flyout Menu
- Link
- List
- Loading Spinner
- Modal
- Notification
- Radio Button Group
- Rating Stars
- Sidebar Navigation
- Switch
- Tab Navigation
- Table
- Tag
- Telekom Brand Header
- Text Area
- Text Field

**Weitere Änderungen:**

Die Beta-Komponenten Notification Banner, Messager und Toast wurden zu einer Komponente namens "Notification" zusammengefasst.

Die Logovarianten mit Claim wurden aus Scale entfernt, da sie nicht für digitale Anwendungen vorgesehen sind. Das Logo mit Claim kann weiterhin über das Brand & Design-Portal heruntergeladen werden.

## Typografie-Update

06.04.2023

Das Schriftformat “Footnote” wurde aus der Typografie-Skala entfernt.

## Weitere Basistypen des Telekom Brand Headers

20.03.2023

Die im Januar veröffentlichte Beta-Komponente “Telekom Brand Header & Navigation” wird um zwei neue Basistypen ergänzt – “Slim Header” und “Subtle Header”. Mehr Informationen findest du im Usage Text des [neuen Brand Headers](./?path=/docs/beta-components-telekom-brand-header-navigation--standard).

## Neuer Brand Footer

17.02.2023

Veröffentlichung des neuen Brand Footers als Beta-Version. Dieser ersetzt die aktuelle Komponente, wenn die Qualitätskontrolle abgeschlossen ist und die WCAG-Zertifizierung für Barrierefreiheit vorliegt.

## Neuer Brand Header

31.01.2023

Veröffentlichung des neuen Brand Headers als Beta-Version. Dieser ersetzt die aktuelle Komponente, wenn die Qualitätskontrolle abgeschlossen ist und die WCAG-Zertifizierung für Barrierefreiheit vorliegt. Bis dahin freuen wir uns über <a href="https://deploy-preview-1537--marvelous-moxie-a6e2fe.netlify.app/?path=/docs/contact-your-feedback--page" target="_blank" rel="noopener noreferrer">euer Feedback</a> zur neuen Komponente.

## Neue Beta-Komponenten

25.01.2023

- Veröffentlichung der neuen Beta-Komponenten Segmented Button und Chip.
- Der Segmented Button ersetzt die Beta-Komponente Toggle Group.
- Neue Kategorie „Deprecated Components“. Hier sind Komponenten aufgelistet, die wir nicht weiter unterstützen.

<br>

## Komponenten-Update (Optimierung von Mobile und Visual Design)

27.10.2022

**Visuelle und funktionale Änderungen**

- Slider: Visuelle Optimierung und funktionale Erweiterung
- Radio Buttons: Optimierung des Interactive States „Selected“
- Tags: Farbliche Optimierung und Erweiterung um vordefinierte Farben
- Switch: Visuelle Überarbeitung und eine neue Variante für Android
- Tab Navigation: Visuelle Optimierung

<br>

**Optimierung für Geräte mit Touchscreen**

Die Größe der folgenden Komponenten ist angepasst und vereinfacht die Nutzung auf Touchscreens:

- Radio Button
- Radio Button Group
- Checkbox
- Checkbox Group

<br>

**Entfernte Varianten „Small“**

Die folgenden Komponenten sind in ihrer Höhe angepasst und ab sofort nur noch in einer Größe auf Scale verfügbar. Wenn du für deinen Anwendungsfall eine andere Größe brauchst, kannst du die Komponenten per CSS-Overwrite ändern.

- Textfield
- Dropdown
- Dropdown Select
- Date Picker
- Pagination

Den Button unterstützen wir weiterhin in den Größen „Small“ und „Large“.
Die Höhe des „Large Button“ ist ebenfalls angepasst.

<br>

**Barierrefreiheit**

Informationstexte enthalten ab sofort Icons, um Menschen mit Farbfehlsichtigkeit in ihrer Nutzung zu unterstützen. Das sind die geänderten Komponenten:

- Text Field
- Text Area
- Dropdown
- Dropdown Select
- Radio Button
- Radio Button Group
- Checkbox
- Checkbox Group

<br>

**Sketch Library**

Die oben genannten Änderungen wurden auch in unserer Sketch-Library angepasst. Zusätzlich haben wir die Symbole der folgenden Komponenten optimiert:

- Buttons
- Text-Field
- Text-Area
- Rating Stars
- Switch
- Dropdown
- Text List
- Table

Bitte beachte: Einige „Small“-Varianten werden nicht mehr unterstützt und sind in der Library nicht mehr verfügbar. Solltest du in deinem Layout solche Varianten verwenden, kannst du sie über „Layer“ ➔ „Replace with“ durch die neue Standardgröße ersetzen. Hier eine Übersicht der entfernten Komponenten:

| Komponente      | Alte Variantengröße | Neuer Variantenname | Ersetzen durch |
| --------------- | ------------------- | ------------------- | -------------- |
| Textfield       | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Dropdown        | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Dropdown Select | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Date Picker     | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Pagination      | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Table           | Small               | Standard            | –              |
|                 | Large               | ❌                  | Standard       |

**Farbtokens**

Die neuen UI-Farben „White“ und „Black“ sind für Anwendungsfälle geeignet, bei denen die Farbe im Dark und Light Mode identisch ist.

## Neue Dropdown Select Beta-Komponente

02.08.2022

Das Dropdown-Menü ist nun ein integrierter Bestandteil der Komponente und wird nicht mehr wie in der [bestehenden Version](./?path=/docs/components-dropdown--standard) vom Browser generiert. Dadurch ist die Komponente weniger fehleranfällig. Insbesondere Fehler, die beim Switch zwischen Light- und Dark Mode entstehen konnten, werden nun vermieden.

Wir planen, die bestehende [Dropdown-Komponente](./?path=/docs/components-dropdown--standard) zugunsten der neu veröffentlichten Beta-Version von [Dropdown Select](./?path=/docs/beta-components-dropdown-select--standard) zu verwerfen, sobald die neue Komponente die Beta-Phase verlassen hat.

## Vereinfachung der UI-Farbtokens

11.07.22

Wir habe die Struktur der UI-Farben vereinfacht und Dopplungen entfernt. Eine <a href="https://github.com/telekom/design-tokens/pull/192#issuecomment-1178815001" target="_blank" rel="noopener noreferrer">detaillierte Übersicht der Änderungen findest du hier</a>.

## Überarbeitung der Farbpalette

23.06.22

Farbergänzungen:

- Neue Farbkategorie („on-subtle”) für Texte auf farbigen Hintergründen der Abstufung „Subtle”
- Neue Farbskala „Yellow“
- Neue Farbskala „Cyan“
- Neue Farbskala „Green“
- Neue Farbskala „Red“
- Neue Farbskala „Orange“
- Neue Farbskala „Blue“

Farbwertänderungen:

- Anpassung der „Textfarben Funktion“
- Anpassung der „Hintergrundfarben Funktion“
- Anpassung der Skala „Brown“
- Anpassung der Skala „Violet“
- Anpassung der Skala „Teal“
- Anpassung der Skala „Olive“
- Anpassung des Grauwerts für „Disabled“ im Dark Mode

Entfernte Farben:

- Die Kategorie „Interaction“ wurde aufgrund von Dopplungen entfernt. Wer diese Farben nutzen möchte, kann auf die Farbskala „Blue“ zurückgreifen

Betroffene Inhalte:

- Alle Error-States, Benachrichtigungen sowie Warn- und Erfolgsmeldungen der jeweiligen Komponenten
- Die Komponenten „Notification Banner”, „Notification Message” und „Notification Toast”
- Farbtokens (Farbergänzungen, Farbwertänderungen)

## Dark and Light Mode

19.04.22

- Die Scale Komponenten sind nun auch im Dark Mode verfügbar
- Die Farbpalette wurde optimiert
- Das Design Token Konzept wurde optimiert und um semantische Tokens erweitert
- Die Textstile wurden optimiert

Betroffene Inhalte:

Alle Komponenten

> Bitte beachte: Die folgenden Komponenten enthalten Marken- und Design-Assets der Telekom – beispielsweise Logos, die Farbe Magenta, die Schrift, Icons sowie Footer und Header. Die Komponenten sind **nicht Open Source** und dürfen **nicht frei verwendet werden**. Für eine kommerzielle Nutzung ist die ausdrückliche Zustimmung der Deutschen Telekom erforderlich.

<p><a href="sketch://add-library?url=https%3A%2F%2Fwww.brand-design.telekom.com%2Fsketch-light.rss" rel="nofollow" class="matomo_download">Telekom Scale Components (Light)</a><br /><a href="sketch://add-library?url=https%3A%2F%2Fwww.brand-design.telekom.com%2Fsketch-dark.rss" rel="nofollow" class="matomo_download">Telekom Scale Components (Dark)</a></p>

[Hinweise zum Release](./?path=/docs/new-release-release-notes--page)<br>
[Sketch Library Update](./?path=/docs/new-release-sketch-library-update--page)<br>
[Design Tokens](./?path=/docs/guidelines-design-tokens--page)<br>
[Typografie](./?path=/docs/guidelines-typography--page)<br>
[Farben](./?path=/docs/guidelines-colors--page)<br>
[Schatten](./?path=/docs/guidelines-shadows--page)<br>

## Rundungen

11.11.2021

- Die Rundungen der Elemente wurden angepasst. Dadurch verbessern wir den visuellen Zusammenhalt der Elemente  
   <br>
  Betroffene Inhalte: <br>
  [Brand Header](./?path=/docs/components-brand-header-navigation--standard)  
  [Card](./?path=/docs/components-card--standard)  
  [Data Grid](./?path=/docs/components-data-grid--standard)  
  [Date Picker](./?path=/docs/components-date-picker--standard)  
  [Dropdown](./?path=/docs/components-dropdown--standard)  
  [Flyout Menu](./?path=/docs/components-flyout-menu--standard)  
  [Footer](./?path=/docs/components-footer--standard)  
  [Modal](./?path=/docs/components-modal--standard)  
  [Pagination](./?path=/docs/components-pagination--standard)  
  [Table](./?path=/docs/components-table--standard)  
  [Tag](./?path=/docs/components-tag--standard)  
  [Text Area](./?path=/docs/components-text-area--standard)  
  [Text Field](./?path=/docs/components-text-field--standard)

## Link Farbe und Unterstreichung

13.9.2021

- Die Standardfarbe für Links ist jetzt „blue-60“. Dadurch stellen wir bessere Kontrastverhältnisse sicher und verbessern die Barrierefreiheit
- Die Option „Link ohne Unterstreichung“ wurde hinzugefügt.  
   <br>
  Betroffene Inhalte: <br>
  [Link](./?path=/docs/components-link--standard)
