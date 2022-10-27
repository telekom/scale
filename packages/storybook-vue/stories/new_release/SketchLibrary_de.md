# Aktualisierung der Sketch Library

## Update 27.10.2022

Einige Varianten unserer Komponenten wurden entfernt (siehe Update History). In bestehenden Layouts werden die Symbole weiterhin als Teil der Library angezeigt, auch wenn sie nicht mehr verfügbar sind. Bitte halte deine Layouts aktuell, indem du die verwendeten Elemente über „Replace with“ erneut verknüpfst. So geht's:

### 1. Prüfe dein Dokument nach entfernten Symbolen

Die folgenden Komponenten werden nicht mehr unterstützt. Prüfe am besten, ob du eine davon verwendest.

| Komponente      | Alte Variantengröße | Neuer Variantenname | Ersetzen durch |
| --------------- | ------------------- | ------------------- | -------------- |
| Textfield       | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Dropdown        | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Dropdown Select | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Date Picker     | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Pagination      | Small               | ❌                  | Standard       |
|                 | Large               | Standard            | –              |
| Table           | Small               | Standard            | –              |
|                 | Large               | ❌                  | Standard       |

### 2. Ersetze die alten Symbole

In Sketch lassen sich verwendete Komponenten einfach durch Symbole austauschen. Markiere dafür das zu überschreibende Element und klicke im Menü unter „Layer“ ➔ „Replace with“. Wähle dann „Telekom Scale Components“ und suche nach dem entsprechenden Symbol.

<img src="assets/replace-component-de.png"  />

## Release 19.04.2022 mit Dark Mode

Scale enthält nun alle Komponenten auch in einer [Dark Mode](./?path=/docs/guidelines-light-and-dark-mode--page)-Variante. Darüber hinaus wurde der Light Mode optimiert. Beide Varianten sind als zwei separate Libraries verfügbar. Du kannst jederzeit den verwendeten Modus wechseln, indem du die eine Library mit der anderen ersetzt.

## Wichtig für existierende Projekte

Um die Neuerungen vollumfänglich nutzen zu können, sollten deine Komponenten und Farben mit der Library verknüpft sein. Insbesondere selbst definierte Farben bleiben vom Update unberührt. Um unerwünschte Auswirkungen durch die Aktualisierung zu vermeiden, stellen wir bei diesem Release eine neue Library zur Verfügung und bitten dich darum, dein Projekt vorab kurz zu prüfen.

## Bereite dein Projekt optimal auf das Update vor

### 1. Prüfe dein Layout auf abgetrennte Komponenten

Das ist wichtig, da diese sonst nicht über das Update aktualisiert werden können. In Sketch kannst du Instanzen, Gruppen oder Ebenen mit Symbolen aus Libraries ersetzen. Wähle hierzu das zu überschreibende Objekt aus und klicke dann im Menü auf „Layer” und „Replace with”.

<img src="assets/replace-component-de.png"  />

### 2. Stelle sicher, dass deine Elemente mit Farben aus der Library verknüpft sind

Klicke auf eine Ebene und wähle danach „Fill“ und/oder „Border“ im Inspector-Panel aus, um zu erkennen, ob eine Farbe individuell gewählt ist oder ob sie aus der vorgegebenen Farbauswahl der Library stammt. Für die volle Funktionsfähigkeit der Library müssen die korrekten Farb-Tokens angewendet werden. Erfahre mehr in unserer Guideline zu den Design Tokens.

<img src="assets/choose-color-token-de.png"  />

## So setzt du die Library auf die vorherige Version zurück

Lade die vorherige Version erneut herunter und klicke in Sketch auf die Mitteilung in der oberen rechten Ecke. Es öffnet sich ein Flyout mit der Option „Components Update Available“. Durch Klick auf diese Option wird dein Layout auf die vorherige Version zurückgesetzt.

<p><a href="sketch://add-library?url=https%3A%2F%2Fwww.brand-design.telekom.com%2Fsketch.rss" rel="nofollow" class="matomo_download">Telekom Scale Components</a></p>
