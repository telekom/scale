import React from "react"
import './component-dependencies.css'

export const ComponentDependencies = ({componentDocs}) => {
	if (!componentDocs) {
		return null
	}

	const {dependents, dependencies, dependencyGraph} = componentDocs
	const hasDependents = componentDocs && dependents && dependents.length !== 0
	const hasDependencies = componentDocs && dependencies && dependencies.length !== 0
	const hasDependencyGraph = componentDocs && dependencyGraph && JSON.stringify(dependencyGraph) !== "{}"

	if (!hasDependents && !hasDependencies && !hasDependencyGraph) {
		return null
	}

	return (
		<div className="components__dependencies">
			<h2>Dependencies</h2>
			{hasDependents && (
				<div>
					<h3>Used by</h3>
					{dependents.map((dependent, index) => (
						<div key={index}>
							<a href={`../${dependent.replace('scale-', '')}`}>
								{dependent}
							</a>
						</div>
					))}
				</div>
			)}
			{hasDependencies && (
				<div>
					<h3>Depends on</h3>
					{dependencies.map((dependency, index) => (
						<div key={index}>
							<a href={`../${dependency.replace('scale-', '')}`}>
								{dependency}
							</a>
						</div>
					))}
				</div>
			)}
			{/* {hasDependencyGraph && (
				<div>
					<h3>Dependency graph</h3>
					<div>
						{JSON.stringify(dependencyGraph, null, 4)}
					</div>
				</div>
			)} */}
		</div>
	)
}
