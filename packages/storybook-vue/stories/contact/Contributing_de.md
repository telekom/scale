# An Scale mitwirken

Scale ermöglicht es der Telekom Entwickler-Community ihre Fähigkeiten zu teilen. Ob du einen Fehler behebst, die Benutzbarkeit verbesserst oder neue Komponenten entwickelst: Diese Beiträge machen Scale zu einem wertvollen Asset im Produkt-Ökosystem der Telekom.

## Open-source, Open Beta

Unser open-source Designsystem ist derzeit eine Open Beta und entwickelt sich stetig weiter.

## Wie du zu Scale beiträgst

- Sende ein Issue in unserem [Repository](https://github.com/telekom/scale/issues)
- Behebe einen Fehler und sende uns einen [Pull request](https://github.com/telekom/scale/pulls)
- Wenn du Design-Verbesserungen und neue Komponenten beitragen willst, wende Dich an <a href="mailto:contact@brand-design.telekom.com">contact@brand-design.telekom.com</a>

Beachte die [Contribution Guidelines](https://github.com/telekom/scale/blob/master/CONTRIBUTING.md) und halte Dich an unseren [Code of Conduct](https://github.com/telekom/scale/blob/master/CODE_OF_CONDUCT.md).

## Unser Arbeits-Ablauf für Beiträge

### Pull Requests

Wenn du einen neuen Pull Request öffnest, starte mit dem aktuellen `master` Branch. Wir folgen wenn möglich den `Git flow` Standards für Benamung: z.B. `feat|feature`, `fix`, `chore`, `test` etc. Alle Pull-Requests werden in `master` gemerged und durch die `CI` Pipeline im `release` -Branch veröffentlicht.

### Tests

Wenn neue Features und Komponenten entwickelt werden, benötigen wir `unit tests` und `end to end` Tests. Wir zielen auf 100% Test-Abdeckung. Zusätzlich nutzen wir `screenshot tests` für Komponenten in `jest-image-snapshot`. Stencil nutz `Jest` als Test-Framework. Bitte sieh Dir die existierenden Komponenten als Beispiele an und lies die offizielle Dokumentation:

- https://stenciljs.com/docs/testing-overview
- https://jestjs.io/

### Tooling

Wir empfehlen die Nutzung des `VSCode text editor` da er `Typescript` optimal unterstützt.
