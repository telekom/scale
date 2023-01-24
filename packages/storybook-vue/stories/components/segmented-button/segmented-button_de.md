<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Segmented Button</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

Segmented Buttons erleichtern Nutzer\*innen das Filtern von Inhalten, die Auswahl von Optionen oder dem Wechsel von Ansichten.

## Allgemein

Ein Segmented Button besteht aus zwei bis fünf Auswahlmöglichkeiten derselben Kategorie. Mit dem Segmented Button kannst du sowohl einzelne Optionen auswählen als auch mehrere gleichzeitig.

![Image Name](assets/3_components/segmented-button/SegmentedButton-Text_Only_1.png)

### Verwende einen Segmented Button, um

- ausgewählte Filter anzuzeigen,
- Funktionen wie Inhalte sortieren oder Ansicht ändern anzubieten oder
- Eingabebeoptionen zur Verfügung zu stellen.

### Verwende Segmented Buttons besser nicht, wenn

- es mehr als fünf Auswahlmöglichkeiten gibt,
- die Optionen in keinem logischen Zusammenhang stehen,
- Aktionen ausgelöst werden sollen (zum Beispiel Editieren, Hinzufügen oder Löschen) oder
- die Ansicht zwischen unterschiedlichen Inhalten gewechselt werden soll (hierfür sind Tabs besser geeignet).

## Basistypen

### Einfachauswahl:

![Image Name](assets/3_components/segmented-button/SegmentedButton-Single_Select.png)

Wie bei der Radio Button Group können Nutzer\*innen nur eine Option auswählen. Es ist immer eine Option vorausgewählt. Gib bei Bedarf eine neutrale Option an – zum Beispiel „Alle“, um gesetzte Filter aufzuheben.

### Mehrfachauswahl:

![Image Name](assets/3_components/segmented-button/SegmentedButton-Multiselect.png)

Wie bei Check Box Groups kannst du auch mehrere Optionen auswählen. Die Mehrfachauswahl wird in der Regel zum Filtern von Inhalten benutzt.

## Varianten

### Nur Text

![Image Name](assets/3_components/segmented-button/SegmentedButton-Text_Only_1.png)

Für die meisten Use Cases reicht ein Text, der die Option beschreibt. Ein Checkmark Icon verdeutlicht den ausgewählten Zustand.

### Icon und Text

![Image Name](assets/3_components/segmented-button/SegmentedButton-Text_Icon.png)

Füge passende Icons hinzu, um die Optionen zu verdeutlichen (optional). Im ausgewählten Zustand ersetzt ein Checkmark Icon das vorher dargestellte Icon.

### Nur Icon

![Image Name](assets/3_components/segmented-button/Icon_Only.png)

Verweist das Icon eindeutig auf die Aktion, kannst du den Text weglassen. Setze in diesem Fall ein Aria-Label für den Screenreader. Icons werden per Default in der Outline-Variante verwendet. Flächige Icons bedeuten, dass das Segment ausgewählt ist.

## Größen

![Image Name](assets/3_components/segmented-button/SegmentedButton-Sizes.png)

Der Segmented Button ist in drei Größen verfügbar:

- Small
- Medium
- Large

Das Segment mit dem längsten Label gibt die Breite aller Segmente vor. Bei Bedarf kannst du den Segmented Button auf eine flächenfüllende Breite umschalten.

## Deaktivierter Zustand

![Image Name](assets/3_components/segmented-button/SegmentedButton-Disabled.png)

Du kannst sowohl die gesamte Komponente als auch nur einzelne Segmente des Segmented Buttons deaktivieren, wenn eine Interaktion temporär nicht möglich ist.

## Elemente

![Image Name](assets/3_components/segmented-button/SegmentedButton-Elements-2.png)

### Gruppenlabel (1) (optional)

Wähle einen kurzen unterstützenden Titel für die gesamte Gruppe (zum Beispiel „Sortieren nach“ oder „Distanz“).

### Container (2)

Der Container fasst alle Optionen bzw. die Segmente des Segmented Buttons visuell zu einer Gruppe zusammen.

### Segment (3)

Jede Auswahlmöglichkeit wird als ein Segment dargestellt. Bei der Mehrfachauswahl sind nebeneinanderliegende, ausgewählte Segmente zu einer Gruppe zusammengefasst.

### Icon (4) (optional)

Das Icon unterstützt entweder das Label, um den Inhalt zu veranschaulichen, oder ersetzt den Text als eigenständige Variante.

### Label (5)

Das Label beschreibt einzelne Auswahlmöglichkeiten und sollte kurz und präzise sein.

## Best Practice

- Mische keine Varianten: Nur Text, Text und Icon, Nur Icon.
- Verwende kurze und eindeutige Labels.
- Biete eine neutrale Option, um zum Beispiel Filter und Sortierungen zu deaktivieren.
- Nutze die Full-Width-Option auf Mobilgeräten und stelle sicher, dass die Gesamtbereite nicht die kleinste Displaygröße (320px) überschreitet.

### Beispiele

![Image Name](assets/3_components/segmented-button/SegmentedButton-Filter-list-DE.png)

![Image Name](assets/3_components/segmented-button/SegmentedButton-SortBy-Price-DE.png)

![Image Name](assets/3_components/segmented-button/Map-DE.png)

![Image Name](assets/3_components/segmented-button/SegmentedButton-Tip-DE.png)

## Verwandte Komponenten

[Tab Navigation](?path=/usage/components-tab-navigation--text-icon),
[Button](?path=/usage/components-button--standard),
[Radio Button Group](?path=/usage/components-radio-button-group--standard),
[Checkbox Group](?path=/usage/components-checkbox-group--standard),
[Chip](?path=/usage/beta-components-chip--standard),
[Icon Button](?path=/usage/components-button--icon-only)
