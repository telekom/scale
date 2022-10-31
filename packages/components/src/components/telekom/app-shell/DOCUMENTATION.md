# Telekom Brand Header Demonstration

The brand header allows users to clearly identify Telekom as the sender of a page. It contains the navigation elements for the first level information architecture.

## Contents

|                               | description                                                 |
| ----------------------------- | ----------------------------------------------------------- |
| www                           | a folder which contains the source code and a usage example |
| README.txt                    | general introduction                                        |
| DOCUMENTATION.md              | this documentation                                          |
| Brand Header Prototype.webloc | Hyperlink to a working preview of the code                  |

## Live Example

https://telekom.github.io/scale-header/

## How to run locally

A simple way to do that is to install [Node.js](https://nodejs.org/en/) and do the following:

- open a terminal inside the `www` folder
- run `npx serve`
- open `http://localhost:5000` using a web browser

---

Another option is to install [Docker](https://www.docker.com/get-started) and execute the following commands:

- open a terminal inside the `www` folder
- download the official nginx image by running `docker pull nginx`
- execute `docker run -p 5000:80 -v $(pwd):/usr/share/nginx/html nginx`
- open `http://localhost:5000` using a web browser

## How to customize

In order to change the content of your page, replace the children of the scale-app-shell element:

```html
<scale-app-shell id="app">
  <!--- This is your main page content  --->
  <div class="block">One</div>
  <div class="block">Two</div>
</scale-app-shell>
```

To edit the menu options you can go ahead and change the example configuration objects provided:

- `app.mainNavigation`
- `app.iconNavigation`
- `app.sectorNavigation`
- `app.addonNavigation`

In order to highlight the active route and/or sector you have to set the `app.activeRouteId` and/or `app.activeSectorId` configuration option to the matching configuration item's `id` property.

To customize the mobile menu labels, add and entry to `app.iconNavigation` with the id `menu`:

```js
{
  id: 'menu',
  defaultName: 'Menü',
  openedName: 'Schließen',
},
```

In case you want a custom callback to be fired on click of a menu item, you can have a configuration item similar to the one below:

```js
{
  name: "Smartphone-Tarife",
  href: "/#smartphone-tarife",
  onClick: (event) => {
    event.preventDefault();
    this.$router.push("/");
  }
},
```
