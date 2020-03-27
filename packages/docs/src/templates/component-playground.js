import React, {useEffect, useRef} from "react"
import './component-playground.css'

export const ComponentPlayground = ({ComponentName, componentProps, componentState, componentDocs, setComponentState}) => {
	const ref = useRef(null)

  useEffect(() => {
    if (ref && ref.current ) {
      ref.current.styles = componentState.styles
    }
	}, [componentState])

	return (
		<div className="playground">
			<h2>Playground</h2>
				<div className="playground__preview">
					<div>
						{ComponentName.startsWith('scale-') && (
							<ComponentName ref={ref} {...componentProps}>{componentState.children || 'Label'}</ComponentName>
						)}
					</div>
				</div>
				<div className="playground__controls">
					<div key={'children'}>
						<div className="control__label">Label</div>
						<input className="control__input" value={componentState.children} name="children" onChange={e => setComponentState({...componentState, children: e.target.value})} />
					</div>
					{componentDocs && componentDocs.props && componentDocs.props.map(prop => {
						if (prop.attr === 'variant') {
							return (
								<div key={prop.attr}>
									<div className="control__label">{prop.attr}</div>
									<select value={componentState[prop.name]} onChange={e => setComponentState({...componentState, [prop.name]: e.target.value})}>
										<option value="primary">Primary</option>
										<option value="secondary">Secondary</option>
										<option value="danger">Danger</option>
										<option value="success">Success</option>
										<option value="error">Error</option>
									</select>
								</div>
							)
						} else if (prop.type === 'string') {
							return (
								<div key={prop.attr}>
									<div className="control__label">{prop.attr}</div>
									<input className="control__input" value={componentState[prop.name]} name={prop.name} onChange={e => setComponentState({...componentState, [prop.name]: e.target.value})} />
								</div>
							)
						} else if (prop.type === 'number') {
							return (
								<div key={prop.attr}>
									<div className="control__label">{prop.attr}</div>
									<input className="control__input" value={componentState[prop.name]} name={prop.name} type="number" onChange={e => setComponentState({...componentState, [prop.name]: e.target.value})} />
								</div>
							)
						} else if (prop.type === 'boolean') {
							return (
								<div key={prop.attr}>
									<div className="control__label">{prop.attr}</div>
									<select value={componentState[prop.name]} onChange={e => setComponentState({...componentState, [prop.name]: e.target.value})}>
										<option value="true">True</option>
										<option value="false">False</option>
									</select>
								</div>
							)
						}
						return null
					})}
				</div>
				<div>
				{componentDocs && componentDocs.props && componentDocs.props.map(prop => {
					if (prop.type === 'StyleSheet<string | number | symbol>') {
							return (
								<div className="playground__styles" key={prop.name}>
									<div className="control__label">{prop.name}</div>
									<textarea
										className="control__input"
										name={prop.name}
										onChange={e => setComponentState({...componentState, [prop.name]: e.target.value} )}
									>
									</textarea>
									<button onClick={() => {
										setComponentState({
											...componentState,
											styles: JSON.parse(componentState.styles)
										})
									}}>
										Apply style
									</button>
								</div>
							)
						}
					})}
				</div>
		</div>
	)
}
