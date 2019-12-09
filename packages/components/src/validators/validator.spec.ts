import { defaultValidator, combineValidators } from "./validator";

describe('defaultValidator', () => {

	it('returns default validator', () => {
		const defaultValidatorMock = jest.fn(() => true);
		expect(defaultValidator.validate(defaultValidatorMock)).toEqual(true)
	})
});
