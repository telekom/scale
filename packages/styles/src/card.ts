import { css, rgba } from "./util";
import { theme } from "./theme";


const { colors } = theme();

export const card = css`
	.card {
		box-sizing: border-box;
		background: var(--card-background-color, ${colors.white});
		border-radius: 4px;
		width: 100%;
		max-width: 350px;
		box-shadow: var(--card-box-shadow, 0 2px 4px 0 ${rgba(colors.black, 0.12)});
		border: 1px solid var(--card-border-color, ${rgba(colors.black, 0.1)});
	}

	.card__body {
		padding: 1rem;
	}
`
