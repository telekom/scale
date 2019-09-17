import { newSpecPage } from '@stencil/core/testing';
import { Toast } from './toast';

describe('Toast', () => {
	let element;
	beforeEach(async () => {
		element = new Toast();
		jest.useFakeTimers();
		jest.mock('date-fns');
	});
	
	const components = [Toast];

	const timeStamp = 1540035262000;

	it('should match snapshot', async () => {
		const page = await newSpecPage({
			components,
			html: `<t-toast>Toast message</t-toast>`
		});
		expect(page.root.shadowRoot).toBeTruthy();
		expect(page.root).toMatchSnapshot();
	});


	it('should close the Toast', () => {
		expect(element.opened).toBe(undefined);
		element.onCloseToast();
		expect(element.opened).toBe(false);
	});

	it('should open the Toast', () => {
		expect(element.opened).toBe(undefined);
		element.openToast();
		expect(element.opened).toBe(true);
	});

	it('should hide the toast', () => {
		element.autohide = true;
		element.onHideToast();

		expect(setTimeout).toHaveBeenCalledTimes(1);
		expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), element.autohideTime);
	});

	it('should have a default css class', () => {
		expect(element.getCssClassMap()).toBe('toast');
	})

	it('should handle custom css class', () => {
		element.customClass = 'custom-class';
		expect(element.getCssClassMap()).toContain('custom-class');
	})

	it('should handle size css class', () => {
		element.size = 'small';
		expect(element.getCssClassMap()).toContain('toast--size-small');
	})

	it('should handle theme css class', () => {
		element.theme = 'default';
		expect(element.getCssClassMap()).toContain('toast--theme-default');
	})

	it('should handle variant css class', () => {
		element.variant = 'primary';
		expect(element.getCssClassMap()).toContain('toast--variant-primary');
	})

	it('should render with default timeformat', () => {
	element.time = timeStamp; 
	element.getTime();

	expect(element.time).toBe(timeStamp);
	})
});

