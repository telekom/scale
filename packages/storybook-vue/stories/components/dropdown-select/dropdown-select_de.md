<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Dropdown Select</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

Mit einem Dropdown-Select wählen Nutzer\*innen eine Option aus einer Liste aus.

## Allgemein

Die Auswahlliste des Dropdown-Selects wird temporär angezeigt. Das macht ein Dropdown-Select zu einer platzsparenden Lösung, wenn viele Optionen zur Auswahl stehen.

### Verwende ein Dropdown-Select, wenn

- innerhalb eines Formulars Optionen zur Auswahl stehen,
- Nutzer\*innen nur eine der Optionen auswählen sollen oder
- Nutzer\*innen Inhalte filtern oder sortieren müssen.

### Verwende Dropdown-Selects besser nicht, wenn

- du nur sehr wenige Optionen anbieten möchtest (Radio-Buttons sind hier eventuell die bessere Wahl),
- du sehr viele Auswahlmöglichkeiten anbieten möchtest (ein Eingabefeld mit automatischer Vervollständigung ist hilfreicher),
- Nutzer\*innen mehrere Auswahlmöglichkeiten haben sollen (Checkboxen sind in dem Fall sinnvoller) oder
- Nutzer\*innen navigieren sollen (hier ist eine Navigationskomponente wie bspw. die Sidebar-Navigation geeigneter).

## Varianten

### Standard

Das Standard-Dropdown-Select listet alle verfügbaren Optionen auf.

![Image Name](assets/3_components/select-box/Dropdown-Select.png)

### Optionsgruppe

Wenn du viele kategorisierbare Optionen anbietest, kannst du Optionsgruppen erstellen.

![Image Name](assets/3_components/select-box/Dropdown-Select-optionsgruppe.png)

## Elemente

![Image Name](assets/3_components/select-box/Elemente.png)

### Label (1)

Das Label beschreibt eindeutig, welche Art von Optionen das Dropdown-Select enthält.

### Icon (2)

Der Pfeil zeigt durch seine Ausrichtung an, ob das Dropdown-Select-Menü geöffnet oder geschlossen ist.

### Information (3) (optional)

Eine zusätzliche Information kann helfen, den Inhalt oder Zweck eines Dropdown-Selects zu verdeutlichen.

### Fehlermeldung (4)

Wenn die Auswahl einer Option für Nutzer\*innen verpflichtend ist, führt das Absenden eines Formulars ohne getätigte Auswahl zu einer Fehlermeldung. Besitzt das Dropdown-Select bereits einen Informationstext, wird dieser kurzzeitig überschrieben.

### Titel (5)

Der Titel fordert zur Auswahl einer Option auf.

### Dropdown-Select Menü (6)

Das Dropdown-Select Menü beinhaltet die verfügbaren Optionen oder Optionsgruppen.

## Größen

Bei einem Dropdown-Select kannst du zwischen zwei Größen wählen – Large und Small. Achte jedoch darauf, die beiden Größen nicht zu kombinieren. Auch andere UI-Elemente wie Eingabefelder und Buttons sollten dieselbe Größe haben.

### Large

Verwende das große Dropdown-Select als Standard.

![Image Name](assets/3_components/select-box/dropdown-gross.png)

### Small

Wenn nur wenig Platz zur Verfügung steht, setze das kleine Dropdown-Select ein.

![Image Name](assets/3_components/select-box/dropdown-klein.png)

## Bekannte Einschränkungen

Das Dropdown-Select ist fertig zum Gebrauch. Die Komponente im disabled State wird im Firefox 85.0.2 (64-Bit) im HCM (Hochkontrastmodus) fehlerhaft mit weißem Hintergrund dargestellt.
Der Darstellungsfehler liegt auf Seiten des Browsers.

## Verwandte Komponenten

[Checkbox, ](?path=/usage/components-checkbox--standard)
[Switch, ](?path=/usage/components-switch--standard)
[Radio Button](?path=/usage/components-radio-button--standard)
