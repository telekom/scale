<template>
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
</template>

<script>
export default {
  props: {
    appName: String,
    appNameLink: String,
    userInfo: String,
    serviceLinks: String,
    loggedIn: Boolean,
  }
};
</script>

<style>
</style>
