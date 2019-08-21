import { newSpecPage } from '@stencil/core/testing';
import { Card } from './card';

describe('Card', () => {
	let element;
	beforeEach(async () => {
		element = new Card()
	});

	it('should match snapshot', async () => {
		const page = await newSpecPage({
			components: [Card],
			html: `<t-card>Label</t-card>`,
		});
		expect(page.root).toMatchSnapshot();
    });

    it('should match snapshot with image', async () => {
		const page = await newSpecPage({
			components: [Card],
			html: `<t-card image-top="http://placehold.it/400x300">A title</t-card>`,
		});
		expect(page.root).toMatchSnapshot();
    });

	it('should have a default css class', () => {
		expect(element.getCssClassMap()).toBe('card');
	})

    it('should handle size css class', () => {
		element.size = 'small'
		expect(element.getCssClassMap()).toContain('card--size-small');
    })
    
    it('should handle theme css class', () => {
		element.theme = 'default';
		expect(element.getCssClassMap()).toContain('card--theme-default');
    })
    
    it('should handle variant css class', () => {
		element.variant = 'primary';
		expect(element.getCssClassMap()).toContain('card--variant-primary');
    })
    
    it('should handle disabled css class', () => {
        element.disabled = true;
		expect(element.getCssClassMap()).toContain('card--disabled');
    })
    
    it('should handle deselected css class', () => {
		element.deselected = true;
		expect(element.getCssClassMap()).toContain('card--deselected');
	})
});

