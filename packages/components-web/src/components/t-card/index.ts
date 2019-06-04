import { LitElement, customElement, html, css, unsafeCSS } from "lit-element";
import { card } from '@telements/styles/src';

const styles = css`
	:host {
		box-sizing : border-box;
	}
	${unsafeCSS(card)}
`

@customElement('t-card')
export class Card extends LitElement {
	render() {
		return html`
      <style>${styles}</style>
			<div class="card">
				<div class="card__body">
					<slot></slot>
				</div>
			</div>
		`}

}

export default Card;
