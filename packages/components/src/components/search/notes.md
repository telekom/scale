# Search

## Features

- Input field
- Input prefix icon
- Input suffix icon-button
- Results
- Result group header
- Result group action
- Result item
- Result item search string highlight
- Result item supporting text
- Result item prefix icon
- Result item suffix icon button
- Result no result
- Filtering mechanism

## Component's responsibility

- Input field
- Input prefix icon
- Results
- Result group header
- Result item
- Result item search string highlight
- Result item supporting text
- Result item prefix icon
- Result no result

## Application developer responsibility

- Input suffix icon-button
- Result group action
- Result item suffix icon button
- Filtering mechanism

## Most common use-case layer could take care of the following most common use-cases:

- Input suffix icon-button (clear input) - should be default, possible to override behaviour!
- Result group action - no default behaviour, add on feature, no common use-case yet
- Result item suffix icon button (remove item) - no default behaviour, add on feature, no common use-case yet
- Filtering/searching mechanism (usage docs pointing to an example reference implementation)

## Storybook

- recent search example
- usage text should mention startswith, contains and different filtering strategies
- example of no list-box but just a search input which can be submitted