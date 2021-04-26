# Anpassungen und Themes

Die meisten Scale Komponenten nutzen das Shadow DOM, um vorgeschriebene Stylings zu kapseln. Dadurch lassen sich Styles auch dann nicht verändern, wenn sie über einen einfachen CSS Selector angesteuert werden. Um dennoch individuell gestalten zu können, bietet jede Komponente eine Sammlung von **scoped CSS variables** und **shadow parts**.

Anpassungen sind auf verschiedenen Ebenen möglich. Du kannst zum Beispiel:

- eine einzelne Instanz einer Komponente anpassen,
- eine Komponente erweitern oder eine neue „Variante“ anlegen,
- ein Theme erstellen, das eine Reihe von Anpassungen kombiniert.

Standardmäßig werden die Komponenten mit den Design-Tokens von Scale gestaltet. Das sind CSS-Variablen, die über `:root` in der Datei `scale-components.css` definiert sind. Versuch beim Anpassen von Elementen eine möglichst kleine Zahl von Design-Tokens zu benutzen: entweder die vom System, die eigenen oder eine Kombination aus beiden. So sorgst du für ein konsistentes User Interface.

Hier erfährst du mehr über individuelle CSS-Eigenschaften (Variablen) und Shadow Parts:

- [Using CSS custom properties (variables) on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties)
- [A user's guide to CSS variables by Lea Verou](https://increment.com/frontend/a-users-guide-to-css-variables/)
- [::part on MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
- [CSS Shadow Parts spec draft at W3C](https://drafts.csswg.org/css-shadow-parts-1/#part)

## Anpassungsmöglichkeiten

### Komponentenbezogene Variablen

Du kannst die Variablen einer Komponente in deinem CSS überschreiben.

```css
scale-button {
  --radius: 0;
}
```

Neue Varianten lassen sich auch durch das Gruppieren von zu überschreibenden Werten, wie einer Klasse oder einem Attribut, erstellen.

```html
<style>
  scale-button.squared {
    --radius: 0;
  }
</style>

<scale-button class="squared">Sign in</scale-button>
```

Ein Attribut muss nicht in der jeweiligen Komponente vorhanden sein, um es als Selector zu benutzen. Es reicht, wenn es sich um einen gültigen CSS Selector handelt.

```html
<style>
  scale-button[variant='squared'] {
    --radius: 0;
  }
</style>

<scale-button variant="squared">Sign in</scale-button>
```

Wenn du nur ein einzelnes Element einer Komponente anpassen möchtest, kannst du es einfach inline einbinden:

```html
<scale-button style="--radius: 0">Sign out</scale-button>
```

### Shadow Parts

Mit Shadow Parts ist es möglich, interne Elemente einer Komponente gezielt anzusteuern über [` ::part` pseudo-element selector](https://developer.mozilla.org/en-US/docs/Web/CSS/::part).

```css
scale-button::part(base) {
  border-radius: 0;
}
```

Diese Herangehensweise lässt sich auch auf eigene Varianten anwenden.

```css
scale-button[variant='squared']::part(base) {
  border-radius: 0;
  background: var(--scl-color-green-80);
}

scale-button[variant='squared']::part(base):hover {
  background: var(--scl-color-green-100);
}
```

Beachte, dass der `::part` Selector auf ein Element beschränkt ist. Damit lässt sich weder auf nachfolgende oder verwandte Elemente zugreifen noch kann es verknüpft werden.

### Theming

Du kannst eine Reihe von Stilanpassungen im Bereich einer CSS-Klasse zusammenfassen. Als Ergebnis erhältst du ein Theme, das sich so einfach aktivieren lässt wie das Hinzufügen dieser Klasse zum Dokument.

Es gibt kein Standard-Theme in Scale, sondern nur die Design-Tokens, die das System abbilden.

Ein möglichst aussagekräftiges Beispiel sagt mehr als tausend Worte:

```css
<style>
  .theme-example {
    --scl-color-primary: limegreen;
    --scl-color-primary-hover: seagreen;
    --scl-color-primary-active: green;
  }

  .theme-example scale-button,
  .theme-example scale-tag,
  .theme-example scale-card {
    --radius: 2em;
  }

  .theme-example scale-button[variant="plain"]::part(base) {
    background: transparent;
    border: 2px solid currentColor;
  }
</style>

<body class="theme-example">
```

Auch wenn das Überschreiben von Design-Tokens nicht empfehlenswert ist, kann es je nach Anliegen die Arbeit vereinfachen. Wir empfehlen stattdessen, selbst Tokens zu erstellen und im eigenen Design zu verwenden, sollten die Scale Tokens deinen Ansprüchen an ein User Interface nicht genügen.
