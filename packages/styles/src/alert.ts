import { css } from "./util";

export const alert = css`
	.alert {
		box-sizing: border-box;
		background: #eee;
		color: #333;
		width: 100%;
		padding: 1rem;
		text-align: left;
	}

	.alert--primary {
		background: blue;
		color: #fff;
	}

	.alert--secondary {
		background: #eee;
		color: #333;
	}

	.alert--warning {
		background: orange;
		color: #fff;
	}

	.alert--danger {
		background: red;
		color: #fff;
	}

	.alert--success {
		background: green;
		color: #fff;
	}

	.alert--info {
		background: lightblue;
		color: #fff;
	}
`
