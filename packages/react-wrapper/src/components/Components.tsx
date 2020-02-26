import * as React from 'react'
import WebComponentWrapper from './Wrapper'

const Card = (props: any) => <WebComponentWrapper component="t-card" {...props} />
const Button = (props: any) => <WebComponentWrapper component="t-button" {...props} />
const Input = (props: any) => <WebComponentWrapper events={{ onChanged: 'changed' }} component="t-input" {...props} />
const InputGroup = (props: any) => <WebComponentWrapper component="t-input-group" {...props} />
const InputLabel = (props: any) => <WebComponentWrapper component="t-input-label" {...props} />
const InputError = (props: any) => <WebComponentWrapper component="t-input-error" {...props} />

export {
	Button,
	Card,
	Input,
	InputGroup,
	InputLabel,
	InputError
}
