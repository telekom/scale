<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Telekom Profile Menu</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

The profile menu ensures a consistent behaviour for the login / user profile menu in all our products and services.

It is a subcomponent of `scale-telekom-header` and must be placed inside its `functions` slot:

```
<scale-telekom-header>
  <scale-telekom-nav-list variant="functions" slot="functions">
    <telekom-profile-menu ... >
```

Set the profile menu's `logged-in` parameter to `true` / `false` to change between the two states, set the remaining parameters to match the menu's appearance according to your products' needs.

You'll find default values in the code examples in the [Docs section](?path=/docs/components-telekom-profile-menu--logged-out).

## Logged out

```
<telekom-profile-menu logged-in="false" ... >
```

In this state the menu offers the user the possibility sign up / log in to his account.

![Image Name](assets/3_components/telekom-profile-menu/telekom-profile-menu-logged-out.png)

## Logged in

```
<telekom-profile-menu logged-in="true" ... >
```

In this state the menu offers the user links to a set of important Telekom services and the possibility to log out from his account.

![Image Name](assets/3_components/telekom-profile-menu/telekom-profile-menu-logged-in.png)
