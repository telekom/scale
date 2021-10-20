<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tooltip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>
Ein Tooltip zeigt Nutzer*innen zusätzliche Informationen zu einem Objekt an

## Allgemeines

Tooltips lassen sich an allen vier Kanten eines zu beschreibenden Objektes anfügen und
werden angezeigt, wenn die Maus über das Objekt bewegt wird.
![Tooltip all](assets/3_components/tooltip/Tooltip_all.jpeg)
Achte bei der Implementierung unbedingt auf Konsistenz.

### Verwende ein Tooltip, wenn

- Nutzer\*innen zusätzliche Informationen zu einem Element erhalten sollen (z. B. zur
  Funktion).
- auf Besonderheiten einer Interaktion hingewiesen werden soll (z. B. „Hier klicken, um
  in die Zwischenablage zu kopieren“).

### Verwende Tooltips besser nicht, wenn

- es lediglich Informationen enthält, die im UI bereits zu finden sind.
- es essenzielle Informationen enthält, ohne die der*die Nutzer*in nicht weiß, was zu
  tun ist. Diese Informationen gehören in das UI.

## Best Practice

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
