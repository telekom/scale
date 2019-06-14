import * as React from 'react';
import classnames from 'classnames';
require('@telements/styles/dist/button.css');

interface Props {
	className?: string;
	style?: object;
	theme?: string;
	ariaLabel?: string;
	size?: string;
	variant?: string;
	accessKey?: string;
	autoFocus?: boolean;
	tabIndex?: number;
	disabled?: boolean;
	deselected?: boolean;
	children?: any;
	onClick?: (event: React.MouseEvent) => void;
	[key: string]: any;
}

export const Button: React.SFC<Props> = (props) => {
	const {
		className,
		style,
		theme,
		size,
		variant,
		disabled,
		accessKey,
		autoFocus,
		tabIndex,
		deselected,
		ariaLabel,
		children,
		onClick,
	} = props;

	const excludedProps = {
		ariaLabel,
		deselected,
		theme,
		size,
		variant
	}

	const excludeProps = (p: Props) => {
		const copy = {...p}
		Object.keys(p).forEach(k => {
			if (excludedProps[k]) {
				delete copy[k]
			}
		})
		return copy;
	}

	return (
		<button
			className={classnames(
				'button',
				size ? `button--size-${size}` : '',
				variant ? `button--variant-${variant}` : '',
				theme ? `button--theme-${theme}` : '',
				disabled ? `button--disabled` : '',
				deselected ? `button--deselected` : '',
				className
			)}
			style={style}
			disabled={disabled}
			accessKey={accessKey}
			autoFocus={autoFocus}
			tabIndex={tabIndex}
			aria-label={ariaLabel}
			onClick={event => onClick && onClick(event)}
			{...excludeProps(props)}
		>
			{children}
		</button>
	)
}
