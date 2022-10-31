<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Card</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

A card shows a brief summary of a topic. This makes it easier for users to find relevant information and understand it quickly.

## General

Cards can hold any kind of content in a flexibly sized container. One card communicates one message. A card is an independent piece of content that requires no additional context.

![Image Name](assets/3_components/card/cards_general.png)

### When to use

Cards are best suited to:

- to present content in an easily understandable way to encourage users to take a closer look at pages (e.g., shop, social media, etc.) and
- to provide content summaries (for example in dashboards).

### When not to use

Don't use cards:

- soley as an aesthetic element or
- as purely navigational elements.

## Basic types

### Card with an interactive container

A card acts as a preview and point of entry for more detailed information. The entire card is clickable.

![Image Name](assets/3_components/card/card-interactive.png)

### Card with a static container

For different card types (with and without a following page, with and without additional interactive elements, etc.), only use cards in static containers within an entire website. This way, you can handle all the content flexibly.

Example 1.

Even if the card container itself is not interactive, the card can contain interactive elements such as functions or text links to related information.

![Image Name](assets/3_components/card/cards-static-bsp1.png)

Example 2.

The headline should be clickable if the card serves as a preview and point of entry for more detailed information.

![Image Name](assets/3_components/card/cards-static-bsp2.png)

## Layout

### Card Padding

By default, a card has padding to align the typography and visual elements. If you want, you can place images in the bleed.

![Image Name](assets/3_components/card/cards-padding.png)

## Accessibility

### General

So users can immediately recognize a card, the content needs to visually form a compact unit. It is especially important that cards without pictures are immediately recognizable as one topic. A helpful tip: install the free screen reader NVDA. Once you’re familiar with how it works, close your eyes and test for yourself whether the screen reader clearly reads your cards in their entirety.

### Navigating with a keyboard

Functionality must always be accessible via the keyboard. If you offer several additional interactions, make sure to label them concisely and definitively, so users can focus on and operate them with the keyboard in the proper order.

### Screen reader

If an image on the card is purely for design purposes, mark it with an empty alternative text (alt = " "). If the image contains relevant information, use an appropriate alt text. This way, the information is also accessible to blind users with screen readers. You can find information on correct alt texts here:

https://bik-fuer-alle.de/alternativtexte-fuer-grafiken.html

https://www.barrierefreies-webdesign.de/knowhow/textalternative/herausforderung.html

## Best practice

### Decide on one type of card

Decide whether you want to use cards with an interactive or static container in your product or service. Never mix card types, because doing so is confusing for users.

### Be consistent

Always display content of the same type (e.g., blogposts, products, or events) with the same structure. This provides a balanced appearance so users can easily compare content.

### Design your own card

The card component offers the flexibility to design cards according to our principles for different use cases.
