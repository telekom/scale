import { Validator } from './validator';

export enum ValidatorName {
  required = 'required',
  number = 'number',
  email = 'email',
  length = 'length',
}

export function LengthValidator(min: number, max: number): Validator<string> {
  return {
    validate: (value: string) => {
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
    errorMessage:
      min && max
        ? `You must enter between ${min} and ${max} characters`
        : min
          ? `You must enter at least ${min} characters`
          : max
            ? `You must enter less then ${max} characters`
            : '',
  };
}

export const RequiredValidator: Validator<string> = {
  validate: (value: string) => {
    return !!(value && value.length > 0);
  },
  errorMessage: 'You must provide an entry',
};

export const NumberValidator: Validator<string> = {
  validate: (value: string | number) => {
    return !!(value && !isNaN(Number(value.toString())));
  },
  errorMessage: 'You must provide a number entry',
};

export const EmailValidator: Validator<string> = {
  validate: (value: string) => {
    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return reg.test(value.toLowerCase());
  },
  errorMessage: 'You must provide a valid email',
};
