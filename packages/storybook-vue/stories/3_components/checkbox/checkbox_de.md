<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Checkbox</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Mit Checkboxen aktivieren Nutzer\*innen Optionen. So können sie einfache Ja-Nein-Fragen beantworten oder beliebig viele Optinen aus einer Liste auswählen.

## Allgemein

Eine Checkbox ist ein Steuerelement mit dem Nutzer\*innen zwischen zwei Optionen wählen können. Die Checkbox besteht aus einem Kontrollkästchen und einem entsprechenden Label. Das Aktivieren einer Checkbox hat keine Auswirkung auf andere Auswahlmöglichkeiten. Eine Option gilt als ausgewählt, wenn die Checkbox mit einem Häkchen versehen ist. Im Initialzustand kann eine Checkbox ein- oder ausgeschaltet sein.

![Image Name](assets/3_components/checkbox/checkbox.png)

### Verwende eine Checkbox, wenn

- Nutzer\*innen eine einzelne Option ein- oder ausschalten sollen. Dies könnte zum Beispiel eine Bestätigung in einem Formular oder die Zustimmung zu den allgemeinen Geschäftsbedingungen vor dem Kauf eines Produkts sein.

### Verwende mehrere Checkboxen, wenn

- Nutzer\*innen eine oder mehrere Optionen aus einer Liste auswählen sollen. Beispiele hierfür sind Filter in einem Online-Shop oder eine Reihe von Einstellungen.

### Verwende besser keine Checkboxen, wenn

- zwei Optionen sich gegenseitig ausschließen. Nutze dafür einen Radio-Button.

## Elemente

![Image Name](assets/3_components/checkbox/checkbox-elements.png)

### Checkbox ausgeschaltet (1)

Wenn kein Häkchen vorhanden ist, gilt eine Checkbox als abgewählt.

### Checkbox angeschaltet (2)

Ist eine Checkbox mit einem Häkchen versehen, so gilt sie als ausgewählt.

### Information (3) (optional)

Wenn nötig, kannst du auch noch eine zusätzliche Information angeben.

### Fehlermeldung (4)

Bei nicht angeschalteter, aber verpflichtender Auswahl einer Option, die z.B. notwendig ist um die nächsten Schritte im Prozess ausführen zu können, erscheint eine Fehlermeldung.

## Label der Checkbox

Das Label beschreibt klar, was geschieht, wenn die Checkbox ein- oder ausgeschaltet ist. Es vermittelt somit zwei gegensätzliche Zustände. Das Label ist immer positiv formuliert, um eine doppelte Verneinung zu vermeiden.

![Image Name](assets/3_components/checkbox/checkbox_label.png)

## Deaktivierter Zustand

Deaktiviere die Checkbox, wenn

- eine andere Aktion erfolgen muss, bevor die Checkbox nutzbar ist oder
- die Option aufgeführt werden muss, aber aktuell nicht auswählbar ist.

![Image Name](assets/3_components/checkbox/checkbox_disabled.png)

## Verschachtelte Checkboxen

> Diese Funktion ist bald verfügbar.

Wenn Checkboxen zu einer übergeordneten Auswahloption gehören, dann kannst du diese verschachtelt darstellen. Durch Aktivieren der übergeordneten Checkbox werden alle anderen dieser Gruppe automatisch ausgewählt und umgekehrt. Wählen Nutzer\*innen nur eine der untergeordneten Checkboxen, ist der Status des übergeordneten Kontrollkästchens unbestimmt.

![Image Name](assets/3_components/checkbox/checkbox_nesting.png)

## Verpflichtende Eingaben

Verwende ein Sternchen (\*) hinter dem Text, wenn eine Checkbox angekreuzt werden muss.

![Image Name](assets/3_components/checkbox/checkbox_required_input.png)

## Verwandte Komponenten

<a href="?path=/usage/components-dropdown--standard">Dropdown, </a>
<a href="?path=/usage/components-switch--standard">Switch, </a>
<a href="?path=/usage/components-radio-button--standard">Radio-Button</a>
