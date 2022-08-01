# Code Updates

Diese Seite dokumentiert Aktualisierungen in `@telekom/scale-components` und verwandten Paketen.

## Neue Dropdown Select Beta-Komponente

Die Dropdown-Komponente ist nun ein integrierter Bestandteil der Komponente und wird nicht mehr wie in der [bestehenden Version](./?path=/docs/components-dropdown--standard) vom Browser generiert. Dadurch ist die Komponente weniger fehleranfällig. Insbesondere Fehler, die beim Switch zwischen Light- und Dark Mode entstehen konnten, werden nun vermieden.

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
