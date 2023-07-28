<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Checkbox Group</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Eine Checkbox Group fasst Checkboxen mit verwandten Auswahloptionen zu einer Gruppe zusammen.

## Allgemein

Checkbox-Gruppen lassen sich mit einem Klick auf die übergeordnete Checkbox aktivieren oder deaktivieren. Durch die inhaltliche Gruppierung von Checkboxen und die Beschreibung der Gruppe erfassen Nutzer\*innen inhaltliche Zusammenhänge schneller. Interfaces mit vielen Auswahloptionen wirken insgesamt ruhiger und aufgeräumter.

![Checkbox Group](assets/3_components/checkbox-group/checkbox-group.png)

### Verwende eine Checkbox Group, wenn

- Nutzer\*innen eine oder mehrere Optionen aus einer Liste auswählen sollen (bspw. Filter in einem Online-Shop oder eine Reihe von Einstellungen) und
- Nutzer\*innen die Möglichkeit haben sollen, alle Optionen gleichzeitig zu aktivieren beziehungsweise zu deaktivieren.

### Verwende Checkbox Groups besser nicht, wenn

- die Auswahloptionen nur entfernt zusammenhängen.

## Elemente

![Elements of Checkbox Group](assets/3_components/checkbox-group/Elements.png)

#### Übergeordnete Checkbox (unbestimmter Zustand) (1)

Per Klick/Tap auf die übergeordnete Checkbox lässt sich die gesamte Gruppe aktivieren oder deaktivieren. Der Zustand dieser Checkbox zeigt an, ob alle oder nur einige Optionen aktiviert beziehungsweise deaktiviert sind.

#### Gruppenlabel (2)

Wähle einen kurzen und aussagekräftigen Titel für die gesamte Gruppe.

#### Information (3) (optional)

Wenn nötig, kannst du auch noch eine zusätzliche Information angeben.

#### Untergeordnete Checkbox (4)

Die untergeordneten Checkboxen lassen sich einzeln aktivieren oder deaktivieren.

#### Label (5)

Beschreibe mit dem Label deutlich, welche Auswirkung die jeweilige Auswahl hat. Ein Label enthält in der Regel maximal drei Wörter.

#### Fehlermeldung (6)

Bei einer nicht eingeschalteten, aber verpflichtenden Auswahl einer einzelnen Option, die zum Beispiel notwendig ist, um die nächsten Schritte im Prozess ausführen zu können, erscheint eine Fehlermeldung unterhalb dieser Checkbox.

#### Übergeordnete Fehlermeldung (7)

Betrifft eine Fehlermeldung die gesamte Gruppe, wird sie unterhalb des Gruppenlabels platziert.

## Deaktivierter Zustand

Eine Checkbox-Gruppe oder eine einzelne Checkbox ist deaktiviert, wenn

- eine andere Aktion erfolgen muss, bevor die Checkbox nutzbar ist oder
- die Option aufgeführt werden muss, aber aktuell nicht auswählbar ist.

Dabei ergibt sich der deaktivierte Zustand der gesamten Gruppe automatisch, wenn alle einzelnen Checkboxen deaktiviert sind.

![Eine deaktivierte Checkbox-Gruppe](assets/3_components/checkbox-group/checkbox-group-disabled-de.png)

![Eine deaktivierte Checkbox](assets/3_components/checkbox-group/checkbox-group-disabled-single-de.png)

> Der deaktivierte Zustand (Disabled State) ist vom Kontrastminimum der WCAG für Textfarben ausgenommen. Weitere Informationen hierzu findest du in den [Richtlinien der WCAG](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Verwandte Komponenten

[Checkbox, ](?path=/usage/components-checkbox)
[Radio Button, ](?path=/usage/components-radio-button)
[Radio Button Group](?path=/usage/components-radio-button-group)
