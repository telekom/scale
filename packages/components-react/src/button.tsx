import * as React from 'react';
import { removeFromObject as excludedProps } from '@telements/util';
import { buttonClassNames } from '@telements/styles';
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

	const blacklistedProps = {
		ariaLabel,
		deselected,
		theme,
		size,
		variant
	}

	return (
		<button
			className={buttonClassNames({
				size,
				variant,
				theme,
				disabled,
				deselected,
				className
			})}
			style={style}
			disabled={disabled}
			accessKey={accessKey}
			autoFocus={autoFocus}
			tabIndex={tabIndex}
			aria-label={ariaLabel}
			onClick={event => onClick && onClick(event)}
			{...excludedProps(props, blacklistedProps)}
		>
			{children}
		</button>
	)
}
