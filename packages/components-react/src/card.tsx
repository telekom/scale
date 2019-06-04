import * as React from 'react'
require('@telements/styles/dist/card.css');

export const Card: React.SFC<{}> = ({ children }) => (
	<div className="card">
		<div className="card__body">
			{children}
		</div>
	</div>
)
