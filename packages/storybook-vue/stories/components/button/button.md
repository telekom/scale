<div style="display: inline-flex; align-items: center; justify-content: space-between; width: 100%;">
    <h1>Button</h1>
    <img src="assets/aa.png" alt="Accessible AA" />
</div>

Buttons offer the most important interaction options on the user interface. The user clicks to take the corresponding action.

## General

We provide two button types to support a clear visual hierarchy. Using icons creates an additional point of emphasis. Select the button type and variant based on the context.

![Image Name](assets/3_components/button/button.png)

### When to use

Use a button if users can perform an action or navigate to an important page (e.g., a landing page). Each viewport should contain no more than one primary button to communicate the most important action and provide orientation. For less important actions, use a secondary button.

### When not to use

We usually don't use buttons as navigation elements. For leading the user to a new page, use a text link instead.

## Basic types

The primary and secondary buttons are our basic types.

### Primary

The primary button is a core element for brand recognition. We recommend using it only for the main call to action on a page to strengthen the visual hierarchy of the content and functionality (except in the app header or a modal dialog).

![Image Name](assets/3_components/button/Button_Primary.png)

### Secondary

The secondary button has less emphasis than the main call to action. Use it for all other actions a user might want to perform. With its outline and transparent background, it is suitable for colorful backgrounds.

![Image Name](assets/3_components/button/Button_Secondary.png)

### Secondary White

![Image Name](assets/3_components/button/button-secondary-white.png)

### Ghost Button

![Image Name](assets/3_components/button/button-ghost.png)

## Variants

### Text only

In most cases, buttons with text provide the best guidance.

![Image Name](assets/3_components/button/Button_Textonly.png)

### Text & icon

Add an icon to clarify and highlight the button's action.

![Image Name](assets/3_components/button/Button_Icon-Text.png)

### Icon only

In certain cases, you can also use an icon without text, for example when space is limited and an icon unmistakably communicates the button's action. If you use an icon only button, always provide a text label for screen readers.

![Image Name](assets/3_components/button/Button_Icon-only.png)

## Button sizes

We typically use the large button to ensure a good visual balance between the content and button. In special cases, you might not have enough space, so we also offer a smaller variant.

![Image Name](assets/3_components/button/button-sizes.png)

## Disabled state

When disabled, the interactive function of the button is removed. Use this state if an interaction is not allowed due to permissions or dependencies.

![Image Name](assets/3_components/button/button-disabled.png)

> The disabled state is exempt from the WCAG contrast minimum for text colors. You can find more information in the [WCAG guidelines](https://www.w3.org/TR/WCAG21/#contrast-minimum).

## Elements

#### Button label

The button label communicates a clear request. It explicitly describes the action a user takes when clicking. The button label contains at most three words. To provide a clear context, use a verb plus noun. To increase the motivation to subscribe or register, and similar cases, we add the word “now”. You can find more information in the guideline <a href="https://www.brand-design.telekom.com/en/articles/button-texts-and-text-links/" target="_blank">Button Texts and Text Links</a> in Brand & Design.

![Image Name](assets/3_components/button/Button_Label.png)

#### Icon

To learn more about the usage and construction of our interface icons, read our guideline <a href="https://www.brand-design.telekom.com/en/articles/i/icons-for-user-interfaces/" target="_blank">Icons for User Interfaces</a> in Brand & Design.

![Image Name](assets/3_components/button/Button_Icons.png)

## Best practice

### Button groups

If buttons are directly related to each other, align them as a group. Use only one primary button for each button group.
In processes and modal dialogs, buttons are aligned to the right to indicate progress. The button farthest to the right is the primary button; the secondary button is placed on the left. In forms, we align buttons to the left side of the form content. The primary button is placed on the left and the secondary button on the right.

![Image Name](assets/3_components/button/button-best-practice.png)

### Icon & text label

Icons make it easier to grasp information when positioned in the right place. Following the direction of reading, we place icons to the left of the text label. However, there is one exception: a Next button with an arrow. In this case, we place the icon on the right side to help people process the information intuitively.

![Image Name](assets/3_components/button/button-best-practice2.png)

## Related components

[Link, ](?path=/usage/components-link--standard)
[Icon](?path=/usage/components-icon--standard)
