import { ComponentInterface } from '@stencil/core';
import jss, { StyleSheet } from 'jss';
import preset from 'jss-preset-default';
import { combineObjects } from './utils';
import { getTheme } from '../theme/theme';
import has from 'lodash/has';
import get from 'lodash/get';
import set from 'lodash/set';

jss.setup(preset());

declare type CssInJsDecorator = (
  target: ComponentInterface,
  propertyKey: string
) => void;

export function CssInJs(
  componentKey: string,
  styles: any,
  options?: any
): CssInJsDecorator {
  const withInjectedValues = (that: any) => {
    let withDefaultTheme;
    try {
      withDefaultTheme = combineObjects(
        styles,
        getTheme().components[componentKey]
      );
    } catch (error) {
      withDefaultTheme = styles;
    }
    const combined = that.styles
      ? combineObjects(withDefaultTheme, that.styles)
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
    let prevStyles;
    const { componentWillLoad } = target;
    if (!componentWillLoad) {
      // tslint:disable-next-line: no-console
      return console.warn(
        `ConstructibleStyle requires you to have a \`componentWillLoad\` lifecycle method in \`${target.constructor.name}\`. Failure to add this function may cause ConstructibleStyle to fail due to StencilJS build optimizations.`
      );
    }

    if (componentWillLoad) {
      target.componentWillLoad = function() {
        // attach the stylesheet to the component instance
        this[propertyKey] = jss
          .createStyleSheet(withInjectedValues(this), { link: true })
          .attach()
          .update(getTheme()) as StyleSheet;
        // save the current value of the styles property and use it later to compare in componentWillUpdate
        prevStyles = this.styles;

        const willLoadResult =
          componentWillLoad && componentWillLoad.call(this);
        return willLoadResult;
      };
    } else {
      // tslint:disable-next-line: no-console
      return console.error('Something went wrong... CssInJs is not supported');
    }

    const { componentWillUpdate } = target;
    if (!componentWillUpdate) {
      // tslint:disable-next-line: no-console
      return console.warn(
        `ConstructibleStyle requires you to have a \`componentWillUpdate\` lifecycle method in \`${target.constructor.name}\`. Failure to add this function may cause ConstructibleStyle to fail due to StencilJS build optimizations.`
      );
    }

    if (componentWillUpdate) {
      target.componentWillUpdate = function() {
        try {
          // compare the styles value with the previously rendered one
          if (JSON.stringify(this.styles) !== JSON.stringify(prevStyles)) {
            // detach the previous sheet
            this[propertyKey].detach();
            // attach a new sheet with the updated values coming from the styles property
            this[propertyKey] = jss
              .createStyleSheet(withInjectedValues(this), { link: true })
              .attach()
              .update(getTheme()) as StyleSheet;
            // update the current value of the styles property and use it for next runs of componentWillUpdate
            prevStyles = this.styles;
          }
        } catch (error) {
          // tslint:disable-next-line: no-console
          return console.error(
            'Something went wrong... CssInJs got invalid value via styles prop'
          );
        }

        const willLoadResult =
          componentWillUpdate && componentWillUpdate.call(this);
        return willLoadResult;
      };
    } else {
      // tslint:disable-next-line: no-console
      return console.error('Something went wrong... CssInJs is not supported');
    }
  };
}
