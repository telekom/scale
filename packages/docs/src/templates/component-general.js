import React from "react"
import { Table } from './component-table'
import './component-general.css'

export const ComponentGeneral = ({componentDocs}) => {
	if (!componentDocs) {
		return null
	}
	const values = [
		{
			title: 'File path',
			value: componentDocs.filePath
		},
		{
			title: 'Shadow DOM',
			value: componentDocs.encapsulation === 'shadow' ? 'true' : 'false'
		},
		{
			title: 'Tag',
			value: `<${componentDocs.tag}>`
		}
	]

	return (
		<div className="components__general">
			<h2>General</h2>
			<Table values={values} />
		</div>
	)
}
