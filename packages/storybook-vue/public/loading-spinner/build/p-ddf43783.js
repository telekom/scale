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
const e=(t=[],l,n)=>t.reduce(((t,r)=>r.id===l?{selected:r,parent:n}:r.children&&r.children.length&&e(r.children,l,r).selected?e(r.children,l,r):t),{selected:null,parent:null}),t=(t,l)=>{let n=e(t,l);for(;n.parent;)n=e(t,n.parent.id);return n.selected};export{e as a,t as f}