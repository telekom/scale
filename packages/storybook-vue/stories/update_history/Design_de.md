# Design Updates

Diese Seite dokumentiert Updates der visuellen Erscheinung von Scale

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
