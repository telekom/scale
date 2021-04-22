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

let utils = require('../utils/utils.ts'); // tslint:disable-line
const testDiv = document.createElement('div');
testDiv.className = 'testclass';

describe('functions', () => {
  it('clamp() returns max if value > max', () => {
    expect(utils.clamp(11, 5, 10)).toBe(10);
  });
  it('clamp() returns min if value < min', () => {
    expect(utils.clamp(4, 5, 10)).toBe(5);
  });
  it('addListener is called with keydown', () => {
    utils.addListener = jest.fn();
    utils.handleListeners(testDiv, 'addListeners');
    expect(utils.addListener).toHaveBeenCalled();
    expect(utils.addListener).toHaveBeenCalledWith('keydown', testDiv);
  });
  it('addListener is called with keyup', () => {
    utils.addListener = jest.fn();
    utils.handleListeners(testDiv, 'addListeners');
    expect(utils.addListener).toHaveBeenCalled();
    expect(utils.addListener).toHaveBeenCalledWith('keyup', testDiv);
  });
  it('addListener is called with mousedown', () => {
    utils.addListener = jest.fn();
    utils.handleListeners(testDiv, 'addListeners');
    expect(utils.addListener).toHaveBeenCalled();
    expect(utils.addListener).toHaveBeenCalledWith('mousedown', testDiv);
  });
  it('addListener is called with mouseup', () => {
    utils.addListener = jest.fn();
    utils.handleListeners(testDiv, 'addListeners');
    expect(utils.addListener).toHaveBeenCalled();
    expect(utils.addListener).toHaveBeenCalledWith('mouseup', testDiv);
  });
  it('removeListener is called with keydown', () => {
    utils.removeListener = jest.fn();
    utils.handleListeners(testDiv, 'removeListeners');
    expect(utils.removeListener).toHaveBeenCalled();
    expect(utils.removeListener).toHaveBeenCalledWith('keydown', testDiv);
  });
  it('removeListener is called with keyup', () => {
    utils.removeListenerListener = jest.fn();
    utils.handleListeners(testDiv, 'removeListeners');
    expect(utils.removeListener).toHaveBeenCalled();
    expect(utils.removeListener).toHaveBeenCalledWith('keyup', testDiv);
  });
  it('removeListener is called with mousedown', () => {
    utils.removeListener = jest.fn();
    utils.handleListeners(testDiv, 'removeListeners');
    expect(utils.removeListener).toHaveBeenCalled();
    expect(utils.removeListener).toHaveBeenCalledWith('mousedown', testDiv);
  });
  it('removeListener is called with mouseup', () => {
    utils.removeListener = jest.fn();
    utils.handleListeners(testDiv, 'removeListeners');
    expect(utils.removeListener).toHaveBeenCalled();
    expect(utils.removeListener).toHaveBeenCalledWith('mouseup', testDiv);
  });
});
