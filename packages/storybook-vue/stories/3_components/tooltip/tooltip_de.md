<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tooltip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>
Ein Tooltip vermittelt eine zusätzliche Information oder Definition zu einem Element und dient Nutzer*innen als Hilfestellung.

## Allgemeines

Tooltips können an jedem aktiven Element bspw. an einem Icon, Textlink oder Button verwendet werden und erscheinen bei Hover. Sie sind nicht fokussierbar und enthalten keinen fokussierbaren Inhalt.

### Verwende einen Tooltip, um

- eine Funktion zu erklären (bspw. bei Icons ohne Label) oder um
- ein Element oder einen Begriff zu definieren (bspw. das Label eines
  Buttons, ein Textlink oder ein Begriff im Fließtext).

Setze Tooltips grundsätzlich sehr restriktiv ein und versuche immer, dein
Interface so selbsterklärend wie möglich zu gestalten.

## Elemente

![Tooltip elements](assets/3_components/tooltip/Tooltip_elements.png)

### Verwende Tooltips besser nicht, um

- redundante oder offensichtliche Informationen zu vermitteln.
- essenzielle Informationen zu vermitteln (die Bedienung des User Interfaces muss auch ohne Tooltip funktionieren).

## Positionierung

Tooltips lassen sich an allen vier Seiten eines zu beschreibenden Elements anfügen.
![Tooltip all](assets/3_components/tooltip/Tooltip_all.jpeg)

## Best Practice

### Nutze Tooltips für Icons ohne Label und Icon Only Buttons.

Wird eine Funktion nur durch ein Icon repräsentiert, setze immer einen
Tooltip ein.
Berücksichtige einem solchen Fall immer auch die Barrierefreiheit.

### Stelle einen ausreichenden Kontrast zum Hintergrund sicher.

Ein Tooltip muss sich deutlich vom Hintergrund absetzen, um die Aufmerksamkeit des*der
Nutzer*in auf sich zu ziehen. Schwarz auf Grau reicht nicht aus.

### Stelle sicher, dass das Tooltip keine Inhalte verdeckt, die es beschreibt.

Ein Tooltip zu einem Formular bspw. darf weder das Formularfeld selbst noch Textelemente,
die sich darauf beziehen, verdecken.

## Beta-Komponente

Diese Komponente befindet sich noch im Beta-Stadium. Wenn du sie testest, bedenke, dass sie möglicherweise noch nicht alle Qualitätskontrollmaßnahmen durchlaufen hat und noch keine WCAG-Zertifizierung zur Barrierefreiheit vorliegt. In Zukunft kann es zu Änderungen an dieser Komponente kommen.
