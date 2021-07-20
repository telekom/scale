<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Tooltip</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>
Ein Tooltip kann dafür genutzt werden Nutzer*innen genauere Infos über ein beliebiges Objekt anzuzeigen. Diese sollten die Funktion des Elements genauer beschreiben.

## Allgemein

Tooltips können an allen vier Kanten eines zubeschreibenden Objektes angefügt werden. Wenn Nutzer\*innen die Maus über das Objekt bewegt wird der Tooltip angezeigt.
![Tooltip all](assets/3_components/tooltip/Tooltip_all.jpeg)
Es sollte sichergestellt werden, dass Tooltips auf eine konsistente Art und Weise verwendet werden.

### Verwende einen Tooltip, wenn

- Nutzer\*innen genauere Informationen über das beschriebene Element erhalten sollen.
- Auf Besonderheiten einer Interaktion hingewiesen werden soll (zum Beispiel "Hier klicken um in die Zwischenablage zukopieren").

Im besonderen bietet sich so die Nutzung in Verbindung mit Buttons, welche nur ein Icon enthalten, an.
Jedoch sollte hier dringend auf Barrierfreiheit geachtet werden.

### Verwende Tooltips besser nicht, wenn

- Sich dadurch Informationen doppeln würden.
- Nutzer\*innen ohne diesen Tooltip ihre Aufgabe auf der Oberfläche nicht verstehen würden. Tooltips sollten nur verwendet werden um weitere Informationen über ein spezifisches Element zubieten.

## Best Practice

### Nutze Tooltips für nicht gelabelte Icons und Buttons.

Ungelabelte Icons welche eine Funktion haben oder Buttons welche keine ausreichende (oder nur aus einem Icon bestehende) Beschreibung besitzen, können durch Tooltips mehr Informationen bekommen.

### Stelle sicher das Tooltips einen ausreichenden Kontrast zum Hintergund haben.

Ein Tooltip sollte sich vom Hintergrund absetzen um die Aufmerksamkeit des Users zuerhalten. Ein beispielsweise schwarz auf grauer Kontrast würde dies nicht erreichen.

### Stelle sicher das Tooltips keine Inhalte verdecken welche sie beschreiben.

Ein Tooltip in einem Formular sollte zum Beispiel nicht das beschreibende Formularfeld verdecken und auch nicht weitere Textelemente welche sich auf das Formularfeld beziehen.
