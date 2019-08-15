import { newSpecPage } from '@stencil/core/testing';
import { Button } from './button';

describe('Button', () => {
	let element;
	beforeEach(async () => {
		element = new Button()
	});

	it('should match snapshot', async () => {
		const page = await newSpecPage({
			components: [Button],
			html: `<t-button>Label</t-button>`,
		});
		expect(page.root).toMatchSnapshot();
	});

	it('should compile', () => {
		expect(element).toBeTruthy();
	});

	it('should disable the button', () => {
		expect(element.disabled).toBe(false);
		element.disable();
		expect(element.disabled).toBe(true);
	});

	it('should enable the button', () => {
		element.disable();
		expect(element.disabled).toBe(true);
		element.enable();
		expect(element.disabled).toBe(false);
	});

	it('should have a default css class', () => {
		expect(element.getCssClassMap()).toBe('button');
	})

	it('should handle size css class', () => {
		element.size = 'small'
		expect(element.getCssClassMap()).toContain('button--size-small');
	})

	it('should handle theme css class', () => {
		element.theme = 'default'
		expect(element.getCssClassMap()).toContain('button--theme-default');
	})

	it('should handle variant css class', () => {
		element.variant = 'primary'
		expect(element.getCssClassMap()).toContain('button--variant-primary');
	})

	it('should handle disabled css class', () => {
		element.disabled = true
		expect(element.getCssClassMap()).toContain('button--disabled');
	})

	it('should handle deselected css class', () => {
		element.deselected = true
		expect(element.getCssClassMap()).toContain('button--deselected');
	})
});

