import { Component, Element, State, h } from '@stencil/core';

@Component({
  tag: 'landing-page',
  styleUrl: 'landing-page.css'
})
export class LandingPage {
  @Element() el!: Element;

  @State() copiedState = 0;

  constructor() {
    document.title = `Stencil`;
  }

  render() {
    return (
      <div>
        <div class="hero container">
          <hgroup>
            <h1>Telements</h1>
            <p>The Telements library offers a set of customizable UI components written with Stencil.js & TypeScript. The default theme of the library can be easily replaced so that a corresponding corporate identity of a dedicated brand can be represented.</p>
            <yahr-button href="/docs/getting-started">Get started</yahr-button>
            <yahr-button variant="secondary" href="/docs/button">Components</yahr-button>
          </hgroup>
        </div>
      </div>
    );
  }
}
