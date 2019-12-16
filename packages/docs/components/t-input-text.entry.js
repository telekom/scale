import { r as registerInstance, d as createEvent, h } from './core-9beb9895.js';
import { c as classNames } from './index-3d967629.js';

const defaultValidator = {
    // tslint:disable-next-line: variable-name
    validate: (_x) => true,
};
function combineValidators(v1, v2) {
    let combined;
    combined = {
        validate: (x) => {
            const res1 = v1.validate(x);
            const res2 = v2.validate(x);
            if (!res1) {
                combined.errorMessage = v1.errorMessage;
            }
            else if (!res2) {
                combined.errorMessage = v2.errorMessage;
            }
            return res1 && res2;
        },
    };
    return combined;
}

var ValidatorName;
(function (ValidatorName) {
    ValidatorName["text"] = "text";
    ValidatorName["number"] = "number";
    ValidatorName["email"] = "email";
    ValidatorName["length"] = "length";
})(ValidatorName || (ValidatorName = {}));
function LengthValidator(min, max) {
    return {
        validate: (value) => {
            value = value ? value : '';
            if (min && max) {
                return min <= value.length && value.length <= max;
            }
            if (min) {
                return min <= value.length;
            }
            if (max) {
                return value.length <= max;
            }
            return true;
        },
        errorMessage: min && max
            ? `You must enter between ${min} and ${max} characters`
            : min
                ? `You must enter at least ${min} characters`
                : max
                    ? `You must enter less then ${max} characters`
                    : '',
    };
}
const TextValidator = {
    validate: (value) => {
        return !!(value && value.length > 0);
    },
    errorMessage: 'You must provide a text entry',
};
const NumberValidator = {
    validate: (value) => {
        return !!(value && !isNaN(Number(value.toString())));
    },
    errorMessage: 'You must provide a number entry',
};
const EmailValidator = {
    validate: (value) => {
        // TODO: add proper email validation
        return !!(value && value.includes('@'));
    },
    errorMessage: 'You must provide a valid email',
};

function getValidator(list) {
    return (list || [])
        .map(validator => {
        if (typeof validator === 'string') {
            return validatorFactory(validator, null);
        }
        else if (validator && validator.name) {
            validator = validator;
            return validatorFactory(validator.name, validator.options);
        }
        else {
            return validator;
        }
    })
        .reduce(combineValidators, defaultValidator);
}
function validatorFactory(name, options) {
    options = options || {};
    switch (name) {
        case ValidatorName.text:
            return TextValidator;
        case ValidatorName.number:
            return NumberValidator;
        case ValidatorName.email:
            return EmailValidator;
        case ValidatorName.length:
            return LengthValidator(options.min, options.max);
        default:
            return defaultValidator;
    }
}

const InputText = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.touched = false;
        // tslint:disable-next-line: variable-name
        this._validator = defaultValidator;
        this.changed = createEvent(this, "changed", 7);
    }
    componentWillLoad() {
        this._validator = getValidator(this.validator);
    }
    componentWillUpdate() {
        this._validator = getValidator(this.validator);
    }
    handleChange(event) {
        this.value = event.target ? event.target.value : null;
        this.changed.emit(this.value);
        this.touched = true;
    }
    render() {
        return (h("div", { class: this.getCssClassMap() }, h("input", { type: "text", class: "input-text__input", value: this.value, onInput: event => this.handleChange(event) }), this.touched && !this._validator.validate(this.value) ? (h("span", { class: "input-text__validation" }, this._validator.errorMessage)) : null));
    }
    getCssClassMap() {
        return classNames('input-text', this.theme && `input-text--theme-${this.theme}`);
    }
    static get style() { return ".input-text {\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-direction: column;\n  flex-direction: column;\n}\n\n.input-text__input {\n  border: var(--input-text-border, 1px solid #dfdfdf);\n  border-radius: var(--input-text-border-radius, 4px);\n  padding: var(--input-text-padding, 0.5rem);\n  font-size: var(--input-text-font-size, 16px);\n  font-family: var(--input-text-font-family, inherit);\n}\n\n/*\n * TODO: implement accessability\n * -----------------------------\n * Once the user starts tabbing it probably\n * means that a screen-reader is required\n */\n\n.input-text:not(.tabbing):focus {\n  outline: 0;\n}\n\n.input-text__validation {\n  font-size: var(--input-text-validation-font-size, 12px);\n  opacity: var(--input-text-validation-opacity, 0.7);\n  margin: var(--input-text-validation-margin, 0.5rem 0 0 0);\n  color: var(--input-text-validation-color, red);\n}"; }
};

export { InputText as t_input_text };
