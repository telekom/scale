<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Profile Menu</h1>
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

In den Codebeispielen im *Docs*-Abschnitt sind default-Werte für die einzelnen Parameter aufgeführt.
