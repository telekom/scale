import React from "react"
import { Table } from './component-table'
import './component-methods.css'

export const ComponentMethods = ({componentDocs}) => {
	const structure = [
		{
			title: 'Description',
			value: prop => prop.docs
		},
		{
			title: 'Name',
			value: prop => prop.name
		},
		{
			title: 'Returns',
			value: prop => prop.returns.type
		},
		{
			title: 'Signature',
			value: prop => prop.signature
		},
		{
			title: 'Parameters',
			value: prop => JSON.stringify(prop.parameters, null, 4)
		},
	]

	if (!componentDocs || !componentDocs.methods || componentDocs.methods.length === 0) {
		return null
	}

	return (
		<div className="components__methods">
			<h2>Methods</h2>
			<Table
				structure={structure}
				values={componentDocs.methods}
			/>
		</div>
	)
}
