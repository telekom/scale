import { ComponentInterface } from '@stencil/core';
import jss from 'jss';
import preset from 'jss-preset-default';
import { combineObjects } from './utils';
import { getTheme } from '../theme/theme';
import has from 'lodash/has';
import get from 'lodash/get';
import set from 'lodash/set';
import sheetManager from './sheet-manager';

jss.setup(preset());

declare type CssInJsDecorator = (
  target: ComponentInterface,
  propertyKey: string
) => void;

const getKeys = obj => {
  let keys = [];
  for (let key in obj) {
    keys.push(key);
  }
  return keys;
};

const getComponentKey = (componentKey, that) => {
  const blackListedKeys = ['stylesheet'];
  const whiteListedTypes = ['boolean', 'string', 'object'];

  return getKeys(that).reduce((acc, keyName) => {
    if (
      that[keyName] &&
      whiteListedTypes.includes(typeof that[keyName]) &&
      !blackListedKeys.includes(keyName)
    ) {
      try {
        return `${acc}-${JSON.stringify({ [keyName]: that[keyName] })}`;
      } catch (err) {
        return acc;
      }
    }
    return acc;
  }, componentKey);
};

export function CssInJs(
  componentKey: string,
  styles: any,
  options?: any
): CssInJsDecorator {
  const withInjectedValues = (that: any) => {
    let withDefaultTheme;
    let stylesAttributeValue;

    try {
      withDefaultTheme = combineObjects(
        styles,
        getTheme().components[componentKey]
      );
    } catch (error) {
      withDefaultTheme = styles;
    }

    try {
      stylesAttributeValue = JSON.parse(that.styles);
    } catch (err) {
      stylesAttributeValue = that.styles;
    }

    const combined = that.styles
      ? combineObjects(withDefaultTheme, stylesAttributeValue)
      : withDefaultTheme;
    if (!!options) {
      const withStyleMappings = {};
      const selectStyles = (key: string) =>
        has(that.styles, key)
          ? get(that.styles, key)
          : get(combined, options[key]);
      Object.keys(options).forEach((key: string) =>
        set(withStyleMappings, key, selectStyles(key))
      );
      return combineObjects(combined, withStyleMappings);
    }
    return combined;
  };

  return (target: ComponentInterface, propertyKey: string) => {
    const { render, componentDidUnload } = target;

    target.render = function() {
      const newKey = getComponentKey(componentKey, this);

      if (this.key !== newKey) {
        this[propertyKey] = sheetManager
          .load(this.key, newKey, withInjectedValues(this))
          .update(getTheme());

        this.key = newKey;
      }

      return render.call(this);
    };

    if (!componentDidUnload) {
      // tslint:disable-next-line: no-console
      return console.warn(
        `ConstructibleStyle requires you to have a \`componentDidUnload\` lifecycle method in \`${target.constructor.name}\`. Failure to add this function may cause ConstructibleStyle to fail due to StencilJS build optimizations.`
      );
    }

    target.componentDidUnload = function() {
      sheetManager.unmanage(this.key);
      return componentDidUnload.call(this);
    };
  };
}
