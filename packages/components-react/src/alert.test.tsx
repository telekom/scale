import * as React from 'react';
import { Alert } from './alert';

it('renders an alert', () => {
	const element = <Alert>Some info</Alert>
	expect(element).toBeTruthy();
});
