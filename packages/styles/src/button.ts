import { css } from ".";

export const button = css`
	.button {
		color: var(--button-color, black);
		background: var(--button-background-color, white);
		border: var(--button-border, 1px solid black);
		border-color: var(--button-border-color, black);
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
		transition: background 0.2s, border 0.2s, color 0.2s;
		cursor: pointer;
		user-select: none;
	}

	.button:before {
		content: '';
		display: block;
		height: 100%;
		width: var(--button-letter-spacing, 0);
	}

	.button:hover,
	.button.active {
		color: var(--button-color-hover);
		background: var(--button-background-color-hover);
		border-color: var(--button-border-color-hover);
		transition: all .2s ease-in-out;
		text-decoration: none;
		outline: none;
	}


	/* TODO: implement accessability */

	.button:not(.tabbing):focus {
		outline: 0;
	}
`
