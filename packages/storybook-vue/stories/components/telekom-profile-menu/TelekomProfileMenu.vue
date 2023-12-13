<template>
  <div class="wrapper">
    <scale-telekom-app-shell>
      <scale-telekom-header slot="header" :app-name="appName">
        <scale-telekom-nav-list variant="functions" slot="functions" alignment="right" aria-label="Functions Menu">
          <telekom-profile-menu
            :app-name="appName"
            :label="label"
            :accessibility-label="accessibilityLabel"
            :close-menu-accessibility-label="closeMenuAccessibilityLabel"
            :service-name="serviceName"
            :service-description="serviceDescription"
            :login-label="loginLabel"
            :login-help-label="loginHelpLabel"
            :register-headline="registerHeadline"
            :register-label="registerLabel"
            :login-settings-label="loginSettingsLabel"
            :logout-label="logoutLabel"
            :logged-in="loggedIn"
            :user-info="userInfo"
            :service-links="serviceLinks"
            :login-url="loginUrl"
            :login-help-url="loginHelpUrl"
            :register-url="registerUrl"
            :login-settings-url="loginSettingsUrl"
            :hide-login-settings="hideLoginSettings"
            :logout-url="logoutUrl"
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
    serviceDescription: String,

    loggedIn: Boolean,

    loginUrl: String,
    loginLabel: String,

    loginHelpUrl: String,
    loginHelpLabel: String,

    registerHeadline: String,
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
