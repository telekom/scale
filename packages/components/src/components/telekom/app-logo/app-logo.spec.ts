/**
 * @license
 * Scale https://github.com/telekom/scale
 *
 * Copyright (c) 2021 Egor Kirpichev and contributors, Deutsche Telekom AG
 *
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 */

import { newSpecPage } from '@stencil/core/testing';
import { Logo } from './app-logo';

describe('AppLogo', () => {
  let page;
  let claimTruePage;
  beforeEach(async () => {
    page = await newSpecPage({
      components: [Logo],
      html: `<app-logo></app-logo>`,
    });
    claimTruePage = await newSpecPage({
      components: [Logo],
      html: `
          <app-logo
              claim=true
          ></app-logo>`,
    });
  });
  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should handle claim propertie', async () => {
    expect(claimTruePage.root).toMatchSnapshot();
  });

  it('should handle de language', async () => {
    const specPage = await newSpecPage({
      components: [Logo],
      html: `
            <app-logo
                claim=true
                claim-lang='de'
            ></app-logo>`,
    });
    expect(specPage.rootInstance.claimLang).toBe('de');
  });

  it('should emit on focus', async () => {
    expect(claimTruePage.root).toMatchSnapshot();
    const element = claimTruePage.doc.querySelector('a');
    window.scrollTo = jest.fn();
    await element.dispatchEvent(new Event('focus'));
    await claimTruePage.waitForChanges();
    expect(window.scrollTo).toBeCalled();
  });
});
