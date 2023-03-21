<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Text-Field</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Ein Text-Field ermöglicht die Eingabe einer einzelnen Textzeile.

## Allgemein

Ein Text-Field ist ein Eingabefeld für eine einzelne Textzeile. Das Feld kann in seiner Breite variieren, je nachdem, welche Art von Eingabe erforderlich ist.

### Verwende ein Text-Field für Abfragen, wie

- E-Mail-Adresse,
- Passwort,
- Telefonnummer und
- Sonstiges als Freitext.

### Verwende besser keine Text-Fields, wenn

- Nutzer\*innen etwas suchen sollen (hier eignet sich ein Suchfeld) oder
- sie mehr als eine Zeile eingeben müssen (hier eignet sich die Text-Area).

## Elemente

![Image Name](assets/3_components/text-input/input-field-elements.png)

#### Label (1)

Das Label gibt eindeutig an, welche Informationen die Nutzer\*innen eingeben sollen (z. B. „Nachname“).

#### Platzhaltertext (2) (optional)

Per Klick/Tap auf das Text-Field erscheint ein Platzhaltertext mit einer kurzen Erklärung, welche Information benötigt wird.

#### Information (3) (optional)

Wenn nötig, kannst du auch noch eine zusätzliche Information angeben (z. B. „Diese Angaben bleiben anonym.“).

#### Zeichenanzahl (4) (optional)

Wenn die Anzahl der Zeichen begrenzt ist, zeige die maximale und die aktuell verbrauchte Zeichenanzahl im oder am Text-Field an.

#### Fehlermeldung (5)

Bei nicht ausgefüllten, aber verpflichtenden Feldern erscheint eine Fehlermeldung (z. B. „Bitte füllen Sie dieses Feld aus."). Wenn das Text-Field einen Informationstext besitzt, erscheint der Fehlertext vorübergehend an dessen Stelle.

## Deaktivierter Zustand

Ist das Text-Field deaktiviert, können Nutzer\*innen keinen Text eingeben, beziehungsweise ihn nicht mehr ändern. Verwende diesen Zustand, wenn eine bestimmte Interaktion aufgrund von Berechtigungen oder Einschränkungen nicht verfügbar ist.

![Image Name](assets/3_components/text-input/input_disabled.png)

> Der deaktivierte Zustand (Disabled State) ist vom Kontrastminimum der WCAG für Textfarben ausgenommen. Weitere Informationen hierzu findest du in den [Richtlinien der WCAG](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Read-Only

Read-Only-Text-Fields zeigen einen vorausgefüllten Text an, den Nutzer\*innen nicht bearbeiten können. Verwende diesen Zustand, wenn eine bestimmte Information nicht mehr editierbar, jedoch lesbar für Nutzer\*innen sein soll. Der Inhalt von schreibgeschützten Textfeldern ist für Screen Reader zugänglich.

![Image Name](assets/3_components/text-input/input_readonly.png)

## Best Practices

- Kennzeichne Text-Fields entsprechend der benötigten Eingabe (z. B. für Texte, Zahlen, E-Mail-Adressen oder Passwörter).

- Gruppiere Text-Fields, die sich auf dasselbe Thema beziehen.

- Ordne Text-Fields in einem einspaltigen Layout an, um den Bearbeitungsfluss der Nutzer\*innen nicht zu stören. Ausnahmen sind logisch zusammenhängende Felder, wie Postleitzahl und Ort.

- Markiere Pflichtangaben und reduziere optionale Angaben so weit wie möglich.

- Erkläre alle Eingabebedingungen, zum Beispiel bei Passwörtern oder Kreditkartennummern.

## Verwandte Komponenten

[Text Area](?path=/usage/components-text-area--standard)
