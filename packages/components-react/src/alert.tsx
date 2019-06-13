import * as React from 'react'
require('@telements/styles/dist/alert.css');

interface Props {
	children?: any;
	context?: string;
}

export const Alert: React.SFC<Props> = ({ children, context }) => (
	<div className={`alert ${context !== '' ? `alert--${context}` : ''}`}>
		{children}
	</div>
)
