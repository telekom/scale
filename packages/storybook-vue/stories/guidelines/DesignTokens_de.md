# Telekom Design Tokens

## Was sind Design Tokens?

Design Tokens sind die Variablen unseres Designs. Sie speichern die Werte für Farben, Typografie, Abstände oder Radien zentral ab – im Gegensatz zu fest codierten Werten. Dadurch erleichtern sie eine konsistente Produktentwicklung. Die Übergabe von Designs in die Entwicklung ist weniger fehleranfällig, da die Entwickler\*innen den richtigen Token aus einem vordefinierten Paket auswählen können. Zudem ist es möglich, Tokens global zu aktualisieren – das passiert dann ganz automatisch in allen Projekten.

## Wie setzt Scale Design Tokens in der Praxis um?

Die Design Tokens liegen in Form einer JSON-Datei auf GitHub. Ein Programm namens Style Dictionary wandelt sie in Formate um, die in Sketch, Figma, CSS oder Javascript verwendet werden können. Unsere Sketch- und Figma-Bibliotheken beinhalten das jeweilige Ausgabeformat. Auch die Scale Code-Komponenten arbeiten mit dem Design Token Package. Als Entwickler*in kannst du die Design Tokens direkt von GitHub oder NPM in dein Projekt laden. Das stellt sicher, dass jeder bei der Deutschen Telekom mit den gleichen Designgrundlagen arbeitet und wir eine konsistente, qualitativ hochwertige Nutzungserfahrung für unsere Kund*innen schaffen.

## So arbeiten Designer\*innen mit Design Tokens

Wir haben die Design Tokens in Farb-, Text- und Schattenstile für Sketch und Figma konvertiert. Du kannst wie bisher arbeiten und diese Stile anwenden. Durch die Verwendung semantischer Token-Namen wie Text & Icon oder Link erkennst du leichter, welcher Stil für welches Element gedacht ist. Mit Hilfe der Tokens kannst du die Designs auch leicht vom Light in den Dark Mode ändern, um sicherzustellen, dass auch der Dark Mode gut funktioniert. Wenn wir die Tokens aktualisieren, brauchst du nur das Update zulassen, und alles wird automatisch aktualisiert.

## So arbeiten Entwickler\*innen mit Design Tokens

Als Entwickler*in bindest du die Tokens in Form von CSS-Variablen oder Javascript-Objekten ein. So kannst du die Stile, die du von den Designer*innen erhältst, leicht umsetzen. Für den Dark Mode ist keine zusätzliche Implementierung erforderlich. Wann immer ein Token aktualisiert werden muss, spielst du einfach die neuesten Updates von GitHub oder NPM ein und dein Code wird automatisch aktualisiert. Du findest die Core- und Semantik-Tokens im @telekom/design-tokens Repo (Ordner: src). Als Benutzer\*in von Scale oder dem Design-Token-Repository musst du dich nur um die semantischen Tokens kümmern.

[Farben](.?path=/docs/guidelines-colors--page)

[Schatten](./?path=/docs/guidelines-shadows--page)

## Light und Dark Mode

Design Tokens bilden die Grundlage für einen intuitiven Light und Dark Mode. In dieser Guideline erfährst du mehr darüber, welche Vorteile der Dark Mode bietet und wie du diesen implementieren kannst.

[Light and Dark Mode](./?path=/docs/guidelines-light-and-dark-mode--page)

## Die Vorteile im Überblick

- Du gestaltest automatisch brand-konform und konsistent.
- Deine Interfaces sind barrierefrei und du sparst Zeit im Approval-Prozess.
- Bei künftigen Änderungen kannst du dein Produkt automatisch aktualisieren.
- Du hast die Möglichkeit, den Dark Mode anzubieten, ohne dass es dich zusätzlich Zeit kostet.
- Die große Anpassungsfähigkeit ermöglicht, dass Scale mit den Anforderungen von Telekom Projekten wachsen kann.
- Das Theming von Produkten ist leicht umsetzbar (bspw. für Third-Party-Produkte).
