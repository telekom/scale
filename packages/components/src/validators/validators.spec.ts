import {
  LengthValidator,
  RequiredValidator,
  NumberValidator,
  EmailValidator,
} from './validators';

const resultFormat = (result: any) =>
  `Should return ${result.result} for "${result.value}"`;

describe('LengthValidator', () => {
  const results: Array<{
    min: number;
    max: number;
    value: string;
    result: boolean;
  }> = [
    { min: null, max: null, value: 'ok', result: true },
    { min: null, max: null, value: '', result: true },
    { min: null, max: 2, value: 'ok', result: true },
    { min: null, max: 2, value: 'too long', result: false },
    { min: null, max: 2, value: 't', result: true },
    { min: 4, max: null, value: 'ok', result: false },
    { min: 4, max: null, value: 'good', result: true },
    { min: 4, max: null, value: 'longer', result: true },
    { min: 3, max: 5, value: 'ok', result: false },
    { min: 3, max: 5, value: 'too long', result: false },
    { min: 3, max: 5, value: 'good', result: true },
  ];

  results.forEach(result =>
    it(`${resultFormat(result)} with min: ${result.min} and max: ${
      result.max
    }`, () => {
      expect(
        LengthValidator(result.min, result.max).validate(result.value)
      ).toEqual(result.result);
    })
  );
});

describe('RequiredValidator', () => {
  const results: Array<{ value: string; result: boolean }> = [
    { value: 'ok', result: true },
    { value: '', result: false },
  ];

  results.forEach(result =>
    it(resultFormat(result), () => {
      expect(RequiredValidator.validate(result.value)).toEqual(result.result);
    })
  );
});

describe('NumberValidator', () => {
  const results: Array<{ value: string; result: boolean }> = [
    { value: '12334', result: true },
    { value: 'heu11212', result: false },
    { value: '', result: false },
  ];

  results.forEach(result =>
    it(resultFormat(result), () => {
      expect(NumberValidator.validate(result.value)).toEqual(result.result);
    })
  );
});

describe('EmailValidator', () => {
  const results: Array<{ value: string; result: boolean }> = [
    { value: 'a@b.de', result: true },
    { value: 'a.de', result: false },
    { value: '', result: false },
  ];

  results.forEach(result =>
    it(resultFormat(result), () => {
      expect(EmailValidator.validate(result.value)).toEqual(result.result);
    })
  );
});
