import { component } from "./util";

export default {
	button: component('button', `
			<button class="button">
				Default
			</button>
		`),

	buttonSuccess: component('button--success', `
			<button class="button button--success">
				Default
			</button>
		`),
}
