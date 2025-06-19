<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Telekom Brand Header & Navigation</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

The brand header identifies our brand and the purpose of a website in seconds. It makes Telekom websites instantly recognizable and ensures a consistent experience for all our products and services.

## General

The brand header is the core component for carrying our customers into the world of Deutsche Telekom. The logo on a Magenta background clearly identifies our brand. When scrolling down the page on desktops, the brand bar reduces in size, leaving room for navigation and content.

## Basic types

<br/>

### Standard

The standard brand header contains all available elements and Telekom links. Scrolling hides the meta navigation and language selector.

![Image Name](assets/3_components/beta-brand-header/1_EN_brandheader_brandbar_standard.png)

### Slim

The slim brand header contains neither the meta navigation nor the language selector. Scrolling only reduces the height of the component.

![Image Name](assets/3_components/beta-brand-header/2_EN_brandheader_brandbar_slim.png)

### Subtle

The subtle brand header has no main navigation or features and is pinned to the top of the screen. It doesn’t use a shadow to stand out from the page content or change when scrolling.

![Image Name](assets/3_components/beta-brand-header/3_brandheader_brandbar_subtle.png)

## Elements

![Image Name](assets/3_components/brand-header/4_brandheader_brandbar_elements.jpg)

#### Brand area with logo (1) (required)

The logo and Magenta background are required for any Telekom webpage and can’t be changed. By default, the logo is linked to the Telekom homepage or the entry point into the current process.

#### Portal name (2) (optional)

Name of the product or service.

#### External meta navigation (3) (optional)

Place other global links to Telekom destinations outside the current website here and enable switching between private and business customers.

#### Internal meta navigation (4) (optional)

Internal links (e.g., settings and contact).

#### Language selector (5) (optional)

Use country abbreviations as links if there are only a few languages. If the content is available in more than three languages, use a dropdown (not yet available in this component).

#### Primary navigation (6)

The primary navigation contains all items from the first navigation level.

#### Functions (7)

Global functions such as search, shopping cart, or login are listed here. The login is always on the right side. If possible, add a label to the icons.

#### Profile Menu (8)

Provides the options for logging in and out, along with related features such as registration or links to services.

## Size

Different sizes are defined for the various break points.

## Navigation

### Mega menu

The mega menu is suitable for a flat information architecture. It offers a good overview within a category, but the depth is limited to three levels.

![Image Name](assets/3_components/beta-brand-header/5_brandheader_nav4_megamenu.png)

### Dropdown navigation

<div style="display: flex; width: 100%; border-radius: 3px; background-color: rgb(241, 241, 239); padding: 16px 16px 14px 20px;">
    <div style="padding-top:1px">
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="24px"><path fill-rule="evenodd" d="M12 1c6.1 0 11 4.9 11 11s-4.9 11-11 11S1 18.1 1 12 5.9 1 12 1zm0 1.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm1 8V17h-2v-6.5h2zm-1-4A1.25 1.25 0 1112 9a1.25 1.25 0 010-2.5z"></path></svg>
    </div>
    <div style="margin-top: 4px;">
        **This component will be available soon.**
    </div>
</div>

![Image Name](assets/3_components/beta-brand-header/brandheader_dropdown_menu.png)

The dropdown navigation can accommodate several levels of navigation and different depths within a navigation tree. As a general rule, the less levels the better.

### Mobile navigation

Small viewports only have one type of navigation.

![Image Name](assets/3_components/beta-brand-header/6_brandheader_nav_mobile.png)

### Profile Menu

The profile menu allows users to log in and out. It should be integrated into all services that use the Telekom Login.

#### Logged out

In the logged-out state, a brief description explains what functions are available after logging in. In addition to the button that leads to the login mask, there are additional links to a help page and the registration process.

![](assets/3_components/brand-header/BrandHeader-LoggedOut.png)

#### Logged in

In the logged-in state, the icon gets a green badge and the first name of the logged-in person can be read. In addition to the option to log out, various Telekom services can optionally be displayed.

![](assets/3_components/brand-header/BrandHeader-LoggedIn.png)

## Beta components

This component is still in the beta phase. When testing it, keep in mind that it may not have gone through all quality control measures, and it may not yet have WCAG accessibility certification. There may be changes to this component in the future.

## Related components

- [Breadcrumb](?path=/usage/components-breadcrumb--standard)
- [Sidebar Navigation](?path=/usage/components-sidebar-navigation--standard)
- [Tab Navigation](?path=/usage/components-tab-navigation--text-icon)
- [Accordion](?path=/usage/components-accordion--standard)
- [Profile Menu](?path=/docs/components-telekom-brand-header-navigation--profile-menu-logged-out)
