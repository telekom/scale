<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Chip</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Chips sind kontextabhängige Komponenten mit denen Nutzer\*innen Inhalte filtern oder Aktionen auslösen können.

## Allgemein

Chips bestehen aus relevanten Schlüsselwörtern in einem Container. Sie erscheinen häufig dynamisch – ausgelöst durch eine Aktion der Nutzer\*innen – und als Gruppe.

### Verwende einen Chip, um

- Nutzer\*innen Filtermöglichkeiten anzubieten,
- die von Nutzer\*innen gesetzten Filter darzustellen oder
- Nutzer\*innen Optionen vorzuschlagen (Suchkriterien, Antwortmöglichkeiten).

### Verwende Chips besser nicht, wenn

- du ein Element kategorisieren möchtest (hier sind Tags besser geeignet) oder
- wenn du stattdessen einen Button verwenden kannst.

## Basistypen

![Image Name](assets/3_components/chip/chip-types.png)

### Persistente Chips

Persistente Chips sind fester Bestandteil des UIs und lassen sich aus- und abwählen.

![Image Name](assets/3_components/chip/chip-persistent-default.png)

**Beispiel 1 – Default** <br/>
Eine Gruppe von Filtermöglichkeiten als fester Bestandteil des UI

![Image Name](assets/3_components/chip/chip-persistent-selected.png)

**Beispiel 2 - Filter ausgewählt** <br/>
Ausgewählte Filter erkennen Nutzer\*innen am Checkmark Icon.

### Dynamische Chips

Dynamische Chips blenden sich nach einer Aktion der Nutzer\*innen ein oder aus.

![Image Name](assets/3_components/chip/chip-dynamic.png)

**Beispiel 1** <br/>
Der Chip blendet sich ein, nachdem Nutzer\*innen einen Filter gesetzt haben. Per Klick/Tap auf das Schließen-Icon blendet er sich wieder aus und der Filter ist zurückgesetzt.

![Image Name](assets/3_components/chip/chip-dynamic-chatbot.png)

**Beispiel 2** <br/>
Eine Gruppe von Antwortmöglichkeiten in einem Chat. Nach Klick/Tap auf den Chip blendet er sich wieder aus.

## Varianten

![Image Name](assets/3_components/chip/chip-standard.png)

Chips lassen sich in zwei Varianten darstellen: Standard und Outline.

### Deaktivierter Zustand

![Image Name](assets/3_components/chip/chip-disabled-de.png)

Im deaktivierten Zustand ist die interaktive Funktion des Chips ausgeschaltet. Verwende diesen Zustand, wenn eine Interaktion aufgrund von Berechtigungen oder Abhängigkeiten nicht möglich ist.

### Elemente

![Image Name](assets/3_components/chip/Elements.png)

#### Label (1)

Das Label des Chips sollte kurz und verständlich sein.

#### Checkmark Icon (2)

Je nach Typ wird das Schließen-Icon oder Checkmark Icon angezeigt.

#### Icon (3) (Optional)

Füge ein Icon hinzu, wenn Nutzer\*innen die Funktion des Chips dadurch leichter verstehen können.

## Best Practice

### Chips in Gruppierungen

- Ordne Chips horizontal oder vertikal an.
- Vertikale Layouts eigenen sich zum Beispiel für ein Seitenmenü, das Chips-Gruppierungen integrieren soll.
- Horizontal angeordnete Chips befinden sich häufig oberhalb vom Inhalt auf den sie sich beziehen.
- Formuliere das Label so präzise wie möglich.

## Verwandte Komponenten

[Tag](?path=/usage/components-tag--standard),
[Button](?path=/usage/components-button--standard),
[Segmented Button](?path=/usage/components-segmented-button--standard),
[Checkbox Group](?path=/usage/components-checkbox-group--standard)
