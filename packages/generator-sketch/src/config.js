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

const { findLayer, findLayers } = require('./utils');

module.exports = {
  libraryServerPath: 'http://localhost:5000/',

  libraryTitle: 'Telekom Scale Components',
  libraryDescription: 'Telekom Scale Components design library',

  fontReplacer: function (jsonValue) {
    if (jsonValue === 'system-ui') {
      return 'TeleNeo';
    } else if (jsonValue === '-apple-system') {
      return 'TeleNeo';
    } else if (/^TeleNeoWeb/.test(jsonValue)) {
      return jsonValue.replace(/^TeleNeoWeb/, 'TeleNeo');
    }
  },

  setSymbolResizing: function (symbol) {
    if (!/^(Icon|(Unnamed Components \/ icon))/.test(symbol.name)) {
      symbol.groupLayout = {
        _class: 'MSImmutableInferredGroupLayout',
        axis: 0,
        layoutAnchor: 0,
        maxSize: 0,
        minSize: 0,
      };
    } else {
      var icon = findLayer(symbol, (s) => s.name === 'svg.icon');
      if (icon) icon.resizingConstraint = 18;
      if (symbol.layers && symbol.layers[0]) {
        symbol.layers[0].resizingConstraint = 18;
      }
    }

    var icons = findLayers(
      symbol,
      (s) => s.name === /^Unnamed Components \/ icon/
    );
    icons.forEach((icon) => (icon.name = 'Icon'));

    try {
      if (/^Accordion/.test(symbol.name)) {
        if (symbol.layers[0].name === 'div.collapsible') {
          symbol.layers[0] = symbol.layers[0].layers[1];
        }
        symbol.layers[0].resizingConstraint = 10;
        var icon = findLayer(
          symbol,
          (s) => s.name === 'Icon' || s.name === 'group'
        );
        if (icon) icon.resizingConstraint = 9;
        var label = findLayer(symbol, (s) => s.name === 'Accordion Label');
        if (label) label.resizingConstraint = 10;
        var bg = findLayer(symbol, (s) => s.name === 'Background');
        if (bg) bg.resizingConstraint = 10;
      }
      if (/^(Button)/.test(symbol.name)) {
        var button = findLayer(symbol, (s) => s.name === 'button.button');
        if (button) {
          button.resizingConstraint = 11;
          button.layers.pop();
        }
        var slot = findLayer(symbol, (s) => s.name === 'slot');
        if (slot) slot.resizingConstraint = 45;
        var icon = findLayer(symbol, (s) => s.name === 'Icon');
        if (icon) icon.resizingConstraint = 9;
        var label = findLayer(symbol, (s) => s.name === 'Button Label');
        if (icon) {
          if (label) label.resizingConstraint = 9;
          else icon.resizingConstraint = 45;
        } else {
          if (label) label.resizingConstraint = 45;
        }
      }
      if (/^Breadcrumb/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        symbol.layers[0].resizingConstraint = 9;
        findLayers(symbol.layers[0], (l) => {
          l.resizingConstraint = 9;
        });
      }
      if (/^(Card)/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        const label = findLayer(symbol, 'Card Label');
        if (label) {
          label.resizingConstraint = 18;
          label.textBehaviour = 2;
        }
        findLayer(symbol, 'slot', (slot) => {
          slot.resizingConstraint = 18;
          slot.layers.forEach((l) => (l.frame.x += slot.frame.x));
          slot.frame.x = 0;
          slot.frame.width = 256;
          findLayer(slot, 'img', (l) => {
            findLayer(l, (l) => {
              l.resizingConstraint = 18;
            });
            label.resizingConstraint = 34;
            label.frame.width = 208;
          });
        });
      }
      if (/^(Checkbox|Radio)/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = 9;
      }
      if (/^Divider \/ \d+ Standard/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = 47;
      }
      if (/^Divider \/ \d+ Vertical/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = 61;
      }
      if (/^(Dropdown)/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        symbol.layers[0].resizingConstraint = 11;
        findLayer(symbol, 'Icon', (icon) => (icon.resizingConstraint = 44));
        findLayer(
          symbol,
          'label.input__label',
          (label) => (label.resizingConstraint = 9)
        );
        findLayer(symbol, 'Dropdown Label', (label) => {
          label.resizingConstraint = 10;
          label.frame.width = symbol.frame.width - 46;
          label.textBehaviour = 2;
        });
        findLayer(symbol, 'Dropdown Value', (value) => {
          value.resizingConstraint = 10;
          value.frame.width = symbol.frame.width - 46;
          value.textBehaviour = 2;
        });
        findLayer(symbol, /^Information/, (info) => {
          info.resizingConstraint = 10;
          info.frame.width = symbol.frame.width - 24;
          info.textBehaviour = 2;
        });
      }
      if (/^Link/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = 9;
        var underline = findLayer(symbol, (s) => s.name === 'border-bottom');
        if (underline) underline.resizingConstraint = 58;
      }
      if (/^Modal/.test(symbol.name)) {
        symbol.layers[0].layers[1].resizingConstraint = 45;
        //fitSymbolToContent(symbol);
      }
      if (/^Progress Bar/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        symbol.layers[0].resizingConstraint = 9;

        findLayer(symbol, /^\d+\%/, (progressText) => {
          progressText.name = 'Percentage';
          progressText.textBehaviour = 2;
          progressText.resizingConstraint = 12;
        });

        var desc = findLayer(symbol, (s) => s.name === 'Description');
        if (desc) desc.resizingConstraint = 9;
        var label = findLayer(symbol, (s) => s.name === 'Progress Bar Label');
        if (label) label.resizingConstraint = 9;
        var progressBar = findLayer(
          symbol,
          (s) => s.name === 'div.progress-bar'
        );
        if (progressBar) progressBar.resizingConstraint = 10;
        var wrapper = findLayer(
          symbol,
          (s) => s.name === 'div.progress-bar-wrapper'
        );
        if (wrapper) {
          wrapper.resizingConstraint = 10;
          var bar = findLayer(wrapper, (s) =>
            s.name.startsWith('div#progress-bar-')
          );
          if (bar) {
            bar.resizingConstraint = 10;
            findLayer(bar, (s) => {
              s.resizingConstraint = 10;
              return false;
            });
            findLayer(
              bar,
              'div.progress-bar__inner',
              (l) => (l.resizingConstraint = 11)
            );
          }
          var icon = findLayer(wrapper, (s) => s.name === 'Icon');
          if (icon) icon.resizingConstraint = 12;
        }
      }
      if (/^Sidebar Nav/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        symbol.layers[0].resizingConstraint = 9;
        if (!/Example/.test(symbol.name)) {
          findLayer(symbol, 'Label', (s) => {
            s.resizingConstraint = 10;
            s.frame.width = 142;
            s.textBehaviour = 2;
          });
          findLayer(symbol, 'Icon', (s) => (s.resizingConstraint = 12));
          findLayers(
            symbol,
            /sidebar-nav-collapsible/,
            (s) => (s.resizingConstraint = 10)
          );
          findLayers(symbol, 'Background', (s) => (s.resizingConstraint = 10));
          findLayer(
            symbol,
            'border-bottom',
            (s) => (s.resizingConstraint = 34)
          );

          // Third level
          findLayer(
            symbol,
            /^(li\.sidebar-nav-item|a)$/,
            (s) => (s.resizingConstraint = 10)
          );
          findLayer(symbol, 'span', (s) => (s.resizingConstraint = 9));
          if (/Second Level .* Expanded/.test(symbol.name)) {
            findLayer(
              symbol,
              'li.sidebar-nav-collapsible',
              (s) => (s.resizingConstraint = 0)
            );
          }
        }
      }
      if (/^Slider/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = 10;

        var track = findLayer(symbol, (s) => s.name === 'div.slider__track');
        var bar = findLayer(symbol, (s) => s.name === 'div.slider__bar');
        var count = findLayer(symbol, (s) => /^\d+/.test(s.name));
        var label = findLayer(symbol, (s) => s.name === 'Slider Label');

        if (label) label.resizingConstraint = 47;

        if (count) {
          count.resizingConstraint = 44;
          count.name = 'Counter Label';
        }

        if (bar) bar.resizingConstraint = 59;

        track.resizingConstraint = 58;
        var knob = findLayer(track, (s) => /div\#slider/.test(s.name));
        if (knob) knob.resizingConstraint = 45;
      }
      if (/^Switch/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = 9;
      }
      if (/^Table/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        symbol.layers.forEach((l) => (l.resizingConstraint = 9));
      }
      if (/^(Tab Nav)/.test(symbol.name)) {
        var tabHead = findLayer(symbol, (s) => s.name === 'span.tab-header');
        if (tabHead) tabHead.resizingConstraint = 10;
        if (!/Example/.test(symbol.name)) {
          var spans = findLayers(tabHead, 'span', (span) =>
            findLayers(span, (l) => (l.resizingConstraint = 10))
          );
          var bar = spans.shift();
          spans.forEach((span) =>
            tabHead.layers.splice(tabHead.layers.indexOf(span), 1)
          );
          if (bar) {
            bar.layers[0].resizingConstraint = 10;
            tabHead.layers.unshift(bar.layers[0]);
            bar.layers[0].frame.y += bar.frame.y;
            bar.layers[0].frame.x += bar.frame.x;
            tabHead.layers.splice(tabHead.layers.indexOf(bar), 1);
          }
          findLayer(tabHead, 'slot', (s) => {
            tabHead.layers.splice(tabHead.layers.indexOf(s), 1);
            s.layers.forEach((l) => {
              l.frame.x += s.frame.x;
              l.frame.y += s.frame.y;
            });
            tabHead.layers.push(...s.layers);
          });
        } else {
          symbol.groupLayout = undefined;
        }
        findLayers(
          symbol,
          (s) => s.name === 'Icon',
          (icon) => (icon.resizingConstraint = 9)
        );
        findLayers(
          symbol,
          (s) => s.name.includes('Header'),
          (label) => {
            label.resizingConstraint = 10;
          }
        );
      }
      if (/^Tag/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = 9;
        var icon =
          findLayer(symbol, (s) => s.name === 'button') ||
          findLayer(symbol, (s) => s.name === 'Icon');
        if (icon) icon.resizingConstraint = 44;
      }
      if (/^(Text Area)/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        // Check if disabled field small label resizes correctly
        findLayer(
          symbol,
          'label.input__label',
          (label) => (label.resizingConstraint = 9)
        );
        var count = findLayer(symbol, (s) => /^\d+\s*\/\s*\d+$/.test(s.name));
        if (count) {
          count.resizingConstraint = 14;
          count.name = 'Counter';
          count.textBehaviour = 2;
        }
        var info = findLayer(symbol, (s) => /^Information/.test(s.name));
        if (info) {
          if (info.name === 'Information') {
            info.resizingConstraint = 34;
            info.frame.width = 162;
            info.glyphBounds = '{{0, 3}, {162, 12}}';
          } else {
            info.resizingConstraint = 11;
            info.frame.width = 108;
            info.glyphBounds = '{{0, 3}, {108, 12}}';
          }
          info.textBehaviour = 2;
        }
        var helperMessage = findLayer(symbol, (s) =>
          /^div#helper-message/.test(s.name)
        );
        if (helperMessage) helperMessage.resizingConstraint = 34;
        if (!helperMessage && info) info.resizingConstraint = 34;
        if (!helperMessage && count) count.resizingConstraint = 34;
        var inputValue = findLayer(symbol, (s) => /^Input Value/.test(s.name));
        if (inputValue) inputValue.resizingConstraint = 9;
        findLayers(
          symbol,
          /label/i,
          (label) => (label.resizingConstraint = 10)
        );
        var textarea = findLayer(symbol, (s) => /^textarea/.test(s.name));
        if (textarea) {
          textarea.resizingConstraint = 18;
          findLayers(textarea, (l) => (l.resizingConstraint = 18));
        }

        var bg = findLayer(symbol, (s) => /safety-background/.test(s.name));
        if (bg) bg.resizingConstraint = 18;

        var label = findLayer(symbol, (s) => s.name === 'Label');
        if (label) {
          label.resizingConstraint = 10;
          label.frame.width = 148;
          label.glyphBounds = '{{0, 3}, {148, 12}}';
          label.textBehaviour = 2;
        }
        var label = findLayer(symbol, (s) => s.name === 'Input Value');
        if (label) {
          label.resizingConstraint = 18;
          label.frame.width = 148;
          label.frame.height = 69;
          label.glyphBounds = '{{0, 3}, {148, 69}}';
          label.textBehaviour = 2;
        }
      }

      if (/^(Text Field)/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        // Check if disabled field small label resizes correctly
        findLayer(
          symbol,
          'label.input__label',
          (label) => (label.resizingConstraint = 9)
        );
        var count = findLayer(symbol, (s) => /^\d+\s*\/\s*\d+$/.test(s.name));
        if (count) {
          count.resizingConstraint = 14;
          count.name = 'Counter';
          count.textBehaviour = 2;
        }
        var info = findLayer(symbol, (s) => /^Information/.test(s.name));
        if (info) {
          info.resizingConstraint = 11;
          if (count) {
            info.frame.width = 108;
            info.glyphBounds = '{{0, 3}, {108, 12}}';
          } else {
            info.frame.width = 162;
            info.glyphBounds = '{{0, 3}, {162, 12}}';
          }
          info.textBehaviour = 2;
        }
        var helperMessage = findLayer(symbol, (s) =>
          /^div#helper-message/.test(s.name)
        );
        if (helperMessage) helperMessage.resizingConstraint = 10;
        var inputValue = findLayer(symbol, (s) => /^Input Value/.test(s.name));
        if (inputValue) inputValue.resizingConstraint = 9;
        findLayers(
          symbol,
          /label/i,
          (label) => (label.resizingConstraint = 10)
        );
        var input = findLayer(symbol, (s) => /^input#input/.test(s.name));
        if (input) {
          input.resizingConstraint = 10;
          findLayers(input, (l) => (l.resizingConstraint = 10));
        }

        var label = findLayer(symbol, (s) => s.name === 'Label');
        if (label) {
          label.resizingConstraint = 10;
          label.frame.width = 148;
          label.glyphBounds = '{{0, 3}, {148, 12}}';
          label.textBehaviour = 2;
        }
        var value = findLayer(symbol, (s) => s.name === 'Input Value');
        if (value) {
          value.resizingConstraint = 10;
          value.frame.width = 148;
          value.glyphBounds = '{{0, 3}, {148, 12}}';
          value.textBehaviour = 2;
          if (label) {
            if (symbol.name.match(/Large/)) {
              value.frame.y += 5;
            } else {
              value.frame.x -= 2;
              value.frame.y -= 1;
            }
          }
        }
      }

      if (/^(List)/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = 9;
      }
    } catch (err) {
      console.log('Error processing', symbol.name, err);
    }

    if (symbol.groupLayout && symbol.layers && symbol.layers[0]) {
      symbol.layers[0].groupLayout = { ...symbol.groupLayout };
    }
  },
};
