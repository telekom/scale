<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Telekom Profile Menu</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Das Profilmenü bietet ein einheitliches Verhalten des Login-/Benutzerprofilmenüs für alle unsere Produkte und Services.

Es ist eine Subkomponente von `scale-telekom-header` und muss in dessen `functions` Slot platziert werden:

```
<scale-telekom-header>
  <scale-telekom-nav-list variant="functions" slot="functions">
    <telekom-profile-menu ... >
```

Setze den Parameter `logged-in` des Profilmenüs auf `true` / `false`, um zwischen den beiden Status des Menüs umzuschalten, sowie die restlichen Parameter, um das Erscheinungsbild den Anforderungen des Produktes/Services anzupassen.

In den Codebeispielen im [Docs-Abschnitt](?path=/docs/components-telekom-profile-menu--logged-out) sind default-Werte für die einzelnen Parameter aufgeführt.

## Nutzer ausgeloggt

```
<telekom-profile-menu logged-in="false" ... >
```

In diesem Status bietet das Menü dem Nutzer die Möglichkeit zur Registrierung / Anmeldung an seinem Account.

![Image Name](assets/3_components/telekom-profile-menu/telekom-profile-menu-logged-out.png)

## Nutzer eingeloggt

```
<telekom-profile-menu logged-in="true" ... >
```

In diesem Status bietet das Menü dem Nutzer eine Liste von Verweisen zu wichtigen Telekom Services und die Möglichkeit zum Logout aus seinem Account.

![Image Name](assets/3_components/telekom-profile-menu/telekom-profile-menu-logged-in.png)
