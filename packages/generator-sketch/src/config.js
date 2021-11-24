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

const {
  findLayer,
  findLayers,
  Resize,
  setResizingConstraints,
} = require('./utils');

const {
  NONE,
  TOP_LEFT_FIXED_SIZE,
  TOP_LEFT_RIGHT_FIXED_HEIGHT,
  TOP_LEFT_FIXED_HEIGHT,
  TOP_RIGHT_FIXED_SIZE,

  TOP_RIGHT_FIXED_HEIGHT,

  FILL_SPACE,
  BOTTOM_LEFT_RIGHT_FIXED_HEIGHT,

  RIGHT_FIXED_SIZE,
  FIXED_SIZE,

  FIXED_HEIGHT,
  FIXED_WIDTH,

  LEFT_RIGHT,
  LEFT,
} = Resize;

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
    if (!/^(Icon|(X \/ icon))/.test(symbol.name)) {
      symbol.groupLayout = {
        _class: 'MSImmutableInferredGroupLayout',
        axis: 0,
        layoutAnchor: 0,
        maxSize: 0,
        minSize: 0,
      };
    } else {
      findLayers(
        symbol,
        'svg.icon',
        (icon) => (icon.resizingConstraint = FILL_SPACE)
      );
      if (symbol.layers && symbol.layers[0]) {
        symbol.layers[0].resizingConstraint = FILL_SPACE;
      }
    }

    findLayers(
      symbol,
      /^((X \/ icon)|(svg\.icon))/,
      (icon) => (icon.name = 'Icon')
    );

    try {
      if (/^Accordion/.test(symbol.name)) {
        if (symbol.layers[0].name === 'div.collapsible') {
          symbol.layers[0] = symbol.layers[0].layers[1];
        }
        symbol.layers[0].resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
        setResizingConstraints(
          symbol,
          /^(Icon|group)$/,
          TOP_LEFT_FIXED_SIZE,
          'Accordion Label',
          TOP_LEFT_RIGHT_FIXED_HEIGHT,
          'Background',
          TOP_LEFT_RIGHT_FIXED_HEIGHT
        );
      }
      if (/^(Button)/.test(symbol.name)) {
        findLayers(
          symbol,
          /.?/,
          (l) => (l.frame.width = Math.ceil(l.frame.width))
        );
        setResizingConstraints(
          symbol,
          'button.button',
          TOP_LEFT_FIXED_HEIGHT,
          'slot',
          FIXED_SIZE,
          'Icon',
          FIXED_SIZE,
          'Button Label',
          (label) => {
            if (/Large/.test(symbol.name)) {
              label.frame.width = 83;
            } else {
              label.frame.width = 62;
            }
            label.textBehaviour = 0;
            label.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
            setResizingConstraints(symbol, 'Icon', TOP_LEFT_FIXED_SIZE);
          }
        );
      }
      if (/^Breadcrumb/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        setResizingConstraints(symbol, /.?/, TOP_LEFT_FIXED_SIZE);
      }
      if (/^(Card)/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        const label = findLayer(symbol, 'Card Label');
        if (label) {
          label.resizingConstraint = FILL_SPACE;
          label.textBehaviour = 2;
        }
        findLayer(symbol, 'slot', (slot) => {
          slot.resizingConstraint = FILL_SPACE;
          slot.layers.forEach((l) => (l.frame.x += slot.frame.x));
          slot.frame.x = 0;
          slot.frame.width = 256;
          findLayer(slot, 'img', (l) => {
            findLayer(l, (l) => {
              l.resizingConstraint = FILL_SPACE;
            });
            label.resizingConstraint = BOTTOM_LEFT_RIGHT_FIXED_HEIGHT;
            label.frame.width = 208;
          });
        });
      }
      if (/^(Checkbox|Radio)/.test(symbol.name)) {
        setResizingConstraints(symbol, /.?/, TOP_LEFT_FIXED_SIZE);
      }
      if (/^(Checkbox Group)/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = TOP_LEFT_FIXED_SIZE;
        findLayers(symbol, /Icon?/, (l) => {
          l.resizingConstraint = TOP_LEFT_FIXED_SIZE;

          const overrideIcon = {
            _class: 'MSImmutableOverrideProperty',
            canOverride: false,
            overrideName: `${l.do_objectID}_symbolID`,
          };
          const overrideColor = {
            _class: 'MSImmutableOverrideProperty',
            canOverride: false,
            overrideName: `${l.do_objectID}_fillColor`,
          };

          symbol.overrideProperties.push(overrideIcon);
          symbol.overrideProperties.push(overrideColor);
        });
        findLayer(
          symbol,
          /fieldset/,
          (l) => (l.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
      }
      if (/^Divider \/ \d+ Standard/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = FIXED_HEIGHT;
      }
      if (/^Divider \/ \d+ Vertical/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = FIXED_WIDTH;
      }
      if (/^(Dropdown)/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        setResizingConstraints(
          symbol,
          'div.dropdown',
          TOP_LEFT_FIXED_HEIGHT,
          'div.input__dropdown-wrapper',
          TOP_LEFT_FIXED_HEIGHT,
          'label.input__label',
          TOP_LEFT_RIGHT_FIXED_HEIGHT,
          'div.input__helper-text',
          TOP_LEFT_RIGHT_FIXED_HEIGHT,
          /^((Icon)|(svg\.icon))$/,
          RIGHT_FIXED_SIZE
        );
        findLayer(symbol, 'Dropdown Label', (label) => {
          label.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
          var addWidth = symbol.frame.width - 46 - label.frame.width;
          label.frame.width += addWidth;
          label.textBehaviour = 2;
          findLayer(
            symbol,
            'label.input__label',
            (label) => (label.frame.width += addWidth)
          );
        });
        findLayer(symbol, 'Dropdown Value', (value) => {
          value.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
          value.frame.width = symbol.frame.width - 46;
          value.textBehaviour = 2;
        });
        findLayer(symbol, /^Information/, (info) => {
          info.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
          var addWidth = symbol.frame.width - 24 - info.frame.width;
          info.frame.width += addWidth;
          info.textBehaviour = 2;
          findLayer(
            symbol,
            'div.input__helper-text',
            (label) => (label.frame.width += addWidth)
          );
        });
      }
      if (/^Link/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = TOP_LEFT_FIXED_SIZE;
        var cursor = findLayer(symbol, (s) => s.name === 'svg');
        var underline = findLayer(symbol, (s) => s.name === 'border-bottom');
        if (underline) underline.resizingConstraint = LEFT_RIGHT;
        if (cursor) cursor.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
      }
      if (/^Modal/.test(symbol.name)) {
        symbol.layers[0].layers[1].resizingConstraint = FIXED_SIZE;
        //fitSymbolToContent(symbol);
      }
      if (/^Progress Bar/.test(symbol.name)) {
        symbol.groupLayout = undefined;

        findLayer(symbol, /^\d+\%/, (progressText) => {
          progressText.name = 'Percentage';
          progressText.textBehaviour = 2;
          progressText.resizingConstraint = TOP_RIGHT_FIXED_SIZE;
        });

        findLayer(
          symbol,
          'Description',
          (l) => (l.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        findLayer(
          symbol,
          'Progress Bar Label',
          (l) => (l.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        findLayer(symbol, 'div.progress-bar', (l) => {
          symbol.layers.push(...l.layers);
          symbol.layers.splice(symbol.layers.indexOf(l), 1);
        });
        findLayer(symbol, 'div.progress-bar-wrapper', (wrapper) => {
          wrapper.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
          findLayer(wrapper, /^div#progress-bar-/, (bar) => {
            bar.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
            findLayer(bar, (s) => {
              s.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
              return false;
            });
            findLayer(
              bar,
              'div.progress-bar__inner',
              (l) => (l.resizingConstraint = TOP_LEFT_FIXED_HEIGHT)
            );
          });
          findLayer(
            wrapper,
            (s) => s.name === 'Icon',
            (icon) => (icon.resizingConstraint = TOP_RIGHT_FIXED_SIZE)
          );
        });
      }
      if (/^Sidebar Nav/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        symbol.layers[0].resizingConstraint = TOP_LEFT_FIXED_SIZE;
        if (!/Example/.test(symbol.name)) {
          findLayer(symbol, 'Label', (s) => {
            s.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
            s.frame.width = 142;
            s.textBehaviour = 2;
          });
          findLayer(
            symbol,
            'Icon',
            (s) => (s.resizingConstraint = TOP_RIGHT_FIXED_SIZE)
          );
          findLayers(
            symbol,
            /sidebar-nav-collapsible/,
            (s) => (s.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT)
          );
          findLayers(
            symbol,
            'Background',
            (s) => (s.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT)
          );
          findLayer(
            symbol,
            'border-bottom',
            (s) => (s.resizingConstraint = BOTTOM_LEFT_RIGHT_FIXED_HEIGHT)
          );

          // Third level
          findLayer(
            symbol,
            /^(li\.sidebar-nav-item|a)$/,
            (s) => (s.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT)
          );
          findLayer(
            symbol,
            'span',
            (s) => (s.resizingConstraint = TOP_LEFT_FIXED_SIZE)
          );
          if (/Second Level .* Expanded/.test(symbol.name)) {
            findLayer(
              symbol,
              'li.sidebar-nav-collapsible',
              (s) => (s.resizingConstraint = NONE)
            );
          }
        }
      }
      if (/^Slider/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;

        var track = findLayer(symbol, (s) => s.name === 'div.slider__track');
        var bar = findLayer(symbol, (s) => s.name === 'div.slider__bar');
        var count = findLayer(symbol, (s) => /^\d+/.test(s.name));
        var label = findLayer(symbol, (s) => s.name === 'Slider Label');

        if (label) label.resizingConstraint = FIXED_HEIGHT;

        if (count) {
          count.resizingConstraint = RIGHT_FIXED_SIZE;
          count.name = 'Counter Label';
        }

        if (bar) bar.resizingConstraint = LEFT;

        track.resizingConstraint = LEFT_RIGHT;
        var knob = findLayer(track, (s) => /div\#slider/.test(s.name));
        if (knob) knob.resizingConstraint = FIXED_SIZE;
      }
      if (/^Switch/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        symbol.layers[0].resizingConstraint = TOP_LEFT_FIXED_SIZE;
        findLayer(
          symbol,
          /switch[-_]+wrapper/,
          (l) => (l.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        findLayer(
          symbol,
          'Switch Label',
          (l) => (l.resizingConstraint = FILL_SPACE)
        );
      }
      if (/^Table/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        symbol.layers.forEach((l) => {
          if ('layers' in l) {
            l.layers.forEach((l) => {
              if ('layers' in l) {
                l.layers.forEach((l) => {
                  if ('layers' in l) {
                    l.layers.forEach((l) => {
                      if (l.name === 'svg') {
                        l.rotation = -45;
                      }
                    });
                  }
                });
              }
            });
          }
          l.resizingConstraint = TOP_LEFT_FIXED_SIZE;
        });
      }
      if (/^Tag/.test(symbol.name)) {
        symbol.layers[0].resizingConstraint = TOP_LEFT_FIXED_SIZE;
        var icon =
          findLayer(symbol, (s) => s.name === 'button') ||
          findLayer(symbol, (s) => s.name === 'Icon');
        if (icon) icon.resizingConstraint = RIGHT_FIXED_SIZE;
      }
      if (/^Rating Stars/.test(symbol.name)) {
        var icon = findLayer(symbol, (s) => s.name === 'Icon');
        findLayers(symbol, /Icon?/, (l) => {
          l.resizingConstraint = TOP_LEFT_FIXED_SIZE;

          const overrideObject = {
            _class: 'MSImmutableOverrideProperty',
            canOverride: false,
            overrideName: `${l.do_objectID}_symbolID`,
          };

          symbol.overrideProperties.push(overrideObject);
        });
        findLayers(
          symbol,
          /Info message/,
          (l) => (l.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        findLayers(
          symbol,
          /div/,
          (l) => (l.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );

        findLayers(
          symbol,
          /div.icon-clip?/,
          (l) => (l.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        findLayers(
          symbol,
          /svg?/,
          (l) => (l.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        findLayers(symbol, /Icon?/, (l) => (l.height = 16));
        findLayer(
          symbol,
          /Rating Label/,
          (s) => (s.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        findLayer(
          symbol,
          /Background/,
          (s) => (s.style.fills[0].isEnabled = false)
        );
      }
      if (/^(Text Area)/.test(symbol.name)) {
        symbol.groupLayout = undefined;
        // Check if disabled field small label resizes correctly
        findLayer(
          symbol,
          'label.input__label',
          (label) => (label.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        var count = findLayer(symbol, (s) => /^\d+\s*\/\s*\d+$/.test(s.name));
        if (count) {
          count.resizingConstraint = TOP_RIGHT_FIXED_HEIGHT;
          count.name = 'Counter';
          count.textBehaviour = 2;
        }
        var info = findLayer(symbol, (s) => /^Information/.test(s.name));
        if (info) {
          if (info.name === 'Information') {
            info.resizingConstraint = BOTTOM_LEFT_RIGHT_FIXED_HEIGHT;
            info.frame.width = 162;
            info.glyphBounds = '{{0, 3}, {162, 12}}';
          } else {
            info.resizingConstraint = TOP_LEFT_FIXED_HEIGHT;
            info.frame.width = 108;
            info.glyphBounds = '{{0, 3}, {108, 12}}';
          }
          info.textBehaviour = 2;
        }
        var helperMessage = findLayer(symbol, (s) =>
          /^div#helper-message/.test(s.name)
        );
        if (helperMessage) {
          helperMessage.resizingConstraint = BOTTOM_LEFT_RIGHT_FIXED_HEIGHT;
        }
        if (!helperMessage && info) {
          info.resizingConstraint = BOTTOM_LEFT_RIGHT_FIXED_HEIGHT;
        }
        if (!helperMessage && count) {
          count.resizingConstraint = BOTTOM_LEFT_RIGHT_FIXED_HEIGHT;
        }
        var inputValue = findLayer(symbol, (s) => /^Input Value/.test(s.name));
        if (inputValue) inputValue.resizingConstraint = TOP_LEFT_FIXED_SIZE;
        findLayers(
          symbol,
          /label/i,
          (label) => (label.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT)
        );
        var textarea = findLayer(symbol, (s) => /^textarea/.test(s.name));
        if (textarea) {
          textarea.resizingConstraint = FILL_SPACE;
          findLayers(textarea, (l) => (l.resizingConstraint = FILL_SPACE));
        }

        var bg = findLayer(symbol, (s) => /safety-background/.test(s.name));
        if (bg) bg.resizingConstraint = FILL_SPACE;

        var label = findLayer(symbol, (s) => s.name === 'Label');
        if (label) {
          label.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
          label.frame.width = 148;
          label.glyphBounds = '{{0, 3}, {148, 12}}';
          label.textBehaviour = 2;
        }
        var label = findLayer(symbol, (s) => s.name === 'Input Value');
        if (label) {
          label.resizingConstraint = FILL_SPACE;
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
          (label) => (label.resizingConstraint = TOP_LEFT_FIXED_SIZE)
        );
        var count = findLayer(symbol, (s) => /^\d+\s*\/\s*\d+$/.test(s.name));
        if (count) {
          count.resizingConstraint = TOP_RIGHT_FIXED_HEIGHT;
          count.name = 'Counter';
          count.textBehaviour = 2;
        }
        var info = findLayer(symbol, (s) => /^Information/.test(s.name));
        if (info) {
          info.resizingConstraint = TOP_LEFT_FIXED_HEIGHT;
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
        if (helperMessage)
          helperMessage.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
        var inputValue = findLayer(symbol, (s) => /^Input Value/.test(s.name));
        if (inputValue) inputValue.resizingConstraint = TOP_LEFT_FIXED_SIZE;
        findLayers(
          symbol,
          /label/i,
          (label) => (label.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT)
        );
        var input = findLayer(symbol, (s) => /^input#input/.test(s.name));
        if (input) {
          input.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
          findLayers(
            input,
            (l) => (l.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT)
          );
        }

        var label = findLayer(symbol, (s) => s.name === 'Label');
        if (label) {
          label.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
          label.frame.width = 148;
          label.glyphBounds = '{{0, 3}, {148, 12}}';
          label.textBehaviour = 2;
        }
        var value = findLayer(symbol, (s) => s.name === 'Input Value');
        if (value) {
          value.resizingConstraint = TOP_LEFT_RIGHT_FIXED_HEIGHT;
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
        symbol.layers[0].resizingConstraint = TOP_LEFT_FIXED_SIZE;
      }
    } catch (err) {
      console.log('Error processing', symbol.name, err);
    }

    if (symbol.groupLayout && symbol.layers && symbol.layers[0]) {
      symbol.layers[0].groupLayout = { ...symbol.groupLayout };
    }
  },
};
