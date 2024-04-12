/*! For license information please see 25.c66f39d7.iframe.bundle.js.LICENSE.txt */
(window.webpackJsonp=window.webpackJsonp||[]).push([[25],{"../components/dist/esm/index-713f92a5.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return classnames}));__webpack_require__("../../node_modules/core-js/modules/es.array.is-array.js"),__webpack_require__("../../node_modules/core-js/modules/es.array.join.js");var classnames=function createCommonjsModule(fn,basedir,module){return fn(module={path:basedir,exports:{},require:function require(path,base){return function commonjsRequire(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}},module.exports),module.exports}((function(module){!function(){var hasOwn={}.hasOwnProperty;function classNames(){for(var classes=[],i=0;i<arguments.length;i++){var arg=arguments[i];if(arg){var argType=typeof arg;if("string"===argType||"number"===argType)classes.push(arg);else if(Array.isArray(arg)&&arg.length){var inner=classNames.apply(null,arg);inner&&classes.push(inner)}else if("object"===argType)for(var key in arg)hasOwn.call(arg,key)&&arg[key]&&classes.push(key)}}return classes.join(" ")}module.exports?(classNames.default=classNames,module.exports=classNames):window.classNames=classNames}()}))},"../components/dist/esm/scale-toggle-button.entry.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,"scale_toggle_button",(function(){return ToggleButton}));__webpack_require__("../../node_modules/core-js/modules/es.string.small.js"),__webpack_require__("../../node_modules/core-js/modules/es.array.for-each.js"),__webpack_require__("../../node_modules/core-js/modules/web.dom-collections.for-each.js"),__webpack_require__("../../node_modules/core-js/modules/es.array.from.js"),__webpack_require__("../../node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("../../node_modules/core-js/modules/es.promise.js"),__webpack_require__("../../node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("../../node_modules/core-js/modules/es.string.replace.js"),__webpack_require__("../../node_modules/core-js/modules/es.regexp.exec.js"),__webpack_require__("../../node_modules/core-js/modules/es.array.filter.js"),__webpack_require__("../../node_modules/core-js/modules/es.string.trim.js"),__webpack_require__("../../node_modules/core-js/modules/es.object.define-property.js");var _index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__=__webpack_require__("../components/dist/esm/index-6d95a4bc.js"),_index_713f92a5_js__WEBPACK_IMPORTED_MODULE_13__=__webpack_require__("../components/dist/esm/index-713f92a5.js"),_utils_c4af5b47_js__WEBPACK_IMPORTED_MODULE_14__=__webpack_require__("../components/dist/esm/utils-c4af5b47.js"),_status_note_0089e9c9_js__WEBPACK_IMPORTED_MODULE_15__=__webpack_require__("../components/dist/esm/status-note-0089e9c9.js");function asyncGeneratorStep(gen,resolve,reject,_next,_throw,key,arg){try{var info=gen[key](arg),value=info.value}catch(error){return void reject(error)}info.done?resolve(value):Promise.resolve(value).then(_next,_throw)}function _defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}var iconSizes;!function(iconSizes){iconSizes.xs="12",iconSizes.small="16",iconSizes.regular="22",iconSizes.large="24"}(iconSizes||(iconSizes={}));var i=0,ToggleButton=function(){function ToggleButton(hostRef){var _this=this;!function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}(this,ToggleButton),Object(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.i)(this,hostRef),this.scaleClick=Object(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.e)(this,"scale-click",7),this.scaleClickLegacy=Object(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.e)(this,"scaleClick",7),this.size="regular",this.background="white",this.colorScheme="color",this.variant="color",this.disabled=!1,this.selected=!1,this.iconOnly=!1,this.iconPosition="before",this.radius=null,this.ariaLangSelected="selected",this.ariaLangDeselected="deselected",this.ariaDescriptionTranslation="$selected",this.hasScaleIcon=!1,this.handleClick=function(event){event.preventDefault(),_this.selected=!_this.selected,_this.handleIconShape(),_this.scaleClick.emit({id:_this.toggleButtonId,selected:_this.selected}),Object(_utils_c4af5b47_js__WEBPACK_IMPORTED_MODULE_14__.d)(_this,"scaleClick",{id:_this.toggleButtonId,selected:_this.selected})},this.handleIconShape=function(){_this.hasScaleIcon&&Array.from(_this.hostElement.children).forEach((function(node){"SCALE-ICON"===node.nodeName.substr(0,10)&&(_this.selected?node.setAttribute("selected","true"):node.removeAttribute("selected"))}))}}var _setFocus;return function _createClass(Constructor,protoProps,staticProps){return protoProps&&_defineProperties(Constructor.prototype,protoProps),staticProps&&_defineProperties(Constructor,staticProps),Constructor}(ToggleButton,[{key:"setFocus",value:(_setFocus=function _asyncToGenerator(fn){return function(){var self=this,args=arguments;return new Promise((function(resolve,reject){var gen=fn.apply(self,args);function _next(value){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"next",value)}function _throw(err){asyncGeneratorStep(gen,resolve,reject,_next,_throw,"throw",err)}_next(void 0)}))}}(regeneratorRuntime.mark((function _callee(){return regeneratorRuntime.wrap((function _callee$(_context){for(;;)switch(_context.prev=_context.next){case 0:this.focusableElement.focus();case 1:case"end":return _context.stop()}}),_callee,this)}))),function setFocus(){return _setFocus.apply(this,arguments)})},{key:"connectedCallback",value:function connectedCallback(){this.setIconPositionProp(),this.handleIconShape()}},{key:"componentDidLoad",value:function componentDidLoad(){this.handleIconSize()}},{key:"componentDidRender",value:function componentDidRender(){this.handleIconSize(),this.hostElement.hasAttribute("aria-label")&&Object(_status_note_0089e9c9_js__WEBPACK_IMPORTED_MODULE_15__.a)({tag:"deprecated",message:'Property "ariaLabel" is deprecated. Please use the "ariaLabelToggleButton" property!',type:"warn",source:this.hostElement})}},{key:"componentWillLoad",value:function componentWillLoad(){null==this.toggleButtonId&&(this.toggleButtonId="toggle-button-"+i++)}},{key:"getAriaDescriptionTranslation",value:function getAriaDescriptionTranslation(){var replaceSelected=this.selected?this.ariaLangSelected:this.ariaLangDeselected;return this.ariaDescriptionTranslation.replace(/\$position/g,""+this.position).replace(/\$selected/g,""+replaceSelected)}},{key:"handleIconSize",value:function handleIconSize(){var _this2=this;Array.from(this.hostElement.children).forEach((function(child){"SCALE-ICON"===child.tagName.substr(0,10)&&child.setAttribute("size",iconSizes[_this2.size])}))}},{key:"setIconPositionProp",value:function setIconPositionProp(){var _this3=this,nodes=Array.from(this.hostElement.childNodes).filter((function(node){return"SCALE-ICON"===node.nodeName.substr(0,10)&&(_this3.hasScaleIcon=!0),!(3===node.nodeType&&""===node.nodeValue.trim())}));!this.iconOnly&&nodes&&nodes.length&&nodes[nodes.length-1]&&"SCALE-ICON"===nodes[nodes.length-1].nodeName.substr(0,10)&&(this.iconPosition="after")}},{key:"render",value:function render(){var _this4=this;return Object(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.g)(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.c,null,this.styles&&Object(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.g)("style",null,this.styles),Object(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.g)("button",{ref:function ref(el){return _this4.focusableElement=el},class:this.getCssClassMap(),id:this.toggleButtonId,onClick:this.handleClick,disabled:this.disabled,type:"button","aria-label":this.ariaLabelToggleButton,"aria-pressed":this.selected,part:this.getBasePartMap(),"aria-description":this.getAriaDescriptionTranslation()},Object(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.g)("slot",null)))}},{key:"getBasePartMap",value:function getBasePartMap(){return this.getCssOrBasePartMap("basePart")}},{key:"getCssClassMap",value:function getCssClassMap(){return this.getCssOrBasePartMap("css")}},{key:"getCssOrBasePartMap",value:function getCssOrBasePartMap(mode){var prefix="basePart"===mode?"":"toggle-button--";return Object(_index_713f92a5_js__WEBPACK_IMPORTED_MODULE_13__.a)("toggle-button",this.size&&""+prefix+this.size,this.background&&prefix+("grey"===this.background?"primary":"secondary"),!this.iconOnly&&this.iconPosition&&"toggle-button--icon-"+this.iconPosition,this.iconOnly&&prefix+"icon-only",!this.disabled&&this.selected&&prefix+"selected",this.radius&&""+prefix+this.radius,this.colorScheme&&""+prefix+this.colorScheme,this.variant&&""+prefix+this.variant,!this.hideBorder&&prefix+"border")}},{key:"hostElement",get:function get(){return Object(_index_6d95a4bc_js__WEBPACK_IMPORTED_MODULE_12__.f)(this)}}]),ToggleButton}();ToggleButton.style=":host{--width:auto;--spacing-x:var(--telekom-spacing-composition-space-08);--spacing-x-icon-only:var(--telekom-spacing-composition-space-04);--min-height:var(--telekom-spacing-composition-space-08);--height-xs:var(--telekom-spacing-composition-space-08);--height-small:var(--telekom-spacing-composition-space-10);--height-regular:var(--telekom-spacing-composition-space-12);--height-large:var(--telekom-spacing-composition-space-14);--radius:var(--telekom-radius-small);--transition:all var(--telekom-motion-duration-transition)\n      var(--telekom-motion-easing-standard),\n    border-radius var(--telekom-motion-duration-instant);--box-shadow-focus:inset 0 0 0 var(--telekom-line-weight-highlight)\n    var(--telekom-color-functional-focus-standard);--font-weight:var(--telekom-typography-font-weight-bold);--font-size-large:var(--telekom-typography-font-size-body);--font-size-small:var(--telekom-typography-font-size-caption);--font-size-xs:var(--telekom-typography-font-size-small);--line-height:var(--telekom-spacing-composition-space-04);--spacing-icon-x:var(--telekom-spacing-composition-space-04);--vertical-align:middle;--border-color:var(--telekom-color-ui-border-standard);--border-color-disabled:var(--telekom-color-ui-border-disabled);--color-disabled:var(--telekom-color-text-and-icon-disabled);--font-size-small:var(--telekom-typography-font-size-small);--line-height-small:var(--telekom-typography-line-spacing-standard);--min-height-small:var(--telekom-spacing-composition-space-10);--radius-primary:var(--radius);--background-primary:var(--telekom-color-ui-subtle);--background-primary-disabled:var(--telekom-color-ui-disabled);--color-primary:var(--telekom-color-ui-extra-strong);--color-primary-hover:var(--telekom-color-primary-hovered);--color-primary-active:var(--telekom-color-primary-pressed);--background-secondary:transparent;--color-secondary:var(--telekom-color-text-and-icon-standard);--background-secondary-hover:var(--telekom-color-ui-state-fill-hovered);--background-secondary-active:var(--telekom-color-ui-state-fill-pressed);--background-secondary-disabled:none;--border-secondary:var(--telekom-color-ui-border-standard);--border-secondary-hover:var(--telekom-color-ui-border-hovered);--border-secondary-active:var(--telekom-color-ui-border-pressed);--border-secondary-focus:var(--telekom-color-functional-focus-standard);--color-selected:var(--telekom-color-text-and-icon-white-standard);--background-selected-light:var(--telekom-color-primary-standard);--background-selected-hover-light:var(--telekom-color-primary-hovered);--background-selected-active-light:var(--telekom-color-primary-pressed);--background-selected-dark:var(--telekom-color-ui-extra-strong);--background-selected-hover-dark:var(--telekom-color-ui-strong);--background-selected-active-dark:var(--telekom-color-ui-strong);--color-high-contrast:var(--telekom-color-text-and-icon-white-standard)}.toggle-button{box-sizing:border-box;display:inline-flex;align-items:center;position:relative;border:0;outline:none;cursor:pointer;user-select:none;font-family:inherit;word-spacing:inherit;letter-spacing:inherit;justify-content:center;text-decoration:none;font-weight:var(--font-weight);font-size:var(--font-size);line-height:var(--line-height);min-height:var(--min-height);width:var(--width);padding-left:var(--spacing-x);padding-right:var(--spacing-x);vertical-align:var(--vertical-align);transition:var(--transition);margin:0;color:var(--color-primary)}.toggle-button--primary{background:var(--background-primary)}.toggle-button--secondary{color:var(--color-secondary);background:var(--background-secondary)}.toggle-button--icon-before ::slotted(*){margin-right:var(--spacing-icon-x);pointer-events:none}.toggle-button--icon-after ::slotted(*){margin-left:var(--spacing-icon-x);pointer-events:none}.toggle-button--icon-only ::slotted(*){pointer-events:none}.toggle-button--xs{height:var(--height-xs);font-size:var(--font-size-xs)}.toggle-button--small{height:var(--height-small);font-size:var(--font-size-small)}.toggle-button--regular{height:var(--height-regular);font-size:var(--font-size-large)}.toggle-button--large{height:var(--height-large);font-size:var(--font-size-large)}.toggle-button:not(.button--disabled):focus{box-shadow:var(--box-shadow-focus)}.toggle-button:not(.button--disabled):hover{color:var(--color-secondary-hover);background-color:var(--background-secondary-hover)}.toggle-button:not(.button--disabled):active{color:var(--color-secondary-active);background-color:var(--background-secondary-active)}.toggle-button:disabled{color:var(--color-disabled);pointer-events:none;border:1px solid var(--border-color-disabled)}.toggle-button:disabled.toggle-button--primary{background:var(--background-primary-disabled)}.toggle-button--selected.toggle-button--color{color:var(--color-selected);background:var(--background-selected-light)}.toggle-button--selected:not(.button--disabled).toggle-button--color:hover{color:var(--color-selected);background:var(--background-selected-hover-light)}.toggle-button--selected:not(.button--disabled).toggle-button--color:active{color:var(--color-selected);background:var(--background-selected-active-light)}.toggle-button--selected.toggle-button--monochrome{color:var(--telekom-color-text-and-icon-inverted-standard);background:var(--background-selected-dark)}.toggle-button--selected:not(.button--disabled).toggle-button--monochrome:hover{color:var(--color-selected);background:var(--background-selected-hover-dark)}.toggle-button--selected:not(.button--disabled).toggle-button--monochrome:active{color:var(--color-selected);background:var(--background-selected-active-dark)}.toggle-button--border{border:1px solid var(--border-color)}.toggle-button--left,.toggle-button--left:disabled{border-right:0;border-radius:var(--radius-primary) 0 0 var(--radius-primary)}.toggle-button--right,.toggle-button--right:disabled{border-left:0;border-radius:0 var(--radius-primary) var(--radius-primary) 0}.toggle-button--both,.toggle-button--both:disabled{border-radius:var(--radius-primary)}.toggle-button--all,.toggle-button--all:disabled{border-radius:var(--radius-primary)}.toggle-button--neither,.toggle-button--neither:disabled{border-right:0;border-left:0;border-radius:0}@media screen and (forced-colors: active), (-ms-high-contrast: active){.toggle-button{color:var(--color-high-contrast)}}"},"../components/dist/esm/status-note-0089e9c9.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return statusNote}));var tagTypes={beta:"β",WIP:"🛠 WIP",deprecated:"😵 Deprecation notice",warning:"Warning"},defaultMessages={beta:"This component is currently in beta status. Some things may be refactored. Watch the change log for now.",WIP:"This component is currently under development and is prone to change. Please wait for its release.\nIt will be available in Storybook once it's finished and documented.",deprecated:"This component is deprecated."};function statusNote(_ref){var _ref$tag=_ref.tag,tag=void 0===_ref$tag?"WIP":_ref$tag,_ref$extraMessage=_ref.extraMessage,extraMessage=void 0===_ref$extraMessage?null:_ref$extraMessage,_ref$message=_ref.message,message=void 0===_ref$message?null:_ref$message,_ref$source=_ref.source,source=void 0===_ref$source?null:_ref$source,_ref$type=_ref.type;(0,console[void 0===_ref$type?"info":_ref$type])("%c scale – "+tagTypes[tag]+" ","background: #E20074; color: #FFF; border-radius: 4px","\n\n"+(message||defaultMessages[tag])+" "+(extraMessage?"\n"+extraMessage:"")+"\n    ",null!==source?"\nsource:":"","object"==typeof source?source:""+source,null!==source?"\n\n":"")}},"../components/dist/esm/utils-c4af5b47.js":function(module,__webpack_exports__,__webpack_require__){"use strict";__webpack_require__.d(__webpack_exports__,"a",(function(){return animationsFinished})),__webpack_require__.d(__webpack_exports__,"b",(function(){return isClickOutside})),__webpack_require__.d(__webpack_exports__,"c",(function(){return isPseudoClassSupported})),__webpack_require__.d(__webpack_exports__,"d",(function(){return emitEvent})),__webpack_require__.d(__webpack_exports__,"e",(function(){return generateUniqueId})),__webpack_require__.d(__webpack_exports__,"f",(function(){return hasShadowDom})),__webpack_require__.d(__webpack_exports__,"g",(function(){return isScaleIcon}));__webpack_require__("../../node_modules/core-js/modules/es.promise.js"),__webpack_require__("../../node_modules/core-js/modules/es.object.to-string.js"),__webpack_require__("../../node_modules/core-js/modules/es.string.iterator.js"),__webpack_require__("../../node_modules/core-js/modules/es.array.iterator.js"),__webpack_require__("../../node_modules/core-js/modules/web.dom-collections.iterator.js"),__webpack_require__("../../node_modules/core-js/modules/es.array.map.js");var hasShadowDom=function hasShadowDom(el){return!!el.shadowRoot&&!!el.attachShadow},isPseudoClassSupported=function isPseudoClassSupported(pseudoClass){var ss=document.styleSheets[0];if(!ss){var el=document.createElement("style");document.head.appendChild(el),ss=document.styleSheets[0],document.head.removeChild(el)}return function testPseudo(){try{return/^:/.test(pseudoClass)||(pseudoClass=":"+pseudoClass),ss.insertRule("html"+pseudoClass+"{}",0),ss.deleteRule(0),!0}catch(e){return!1}}()};function emitEvent(instance,eventKey,detail){var legacyKey=eventKey+"Legacy",emitted=[];return void 0!==instance[legacyKey]&&emitted.push(instance[legacyKey].emit(detail)),emitted.push(instance[eventKey].emit(detail)),emitted}function isClickOutside(event,host){var target=event.target,hasShadow=null!=target.shadowRoot,composedPath=hasShadow?event.composedPath():[];do{if(target===host)return!1;target=hasShadow?composedPath.shift():target.parentNode}while(target);return!0}var isScaleIcon=function isScaleIcon(el){return null!=el&&1===el.nodeType&&"SCALE-ICON"===el.nodeName.toUpperCase().substring(0,10)},id=0;function generateUniqueId(){return id++}var animationsFinished=function animationsFinished(el){return Promise.all(el.getAnimations({subtree:!0}).map((function(x){return x.finished})))}}}]);
//# sourceMappingURL=25.c66f39d7.iframe.bundle.js.map