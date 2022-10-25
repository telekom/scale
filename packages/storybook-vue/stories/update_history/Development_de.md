# Code Updates

Diese Seite dokumentiert Aktualisierungen in `@telekom/scale-components` und verwandten Paketen.

## Komponenten-Update (Optimierung von Mobile und Visual Design)

25.09.2022

**Visuelle und funktionale Änderungen**

- Slider: Visuelle Optimierung und funktionale Erweiterung
- Radio Buttons: Optimierung des Interactive States „Selected“
- Tags: Farbliche Optimierung und Erweiterung um vordefinierte Farben
- Switch: Visuelle Überarbeitung und neue Varianten
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

## Dark mode (`v3.0.0-beta.100`)

- Die Scale Komponenten sind nun auch im Dark Mode verfügbar
- Die Farbpalette wurde optimiert
- Das Design Token Konzept wurde optimiert und um semantische Tokens erweitert
- Die Text Stile wurden optimiert
- CSS-Variablen mit dem Präfix `--scl` werden nicht weiter genutzt. Der neue Präfix ist `--telekom`.

Mehr zu den Änderungen findest du <a href="https://github.com/telekom/scale/blob/main/docs/dark-mode-v3-beta-100.md" target="_blank" rel="noopener noreferrer">auf GitHub</a>.

### Betroffene Inhalte:

Alle Komponenten  
[Hinweise zum Release](./?path=/docs/new-release-release-notes--page)  
[Sketch Library Update](./?path=/docs/new-release-sketch-library-update--page)  
[Design Tokens](./?path=/docs/guidelines-design-tokens--page)  
[Typografie](./?path=/docs/guidelines-typography--page)  
[Farben](./?path=/docs/guidelines-colors--page)  
[Schatten](./?path=/docs/guidelines-shadows--page)

## v1 zu v2 Migration

Finde die Migrationsleitung <a href="https://github.com/telekom/scale/blob/main/docs/archive/v1-to-v2-migration-guide.md" target="_blank" rel="noopener noreferrer">auf GitHub</a>.
