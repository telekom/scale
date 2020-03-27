import React from "react"
import './component-table.css'

export const Table = ({structure, values}) => (
	<div className="component-table">
		<table>
			{structure && (
				<thead>
					<tr>
						{structure.map(({title}, index) => (
							<th key={index}>{title}</th>
						))}
					</tr>
				</thead>
			)}
			<tbody>
				{values.map((prop, index) => (
					<tr key={index}>
						{structure && structure.map(({value}, rowIndex) => (
							<td key={rowIndex}>{value(prop)}</td>
						))}
						{!structure && Object.keys(prop).map((row, index) => (
							<td key={index}>{prop[row]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	</div>
)
