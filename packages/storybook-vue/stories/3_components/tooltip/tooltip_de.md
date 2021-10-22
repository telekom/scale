<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tooltip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>
Ein Tooltip vermittelt eine zusätzliche Information oder Definition zu einem Element und dient Nutzer*innen als Hilfestellung.

## Allgemeines

Tooltips können an jedem aktiven Element bspw. an einem Icon, Textlink oder Button verwendet werden und erscheinen beim Hovern. Sie sind nicht fokussierbar und enthalten keinen fokussierbaren Inhalt.

### Verwende ein Tooltip, wenn

- Nutzer\*innen zusätzliche Informationen zu einem Element erhalten sollen (z. B. zur
  Funktion).
- auf Besonderheiten einer Interaktion hingewiesen werden soll (z. B. „Hier klicken, um
  in die Zwischenablage zu kopieren“).
- mit kontextuelle und spezifische Informationen Nutzer\*innen eine Hilfesstellung gegeben werden soll.

### Verwende Tooltips besser nicht, um

- redundante oder offensichtliche Informationen zu vermitteln.
- essenzielle Informationen zu vermitteln (die Bedienung des User Interfaces muss auch ohne Tooltip funktionieren).

## Best Practice

Setze Tooltips grundsätzlich sehr restriktiv ein und versuche immer, dein Interface so selbsterklärend wie möglich zu gestalten.

### Positioniere Tooltips passend.

Tooltips lassen sich an allen vier Kanten eines zu beschreibenden Objektes anfügen und
werden angezeigt, wenn die Maus über das Objekt bewegt wird.
![Tooltip all](assets/3_components/tooltip/Tooltip_all.jpeg)
Achte bei der Implementierung unbedingt auf Konsistenz, sodass nicht zu viele verschiedene Positionierungen und Inhaltsarten verwendet werden.

### Nutze Tooltips für Icons und Buttons ohne Label.

Ungelabelte Icons und Buttons profitieren von der zusätzlichen Information im Tooltip. Zum
Beispiel wenn das Icon eine Funktion hat oder auf dem Button – bspw. aus Platzgründen –
nur ein Icon angezeigt werden kann. Berücksichtige einem solchen Fall immer auch die
Barrierefreiheit.

### Stelle einen ausreichenden Kontrast zum Hintergrund sicher.

Ein Tooltip muss sich deutlich vom Hintergrund absetzen, um die Aufmerksamkeit des*der
Nutzer*in auf sich zu ziehen. Schwarz auf Grau reicht nicht aus.

### Stelle sicher, dass das Tooltip keine Inhalte verdeckt, die es beschreibt.

Ein Tooltip zu einem Formular bspw. darf weder das Formularfeld selbst noch Textelemente,
die sich darauf beziehen, verdecken.

## Beta-Komponente

Diese Komponente befindet sich noch im Beta-Stadium. Wenn du sie testest, bedenke, dass sie möglicherweise noch nicht alle Qualitätskontrollmaßnahmen durchlaufen hat und noch keine WCAG-Zertifizierung zur Barrierefreiheit vorliegt. In Zukunft kann es zu Änderungen an dieser Komponente kommen.
