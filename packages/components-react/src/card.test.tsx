import * as React from 'react';
import { Card } from './card';

it('renders a card', () => {
	const element = <Card>Here I am</Card>
	expect(element).toBeTruthy();
});
