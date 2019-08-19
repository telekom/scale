import { newSpecPage } from '@stencil/core/testing';
import { Alert, defaultTimeout } from './alert';

describe('Alert', () => {
	let element;
	beforeEach(async () => {
		element = new Alert();
		jest.useFakeTimers();
	});

	it('should match snapshot', async () => {
		const page = await newSpecPage({
			components: [Alert],
			html: `<t-alert>Notifications</t-alert>`,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('should compile', () => {
		expect(element).toBeTruthy();
	});

	it('should close the alert', () => {
		expect(element.opened).toBe(undefined);
		element.onCloseAlert();
		expect(element.opened).toBe(false);
	});

	it('should open the alert', () => {
		expect(element.opened).toBe(undefined);
		element.open();
		expect(element.opened).toBe(true);
	});

	it('should open the alert without timeout', () => {

	});

	it('should closed the alert after default timeout', () => {
		element.timeout=true;
		element.onCloseAlertWithTimeout();

		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), defaultTimeout);
	});

	it('should closed the alert after set timeout', () => {
		element.timeout=500;
		element.onCloseAlertWithTimeout();

		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 500);
	})

	it('should have a default css class', () => {
		expect(element.getCssClassMap()).toBe('alert');
	})

	it('should handle size css class', () => {
		element.size = 'small'
		expect(element.getCssClassMap()).toContain('alert--size-small');
	})

	it('should handle theme css class', () => {
		element.theme = 'default'
		expect(element.getCssClassMap()).toContain('alert--theme-default');
	})

	it('should handle variant css class', () => {
		element.variant = 'primary'
		expect(element.getCssClassMap()).toContain('alert--variant-primary');
	})
});

