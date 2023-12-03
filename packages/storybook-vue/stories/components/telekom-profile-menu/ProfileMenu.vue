<template>
  <div class="wrapper">
    <scale-telekom-app-shell>
      <scale-telekom-header
        app-name="appName-vue"
        app-name-link="appNameLink"
        meta-nav-aria-label="metaNavAriaLabel"
        meta-nav-external-aria-label="metaNavExternalAriaLabel"
        lang-switcher-aria-label="langSwitcherAriaLabel"
        main-nav-aria-label="mainNavAriaLabel"
      >
        <scale-telekom-nav-list variant="functions" slot="functions" alignment="right" aria-label="Functions Menu">
          <telekom-profile-menu
            app-name="Application Name"
            service-name="Dienstname"
            short-descr="Short Description: Hier können Sie Ihre Verträge verwalten oder auf Rechnungen, Verbrauchsanzeigen, Einstellungen und weitere Informationen zugreifen."
            login-label="Zum Login"
            login-help-label="Hilfe zum Login"
            no-login-yet-label="Noch kein Telekom Login?"
            register-label="Jetzt registrieren"
            login-settings-label="Login-Einstellungen"
            logout-label="Logout"
            :logged-in="loggedIn"
            label="Alexander"
            accessibility-label="Benutzerprofil: Alexander"
            close-menu-accessibility-label="Menü schließen"
            :user-info="userInfo"
            :service-links="serviceLinks"
          ></telekom-profile-menu>
        </scale-telekom-nav-list>
      </scale-telekom-header>
    </scale-telekom-app-shell>
  </div>
</template>

<script>
export default {
  props: {
    label: String,
    accessibilityLabel: String,
    closeMenuAccessibilityLabel: String,

    appName: String,
    serviceName: String,
    shortDescr: String,

    loggedIn: Boolean,

    loginUrl: String,
    loginLabel: String,

    loginHelpUrl: String,
    loginHelpLabel: String,

    noLoginYetLabel: String,
    registerUrl: String,
    registerLabel: String,

    loginSettingsLabel: String,
    loginSettingsUrl: String,
    hideLoginSettings: Boolean,

    logoutLabel: String,
    logoutUrl: String,

    userInfo: String,
    serviceLinks: String,
  },
};
</script>

<style>
.wrapper {
  margin: -1rem;
}

scale-telekom-app-shell {
  --min-height: 200vh;
  --background: var(--telekom-color-background-surface-subtle);
}
</style>
