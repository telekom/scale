import { LitElement, customElement, html, css, unsafeCSS } from "lit-element";
import { button } from '@telements/styles';

const styles = css`
	:host {}
	${unsafeCSS(button)}
`

@customElement('t-button')
export class Button extends LitElement {
	render() {
		return html`
      <style>${styles}</style>
			<button class="button">
				<slot></slot>
			</button>
		`}

}

export default Button;
