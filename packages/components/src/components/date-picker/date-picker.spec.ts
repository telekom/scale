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

jest.mock('@duetds/date-picker/custom-element', () => ({
  DuetDatePicker: class {},
}));

import { DatePicker } from './date-picker';

describe('DatePicker', () => {
  it('updates value state when the nested input is not ready', () => {
    const picker = {
      value: '2024-01-15',
      hasValue: false,
      duetInput: { querySelector: () => null },
    } as unknown as DatePicker;

    expect(() => DatePicker.prototype.onValueChange.call(picker)).not.toThrow();
    expect(picker.hasValue).toBe(true);
  });
});
