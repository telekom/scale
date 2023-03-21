<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Text-Area</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Eine Text-Area ermöglicht Nutzer\*innen die Eingabe einer oder mehrerer Textzeilen.

## Allgemein

Eine Text-Area ist ein Eingabefeld für mehrere Textzeilen. Sie kann in der Breite und Höhe variieren, je nachdem, welche Art von Eingabe erforderlich ist.

### Verwende eine Text-Area, wenn

Nutzer\*innen die Möglichkeit haben sollen, einen längeren Text einzugeben (z. B. für Kommentar- oder Nachrichtenfelder).

### Verwende besser keine Text-Areas, wenn

Nutzer\*innen nur sehr kurze Texte eingeben müssen (hier eignen sich Text-Fields).

## Elemente

![Image Name](assets/3_components/text-area/text_area_elements.png)

#### Label (1)

Das Label gibt eindeutig an, welche Informationen die Nutzer\*innen eingeben sollen (z. B. „Ihre Nachricht“).

#### Platzhaltertext (2) (optional)

Per Klick/Tap auf die Text-Area erscheint ein Platzhaltertext mit einer kurzen Erklärung, welche Informationen genau benötigt werden.

#### Informationstext (3) (optional)

Wenn nötig, kannst du auch noch eine zusätzliche Information angeben (z. B. „Diese Angaben bleiben anonym.“).

#### Zeichenanzahl (4) (optional)

Wenn die Anzahl der Zeichen begrenzt ist, zeige die maximale und die aktuell verbrauchte Zeichenanzahl in oder an der Text-Area an.

#### Fehlermeldung (5)

Bei nicht ausgefüllten, aber verpflichtenden Feldern erscheint eine Fehlermeldung (z. B. „Bitte füllen Sie dieses Feld aus."). Wenn die Text-Area einen Informationstext besitzt, erscheint der Fehlertext vorübergehend an dessen Stelle.

#### Variable Größe (6) (optional)

Mit diesem Element können Nutzer\*innen den gesamten Text sichtbar machen.

## Scrollen

Ist der Text länger als der sichtbare Bereich, kannst du ihn scrollbar machen. Das gilt auch für den Fall, wenn die Größe der Text-Area veränderbar ist.

![Image Name](assets/3_components/text-area/text_area_scrolling.png)

## Deaktivierter Zustand

Ist die Text-Area deaktiviert, können Nutzer\*innen keinen Text eingeben, beziehungsweise ihn nicht mehr ändern. Verwende diesen Zustand, wenn eine bestimmte Interaktion aufgrund von Berechtigungen oder Einschränkungen nicht verfügbar ist.

![Image Name](assets/3_components/text-area/text_area_disabled.png)

> Der deaktivierte Zustand (Disabled State) ist vom Kontrastminimum der WCAG für Textfarben ausgenommen. Weitere Informationen hierzu findest du in den [Richtlinien der WCAG](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Read-Only

Read-Only-Text-Areas zeigen einen vorausgefüllten Text an, den Nutzer\*innen nicht bearbeiten können. Verwende diesen Zustand, wenn eine bestimmte Information nicht mehr editierbar, jedoch lesbar für Nutzer\*innen sein soll. Der Inhalt von schreibgeschützten Textfeldern ist für Screen Reader zugänglich.

![Image Name](assets/3_components/text-area/text_area_disabled_readonly.png)

## Verwandte Komponenten

[Text Field](?path=/usage/components-text-field--standard)
