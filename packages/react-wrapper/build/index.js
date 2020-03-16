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

var WebComponentWrapper = function (props) {
    var events = props.events, component = props.component, styles = props.styles, children = props.children, forwardedProps = __rest(props, ["events", "component", "styles", "children"]);
    var eventNames = events ? Object.keys(events) : null;
    var Component = component;
    var ref = React.useRef(null);
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
    return (React__default.createElement(Component, __assign({ ref: ref }, forwardedProps), children));
};

var ScaleAlert = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-alert' }, props))); };
var ScaleBadge = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-badge' }, props))); };
var ScaleButton = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-button' }, props))); };
var ScaleCard = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-card' }, props))); };
var ScaleCarousel = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-carousel' }, props))); };
var ScaleDivider = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-divider' }, props))); };
var ScaleIcon = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-icon' }, props))); };
var ScaleInput = function (props) { return (React.createElement(WebComponentWrapper, __assign({ events: { onChanged: 'changed' }, component: 'scale-input' }, props))); };
var ScaleInpuerror = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-input-error' }, props))); };
var ScaleInpugroup = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-input-group' }, props))); };
var ScaleInpulabel = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-input-label' }, props))); };
var ScaleLink = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-link' }, props))); };
var ScaleModal = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-modal' }, props))); };
var ScaleProgressBar = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-progress-bar' }, props))); };
var ScaleSlider = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-slider' }, props))); };
var ScaleSwitch = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-switch' }, props))); };
var ScaleTag = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-tag' }, props))); };
var ScaleText = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-text' }, props))); };
var ScaleToast = function (props) { return (React.createElement(WebComponentWrapper, __assign({ component: 'scale-toast' }, props))); };

exports.ScaleAlert = ScaleAlert;
exports.ScaleBadge = ScaleBadge;
exports.ScaleButton = ScaleButton;
exports.ScaleCard = ScaleCard;
exports.ScaleCarousel = ScaleCarousel;
exports.ScaleDivider = ScaleDivider;
exports.ScaleIcon = ScaleIcon;
exports.ScaleInpuerror = ScaleInpuerror;
exports.ScaleInpugroup = ScaleInpugroup;
exports.ScaleInpulabel = ScaleInpulabel;
exports.ScaleInput = ScaleInput;
exports.ScaleLink = ScaleLink;
exports.ScaleModal = ScaleModal;
exports.ScaleProgressBar = ScaleProgressBar;
exports.ScaleSlider = ScaleSlider;
exports.ScaleSwitch = ScaleSwitch;
exports.ScaleTag = ScaleTag;
exports.ScaleText = ScaleText;
exports.ScaleToast = ScaleToast;
//# sourceMappingURL=index.js.map
