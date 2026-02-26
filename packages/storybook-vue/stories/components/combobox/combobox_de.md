<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Combobox</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Die Combobox-Komponente kombiniert die Funktionalität eines Texteingabefeldes mit einer Dropdown-Liste und ermöglicht es Benutzern, entweder einen Wert aus vordefinierten Optionen auszuwählen oder einen benutzerdefinierten Wert einzugeben.

## Allgemein

Eine Combobox ist ein flexibles Eingabesteuerelement, das Benutzern hilft, Werte effizient zu finden und auszuwählen. Sie zeigt eine Liste von Optionen an, die durch Eingabe gefiltert werden können, wodurch die Anzahl der angezeigten Optionen reduziert wird und Benutzer ihre gewünschte Auswahl schnell finden können.

### Wann zu verwenden

Verwenden Sie eine Combobox wenn:

- Sie einen vordefinierten Satz von Optionen haben (5-20+ Elemente)
- Benutzer aus einer Liste auswählen müssen, möglicherweise aber auch benutzerdefinierte Werte eingeben möchten
- Der Bildschirmplatz begrenzt ist und Sie nicht alle Optionen auf einmal anzeigen möchten
- Benutzer davon profitieren, Optionen durch Eingabe zu filtern, um ihre Auswahl schnell zu finden

### Wann nicht zu verwenden

Verwenden Sie keine Combobox wenn:

- Sie nur 2-3 Optionen haben (verwenden Sie stattdessen Optionsschaltflächen oder ein einfaches Select-Element)
- Benutzerdefinierte Werte nicht zulässig sind und die Liste sehr klein ist
- Benutzer alle Optionen auf einmal sehen müssen, ohne zu scrollen (ziehen Sie eine Schaltflächengruppe oder Kontrollkästchen-Gruppe in Betracht)

## Varianten

### Standard

Die grundlegende Combobox mit Etikett und Platzhaltertext. Benutzer können aus der Dropdown-Liste auswählen oder benutzerdefinierte Werte eingeben.

### Mit Hilfetext

Fügen Sie Hilfetext unterhalb der Eingabe hinzu, um zusätzliche Anleitungen oder Kontext zum einzugebenden Wert zu geben.

### Ungültiger Status

Zeigen Sie einen Fehlerstatus an, wenn die Validierung fehlschlägt, mit angemessenem Styling und Hilfetext, um den Benutzer zu leiten.

### Erforderlicher Status

Fügen Sie ein erforderliches Attribut zum Eingabefeld hinzu, um anzugeben, dass das Feld vor der Formularübermittlung ausgefüllt werden muss.

### Deaktivierte Option

Eine deaktivierte Combobox ist nicht interaktiv. Verwenden Sie dies, wenn eine Option aufgrund von Berechtigungen oder Abhängigkeiten nicht verfügbar ist.

### Keine benutzerdefinierten Werte

Beschränken Sie die Combobox auf die Auswahl aus vordefinierten Optionen und verhindern Sie die Eingabe benutzerdefinierter Werte.

## Funktionen

- **Auswahl aus vordefinierten Optionen**: Benutzer können anklicken oder mit der Tastatur durch verfügbare Optionen navigieren
- **Unterstützung für benutzerdefinierte Werte**: Standardmäßig können Benutzer benutzerdefinierte Werte eingeben, die nicht in der vordefinierten Liste enthalten sind (konfigurierbar)
- **Tastaturnavigation**: Vollständige Tastaturunterstützung mit Pfeiltasten, Eingabe und Escape
- **Schwebende Dropdown**: Die Optionen-Dropdown wird automatisch so positioniert, dass sie innerhalb des Viewports bleibt (mit Floating UI)
- **Hilfetext**: Optionaler Text zur Anleitung von Benutzern
- **Validierungsstatus**: Unterstützung für ungültige/Fehlerzustände mit visueller Rückmeldung
- **Deaktivierter Status**: Vollständige Unterstützung für deaktivierte Eingaben
- **Filterung**: Optionen werden in Echtzeit gefiltert, während der Benutzer eingibt
- **Zugänglich**: ARIA-Attribute und semantisches HTML für Unterstützung von Bildschirmlesegeräten

## Tastaturinteraktionen

- **Pfeil Oben/Unten**: Durch Optionen navigieren, wenn die Dropdown offen ist; Dropdown öffnen, wenn geschlossen
- **Eingabe**: Die hervorgehobene Option auswählen
- **Escape**: Dropdown schließen, ohne auszuwählen
- **Tab**: Dropdown schließen und den Fokus zum nächsten Element verschieben
- **Rücktaste**: Zeichen aus der Eingabe löschen

## Elemente

### Label

Das Label teilt mit, für welchen Wert die Combobox bestimmt ist. Es sollte klar und prägnant sein.

### Eingabefeld

Das Texteingabefeld, in das Benutzer eingeben können, um Optionen zu filtern oder benutzerdefinierte Werte einzugeben. Es zeigt den aktuell ausgewählten Wert an.

### Hilfetext

Optionaler beschreibender Text unterhalb der Eingabe, der Kontext oder Validierungsmeldungen bereitstellt.

### Dropdown-Liste

Die Liste der verfügbaren Optionen, die unterhalb der Eingabe angezeigt wird, wenn diese fokussiert ist. Optionen werden basierend auf der Eingabe des Benutzers gefiltert.

### Optionelement

Individuell wählbares Element in der Dropdown-Liste. Wird hervorgehoben, wenn mit der Maus angefahren oder mit der Tastatur navigiert wird.

## Best Practices

### Klare Etiketten

Geben Sie aussagekräftige Etiketten an, die klar angeben, was der Benutzer auswählen oder eingeben sollte.

### Hilfreicher Platzhaltertext

Verwenden Sie Platzhaltertext, um Benutzer zum erwarteten Eingabeformat oder zu Beispielen gültiger Werte zu führen.

### Angemessene Optionslisten

Halten Sie Optionslisten überschaubar (5-20 Elemente). Wenn Sie viele Optionen haben, ziehen Sie das Filtern oder Kategorisieren in Betracht.

### Fehlermeldungen

Bei Validierungsfehlern geben Sie klare, umsetzbare Fehlermeldungen im Hilfetext an.

### Deaktivierte Combobox

Verwenden Sie den deaktivierten Status nur, wenn eine Option wirklich nicht verfügbar ist. Geben Sie Kontext darüber an, warum sie deaktiviert ist.

## Barrierefreiheit

Die Combobox-Komponente implementiert vollständige ARIA-Unterstützung:

- Ordnungsgemäße `role="combobox"` und `role="listbox"` Attribute
- `aria-expanded` gibt den Dropdown-Status an
- `aria-selected` zeigt hervorgehobene Optionen an
- `aria-controls` verlinkt die Eingabe mit der Listbox
- Ankündigungen von Bildschirmlesegeräten für Optionsnavigation und -auswahl

## Zugehörige Komponenten

[Textfeld](?path=/usage/components-text-field--standard)
[Dropdown-Auswahl](?path=/usage/components-dropdown-select--standard)
[Menü-Flyout](?path=/usage/components-menu-flyout--standard)
