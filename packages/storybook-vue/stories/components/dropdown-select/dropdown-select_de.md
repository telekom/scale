<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Dropdown Select</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Mit einem Dropdown wählen Nutzer\*innen eine Option aus einer Liste aus.

## Allgemein

Die Auswahlliste des Dropdowns wird temporär angezeigt. Das macht ein Dropdown zu einer platzsparenden Lösung, wenn viele Optionen zur Auswahl stehen.

![Image Name](assets/3_components/dropdown-select/Dropdown_select.png)

### Verwende ein Dropdown, wenn

- innerhalb eines Formulars Optionen zur Auswahl stehen,
- Nutzer\*innen nur eine der Optionen auswählen sollen oder
- Nutzer\*innen Inhalte filtern oder sortieren müssen.

### Verwende Dropdowns besser nicht, wenn

- du nur sehr wenige Optionen anbieten möchtest (Radio-Buttons sind hier eventuell die bessere Wahl),
- du sehr viele Auswahlmöglichkeiten anbieten möchtest (ein Eingabefeld mit automatischer Vervollständigung ist hilfreicher),
- Nutzer\*innen mehrere Auswahlmöglichkeiten haben sollen (Checkboxen sind in dem Fall sinnvoller) oder
- Nutzer\*innen navigieren sollen (hier ist eine Navigationskomponente wie bspw. die Sidebar-Navigation geeigneter).

## Elemente

![Image Name](assets/3_components/dropdown-select/Dropdown_select_elements.png)

### Label (1)

Das Label beschreibt eindeutig, welche Art von Optionen das Dropdown enthält.

### Icon (2)

Der Pfeil zeigt durch seine Ausrichtung an, ob das Dropdown-Menü geöffnet oder geschlossen ist.

### Information (3) (Optional)

Eine zusätzliche Information kann helfen, den Inhalt oder Zweck eines Dropdowns zu verdeutlichen.

### Fehlermeldung (4)

Wenn die Auswahl einer Option für Nutzer\*innen verpflichtend ist, führt das Absenden eines Formulars ohne getätigte Auswahl zu einer Fehlermeldung. Besitzt das Dropdown bereits einen Informationstext, wird dieser kurzzeitig überschrieben.

### Label und Wert (5)

Wenn ein Wert aus der Dropdown-Liste ausgewählt wird, nimmt er den Platz des Labels ein und das Label verkleinert sich.

### Dropdown menu (6)

Das Dropdown Menü beinhaltet die verfügbaren Optionen oder Optionsgruppen.

## Verwandte Komponenten

[Checkbox, ](?path=/usage/components-checkbox--standard)
[Switch, ](?path=/usage/components-switch--standard)
[Radio Button](?path=/usage/components-radio-button--standard)
[Date Picker](?path=/usage/components-date-picker--standard)
