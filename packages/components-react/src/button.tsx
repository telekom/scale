import * as React from 'react';
import classnames from 'classnames';
require('@telements/styles/dist/button.css');

interface Props {
	className?: string;
	style?: object;
	theme?: string;
	ariaLabel?: string;
	size?: string;
	look?: string;
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
		look,
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
		look
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
				look ? `button--look-${look}` : '',
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
