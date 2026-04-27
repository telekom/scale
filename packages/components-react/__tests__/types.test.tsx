/**
 * Type-level test for Scale React wrapper components.
 * This file is type-checked only (tsc --noEmit), never executed.
 * It verifies that generated React wrappers expose Stencil @Prop() as React props.
 */

import {
  ScaleAlert,
  ScaleButton,
  ScaleTag,
  ScaleTextField,
  ScaleSwitch,
  ScaleCheckbox,
  ScaleSlider,
  ScaleProgressBar,
  ScaleCollapsible,
  ScaleDropdownSelect,
  ScaleDropdownSelectItem,
  ScaleRadioButton,
  ScaleRadioButtonGroup,
  ScaleDatePicker,
  ScaleTextarea,
  ScaleRatingStars,
  ScaleTelekomHeader,
  ScaleTelekomNavItem,
} from "../dist/index";
import React from "react";

// Helper: assert that a JSX expression is valid (compile-time only)
function expectValidJSX(_jsx: React.ReactElement): void {}

// --- ScaleAlert ---
expectValidJSX(<ScaleAlert variant="informational" opened headline="Test" />);
expectValidJSX(<ScaleAlert icon="info" size="small" />);

// --- ScaleButton ---
expectValidJSX(<ScaleButton variant="secondary" size="small" disabled />);
expectValidJSX(<ScaleButton type="submit">Submit</ScaleButton>);

// --- ScaleTag ---
expectValidJSX(<ScaleTag size="small" color="green">Active</ScaleTag>);
expectValidJSX(<ScaleTag dismissable type="strong" />);

// --- ScaleTextField ---
expectValidJSX(<ScaleTextField label="Name" value="John" required />);
expectValidJSX(<ScaleTextField label="Email" type="email" helperText="Enter email" />);

// --- ScaleSwitch ---
expectValidJSX(<ScaleSwitch label="Dark Mode" checked />);

// --- ScaleCheckbox ---
expectValidJSX(<ScaleCheckbox label="Accept terms" checked />);
expectValidJSX(<ScaleCheckbox indeterminate disabled />);

// --- ScaleSlider ---
expectValidJSX(<ScaleSlider label="Volume" min={0} max={100} value={50} showValue innerAriaValueText="50%" />);

// --- ScaleProgressBar ---
expectValidJSX(<ScaleProgressBar percentage={75} percentageStart={0} showStatus />);

// --- ScaleCollapsible ---
expectValidJSX(<ScaleCollapsible expanded><div>Content</div></ScaleCollapsible>);

// --- ScaleDropdownSelect + Item ---
expectValidJSX(
  <ScaleDropdownSelect label="Choose" value="a">
    <ScaleDropdownSelectItem value="a" selected>Option A</ScaleDropdownSelectItem>
    <ScaleDropdownSelectItem value="b">Option B</ScaleDropdownSelectItem>
  </ScaleDropdownSelect>
);

// --- ScaleRadioButtonGroup + ScaleRadioButton ---
expectValidJSX(
  <ScaleRadioButtonGroup label="Choice">
    <ScaleRadioButton label="Option 1" value="1" checked />
    <ScaleRadioButton label="Option 2" value="2" />
  </ScaleRadioButtonGroup>
);

// --- ScaleDatePicker ---
expectValidJSX(<ScaleDatePicker label="Start date" value="2026-01-01" />);

// --- ScaleTextarea ---
expectValidJSX(<ScaleTextarea label="Message" rows={5} required />);

// --- ScaleRatingStars ---
expectValidJSX(
  <ScaleRatingStars
    size="large"
    rating={4}
    max={5}
    label="Rating"
    ariaLabelTranslation="$value out of $max"
    disabled={false}
    hideLabel={false}
    readonly={false}
  />
);

// --- ScaleTelekomHeader ---
expectValidJSX(
  <ScaleTelekomHeader appName="My App" appNameLink="/">
    <div>Nav</div>
  </ScaleTelekomHeader>
);

// --- ScaleTelekomNavItem ---
expectValidJSX(<ScaleTelekomNavItem active><a href="/">Home</a></ScaleTelekomNavItem>);

// --- Negative tests: unknown props should NOT compile ---
// @ts-expect-error — nonExistentProp is not a valid prop
expectValidJSX(<ScaleAlert nonExistentProp="x" />);

// @ts-expect-error — nonExistentProp is not a valid prop
expectValidJSX(<ScaleButton nonExistentProp={42} />);
