import { newSpecPage } from '@stencil/core/testing';
import { Alert } from './alert';

describe('Alert', () => {
	let element;
	beforeEach(async () => {
		element = new Alert();
		jest.useFakeTimers();
	});
	
	const components = [Alert];

	it('should match snapshot', async () => {
		const page = await newSpecPage({
			components,
			html: `<t-alert>Notifications</t-alert>`
		});
		expect(page.root).toMatchSnapshot();
	});

	it('should match snapshot when opened', async () => {
		const page = await newSpecPage({
			components,
			html: `<t-alert opened=true >Notifications</t-alert>`
		});
		expect(page.root.shadowRoot).toBeTruthy();
		expect(page.root).toMatchSnapshot();
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

	it('should not open the alert/ should not render, if the alert is already opened', () => {
		element.opened = true;
		expect(element.root).toBeFalsy();
	});

	// it('should open the alert without timeout', () => {
	// 	element.timeout=undefined;
	// 	element.onCloseAlertWithTimeout();

	// 	expect(setTimeout).toHaveBeenCalledTimes(1);
	// 	expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), null);
	// });

	it('should closed the alert after default timeout', () => {
		element.timeout=true;
		element.onCloseAlertWithTimeout();

		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), element.defaultTimeout);
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

	it('should handle custom css class', () => {
		element.customClass = 'custom-class';
		expect(element.getCssClassMap()).toContain('custom-class');
	})

	it('should handle size css class', () => {
		element.size = 'small';
		expect(element.getCssClassMap()).toContain('alert--size-small');
	})

	it('should handle theme css class', () => {
		element.theme = 'default';
		expect(element.getCssClassMap()).toContain('alert--theme-default');
	})

	it('should handle variant css class', () => {
		element.variant = 'primary';
		expect(element.getCssClassMap()).toContain('alert--variant-primary');
	})
});

