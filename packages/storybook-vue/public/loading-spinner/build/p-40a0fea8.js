var r,n=(function(r){
/*!
  Copyright (c) 2017 Jed Watson.
  Licensed under the MIT License (MIT), see
  http://jedwatson.github.io/classnames
*/
!function(){var n={}.hasOwnProperty;function e(){for(var r=[],o=0;o<arguments.length;o++){var i=arguments[o];if(i){var t=typeof i;if("string"===t||"number"===t)r.push(i);else if(Array.isArray(i)&&i.length){var u=e.apply(null,i);u&&r.push(u)}else if("object"===t)for(var f in i)n.call(i,f)&&i[f]&&r.push(f)}}return r.join(" ")}r.exports?(e.default=e,r.exports=e):window.classNames=e}()}(r={path:undefined,exports:{},require:function(){return function(){throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs")}()}}),r.exports);export{n as c}