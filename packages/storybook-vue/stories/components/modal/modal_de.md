<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Modal</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Modale Dialoge erfordern sofortige Aufmerksamkeit und unterbrechen die Nutzer\*innen in ihrem Workflow. Sie erscheinen immer dann, wenn Nutzer\*innen für die Erledigung einer Aufgabe eine Information benötigen oder sie eine Entscheidung treffen müssen.

## Allgemein

Der modale Dialog wird als Overlay angezeigt. Der Hauptinhalt der Seite ist nicht mehr bedienbar, bis der\*die Nutzer\*in darauf reagiert.

### Verwende einen modalen Dialog, wenn

- du Warnungen oder dringende Informationen ausgeben musst (zum Beispiel Systemfehler oder Konsequenzen einer Aktion),
- das System Informationen der Nutzer\*innen benötigt, um einen Prozess auszuführen,
- die Eingabe bestimmter Informationen die Fortsetzung eines Prozesses für die Nutzer\*innen erleichtert oder
- Nutzer\*innen eine Entscheidung bestätigen müssen, um mögliche Fehler zu verhindern oder zu korrigieren.

### Verwende modale Dialoge besser nicht, wenn

- die gezeigten Informationen in keinem Zusammenhang mit dem aktuellen User Flow stehen (dies könnte Nutzer\*innen daran hindern, eine Aufgabe fertigzustellen) oder
- es um komplexe Entscheidungen geht, die mehr Informationen benötigen, als ein modaler Dialog bereitstellen kann (dies könnte Nutzer\*innen dazu zwingen, zwischen dem modalen Dialog und der Hauptseite zu wechseln, was die User Experience negativ beeinflussen würde).

## Elemente

![Image Name](assets/3_components/modal/Modal_Basic.png)

#### Titel (1)

Der Titel ist obligatorisch. Er sollte kurz und prägnant sein.

#### Inhalt (2)

Es sind verschiedene Längen von Inhalten möglich. Wenn der Inhalt den Inhaltsbereich überschreitet, kann der restliche Teil durch Scrollen angezeigt werden.

#### Aktionsbereich (3)

Im Aktionsbereich der Nutzer\*innen können eine primäre und bis zu zwei sekundäre Schaltflächen stehen. Die primäre Schaltfläche sollte eine positive Aktion darstellen, wie zum Beispiel „Bestätigen“ oder „Speichern“. Sekundär-Schaltflächen können negative oder weniger wichtige Aktionen anzeigen, wie „Löschen" oder „Abbrechen".

#### Schließen-Symbol (4)

Das Schließen-Symbol ist bei jedem modalen Dialog vorhanden.

## Scrollen

Das Modal wird scrollbar, sobald der Inhalt mehr Platz benötigt als das Modal zur Verfügung stellt.
Ein Overlay grenzt den Aktionsbereich vom scrollbaren Bereich ab. Unter dem Titel erscheint eine Trennlinie.

![Image Name](assets/3_components/modal/Modal_Scrolling.png)

## Größen

### Desktop

Für Desktop-Anwendungen stehen modale Dialoge in den Größen S, L oder XL zur Verfügung. Sie umfassen jeweils 6, 8 oder 12 Spalten. Wähle die Größe, die am besten zur Menge des Inhalts und den jeweiligen Anwendungsfall passt.

![Image Name](assets/3_components/modal/modal-large.png)
![Image Name](assets/3_components/modal/modal-medium.png)
![Image Name](assets/3_components/modal/modal-small.png)

### Mobil

Auf kleinen Geräten werden alle modalen Dialoge über die volle Breite (4 Spalten) dargestellt.

![Image Name](assets/3_components/modal/mobile_4columns.png)

## Best Practices

- Beschreibe die Handlungsmöglichkeiten und die resultierenden Folgen klar und deutlich.
- Sowohl der Titel als auch die Schaltflächen beschreiben, welche Aktion danach erfolgt.
- Benutze niemals eine primäre Schaltfläche für destruktive oder irreversible Aktionen.
