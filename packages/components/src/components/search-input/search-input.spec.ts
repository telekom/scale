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
import { SearchInput } from './search-input';

describe('Search', () => {
  let page;
  const TEST_VALUE = 'Test Value';
  beforeEach(async () => {
    page = await newSpecPage({
      components: [SearchInput],
      html: ` <scale-search-input>
                <scale-icon-action-search slot="prefix-icon"></scale-icon-action-search>
                <scale-icon-button size="medium" slot="suffix-icon">
                  <scale-icon-action-microphone
                    size="24"
                    accessibility-title="microphone" />
                </scale-icon-button>
              </scale-search-input>`,
    });
  });

  it('should match snapshot', async () => {
    expect(page.root).toMatchSnapshot();
  });

  it('should reflect attributes/props being set', async () => {
    const specPage = await newSpecPage({
      components: [SearchInput],
      html: `<scale-search-input
                name="search_name"
                invalid="true"
                max-length="2"
                min-length="1"
                placeholder="placeholder"
                disabled="true"
                required="true"
                value="value"
                input-id="input-search1"
                transparent="true"
                aria-detailed-id="id"
               >
                <scale-icon-action-search slot="prefix-icon"></scale-icon-action-search>
                <scale-icon-button size="medium" slot="suffix-icon">
                  <scale-icon-action-microphone
                    size="24"
                    accessibility-title="microphone" />
                </scale-icon-button
             ></scale-search-input>`,
    });

    expect(specPage.rootInstance.name).toBe('search_name');
    expect(specPage.rootInstance.invalid).toBe(true);
    expect(specPage.rootInstance.maxLength).toBe(2);
    expect(specPage.rootInstance.minLength).toBe(1);
    expect(specPage.rootInstance.placeholder).toBe('placeholder');
    expect(specPage.rootInstance.disabled).toBe(true);
    expect(specPage.rootInstance.required).toBe(true);
    expect(specPage.rootInstance.value).toBe('value');
    expect(specPage.rootInstance.inputId).toBe('input-search1');
    expect(specPage.rootInstance.ariaDetailedId).toBe('id');
  });

  it('should handle maxLength prop', async () => {
    page.root.maxLength = 15;
    await page.waitForChanges();
    expect(page.rootInstance.maxLength).toBe(15);
  });

  it('should handle minLength prop', async () => {
    page.root.minLength = 5;
    await page.waitForChanges();
    expect(page.rootInstance.minLength).toBe(5);
  });
});
