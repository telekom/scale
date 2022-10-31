# Abstände

Der Umgang mit Abständen ist ein wichtiger, aber oft vernachlässigter Aspekt bei der Gestaltung des visuellen Designs. Scale legt hierfür Normen zugrunde, die dir helfen, klare und funktionale Layouts zu erstellen.

## Abstandseinheiten

Verwende die folgenden Einheiten bei der Konstruktion von Komponenten. Sie enthalten kleine Abstufungen, mit denen du eine geeignete räumliche Beziehung auf der Detailebene schaffen kannst.

| Variablen Name   | px  | rem    | Beispiel                                                   |
| ---------------- | --- | ------ | ---------------------------------------------------------- |
| --scl-spacing-1  | 1   | 0.0625 | <scale-sb-spacing style="width: 1px;"></scale-sb-spacing>  |
| --scl-spacing-2  | 2   | 0.125  | <scale-sb-spacing style="width: 2px;"></scale-sb-spacing>  |
| --scl-spacing-4  | 4   | 0.25   | <scale-sb-spacing style="width: 4px;"></scale-sb-spacing>  |
| --scl-spacing-8  | 8   | 0.5    | <scale-sb-spacing style="width: 8px;"></scale-sb-spacing>  |
| --scl-spacing-12 | 12  | 0.75   | <scale-sb-spacing style="width: 12px;"></scale-sb-spacing> |
| --scl-spacing-16 | 16  | 1      | <scale-sb-spacing style="width: 16px;"></scale-sb-spacing> |
| --scl-spacing-24 | 24  | 1.5    | <scale-sb-spacing style="width: 24px;"></scale-sb-spacing> |
| --scl-spacing-32 | 32  | 2      | <scale-sb-spacing style="width: 32px;"></scale-sb-spacing> |

## Layout-Einheiten

Mit Layout-Einheiten kannst du einzelne Komponenten und andere UI-Elemente eines User Interfaces in einem ganzseitigen Layout sinnvoll anordnen. Verwende die größeren Einheiten, um die Dichte eines Layouts zu verringern, Weißraum zu erzeugen oder Abschnitte voneinander zu trennen. Mit den kleineren Einheiten verdichtest du dein Layout und schaffst direkte Beziehungen.

| Variablen Name   | px  | rem | Beispiel                                                   |
| ---------------- | --- | --- | ---------------------------------------------------------- |
| --scl-spacing-16 | 16  | 1   | <scale-sb-spacing style="width: 16px;"></scale-sb-spacing> |
| --scl-spacing-24 | 24  | 1.5 | <scale-sb-spacing style="width: 24px;"></scale-sb-spacing> |
| --scl-spacing-32 | 32  | 2   | <scale-sb-spacing style="width: 32px;"></scale-sb-spacing> |
| --scl-spacing-40 | 40  | 2.5 | <scale-sb-spacing style="width: 40px;"></scale-sb-spacing> |
| --scl-spacing-48 | 48  | 3   | <scale-sb-spacing style="width: 48px;"></scale-sb-spacing> |
| --scl-spacing-64 | 64  | 4   | <scale-sb-spacing style="width: 64px;"></scale-sb-spacing> |
| --scl-spacing-80 | 80  | 5   | <scale-sb-spacing style="width: 80px;"></scale-sb-spacing> |

## Mit Weißraum gestalten

Jeder Teil eines User Interfaces – auch der leere Raum zwischen den Elementen – sollte bewusst gestaltet sein. Je nach Größe der Abstände kannst du Zusammenhänge oder Hierarchien zwischen Elementen erzeugen.

### Zusammenhänge herstellen

Elemente, die nahe beieinander liegen, erkennen Nutzer\*innen als zusammengehörig. Je größer der Abstand zwischen Elementen ist, desto schwächer erscheint die Beziehung.

Durch Abstände erzeugte Muster können ebenfalls Beziehungen herstellen. Elemente, die im gleichen Abstandsmuster angeordnet sind, werden als zusammengehörige, gleichwertige Teile wahrgenommen.

Du kannst Weißraum auch dazu verwenden, um die Zusammengehörigkeit von Informationen zu verdeutlichen. Damit erzeugst du Inhaltsabschnitte auf einer Seite, ohne dass du Linien oder andere grafischen Elemente als Trenner verwenden musst.

### Hierarchie erzeugen

Je mehr Weißraum ein Element umgibt, desto wichtiger wirkt es. Das lässt sich an diesem Beispiel verdeutlichen: Die Überschrift der ersten Ebene einer Webseite besitzt immer den größten umgebenden Leerraum. Das verleiht ihr die größte Aufmerksamkeit und vermittelt Wichtigkeit. Alle darauffolgenden Überschriften erhalten weniger Platz – das signalisiert, dass sie untergeordnet sind.

Bitte beachte, dass Elemente, die nahe beieinander liegen auch leichter übersehen werden können. Während die Nutzer\*innen die Gruppierung wahrnehmen, verarbeiten sie möglicherweise nicht jedes einzelne Element. Wenn du also wichtige Inhalte hervorheben möchtest, umgib sie einfach mit zusätzlichem Weißraum.

### Weißraum

Der Leerraum ist in der Gestaltung auch als Weißraum bekannt. Du kannst ihn verwenden, um Abschnitte auf einer Seite aufzuteilen oder um den Fokus auf bestimmte Elemente zu lenken. Weißraum hilft auch bei der Informationsverarbeitung: Er erhöht die Lesbarkeit einer Seite und gibt dem Auge Ruhe. Zu viele Informationen sind unübersichtlich und überfordern die Nutzer\*innen. Einzelne Abschnitte dürfen zwar kompakt sein, die gesamte Seite sollte jedoch nicht überfüllt wirken.
