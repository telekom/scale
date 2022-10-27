<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Radio Button</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Radio-Buttons ermöglichen es Nutzer\*innen, eine Option aus einer Reihe von Alternativen auszuwählen.

## Allgemein

Ein Radio-Button ist ein Steuerelement und besteht aus einem runden Button mit einem Label. Die Nutzer\*innen können per Klick/Tap eine Option auswählen (Kreis ist gefüllt) oder wieder abwählen (Kreis ist leer).

Radio-Buttons funktionieren nur als Gruppe. Durch Aktivieren eines Radio-Buttons wird die zuvor gewählte Option automatisch abgewählt.

![Image Name](assets/3_components/radio-button/radiobuttons-general.png)

### Verwende Radio-Buttons, um

- Nutzer\*innen eine Reihe von verwandten, aber sich gegenseitig ausschließenden Auswahlmöglichkeiten anzubieten.

### Verwende Radio-Buttons besser nicht, wenn

- Nutzer\*innen mehr als eine Option auswählen sollen (nutze hierfür Checkboxen) oder
- eine Aktion ausführen müssen (nutze hierfür einen Button).

## Elemente

![Image Name](assets/3_components/radio-button/radio-button-elements.png)

### Radio-Button ausgeschaltet (1)

Wenn der Kreis leer ist, gilt eine Option als abgewählt.

### Radio-Button eingeschaltet (2)

Ist der Kreis ausgefüllt, so gilt eine Option als ausgewählt.

### Information (3) (optional)

Wenn nötig, kannst du auch noch eine zusätzliche Information angeben.

### Fehlermeldung (4)

Bei widersprüchlicher oder nichtzutreffender Auswahl erscheint eine Fehlermeldung.

## Label

Beschreibe mit dem Label deutlich, welche Auswirkung die jeweilige Auswahl hat. Ein Label enthält in der Regel maximal drei Wörter.

![Image Name](assets/3_components/radio-button/radiobuttons-label.png)

## Deaktivierter Zustand

Deaktiviere den Radio-Button, wenn

- eine andere Aktion erfolgen muss, bevor der Radio-Button nutzbar ist oder
- die Option aufgeführt werden muss, aber aktuell nicht auswählbar ist.

![Image Name](assets/3_components/radio-button/disabled-radiobutton.png)

> Der deaktivierte Zustand (Disabled State) ist vom Kontrastminimum der WCAG für Textfarben ausgenommen. Weitere Informationen hierzu findest du in den [Richtlinien der WCAG](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Titel und Default-Auswahl

Treffe eine Vorauswahl durch die Default-Aktivierung einer Option. Entspricht diese den Erwartungen der Nutzer\*innen, reduzierst du somit den benötigen Interaktionsaufwand. Das ist zudem eine gute Möglichkeit, Nutzer\*innen Vorschläge zu machen.

Es gibt ein paar wenige Fälle, in denen du besser keine Vorauswahl triffst, zum Beispiel bei der Auswahl des Titels in einem Formular (Herr, Frau etc.).

In vielen Fällen ist es für Nutzer\*innen hilfreich, wenn du eine Headline verwendest.

![Image Name](assets/3_components/radio-button/radiobuttons-bestpractice.png)

## Verwandte Komponenten

[Checkbox, ](?path=/usage/components-checkbox--standard)
[Switch, ](?path=/usage/components-switch--standard)
[Dropdown ](?path=/usage/components-dropdown--standard)
