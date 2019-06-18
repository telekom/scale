import { LitElement, customElement, html, css, unsafeCSS } from "lit-element";
import { classMap } from 'lit-html/directives/class-map.js';
import { alert } from '@telements/styles';

const styles = css`
	:host {
		box-sizing : border-box;
		font-family: unset;
	}
	${unsafeCSS(alert)}
`

@customElement('t-alert')
export class Alert extends LitElement {
	context: string = '';

	static get properties() {
		return {
			context: { type: String },
		};
	}

	render() {
		const classes = {
			'alert': true,
			'alert--primary': this.context === 'primary',
			'alert--secondary': this.context === 'secondary',
			'alert--warning': this.context === 'warning',
			'alert--danger': this.context === 'danger',
			'alert--success': this.context === 'success',
			'alert--info': this.context === 'info',
		};

		return html`
      <style>${styles}</style>
			<div class=${classMap(classes)}>
				<slot></slot>
			</div>
		`}
}

export default Alert
