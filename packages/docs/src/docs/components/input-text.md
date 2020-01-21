---
title: Input Text
description: Input Text element
url: /docs/input-text
contributors:
  - SylviaGonschior
---

# Input Text

Input Text component

selector: `t-input-text`

## Default

```javascript
<t-input-text></t-input-text>
```

<div class="demo-container">
  <t-input-text></t-input-text>
</div>

## With required validator

```javascript
<t-input-text id="input-required-validator"></t-input-text>
```

<div class="demo-container">
  <t-input-text id="input-required-validator"></t-input-text>
  <script>
        const inputRequiredValidator = document.getElementById(
            'input-required-validator'
        );
        inputRequiredValidator.validator = ['required'];
  </script>
</div>

## With number validator

```javascript
<t-input-text id="input-number-validator"></t-input-text>
```

<div class="demo-container">
  <t-input-text id="input-number-validator"></t-input-text>
  <script>
        const inputNumberValidator = document.getElementById(
            'input-number-validator'
        );
        inputNumberValidator.validator = ['number'];
  </script>
</div>

## With Email validator

```javascript
<t-input-text id="input-email-validator"></t-input-text>
```

<div class="demo-container">
  <t-input-text id="input-email-validator"></t-input-text>
  <script>
        const inputEmailValidator = document.getElementById(
            'input-email-validator'
        );
        inputEmailValidator.validator = ['email'];
  </script>
</div>

## With multiple validator

```javascript
<t-input-text id="input-multiple-validators"></t-input-text>
```

<div class="demo-container">
  <t-input-text id="input-multiple-validators"></t-input-text>
  <script>
        const inputMultipleValidators = document.getElementById(
            'input-multiple-validators'
        );
        inputMultipleValidators.validator = [
            'required',
            'email', {
                name: 'length',
                options: {
                    min: 6,
                },
            },
        ];
    </script>
</div>
