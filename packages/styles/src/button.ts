import { css, theme } from "./util";
import classnames from 'classnames';

const { colors } = theme();

interface ClassNames {
	size?: string;
	variant?: string;
	theme?: string;
	disabled?: boolean;
	deselected?: boolean;
	className?: string;
}

export const buttonClassNames = ({
	size,
	variant,
	theme,
	disabled,
	deselected,
	className
}: ClassNames) => classnames(
	'button',
	size ? `button--size-${size}` : '',
	variant ? `button--variant-${variant}` : '',
	theme ? `button--theme-${theme}` : '',
	disabled ? `button--disabled` : '',
	deselected ? `button--deselected` : '',
	className
)

export const button = css`
	.button {
		color: var(--button-color, ${colors.black});
		background: var(--button-background-color, ${colors.white});
		border: var(--button-border, 1px solid ${colors.black});
		border-color: var(--button-border-color, ${colors.black});
		border-radius: var(--button-border-radius, 0);
		padding: var(--button-padding, 0.25rem 1rem);
		box-shadow: var(--button-box-shadow, none);
		line-height: var(--button-line-height, 2rem);
		font-family: var(--button-font-family, unset);
		font-size: var(--button-font-size, unset);
		font-weight: var(--button-font-weight, 400);
		text-transform: var(--button-text-transform, initial);
		letter-spacing: var(--button-letter-spacing, 0);
		position: relative;
		display: inline-flex;
		justify-content: center;
		align-items: center;
		flex-shrink: 0;
		vertical-align: middle;
		text-align: center;
		transition: all 0.2s;
		cursor: pointer;
		user-select: none;
	}

	/*
	 * NOTE: Only tested in Chrome and Safari
	 * --------------------------------------
	 * This compensates for missing left alignment
	 * when letter-spacing is applied
	 */
	.button:before {
		content: '';
		display: block;
		height: 100%;
		width: var(--button-letter-spacing, 0);
	}

	.button:hover,
	.button.active {
		color: var(--button-color-hover, ${colors.white});
		background: var(--button-background-color-hover, ${colors.black});
		border: var(--button-border, 1px solid ${colors.black});
		border-color: var(--button-border-color-hover, ${colors.black});
		border-radius: var(--button-border-radius, 0);
		padding: var(--button-padding, 0.25rem 1rem);
		box-shadow: var(--button-box-shadow, none);
		line-height: var(--button-line-height, 2rem);
		font-size: var(--button-font-size, unset);
		font-weight: var(--button-font-weight, 400);
		transition: all .2s ease-in-out;
		text-decoration: none;
		outline: none;
	}

	/*
	 * TODO: implement accessability
	 * -----------------------------
	 * Once the user starts tabbing it probably
	 * means that a screen-reader is required
	 */

	.button:not(.tabbing):focus {
		outline: 0;
	}
`
