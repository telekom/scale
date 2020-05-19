import { ComponentInterface } from '@stencil/core';
import jss from 'jss';
import preset from 'jss-preset-default';
import { combineObjects } from './utils';
import { getTheme } from '../theme/theme';
import sheetManager from './sheet-manager';

jss.setup(preset());

declare type CssInJsDecorator = (
  target: ComponentInterface,
  propertyKey: string
) => void;

const getKeys = obj => {
  const blackListedProps = [
    'stylesheet',
    'value',
    'key',
    'transitions',
    'combinedTransitions',
    'opened',
    'hostElement',
    's-rc',
    'size',
    'variant',
  ];
  const whiteListedTypes = ['boolean', 'string', 'object'];
  const keys = [];

  for (const key in obj) {
    if (
      obj[key] &&
      whiteListedTypes.includes(typeof obj[key]) &&
      !blackListedProps.includes(key)
    ) {
      keys.push(key);
    }
  }
  return keys;
};

const getComponentKey = (componentKey, that) => {
  return getKeys(that).reduce((acc, keyName) => {
    try {
      return `${acc}-${JSON.stringify({ [keyName]: that[keyName] })}`;
    } catch (err) {
      return acc;
    }
  }, componentKey);
};

export function CssInJs(componentKey: string, styles: any): CssInJsDecorator {
  const withInjectedValues = (that: any) => {
    let withDefaultTheme;
    let stylesAttributeValue;

    try {
      withDefaultTheme = combineObjects(
        styles,
        (getTheme().components[componentKey] || {}).styles ||
          getTheme().components[componentKey] // fallback for compatibility
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
      if (this.key) {
        sheetManager.unmanage(this.key);
      }

      return componentDidUnload.call(this);
    };
  };
}
