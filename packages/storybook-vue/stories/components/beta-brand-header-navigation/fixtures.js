export const addonNavigation = [
  { name: "Telekom Shops", id: "Telekom Shops", href: "#telekom-shops" },
  { name: "Contact", id: "Contact", href: "#contact" }
];

export const userNavigation = [
  {
    type: 'userInfo',
    shortName: 'Alexander',
    name: 'Alexander Dreyer',
    email: 'alexander.dreyer@t-online.de',
  },
  {
    type: 'divider',
  },
  {
    type: 'item',
    name: 'Customer Care',
    id: 'customer-care',
    href: 'https://www.telekom.de/kundencenter/startseite',
    onClick: () => {},
    icon: 't-product-measure-internet-speed',
    iconPosition: 'prefix'
  },
  {
    type: 'item',
    name: 'Login Settings',
    id: 'login-settings',
    href: 'https://account.idm.telekom.com/account-manager/index.xhtml',
    onClick: () => {},
    icon: 'service-settings',
    iconPosition: 'prefix'
  },
  {
    type: 'divider',
  },
  {
    type: 'item',
    name: 'Optional Link',
    id: 'optional-link',
    href: '#optional-link',
    onClick: () => {},
  },
  {
    type: 'divider',
  },
  {
    type: 'button',
    name: 'Logout',
    id: 'logout',
    onClick: () => {
      console.log('button click');
    },
    href: 'https://accounts.login.idm.telekom.com/sessionmessage/logout',
    variant: 'secondary',
  },
]

export const mainNavigation = [
  {
    name: "Topic One",
    id: "Topic One",
    children: [
      {
        name: "Second Level",
        id: "Second Level 3",
        children: [
          {
            name: "Third Level",
            id: "Third Level 4",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 5",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 6",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 7",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 8",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 9",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 10",
            href: "#third-level"
          }
        ]
      },
      {
        name: "Second Level",
        id: "Second Level 4",
        children: [
          {
            name: "Third Level",
            id: "Third Level 11",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 12",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 13",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 14",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 15",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 16",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 17",
            href: "#third-level"
          }
        ]
      },
      {
        name: "Second Level",
        id: "Second Level 5",
        children: [
          {
            name: "Third Level",
            id: "Third Level 18",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 19",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 20",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 21",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 22",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 23",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 24",
            href: "#third-level"
          }
        ]
      },
      {
        name: "Second Level",
        id: "Second Level 6",
        children: [
          {
            name: "Third Level",
            id: "Third Level 25",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 26",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 27",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 28",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 29",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 30",
            href: "#third-level"
          }
        ]
      },
      {
        name: "Second Level",
        id: "Second Level 7"
      }
    ]
  },
  {
    name: "Topic Two",
    id: "Topic Two",
    children: [
      {
        name: "Second Level",
        id: "Second Level 1",
        children: [
          {
            name: "Third Level",
            id: "Third Level 1",
            href: "#third-level"
          },
          {
            name: "Third Level",
            id: "Third Level 2",
            href: "#third-level"
          }
        ]
      },
      {
        name: "Second Level",
        id: "Second Level 2",
        children: [
          {
            name: "Third Level",
            id: "Third Level 3",
            href: "#third-level"
          }
        ]
      }
    ]
  },
  {
    name: "Topic Three",
    id: "Topic Three",
    href: "#topic-three"
  },
  {
    name: "Topic Four",
    id: "Topic Four",
    href: "#topic-four"
  },
  {
    name: "Topic Five",
    id: "Topic Five",
    href: "#topic-five"
  }
];
export const mainNavigationFlyout = [
  {
    name: "Cascading Menu Item",
    id: "Cascading Menu Item",
    children: [
      {
        name: "Item One",
        id: "Item One"
      },
      {
        name: "Item Two",
        id: "Item Two"
      },
      {
        name: "More Options",
        id: "More Options 5",
        children: [
          {
            name: "Option 1",
            id: "Option 1 18",
            href: "#third-level"
          },
          {
            name: "Option 2",
            id: "Option 2 19",
            href: "#third-level"
          },
          {
            name: "Option 3",
            id: "Option 3 20",
            href: "#third-level"
          },
          {
            name: "Even more",
            id: "Even more 20",
            children: [
              {
                name: "Option 1",
                id: "Option 1 21",
                href: "#fourth-level"
              },
              {
                name: "Option 2",
                id: "Option 2 22",
                href: "#fourth-level"
              },
              {
                name: "Very Specific Options",
                id: "Very Specific Option 1 23",
                children: [
                  {
                    name: "Option 1",
                    id: "Option 1 23",
                    href: "#fifth-level"
                  },
                  {
                    name: "Option 2",
                    id: "Option 2 23",
                    href: "#fifth-level"
                  },
                  {
                    name: "Option 3",
                    id: "Option 3 23",
                    href: "#fifth-level"
                  },
                ]
              },
            ]
          },

        ]
      },
    ]
  },
  {
    name: "Custom Item #1",
    id: "Custom Item #1",
  },
  {
    name: "Custom Item #2",
    id: "Custom Item #2",
  },
];
export const iconNavigation = [
  { name: "Search", id: "Search35", href: "#search", icon: "action-search" },
  { name: "Cart", id: "Cart36", href: "#cart", icon: "action-shopping-cart" },
  { id: "menu", defaultName: "Menu", openedName: "Close" }
];

export const sectorNavigation = [
  { name: "Personal", id: "Personal38", href: "#personal" },
  { name: "Business", id: "Business39", href: "#business" }
];

export const footerNavigation = [
  {
    name: "Contact",
    id: "Contact",
    href: "#contact"
  },
  {
    name: "Terms and conditions",
    id: "Terms and conditions",
    href: "#terms-and-conditions"
  },
  {
    name: "Legal notice",
    id: "Legal notice",
    href: "#legal-notice"
  },
  {
    name: "Data privacy",
    id: "Data privacy",
    href: "#data-privacy",
    icon: "alert-imprint-dataprivacy"
  }
];
