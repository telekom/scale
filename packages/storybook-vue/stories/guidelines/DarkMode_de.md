# Telekom Light und Dark Mode

## Allgemein

Light und Dark Mode richten sich an unterschiedliche Nutzungsgruppen und -szenarien. Dabei geht es nicht nur um Ästhetik, sondern oft auch darum, eine Überanstrengung der Augen zu vermeiden. Sei es aufgrund des Umgebungslichts oder bspw. bei Sehbehinderungen, wie dem Grauen Star.

## Light Mode

Die meisten Nutzer\*innen mit normaler Sehkraft bevorzugen den hellen Modus, insbesondere in einer gut beleuchteten Umgebung. Daher empfehlen wir den hellen Modus als Standard, sofern keine besonderen Gründe dagegensprechen. Es gibt aber auch Ausnahmen, wie bspw. MagentaTV – diese Plattform ist ausschließlich im Dark Mode umgesetzt.

## Dark Mode

Der dunkle Modus ist besonders für Nutzer*innen mit bestimmten Sehschwächen von Vorteil, da er die Unterscheidung von Elementen und Texten erleichtert. Einige Nutzer*innen profitieren auch von dem geringeren Kontrast im dunklen Modus. Die meisten Nutzer\*innen, auch mit normaler Sehkraft, ziehen den dunklen Modus bei Nacht und in schwach beleuchteter Umgebung vor. Dies hilft, Überanstrengung und Müdigkeit der Augen zu vermeiden.

## Lass die Nutzer\*innen entscheiden

Da es viele persönliche Gründe für die Auswahl des Modus gibt, lasse deine Nutzer*innen im Idealfall selbst entscheiden, in welchem Modus sie dein Produkt nutzen möchten. Damit die Nutzer*innen sich für einen Modus entscheiden können, biete einen Button, Switch oder Toggle Button an, um den Modus zu wechseln. Können die Benutzungspräferenzen vom Betriebssystem abgeleitet werden, bspw. über Prefers Color Scheme im Web, sollte der bevorzugte Modus automatisch ausgewählt und als Default angeboten werden.

## Für Designer\*innen

Scale erlaubt es, entweder im hellen oder dunklen Modus zu gestalten. Ein Wechsel ist jederzeit per Knopfdruck möglich, sodass du die Wirkung im jeweils anderen Modus beurteilen kannst. Aber auch ohne zusätzliche Designs kann das Entwicklungsteam den anderen Modus aktivieren.

### Sketch

- Gehe auf die Seite „<a href="./?path=/docs/setup-info-getting-started-for-designers--page">Erste Schritte für Designer\*innen</a>“ und importiere die Libraries für den hellen und dunklen Modus.
- Gestalte mit der Library deiner Wahl dein Interface.
- Um den Modus zu wechseln, gehe in die „Voreinstellungen“ > „Bibliotheken“ und wähle die andere Library aus. Dort wirst du gefragt, ob die zu Anfang genutzte Library ersetzt werden soll. Bitte bestätige das und schließe dann das Einstellungsfenster.
- Klicke in Sketch auf das Benachrichtigungssymbol (Glocke) in der rechten oberen Ecke und wähle „Komponenten-Updates verfügbar“.
- Wähle „Komponenten aktualisieren“.
- Nun wird dein Design im jeweils anderen Modus angezeigt.

### Figma

Hinweis für Entwickler\*innen
Das aktuelle Release enthält keine Breaking Changes. Es gibt allerdings einen sehr unwahrscheinlichen Edge Case, in dem die Aktualisierung ein wenig Arbeit erfordern könnte. Mehr Details findet du auf GitHub: [Scale dark mode release migration guide](https://gist.github.com/acstll/904b65679f5bd1568f1ed8c4e66744f9).
