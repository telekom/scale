import { Component, Element, Listen, State, h } from '@stencil/core';
import { themes } from '../../docs/themes/themes';

interface Theme {
  name: string;
  slug: string;
}

@Component({
  tag: 'site-header',
  styleUrl: 'site-header.css'
})
export class SiteHeader {
  @Element() el!: Element;

  @State() isMobileMenuShown: boolean = false;
  @State() selectedTheme: string = 'default';

  @Listen('resize', { target: 'window' })
  handleResize() {
    requestAnimationFrame(() => {
      if (window.innerWidth > 768) {
        const menu = (this.el.querySelector('.header-menu') as HTMLElement);
        menu.style.display = '';
        this.el.classList.remove('show-mobile-menu');
        document.body.classList.remove('no-scroll');
        this.isMobileMenuShown = false;
      }
    });
  }

  componentDidLoad() {
    this.isMobileMenuShown = false;
  }

  showNav() {
    if (this.isMobileMenuShown) return;
    this.isMobileMenuShown = true;

    const menu = (this.el.querySelector('.header-menu') as HTMLElement);

    menu.style.display = 'flex';
    setTimeout(() => {
      this.el.classList.add('show-mobile-menu');
      document.body.classList.add('no-scroll');
    }, 1)
  }

  hideNav() {
    if (!this.isMobileMenuShown) return;
    this.isMobileMenuShown = false;

    const menu = (this.el.querySelector('.header-menu') as HTMLElement);

    this.el.classList.remove('show-mobile-menu');
    setTimeout(() => {
      menu.style.display = 'none';
      document.body.classList.remove('no-scroll');
    }, 300)
  }

  selectTheme(event: any) {
    this.selectedTheme = event.target.value;
  }

  render() {
    return (
      <div class="container">
        <link href={`/themes/${this.selectedTheme}.css`} rel="stylesheet"></link>
        <stencil-route-link url="/" class="logo-link" anchorTitle="Stencil logo">
          <span>Telements</span>
        </stencil-route-link>

        <div class="header-menu">
          <stencil-route-link urlMatch="/docs" url="/docs/introduction" onClick={() => { this.hideNav() }}>
            Docs
          </stencil-route-link>

          <ul class="external-links list--unstyled">
            <li>
              <select name="theme" id="theme" onChange={this.selectTheme.bind(this)}>
                {themes.map((theme: Theme) => (
                  <option value={theme.slug} selected={this.selectedTheme === theme.slug}>{theme.name}</option>
                ))}
              </select>
            </li>
            <li>
              <a rel="noopener" class="link--external" target="_blank" href="https://github.com/telekom/telements">
                <app-icon name="github"></app-icon>
              </a>
            </li>
          </ul>

          <div class="header-close" onClick={() => { this.hideNav() }}>
            <app-icon name="close"></app-icon>
          </div>
        </div>

        <div class="header-overflow" onClick={() => { this.showNav() }}>
          <app-icon name="more"></app-icon>
        </div>
      </div>
    );
  }
}
