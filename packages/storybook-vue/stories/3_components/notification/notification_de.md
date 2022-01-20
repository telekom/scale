<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Notification</h1>
    <img src="assets/beta.png" alt="Beta Component" />
</div>

Notifications geben Nutzer\*innen Feedback über den Status des Systems oder einer Aktion.

## Allgemein

Scale unterscheidet Toast, Banner und Inline Notifications.

### Verwende Notifications, um

- Nutzer\*innen über den Status einer Aktion zu informieren, oder um
- eine Systemmeldung auszugeben, oder um
- communicate updates like "new message".

### Verwende Notifications besser nicht, wenn

- Nutzer\*innen eine Entscheidung bestätigen müssen, um mögliche Fehler zu verhindern oder zu korrigieren. Verwende in diesem Fall ein Modal.

## Basistypen

### Toast Notification

Toast Notifications erscheinen unmittelbar nach einem bestimmten Ereignis. Sie beziehen sich nicht auf ein Objekt auf der Seite und werden vorübergehend an globaler Position eingeblendet. Toast Notifications können Inhalte verdecken und werden nach kurzer Zeit automatisch ausgeblendet. Alternativ können sie aktiv geschlossen werden. Verwende bei Bedarf einen Link, um weiterführende Informationen anzubieten.

![Image Name](assets/3_components/notification/toast_notification.png)

### Banner Notification

Banner Notifications zeigen Systemmeldungen an. Sie werden oberhalb des Seiteninhalts eingeblendet.

![Image Name](assets/3_components/notification/banner_notification.png)

### Inline Notification

Inline Notifications geben Nutzer\*innen Feedback auf eine Aktion. Sie sind im entsprechenden Teilbereich der Seite verortet.

![Image Name](assets/3_components/notification/inline_notification.png)

## Variants

### Informational

Die Informational Notification gibt Nutzer\*innen zusätzliche und hilfreiche Informationen.

![Image Name](assets/3_components/notification/variant_info.png)

### Success

Die Sucess Notification bestätigt eine erfolgreich durchgeführte Aktion.

![Image Name](assets/3_components/notification/variant_success.png)

### Warning

Die Warning Notification informiert Nutzer\*innen über möglicherweise unerwünschte Ergebnisse

![Image Name](assets/3_components/notification/variant_warning.png)

### Error

Die Error Notification informiert Nutzer\*innen über eine fehlgeschlagene Aktion oder einen Fehler und verlangt möglicherweise eine Aktion, um fortfahren zu können.

![Image Name](assets/3_components/notification/variant_error.png)

## Elements

![Image Name](assets/3_components/notification/elements.png)

#### Icon (1)

Das Icon verdeutlicht die grundlegende Aussage der Notification.

#### Headline (2)

Formuliere den Text aussagekräftig und möglichst kurz.

#### Subheadline (3) (Optional)

Ein ergänzender Text ist nur in Ausnahmefällen notwendig.

#### Link (4) (Optional)

Nutze den Link innerhalb der Toast oder Banner Notification bspw. für weiterführende Informationen.

#### Schließen-Symbol (5) (Optional)

Das Schließen-Icon ist optional.

## Positionierung

### Toast Notification

Toast Notifications sitzen üblicherweise oben links oder rechts und können andere Inhalte verdecken.

![Image Name](assets/3_components/notification/positioning_toast.png)

### Banner Notification

Banner Notifications sitzen zentriert oberhalb des Seiteninhalts.

![Image Name](assets/3_components/notification/positioning_banner.png)

### Inline Notification

Positioniere Inline Notifications im entsprechenden Seitenbereich.

![Image Name](assets/3_components/notification/positioning_inline.png)

## Beta-Komponente

Diese Komponente befindet sich noch im Beta-Stadium. Wenn du sie testest, bedenke, dass sie möglicherweise noch nicht alle Qualitätskontrollmaßnahmen durchlaufen hat und noch keine WCAG-Zertifizierung zur Barrierefreiheit vorliegt. In Zukunft kann es zu Änderungen an dieser Komponente kommen.
