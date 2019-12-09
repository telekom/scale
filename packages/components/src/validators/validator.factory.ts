import {
  Validator,
  ValidatorEntry,
  defaultValidator,
  combineValidators,
} from './validator';
import {
  ValidatorName,
  TextValidator,
  NumberValidator,
  EmailValidator,
  LengthValidator,
} from './validators';

export function getValidator<A>(
  list: Array<string | ValidatorEntry | Validator<A>>
): Validator<A> {
  return (list || [])
    .map(validator => {
      if (typeof validator === 'string') {
        return validatorFactory(validator, null);
      } else if (validator && (validator as ValidatorEntry).name) {
        validator = validator as ValidatorEntry;
        return validatorFactory(validator.name, validator.options);
      } else {
        return validator as Validator<A>;
      }
    })
    .reduce(combineValidators, defaultValidator);
}

export function validatorFactory(name: string, options?: any): Validator<any> {
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
