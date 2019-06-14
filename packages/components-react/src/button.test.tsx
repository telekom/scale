import * as React from 'react';
import { Button } from './button';

it('renders a button', () => {
	const element = <Button>Click me!</Button>
	expect(element).toBeTruthy();
});
