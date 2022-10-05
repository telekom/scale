<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Radio Button Group</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>
Radio-Buttons ermöglichen es Nutzer*innen, eine Option aus einer Reihe von Alternativen auszuwählen. Die Radio Button Group enthält zusätzlich einen Gruppentitel.

## Allgemein

Radio-Buttons funktionieren nur als Gruppe. Durch Aktivieren eines Radio-Buttons wird die zuvor gewählte Option automatisch abgewählt. Durch einen Gruppentitel erfassen Nutzer\*innen inhaltliche Zusammenhänge schneller. Interfaces mit vielen Auswahloptionen wirken insgesamt ruhiger und aufgeräumter.

![Radio Button Group](assets/3_components/radio-button-group/radio-button-group-general.png)

### Verwende eine Radio Button Group, um

- Nutzer\*innen eine Reihe von verwandten, aber sich gegenseitig ausschließenden Auswahlmöglichkeiten anzubieten und um
- bei mehreren Gruppen von Radiobuttons die Übersichtlichkeit zu gewährleisten.

Verwende Radio-Buttons grundsätzlich nicht, wenn

### Verwende Radio-Buttons grundsätzlich nicht, wenn

- Nutzer\*innen mehr als eine Option auswählen sollen (nutze hierfür Checkboxen) oder
- Nutzer\*innen eine Aktion ausführen müssen (nutze hierfür einen Button).

## Elemente

![Elemente der Radio Button Group](assets/3_components/radio-button-group/radio-button-group-elements.png)

### Gruppenlabel (1)

Wähle einen kurzen und aussagekräftigen Titel für die gesamte Gruppe.

### Radio-Button ausgeschaltet (2)

Wenn der Kreis leer ist, gilt eine Option als abgewählt.

### Label (3)

Beschreibe mit dem Label deutlich, welche Auswirkung die jeweilige Auswahl hat. Ein Label enthält in der Regel maximal drei Wörter.

### Radio-Button eingeschaltet

Ist der Kreis ausgefüllt, so gilt eine Option als ausgewählt.

### Information (5) (optional)

Wenn nötig, kannst du auch noch eine zusätzliche Information angeben.

### Fehlermeldung (6)

Fehlermeldungen sind unterhalb des Gruppenlabels platziert.

## Deaktivierter Zustand

Deaktiviere einen Radio Button, wenn

- eine andere Aktion erfolgen muss, bevor der Radio-Button nutzbar ist oder
- die Option aufgeführt werden muss, aber aktuell nicht auswählbar ist.

![Deaktivierte Radio Button Group](assets/3_components/radio-button-group/radio-button-group-items-disabled.png)

> Der deaktivierte Zustand (Disabled State) ist vom Kontrastminimum der WCAG für Textfarben ausgenommen. Weitere Informationen hierzu findest du in den [Richtlinien der WCAG](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Verwandte Komponenten

[Radio Button, ](?path=/usage/components-radio-button)
[Checkbox, ](?path=/usage/components-checkbox),
[Checkbox Group](?path=/usage/components-checkbox-group)
