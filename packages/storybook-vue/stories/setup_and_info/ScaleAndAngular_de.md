# Scale und Angular

Angular unterstützt problemlos Web Components.

Ein Beispiel für eine Boilerplate-App findest du im [GitHub Repository](https://github.com/telekom/scale/tree/main/examples/angular-boilerplate).

## Setup

Installiere zuerst das Package:

```bash
npm install @telekom/scale-components@next
```

Lade danach die Komponenten-Bibliothek in `main.ts`:

```ts
// src/main.ts
import { defineCustomElements } from '@telekom/scale-components/loader';

// ...

defineCustomElements();
```

Lade anschließend das CSS in die Konfigurationsdatei `angular.json`:

```json
// angular.json
{
  "build": {
    "styles": [
      "node_modules/@telekom/scale-components/dist/scale-components/scale-components.css"
    ]
  }
}
```

Um Angular den Umgang mit Non-Angular-Elementnamen zu ermöglichen, füge das `CUSTOM_ELEMENTS_SCHEMA` in `src/app/app.module.ts` ein:

```ts
// src/app/app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  // ...
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
```

Wenn du Routing verwendest, füge es auch in `src/app/app-routing.module.ts` ein:

```ts
// src/app/app-routing.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  // ..
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
```

Nun solltest du in der Lage sein, Scale-Komponenten in deinen Templates zu verwenden:

```html
<div>
  <scale-button>Click!</scale-button>
</div>
```

## Events in Angular

Um Konflikte mit Standard-Events zu vermeiden und für beste Kompatibilität mit anderen Libraries und Frameworks, sind die Custom Events, die von einigen Scale-Komponenten ausgegeben werden, mit dem Prefix `scale` gekennzeichnet. Event-Namen werden in camelCase-Syntax geschrieben (z. B. scaleChange). Die Dokumentation zu Custom Events findest du auf den jeweiligen Komponentenseiten im Abschnitt "docs".

An Events mit dem Prefix `scale` kannst du reguläre Angular-Syntax anbinden:

```html
<scale-slider (scaleInput)="setValue($event)"></scale-slider>
```

## Reactive Forms

Wenn du mit Reactive Forms arbeitest, wirst du feststellen, dass die Formularelemente in Scale —Textfield, Checkbox, etc.— nicht direkt funktionieren. Nur native Formularsteuerelemente wie `input` und `textarea` funktionieren.

Das Schreiben von benutzerdefinierten Control Value Accessors kann Schwierigkeiten mit sich bringen. Um den Einstieg zu erleichtern, stellen wir daher eine Reihe von Arbeitsbeispielen zur Verfügung.

Um es auszuprobieren, füge bitte die Directives aus [dem Beispielprojekt](https://github.com/telekom/scale/tree/main/examples/angular-reactive-forms/src/directives) manuell in dein Projekt ein und lade sie in `app.module.ts`:

```ts
// src/app/app.module.ts
import { ReactiveFormsModule } from '@angular/forms';

import { TextValueAccessorDirective } from 'src/directives/text-value-accessor';
import { CheckedValueAccessorDirective } from 'src/directives/checked-value-accessor';
import { NumberValueAccessorDirective } from 'src/directives/number-value-accessor';

@NgModule({
  declarations: [
    // ...
    TextValueAccessorDirective,
    CheckedValueAccessorDirective,
    NumberValueAccessorDirective,
  ],
  imports: [
    // don't forget to import the `ReactiveFormsModule`
    ReactiveFormsModule,
  ],
})
export class AppModule {}
```

## Proxy Package

Die automatisch generierten Proxy Packages werden in v4 entfernt:

- `@telekom/scale-components-angular`
- `@telekom/scale-components-angular-neutral`

Bitte nutze `@telekom/scale-components` direkt. Custom Elements werden bereits super unterstützt.
