<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Brand Header & Navigation</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

<div style="display: flex; width: 100%; border-radius: 3px; background-color: rgb(241, 241, 239); padding: 16px 16px 14px 20px; margin-top: 16px; margin-bottom: 32px;">
    <div style="padding-top: 8px">
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="24px"><path fill-rule="evenodd" d="M12 1c6.1 0 11 4.9 11 11s-4.9 11-11 11S1 18.1 1 12 5.9 1 12 1zm0 1.5c-5.25 0-9.5 4.25-9.5 9.5s4.25 9.5 9.5 9.5 9.5-4.25 9.5-9.5-4.25-9.5-9.5-9.5zm1 8V17h-2v-6.5h2zm-1-4A1.25 1.25 0 1112 9a1.25 1.25 0 010-2.5z"></path></svg>
    </div>
    <div style="margin-top: 3px;">
        The Brand Header is available in a new [beta version](?path=/docs/beta-components-telekom-brand-header-navigation--standard) . Once quality control is complete and WCAG accessibility certification is in place, the new component will become the official Telekom brand header.
    </div>
</div>

The brand header identifies our brand and the purpose of a website in seconds. It makes Telekom websites instantly recognizable and ensures a consistent experience for all our products and services.

## General

The brand header is made up of the brand bar and the navigation bar. It is the core component for carrying our customers into the world of Deutsche Telekom. The brand bar with Magenta background clearly identifies our brand. The navigation bar provides the most important navigation elements and core functions for the website.

## Brand bar

The brand bar contains our logo and slogan, metalinks, and other functions. When scrolling down the page on desktops, the brand bar reduces in size, leaving room for navigation and content. The logo changes position and appears in the navigation bar. The entire header remains fixed at the top of the screen. When scrolling back up, the initial state is restored. Minimizing the brand header is a typical feature and works the same way on all devices.

![Image Name](assets/3_components/brand-header/EN_brandheader_brandbar.png)

#### Telekom logo (1)

The logo and Magenta background are required for any Telekom webpage and cannot be changed. The logo should always link to the homepage or the entry point of the current process.

#### Personal/business switch (2)

If the website for your product includes personal and business sections, use this element to link to the respective start pages. An underline marks the current page as active.

#### Brand links (3)

Place other global links to Telekom destinations outside the current website here.

#### Language switch (4)

> Available soon

With the language switch, users can select the desired language for the website. We offer two variants: simple text links or a dropdown.

## Language switch variants

### Plain text links

If there is enough space and only a few language versions, you can place the language options as side-by-side text links. The current language selection is not displayed.

![Image Name](assets/3_components/brand-header/EN-brandheader_language01.png)

### Dropdown

Use a dropdown with country code for more than four languages or if there is not enough space.

![Image Name](assets/3_components/brand-header/EN-brandheader_language02.png)

### Portal name

> Available soon

If you do not offer personal and business sections, you can display the portal name instead. This provides orientation for the user.

![Image Name](assets/3_components/brand-header/EN_brandheader_portalname.png)

## Navigation bar

The navigation bar is the central guiding element and point of orientation for our websites. On the left side, it includes the most important navigation items, from left to right. Product-specific core functions are on the right side. Each element in the navigation bar is a direct link to a new page or opens a dropdown.

![Image Name](assets/3_components/brand-header/EN_brandheader_navbar.png)

#### Primary navigation (1)

The primary navigation contains all items from the first navigation level.

#### Meta navigation (2)

The meta navigation contains the core or global functions for the website, e.g., search, shopping cart, or login. The login is always on the right side.

## Navigation types

Decide on one navigation type which fits the complexity of the information architecture.

### One page

The navigation items give the site structure and serve as jump labels.

![Image Name](assets/3_components/brand-header/EN-brandheader_nav1_onepage.png)

### Websites without a submenu

For websites with only one level of hierarchy, the user clicks on a menu item to navigate directly to the content.

![Image Name](assets/3_components/brand-header/EN-brandheader_nav2_nosubmenu.png)

### Dropdown

> Available soon

The dropdown navigation can accommodate several levels of navigation and different depths within a navigation tree. As a general rule, the less levels the better.

![Image Name](assets/3_components/brand-header/EN_brandheader_navi3_dropdown.png)

### Mega menu

The mega menu is suitable for a flat information architecture. It offers a good overview within a category, but the depth is limited to three levels.

![Image Name](assets/3_components/brand-header/EN_brandheader_nav4_megamenu.png)

## Mobile navigation

To give the content more space, the navigation automatically minimizes after the user opens the website.

![Image Name](assets/3_components/brand-header/EN_brandheader_nav_mobile.png)

#### Initial navigation (1)

The initial state only displays the brand bar with logo and slogan.

#### Navigation minimized (2)

The core functions are still displayed at the top level. The main navigation, the personal/business switch, and the Telekom links are combined under the menu icon.

#### Navigation open (3)

By clicking the menu icon, the user opens a list view with all items from the first level of hierarchy. The personal and business section tabs are in the first position, followed by a list with the navigation points for the first level of hierarchy. The language selection is at the bottom of the list.
Websites without subpages (only one page) do not have navigation. On these pages, the user navigates by scrolling.

#### Navigation level 3 (4)

Depending on how many levels of hierarchy there are, the user navigates through further lists to the desired content.

## Related components

[Breadcrumb, ](?path=/usage/components-breadcrumb--standard)
[Sidebar Navigation, ](?path=/usage/components-sidebar-navigation--standard)
[Tab Navigation, ](?path=/usage/components-tab-navigation--text-icon)
[Accordion](?path=/usage/components-accordion--standard)
