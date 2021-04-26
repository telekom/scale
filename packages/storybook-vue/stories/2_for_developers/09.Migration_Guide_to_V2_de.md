# Scale V.2 ist da

Wenn du Scale bereits aus der Beta-Phase kennst, dann hast du bisher die 1. Version genutzt. Die neue Version enthält jetzt zusätzliche Informationen zur AA-Barrierefreiheit und Browser-Unterstützung sowie zahlreiche Bugfixes und Updates einiger Komponenten. Wir haben ein ein Upgrade auf Stencil 2 durchgeführt und verwenden jetzt CSS statt JSS.

Lade die CSS Datei unter `@telekom/scale-design-tokens/dist/design-tokens-telekom.css`, um auf Token und Fonts zuzugreifen

In diesem Dokument findest du alle wichtigen Änderungen. Es sind nur die Komponenten aufgeführt, bei denen es ein Update gibt.
Hier erfährst du, wie du die neue Version von Scale erhältst.

- [Accordion](#accordion)
- [BrandHeader](#brand-header)
- [Button](#button)
- [Card](#card)
- [Icon](#icon)
- [Input](#input)
- [List](#list)
- [Modal](#modal)
- [Tab Navigation](#tab-navigation)
- [Tag](#tag)
- [Änderungen im Styling](#styling)

## Accordion

`scale-accordion` und `scale-collapsible`

### Markup und Slots

Für `scale-collapsible`:

- Entfernt: slot `headline`
- Entfernt: slot `content`

Beide Slots wurden durch ein einfaches Markup ersetzt. Das erste Element muss eine Überschrift der entsprechenden Ebene sein. In der Regel ist es eine H2 oder H3 – abhängig vom jeweiligen Kontext.

Vorher:

```html
<scale-accordion>
  <scale-collapsible>
    <scale-text slot="headline" variant="collapsible">
      Dies ist eine Headline
    </scale-text>
    <p slot="content">Dies ist ein Copytext</p>
  </scale-collapsible>
</scale-accordion>
```

Nachher:

```html
<scale-accordion>
  <scale-collapsible>
    <h2>Dies ist eine Headline</h2>
    <p>Dies ist ein Copytext</p>
  </scale-collapsible>
</scale-accordion>
```

## Brand Header

Die `iconNavigation` Konfiguration wurde geändert. Das Property `icon` akzeptiert jetzt einen Namen aus der [Icon Library](./?path=/docs/components-icon--icon-library).

Vorher:

```js
export const iconNavigation = [
  { name: 'Search', id: 'Search35', href: '#search', icon: 'search' },
  { name: 'Cart', id: 'Cart36', href: '#cart', icon: 'shopping-bag' },
  { name: 'Login', id: 'Login37', href: '#login', icon: 'profile' },
  { id: 'menu', defaultName: 'Menu', openedName: 'Close' },
];
```

Nachher:

```js
export const iconNavigation = [
  { name: 'Search', id: 'Search35', href: '#search', icon: 'action-search' },
  { name: 'Cart', id: 'Cart36', href: '#cart', icon: 'action-shopping-cart' },
  { name: 'Login', id: 'Login37', href: '#login', icon: 'user-file-user' },
  { id: 'menu', defaultName: 'Menu', openedName: 'Close' },
];
```

Bitte beachte die [Stories der Komponente](./?path=/docs/components-brand-header-navigation--standard) für alle verfügbaren Options in V2.

## Button

`scale-button`

### Attribiute

- Entfernt: `focusable`
- Entfernt: `icon`
- Entfernt: `iconAfter`
- Entfernt: `iconBefore`
- Entfernt: `iconSize`
- Entfernt: `role`
- Hinzugefügt: `iconOnly` (optional) - Auf `true` gesetzt, wenn der Button nur ein Icon und keine Beschriftung enthält
- Hinzugefügt: `iconPosition` (optional) - Position des Icons – bezogen auf das Label

### Methoden

- Entfernt: `disable`
- Entfernt: `enable`

### Markup und Slots

Icons sind jetzt Teil des Markups und werden nicht mehr über Attribute bereitgestellt.

Vorher:

```html
<scale-button
  icon-before="M10 2a8 8 0 016.472 12.703l4.912 4.913.06.065a1.25 1.25 0 01-1.726 1.794l-.102-.091-4.913-4.912A8 8 0 1110 2zm0 1.5A6.508 6.508 0 003.5 10c0 3.584 2.916 6.5 6.5 6.5s6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5z"
>
  Search
</scale-button>
```

Nachher:

```html
<scale-button><scale-icon-action-search />Search</scale-button>
```

## Card

`scale-card`

### Attribiute

- Entfernt: `disabled`
- Entfernt: `href`
- Entfernt: `interactive`
- Entfernt: `no-padding`
- Hinzugefügt: (optional) - Link URL
- Hinzugefügt: `rel`(optional) - `rel`Attribute
- Hinzugefügt: `label` (optional) - Label für Card (a11y)

## Icon

`scale-icon`

### Attribute

- Hinzugefügt: `accessibilityTitle` (optional) - Wenn du ein Icon als alleinstehende Komponente verwendest, muss es für die Barrierefreiheit möglichst aussagekräftig sein.
- Hinzugefügt: `decorative` (optional) - Bei `true` wird das SVG-Element zu aria-hidden="true"

## List

`scale-list` und `scale-list-item`

### Attribiute

Für `scale-list`:

- Entfernt: `variant`
- Hinzugefügt: `ordered` (optional) - Sortierte Liste erstellen (ol)

Für `scale-list-item`:

- Entfernt: `icon`
- Entfernt: `iconSize`
- Entfernt: `type`
- Hinzugefügt: `index` (optional) - Index-Nummer, nur nützlich für das Design von `ordered type`
- Hinzugefügt: `marker` (optional) - Wenn false, wird das Linke Padding nicht markiert
- Hinzugefügt: `ordered` (optional) - Ob dies ein untergeordnetes Element einer sortierten Liste ist, wird automatisch vom übergeordneten Element festgelegt.

### Markup und Slots

Listen sind standardmäßig Aufzählungslisten (ul). Um sortierte Listen (ol) zu gestalten, verwende das Attribut `ordered`.

Vorher:

```html
<scale-list variant="unordered">
  <scale-list-item>Uno</scale-list-item>
  <scale-list-item>Dos</scale-list-item>
  <scale-list-item>Tres</scale-list-item>
</scale-list>
```

Nachher:

```html
<scale-list>
  <scale-list-item>Uno</scale-list-item>
  <scale-list-item>Dos</scale-list-item>
  <scale-list-item>Tres</scale-list-item>
</scale-list>
```

Icons sind jetzt Teil des Markups und werden nicht mehr über Attribute bereitgestellt.

Vorher:

```html
<scale-list>
  <scale-list-item icon="SVG-PATH" icon-size="16">Uno</scale-list-item>
  <scale-list-item icon="SVG-PATH" icon-size="16">Dos</scale-list-item>
  <scale-list-item icon="SVG-PATH" icon-size="16">Tres</scale-list-item>
</scale-list>
```

Nachher:

```html
<scale-list>
  <scale-list-item marker="false">
    <scale-icon-navigation-right size="16" decorative /> Uno
  </scale-list-item>
  <scale-list-item marker="false">
    <scale-icon-navigation-right size="16" decorative /> Dos
  </scale-list-item>
  <scale-list-item marker="false">
    <scale-icon-navigation-right size="16" decorative /> Tres
  </scale-list-item>
</scale-list>
```

## Input

Die Komponente scale-input wurde in mehrere Stand-Alone Komponenten aufgeteilt:

- scale-checkbox
- scale-dropdown
- scale-radio-button
- scale-text-field
- scale-textarea

Die Properties haben sich mit einer Ausnahme nicht geändert. `type` wurde von allen Komponenten ausser `text-field` entfernt.
Hier akzeptiert die Komponente die [Standard Input Type Werte](https://www.w3schools.com/html/html_form_input_types.asp).

### Markup and slots

Before:

```html
<scale-input type="checkbox"></scale-input>
```

```html
<scale-input type="select"></scale-input>
```

```html
<scale-input type="radio"></scale-input>
```

```html
<scale-input type="text"></scale-input>
```

```html
<scale-input type="textarea"></scale-input>
```

After:

```html
<scale-checkbox></scale-checkbox>
```

```html
<scale-dropdown></scale-dropdown>
```

```html
<scale-radio-button></scale-radio-button>
```

```html
<scale-text-input></scale-text-input>
```

```html
<scale-textarea></scale-textarea>
```

Die Komponente `scale-input` ist weiter Verfügbar mit einer Deprecation-Warnung. Die Komonente wird in Version 3 entfernt.

## Modal

### Attribiute

- Entfernt: `transitions`
- Hinzugefügt: `alignActions` (optional) - Ausrichtung der Action-Buttons
- Hinzugefügt: `closeButtonLabel` (optional) - Label für Schließen-Button
- Hinzugefügt: `duration` (optional) - Transition duration
- Hinzugefügt: `heading` - Modale Überschrift

### Events

- Hinzugefügt: `scaleOpen`

### Markup und Slots

- Entfernt: slot `header`
- Entfernt: slot `modal-actions`
- Hinzugefügt: slot `action`

Die Überschrift wird über das Attribut `heading` bereitgestellt.

Vorher:

```html
<scale-modal>
  <span slot="header">Good morning</span>
</scale-modal>
```

Nachher:

```html
<scale-modal heading="Good morning"></scale-modal>
```

Action-Buttons verwenden den Slot action und benötigen keinen Wrapper mehr. Die Komponente ist für die Ausrichtung und die Abstände zuständig.

Vorher:

```html
<span slot="modal-actions">
  <scale-button
    variant="secondary"
    style="margin-right: 8px"
    @click="opened = false"
  >
    Cancel
  </scale-button>
  <scale-button @click="handleSubmit"> Submit </scale-button>
</span>
```

Nachher:

```html
<scale-button slot="action" variant="secondary" @click="opened = false">
  Cancel
</scale-button>
<scale-button slot="action" @click="handleSubmit"> Submit </scale-button>
```

Die Reihenfolge im Markup ist wichtig. Platziere zuerst den Inhalt des Modals und dann alle Action-Buttons.

## Tab-Navigation

`scale-tab-nav`, `scale-tab-header` und `scale-tab-panel`

### Attribute

Für `scale-tab-nav`:

- Entfernt: `ariaLabel`
- Hinzugefügt: `small` (optional) - Auf true setzen für kleinere Höhe und Schriftgröße in Überschriften von Registerkarten

Für `scale-tab-header`:

- Entfernt: `icon`
- Entfernt: `iconOnly`
- Entfernt: `iconSize`
- Entfernt: `label`

Für `scale-tab-panel`:

- Entfernt: `ariaLabel`
- Entfernt: `identifier`

### Events

Für `scale-tab-nav`:

- Entfernt: `tabclick`

### Markup und Slots

Slots has been renamed and the `label` attribute removed in favor of slotted text.

- Umbenannt: slot `headings` zu `tab`
- Umbenannt: slot `content` zu `panel`

Vorher:

```html
<scale-tab-nav>
  <scale-tab-header slot="headings" label="General"></scale-tab-header>
  <scale-tab-panel slot="content">
    Freegan kinfolk farm-to-table humblebrag cred…
  </scale-tab-panel>
</scale-tab-nav>
```

Nachher:

```html
<scale-tab-nav>
  <scale-tab-header slot="tab">General</scale-tab-header>
  <scale-tab-panel slot="panel">
    Freegan kinfolk farm-to-table humblebrag cred…
  </scale-tab-panel>
</scale-tab-nav>
```

Icons sind jetzt Teil des Markups und werden nicht mehr über Attribute bereitgestellt. Die Option „Nur Symbol“ wird nicht mehr unterstützt.

Vorher:

```html
<scale-tab-header
  slot="headings"
  icon="{SVG_PATH}"
  label="General"
></scale-tab-header>
```

Nachher:

```html
<scale-tab-header slot="tab">
  <scale-icon-home-home size="16" /> General
</scale-tab-header>
```

## Tag

### Attribute

- Hinzugefügt: `dismissText` (optional) - Label für Zugänglichkeit löschen

## Styling

- Die JSS-basierte theming API (`useTheme` and `getTheme`) wurde entfernt
- Die `customClass` attribute wurden entfernt
- Die `styles` attribute akzeptieren einen String aus CSS statt ein Objekt
