import { newSpecPage } from '@stencil/core/testing';
import { Badge } from './badge';

describe('Badge', () => {
	let element;
	beforeEach(async () => {
		element = new Badge()
	});

	it('should match snapshot', async () => {
		const page = await newSpecPage({
			components: [Badge],
			html: `<t-badge>Label</t-badge>`,
		});
		expect(page.root).toMatchSnapshot();
    });


	it('should have a default css class', () => {
		expect(element.getCssClassMap()).toBe('badge');
	})

	it('should handle link css class', () => {
		element.link = 'http://example-url.com'
		expect(element.getCssClassMap()).toContain('badge--link');
})

	it('should handle size css class', () => {
		element.size = 'small'
		expect(element.getCssClassMap()).toContain('badge--size-small');
	})
	
	it("should have class variant primary", () => {
		element.variant = "primary";
		expect(element.getCssClassMap()).toContain("badge--variant-primary");
	  });

	it("should render pill badge", () => {
		element.pill = true;
		expect(element.getCssClassMap()).toContain("badge--pill");
	  });

});

