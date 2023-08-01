<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Button</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Der Button ist das wichtigste Interaktionselement eines User Interfaces. Per Klick/Tap lösen Nutzer\*innen die dazugehörige Aktion aus.

## Allgemein

Es gibt zwei Basistypen und drei Varianten, um eine klare visuelle Hierarchie herzustellen. Mit der Verwendung eines passenden Icons kannst du die Funktion eines Buttons zusätzlich verdeutlichen. Wähle Button-Typ und -Variante passend für den jeweiligen Kontext aus.

![Image Name](assets/3_components/button/button.png)

### Verwende einen Button, wenn

- Nutzer\*innen eine Aktion ausführen sollen oder
- damit eine wichtige Seite öffnen können (z. B. eine Landingpage).

Bitte beachte: Der sichtbare Bereich sollte maximal einen Primär-Button enthalten, um die wichtigste Aktion hervorzuheben und die Orientierung zu erleichtern. Nutze für untergeordnete Aktionen einen Sekundär-Button.

### Verwende besser keine Buttons, wenn

- Nutzer\*innen auf eine neue Seite geführt werden sollen, ohne diese besonders hervorzuheben (hier eignet sich ein Text-Link).

## Basistypen

Der Primär- und der Sekundär-Button sind unsere Basistypen.

### Primär-Button

Der Primär-Button ist ein zentrales Markenelement und dient der Wiedererkennung. Verwende ihn nur für die wichtigsten Aktionen – so verstärkst du die visuelle Hierarchie von Inhalt und Funktionen.

![Image Name](assets/3_components/button/Button_Primary.png)

### Sekundär-Button

Der Sekundär-Button ist weniger auffällig. Nutze ihn für alle weiteren Aktionen auf einer Seite. Durch die Gestaltung mit Outline und transparenter Grundfläche eignet er sich auch gut für die Verwendung auf farbigem Hintergrund.

![Image Name](assets/3_components/button/Button_Secondary.png)

### Sekundär-Button Weiß

![Image Name](assets/3_components/button/button-secondary-white.png)

<!-- ### Ghost Button

![Image Name](assets/3_components/button/button-ghost.png) -->

## Varianten

### Button mit Text

Für die meisten Anwendungsfälle ist der Text-Button sehr gut geeignet.

![Image Name](assets/3_components/button/Button_Textonly.png)

### Button mit Text und Icon

Füge ein passendes Icon hinzu, um eine Aktion zu verdeutlichen und hervorzuheben.

![Image Name](assets/3_components/button/Button_Icon-Text.png)

### Button mit Icon

In manchen Fällen kannst du auch ein Icon ohne Text verwenden. Das ist zum Beispiel möglich, wenn der Platz begrenzt ist und das Icon die Aktion unmissverständlich kommuniziert. Bitte beachte, dass Icon-Only-Buttons ein Label benötigen, um Screen Reader zu unterstützen.

![Image Name](assets/3_components/button/Button_Icon-only.png)

## Größen

Nutze den großen Button, um eine gute visuelle Balance zwischen Inhalt und Button zu erreichen. Wenn nur wenig Platz zur Verfügung steht, kannst du die kleinere Variante verwenden.

![Image Name](assets/3_components/button/button-sizes.png)

## Deaktivierter Zustand

Im deaktivierten Zustand ist die interaktive Funktion des Buttons ausgeschaltet. Verwende diesen Zustand, wenn eine Interaktion aufgrund von Berechtigungen oder Abhängigkeiten nicht erfolgen kann.

![Image Name](assets/3_components/button/button-disabled.png)

> Der deaktivierte Zustand (Disabled State) ist vom Kontrastminimum der WCAG für Textfarben ausgenommen. Weitere Informationen hierzu findest du in den [Richtlinien der WCAG](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Elemente

#### Label

Das Label eines Buttons enthält eine klare Handlungsaufforderung. Es beschreibt einfach und präzise die Aktion, die Nutzer\*innen mit diesem Button ausführen können. Im besten Fall besteht das Label aus maximal drei Wörtern. Für einen klaren Kontext verwende ein Verb mit Substantiv. Der Zusatz „Jetzt” wirkt auffordernd und kann die Motivation der Nutzer\*innen steigern, zum Beispiel bei einer Anmeldung oder Registrierung. Weitere Informationen findest du in dem Artikel <a href="https://www.brand-design.telekom.com/en/articles/button-texts-and-text-links/" target="_blank">Button Texts and Text Links</a> in Brand & Design.

![Image Name](assets/3_components/button/Button_Label.png)

#### Icons

Lese die Richtlinie <a href="https://www.brand-design.telekom.com/en/articles/i/icons-for-user-interfaces/" target="_blank">Icons for User Interfaces</a> in Brand & Design um mehr über die Verwendung und Gestaltung von Icons zu erfahren.

![Image Name](assets/3_components/button/Button_Icons.png)

## Best Practice

### Buttons gruppieren

Stehen Buttons in direkter Beziehung zueinander, dann ordne sie als Gruppe an. Wichtig ist, dass du pro Gruppe nur einen Primär-Button verwendest.

In Prozessen und modalen Dialogen sind Buttons rechtsbündig angeordnet, um den Fortschritt anzuzeigen. Platziere den Primär-Button rechts und den Sekundär-Button links. Bei Formularen sind Buttons linksbündig am Inhalt ausgerichtet. Hier setzt du den Primär-Button links und den Sekundär-Button rechts.

![Image Name](assets/3_components/button/button-best-practice.png)

### Anordnung von Icon und Label

Icons erleichtern das Erfassen von Informationen, wenn sie an der richtigen Stelle positioniert sind. Der Leserichtung folgend setzen wir Icons demnach links neben dem Label ein. Es gibt eine Ausnahme: Der Weiter-Button mit einem Pfeil. In diesem Fall positionierst du das Icon rechts, um das intuitive Erfassen der Information zu erleichtern.

![Image Name](assets/3_components/button/button-best-practice2.png)

## Verwandte Komponenten

[Link, ](?path=/usage/components-link--standard)
[Icon](?path=/usage/components-icon--standard)
