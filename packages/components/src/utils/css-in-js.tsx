import { ComponentInterface } from '@stencil/core';
import jss, { StyleSheet } from 'jss';
import preset from 'jss-preset-default';
import { combineObjects, theme } from './utils';

jss.setup(preset());

declare type CssInJsDecorator = (
  target: ComponentInterface,
  propertyKey: string
) => void;

export function CssInJs(className: string, styles: object): CssInJsDecorator {
  return (target: ComponentInterface, propertyKey: string) => {
    const { componentWillLoad } = target;
    if (!componentWillLoad) {
      // tslint:disable-next-line: no-console
      return console.warn(
        `ConstructibleStyle requires you to have a \`componentWillLoad\` lifecycle method in \`${target.constructor.name}\`. Failure to add this function may cause ConstructibleStyle to fail due to StencilJS build optimizations.`
      );
    }

    if (componentWillLoad) {
      target.componentWillLoad = function() {
        const withDefaultTheme = combineObjects(styles, theme()[className]);
        const cssText = jss.createStyleSheet(
          combineObjects(withDefaultTheme, this.styles)
        );
        const willLoadResult =
          componentWillLoad && componentWillLoad.call(this);
        this[propertyKey] = cssText as StyleSheet;
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
        const withDefaultTheme = combineObjects(styles, theme()[className]);
        const cssText = jss.createStyleSheet(
          combineObjects(withDefaultTheme, this.styles)
        );
        const willLoadResult =
          componentWillUpdate && componentWillUpdate.call(this);
        this[propertyKey] = cssText as StyleSheet;
        return willLoadResult;
      };
    } else {
      // tslint:disable-next-line: no-console
      return console.error('Something went wrong... CssInJs is not supported');
    }
  };
}
