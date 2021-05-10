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
const e={beta:"β",WIP:"🛠 WIP",deprecated:"😵 Deprecation notice"},n={beta:"This component is currently in beta status. Some things may be refactored. Watch the change log for now.",WIP:"This component is currently under development and is prone to change. Please wait for its release.\nIt will be available in Storybook once it's finished and documented.",deprecated:"This component is deprecated."};function o({tag:o="WIP",extraMessage:t=null,message:a=null,source:s=null,type:c="info"}){(0,console[c])(`%c scale – ${e[o]} `,"background: #E20074; color: #FFF; border-radius: 4px",`\n\n${a||n[o]} ${t?"\n"+t:""}\n    `,null!==s?"\nsource:":"","object"==typeof s?s:""+s,null!==s?"\n\n":"")}export{o as s}