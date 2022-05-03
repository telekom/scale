# Light und Dark Mode

**Light und Dark Mode richten sich an unterschiedliche Nutzungsgruppen und -szenarien. Dabei geht es nicht nur um Ästhetik, sondern oft auch darum, eine Überanstrengung der Augen zu vermeiden. Sei es aufgrund des Umgebungslichts oder bspw. bei Sehbehinderungen, wie dem Grauen Star.**

Mithilfe unserer Komponenten lässt sich der Dark Mode nahezu ohne zusätzlichen Aufwand implementieren. Sowohl im Design als auch im Code.

![Dark mode example modal](assets/dark-mode-example-modal.png)

## Light Mode

Die meisten Nutzer\*innen mit normaler Sehkraft bevorzugen den hellen Modus, insbesondere in einer gut beleuchteten Umgebung. Daher empfehlen wir den hellen Modus als Standard, sofern keine besonderen Gründe dagegensprechen. Es gibt aber auch Ausnahmen, wie bspw. MagentaTV – diese Plattform ist ausschließlich im Dark Mode umgesetzt.

## Dark Mode

Der dunkle Modus ist besonders für Nutzer*innen mit bestimmten Sehschwächen von Vorteil, da er die Unterscheidung von Elementen und Texten erleichtert. Einige Nutzer*innen profitieren auch von dem geringeren Kontrast im dunklen Modus. Die meisten Nutzer\*innen, auch mit normaler Sehkraft, ziehen den dunklen Modus bei Nacht und in schwach beleuchteter Umgebung vor. Dies hilft, Überanstrengung und Müdigkeit der Augen zu vermeiden.

## Den Modus wechseln

Jede Farbe einer Komponente wird durch eine passende Farbe aus dem jeweils anderen Modus ersetzt. So ist der Wechsel des Modus für Designer*innen und Entwickler*innen nahezu ohne zusätzlichen Aufwand möglich.

![Dark mode example shapes](assets/dark-mode-example-shapes.png)

## Optimierte Farbpalette

Wir haben die Farbpalette angepasst, sodass sie für beide Modi ein konsistentes Erscheinungsbild bietet. Selbstverständlich sind alle Farben in unseren Komponenten auf Barrierefreiheit geprüft. Eine Übersicht der neuen Farbpalette mit Nutzungshinweisen findest du [hier](./?path=/docs/guidelines-colors--page).

![Dark mode example palette](assets/img_color.png)

## Lass die Nutzer\*innen entscheiden

Da es viele persönliche Gründe für die Auswahl des Modus gibt, lasse deine Nutzer\*innen im Idealfall selbst entscheiden, in welchem Modus sie dein Produkt nutzen möchten. Können die Benutzungspräferenzen vom Betriebssystem abgeleitet werden, bspw. über Prefers Color Scheme im Web, sollte der bevorzugte Modus automatisch ausgewählt und als Default angeboten werden. Für einen manuellen Wechsel kannst du auch einen Button, Switch oder Toggle Button anbieten – bspw. in den Nutzungseinstellungen deines Produkts.

## Hinweis Für Designer\*innen

Scale erlaubt es, entweder im hellen oder dunklen Modus zu gestalten. Ein Wechsel ist jederzeit per Knopfdruck möglich, sodass du die Wirkung im jeweils anderen Modus beurteilen kannst. Aber auch ohne zusätzliche Designs kann das Entwicklungsteam den anderen Modus aktivieren.

Wenn du bereits eine ältere Version unserer Sketch Library nutzt, lese dir bitte zunächst unsere Aktualisierungshinweise durch und lade im Anschluss das Update.

### Sketch

- Gehe auf die Seite „<a href="./?path=/docs/setup-info-getting-started-for-designers--page">Erste Schritte für Designer\*innen</a>“ und importiere die Libraries für den hellen und dunklen Modus.
- Gestalte mit der Library deiner Wahl dein Interface.
- Um den Modus zu wechseln, gehe in die „Preferences“ > „Libraries“ und wähle die andere Library aus. Dort wirst du gefragt, ob die zu Anfang genutzte Library ersetzt werden soll. Bitte bestätige das und schließe dann das Einstellungsfenster.
- Klicke in Sketch auf das Benachrichtigungssymbol (Glocke) in der rechten oberen Ecke und wähle „Component Updates Available".
- Wähle „Update Components“.
- Nun wird dein Design im jeweils anderen Modus angezeigt.

![Dark mode sketch modes](assets/dark-mode-sketch-modes-de.png)

## Hinweis für Entwickler\*innen

### Dark Mode implementieren

Der Dark Mode ist in Scale ab Version `3.0.0-beta.100` enthalten. Er nutzt CSS-Variablen, um einen Wechsel des Modus zu ermöglichen.

Standardmäßig wird der Modus so eingestellt, dass er den Einstellungen des Betriebssystems entspricht, und zwar über die Medienabfrage `prefers-color-scheme`.

Alternativ können die Modi auch über das `data-mode`-Attribut festgelegt werden. Der Wert muss entweder `light` oder `dark` sein. Es wird empfohlen, dies im Body Text zu tun, z. B. `<body data-mode="light">`, obwohl es auch möglich ist, nur einen bestimmten Teil der Seite umzuschalten.

Das Setzen des `data-mode`-Attributs setzt die Systemeinstellungen außer Kraft.

Damit deine Anwendung komplett zwischen den Modi wechselt und nicht nur die Scale Komponenten, verwende die folgenden Tokens für den Hintergrund und die Texte.

```css
body {
  background-color: var(--telekom-color-background-canvas);
  color: var(--telekom-color-text-and-icon-standard);
}
```

Mehr Informationen zu weiteren Farb-Tokens findest du in der Guideline [Colors](./?path=/docs/guidelines-colors--page).

### Deaktivieren der automatischen Umschaltung

Soll sich die Anwendung unabhängig von den Systemeinstellungen der Nutzer\*innen entweder im hellen oder im dunklen Modus befinden, setze das Attribut data-mode auf den gewünschten Modus:

```html
<body data-mode="light"></body>
```

### Modus manuell wechseln

Mit ein wenig JavaScript kann ein Switch in die Benutzungsoberfläche eingebaut werden, um das Attribut data-mode entsprechend zu setzen. Der folgende Ausschnitt soll zur Veranschaulichung dienen:

```js
const element = document.querySelector('.mode-switch');

element.addEventListener('click', function switchMode() {
  const isDark = document.body.dataset.mode === 'dark';
  document.body.dataset.mode = isDark ? 'light' : 'dark';
});
```

In JavaScript kannst du die Systemeinstellung mit der Methode <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia" target="_blank" rel="noopener noreferrer">window.matchMedia</a> prüfen und überwachen.

```js
const mq = window.matchMedia('(prefers-color-scheme: dark)');
const isDark = mq.matches;
```
