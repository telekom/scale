'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

var kebabCase = require('lodash').kebabCase;
var WebComponentWrapper = function (props) {
    var events = props.events, component = props.component, styles = props.styles, children = props.children, forwardedProps = __rest(props, ["events", "component", "styles", "children"]);
    var eventNames = events ? Object.keys(events) : null;
    var Component = component;
    var ref = React.useRef(null);
    var convertedProps = {};
    Object.keys(forwardedProps).forEach(function (prop) {
        if (prop === 'className') {
            convertedProps['custom-class'] = forwardedProps[prop];
        }
        else if (!prop.startsWith('on')) {
            convertedProps[kebabCase(prop)] = forwardedProps[prop];
        }
        else {
            convertedProps[prop] = forwardedProps[prop];
        }
    });
    React.useEffect(function () {
        if (ref.current) {
            if (styles) {
                ref.current.styles = styles;
            }
            if (eventNames) {
                eventNames.map(function (eventName) {
                    return ref.current.addEventListener(events[eventName], props[eventName]);
                });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ref, styles]);
    return (React__default.createElement(Component, __assign({ ref: ref }, convertedProps), children));
};

var Alert = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-alert' }, props))); };
var Button = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-button' }, props))); };
var Card = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-card' }, props))); };
var Carousel = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-carousel' }, props))); };
var Divider = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-divider' }, props))); };
var Icon = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-icon' }, props))); };
var Input = function (props) { return (React.createElement(WebComponentWrapper, __assign({ events: {
        onBlur: 'blurEvent',
        onChange: 'changeEvent',
        onFocus: 'focusEvent',
        onKeyDown: 'keyDownEvent'
    }, component: 'scale-input' }, props))); };
var Link = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-link' }, props))); };
var List = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-list' }, props))); };
var ListItem = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-list-item' }, props))); };
var Modal = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-modal' }, props))); };
var ProgressBar = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-progress-bar' }, props))); };
var Slider = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-slider' }, props))); };
var Switch = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-switch' }, props))); };
var Tag = function (props) { return (React.createElement(WebComponentWrapper, __assign({ events: { onClose: 'close' }, component: 'scale-tag' }, props))); };
var Text = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-text' }, props))); };
var Toast = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-toast' }, props))); };

exports.Alert = Alert;
exports.Button = Button;
exports.Card = Card;
exports.Carousel = Carousel;
exports.Divider = Divider;
exports.Icon = Icon;
exports.Input = Input;
exports.Link = Link;
exports.List = List;
exports.ListItem = ListItem;
exports.Modal = Modal;
exports.ProgressBar = ProgressBar;
exports.Slider = Slider;
exports.Switch = Switch;
exports.Tag = Tag;
exports.Text = Text;
exports.Toast = Toast;
//# sourceMappingURL=index.js.map
