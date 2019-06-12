import { css } from ".";

export const card = css`
	.card {
		box-sizing: border-box;
		background: var(--card-background-color, #fff);
		border-radius: 4px;
		width: 100%;
		max-width: 350px;
		box-shadow: var(--card-box-shadow, 0 2px 4px 0 rgba(38, 38, 38, 0.12));
		border: 1px solid var(--card-border-color, rgba(0, 0, 0, 0.1));
	}

	.card__body {
		padding: 1rem;
	}
`
