# Spacing

Spacing is an important — and often overlooked — part of visual design. Scale takes a lot of the guesswork out of spacing to help designers deliver clear, functional layouts.

## Spacing scale

Use the spacing units when building individual components. They include small increments needed to create appropriate spatial relationships for detail-level designs.

| variable name    | px  | rem    | example                                                    |
| ---------------- | --- | ------ | ---------------------------------------------------------- |
| --scl-spacing-1  | 1   | 0.0625 | <scale-sb-spacing style="width: 1px;"></scale-sb-spacing>  |
| --scl-spacing-2  | 2   | 0.125  | <scale-sb-spacing style="width: 2px;"></scale-sb-spacing>  |
| --scl-spacing-4  | 4   | 0.25   | <scale-sb-spacing style="width: 4px;"></scale-sb-spacing>  |
| --scl-spacing-8  | 8   | 0.5    | <scale-sb-spacing style="width: 8px;"></scale-sb-spacing>  |
| --scl-spacing-12 | 12  | 0.75   | <scale-sb-spacing style="width: 12px;"></scale-sb-spacing> |
| --scl-spacing-16 | 16  | 1      | <scale-sb-spacing style="width: 16px;"></scale-sb-spacing> |
| --scl-spacing-24 | 24  | 1.5    | <scale-sb-spacing style="width: 24px;"></scale-sb-spacing> |
| --scl-spacing-32 | 32  | 2      | <scale-sb-spacing style="width: 32px;"></scale-sb-spacing> |

## Layout scale

The layout units arrange components and other UI parts into a full-page layout. Their larger increments control the density of a design. Use the smaller spacing tokens to create dense compositions and direct relationships. Use the larger tokens to increase the amount of white space and to separate sections.

| variable name    | px  | rem | example                                                    |
| ---------------- | --- | --- | ---------------------------------------------------------- |
| --scl-spacing-16 | 16  | 1   | <scale-sb-spacing style="width: 16px;"></scale-sb-spacing> |
| --scl-spacing-24 | 24  | 1.5 | <scale-sb-spacing style="width: 24px;"></scale-sb-spacing> |
| --scl-spacing-32 | 32  | 2   | <scale-sb-spacing style="width: 32px;"></scale-sb-spacing> |
| --scl-spacing-40 | 40  | 2.5 | <scale-sb-spacing style="width: 40px;"></scale-sb-spacing> |
| --scl-spacing-48 | 48  | 3   | <scale-sb-spacing style="width: 48px;"></scale-sb-spacing> |
| --scl-spacing-64 | 64  | 4   | <scale-sb-spacing style="width: 64px;"></scale-sb-spacing> |
| --scl-spacing-80 | 80  | 5   | <scale-sb-spacing style="width: 80px;"></scale-sb-spacing> |

## Designing with space

Every part of a UI — including the empty space between elements — should be intentional. The amount of space between items creates relationships and hierarchy.

### Creating relationships

Users consider elements that are near each other to be meaningfully related. As the space between elements increases, their perceived relationship weakens.

Patterns in spacing can also create relationships. Users see elements with the same spacing pattern as related pieces that have equal weight.

Space can also denote groups of associated information. This creates content sections on a page without having to use lines or other graphical elements as a divider.

### Creating hierarchy

Elements with more space tend to convey a greater importance than elements with less space. Take this page for instance: The top-level headers have more space around them, which gives them focus and prominence. Then, as the headers descend in importance, they receive less space, which signals that they are subordinate.

Users can easily overlook elements that are close to each other. While users may be aware of the grouping, they may not process each individual item. Therefore, if a page has content or an element of high importance, consider giving it extra surrounding space to help it attract focus.

### White space

Empty space — also known as white space — is important in design. It can break up sections on a page or help add focus to certain elements. White space also helps with information processing, since too much dense information can be disorienting or overwhelming for a user. Individual sections of a UI are allowed to be dense, but the whole page should never be crowded; there should always be white space to give the user’s eye some rest.
