<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Slider</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Mit einem Slider können Nutzer\*innen einen Wert oder Wertebereich verändern.

## Allgemein

Der Slider zeigt einen voreingestellten Wert oder Wertebereich an, den Nutzer\*innen durch Verschieben des Reglers vergrößern oder verkleinern können. In der Regel wird eine sofortige Wirkung ausgelöst, zum Beispiel beim Einstellen der Lautstärke oder beim Filtern von Daten.

### Verwende einen Slider, wenn

- Nutzer\*innen einen Wert oder Wertebereich schnell anpassen möchten oder
- die Anpassung des Wertes oder Wertebereichs eine sofortige Wirkung auslöst und
- die Eingabe nicht präzise sein muss (z. B. Lautstärkeregler, der ohne sichtbaren Wert funktioniert).

### Verwende besser keine Slider, wenn

- Nutzer\*innen einen genauen Wert eingeben möchten (hier ist ein Eingabefeld besser),
- keine unmittelbare Wirkung eintritt,
- der Wertebereich sehr groß ist (z. B. 1-100) oder
- der Wertebereich sehr klein ist (z. B. 1-3).

## Basistypen

Jeder Slider benötigt ein Label, das den sich ändernden Wert beschreibt. Standardmäßig wird der aktuelle Wert angezeigt.

### Slider mit Wert

Nutzer\*innen können einen genauen Wert, z. B. 200 $, aus einem vorgegebenen Wertebereich einstellen.

Der eingestellte Wert ändert sich in Echtzeit, sobald sich der Regler bewegt.

Der Wert erhöht/verringert sich jeweils in 1er-Schritten.

![slider_types-value-DE.png](assets/3_components/slider/slider_types-value-DE.png)

### Slider mit Wertebereich

Nutzer\*innen können sowohl den Start- als auch den Endpunkt des gewünschten Bereichs festlegen.

Der Wertebereich verändert sich durch das Verschieben der Regler jeweils in 1er-Schritten.

![slider_types-range-DE.png](assets/3_components/slider/slider_types-range-DE.png)

### Slider mit Abschnitten

Der Regler ist so eingestellt, dass der Wert in bestimmten Schritten erhöht und verringert wird (bspw. um den Wert 10 anstatt 1).

![slider_types-stepped-DE.png](assets/3_components/slider/slider_types-stepped-DE.png)

![slider_types-stepped-range-DE.png](assets/3_components/slider/slider_types-stepped-range-DE.png)

## Varianten

### Ein-/ausgeblendete Elemente

Aktueller Wert ein-/ausgeblendet

![slider_variants-DE.png](assets/3_components/slider/slider_variants-DE.png)

Meldung ein-/ausgeblendet

![slider_variants-message-DE.png](assets/3_components/slider/slider_variants-message-DE.png)

### Farben

Der Slider hat einen magentafarbenen Balken. Möchtest du mit anderen Farben arbeiten, kannst du entweder eine aus der <a href="?path=/docs/guidelines-colors--page">Telekom Farbpalette</a> auswählen oder eine eigene Farbe festlegen. Achte in jedem Fall darauf, dass die Farbe für Nutzer\*innen verständlich ist und allen Anforderungen der Barrierefreiheit entspricht.

![slider_color-DE.png](assets/3_components/slider/slider_color-DE.png)

### Deaktivierter Zustand

Deaktiviere den Slider, wenn

- eine andere Aktion erfolgen muss, bevor der Slider nutzbar ist oder
- die Nutzer\*innen den Wert/Wertebereich aktuell nicht ändern können.

Wenn der Slider deaktiviert ist, werden die Regler entfernt, um anzuzeigen, dass der Wert nicht verändert werden kann.

Deaktivierter Zustand (Regler ausgeblendet)

![slider_disabled-DE.png](assets/3_components/slider/slider_disabled-DE.png)

## Elemente

![slider-elements-DE.png](assets/3_components/slider/slider-elements-DE.png)

#### Label (1)

Die Beschriftung zeigt deutlich an, welche Art von Wert aktuell eingestellt ist.

#### Value (2)

Der ausgewählte Wert zeigt entweder einen Einzelwert oder den Wertebereich eines Sliders an.

#### Regler 1 (3) (Bei Slider mit Wertebereich)

Regler 1 zeigt den Startpunkt des Wertebereichs an.

#### Regler 2 (4)

Regler 2 zeigt den Endpunkt des Wertebereichs an.

#### Meldung (5)

Hier werden Fehler und Hinweise angezeigt.

## Verwandte Komponenten

<a href="?path=/usage/components-text-field--standard">Text-Field</a>
