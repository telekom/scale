import React from "react"
import { Table } from './component-table'
import './component-events.css'

export const ComponentEvents = ({componentDocs}) => {
	const structure = [
		{
			title: 'Description',
			value: prop => prop.docs
		},
		{
			title: 'Event',
			value: prop => prop.event
		},
		{
			title: 'Type',
			value: prop => `CustomEvent<${prop.detail}>`
		},
		{
			title: 'Bubbles',
			value: prop => prop.bubbles ? 'true' : 'false'
		},
		{
			title: 'Cancelable',
			value: prop => prop.cancelable ? 'true' : 'false'
		},
		{
			title: 'Composed',
			value: prop => prop.composed ? 'true' : 'false'
		},
	]

	if (!componentDocs || !componentDocs.events || componentDocs.events.length === 0) {
		return null
	}

	return (
		<div className="components__events">
			<h2>Events</h2>
			<Table
				structure={structure}
				values={componentDocs.events}
			/>
		</div>
	)
}
