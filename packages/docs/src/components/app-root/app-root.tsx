import '@stencil/router';
import { RouterHistory } from '@stencil/router';
import { Component, Element, Listen, State, h } from '@stencil/core';
import SiteProviderConsumer, { SiteState } from '../../global/site-provider-consumer';
import '@stencil/yahara';


@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css'
})
export class AppRoot {
  history?: RouterHistory;
  elements = [
    'site-header',
    'site-menu',
    'app-burger',
    'main'
  ];

  @Element() el!: HTMLElement;

  @State() isLeftSidebarIn: boolean = false;
  @State() isModalOpen: boolean = false;

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768 && this.isLeftSidebarIn) {
        this.isLeftSidebarIn = false;
        document.body.classList.remove('no-scroll');
        this.elements.forEach((el) => {
          this.el.querySelector(el)!.classList.remove('left-sidebar-in');
        });
      }
    });
  }

  @Listen('toggleModal')
  handleToggleModal(ev: CustomEvent) {
    this.isModalOpen = ev.detail;
  }

  private setHistory = ({ history }: { history: RouterHistory }) => {
    if (!this.history) {
      this.history = history;
    }
  }

  componentDidLoad() {
    this.isLeftSidebarIn = false;
  }

  private toggleLeftSidebar = () => {
    if (window.innerWidth >= 768) {
      return;
    }
    const elements = this.elements
      .map(el => this.el.querySelector(el))
      .filter(el => !!el) as Element[];

    if (this.isLeftSidebarIn) {
      this.isLeftSidebarIn = false;
      document.body.classList.remove('no-scroll');
      elements.forEach(el => {
        el.classList.remove('left-sidebar-in');
        el.classList.add('left-sidebar-out');
      });
    } else {
      this.isLeftSidebarIn = true;
      document.body.classList.add('no-scroll');
      elements.forEach(el => {
        el.classList.add('left-sidebar-in');
        el.classList.remove('left-sidebar-out');
      });
    }
  }

  render() {
    const siteState: SiteState = {
      isLeftSidebarIn: this.isLeftSidebarIn,
      toggleLeftSidebar: this.toggleLeftSidebar
    };

    return (
      <SiteProviderConsumer.Provider state={siteState}>
        <site-header />
        <main>
          <stencil-router scrollTopOffset={0}>
            <stencil-route style={{ display: 'none' }} routeRender={this.setHistory} />
            <stencil-route-switch>
              <stencil-route url="/" component="landing-page" exact={true} />
              <stencil-route url="/docs/:pageName" routeRender={({ match }) => (
                <doc-component page={match!.url}></doc-component>
              )} />
            </stencil-route-switch>
          </stencil-router>
          <footer>
            <div class="container">
              <div class="footer-col">
                <span>Telements</span>
                <p>© 2019 Telekom. Released under MIT License</p>
              </div>
            </div>
          </footer>
        </main>
      </SiteProviderConsumer.Provider>
    );
  }
}
