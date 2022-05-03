# Hinweise zum Release

## Dark Mode

Zusätzlich zum Light Mode enthält Scale nun alle Komponenten auch für den [Dark Mode](./?path=/docs/guidelines-light-and-dark-mode--page).

## Optimierte Farbpalette und semantische Farb-Tokens

Wir haben die [Farbpalette](./?path=/docs/guidelines-colors--page) angepasst, sodass sie für beide Modi ein konsistentes Erscheinungsbild bietet. Selbstverständlich sind alle Farben in unseren Komponenten auf Barrierefreiheit geprüft. Durch die Verwendung semantischer Token-Namen wie Text & Icon oder Link erkennst du leichter, welcher Stil für welches Element gedacht ist.

## Hinweise für Designer\*innen

Um die Neuerungen vollumfänglich nutzen zu können, sollten deine Komponenten und Farben mit der Library verknüpft sein. Insbesondere selbst definierte Farben bleiben vom Update unberührt. Hier findest du eine Anleitung, wie du dein Projekt optimal auf das Update vorbereitest:

[Aktualisierung der Sketch Library](./?path=/docs/new-release-sketch-library-update--page)

Farbvariablen existieren in Sketch erst seit der Version 69 (Oktober 2020). Wir bitten um Verständnis, dass sich in älteren Programmversionen nicht zwischen Dark und Light Mode wechseln lässt und die Farb-Tokens in diesen nicht genutzt werden können.

## Hinweis für Entwickler\*innen

Das aktuelle Release enthält keine Breaking Changes. Es gibt allerdings einen sehr unwahrscheinlichen Edge Case, in dem die Aktualisierung ein wenig Arbeit erfordern könnte.

<a href="https://github.com/telekom/scale/blob/main/docs/dark-mode-v3-beta-100.md" target="_blank" rel="noopener noreferrer">Mehr Details findest du auf GitHub.</a>
