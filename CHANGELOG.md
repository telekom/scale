# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [3.0.0-beta.159](https://github.com/telekom/scale/compare/v3.0.0-beta.158...v3.0.0-beta.159) (2026-02-20)


### Bug Fixes

* a11y contrast issues in dark mode ([#2458](https://github.com/telekom/scale/issues/2458)) ([e40d54d](https://github.com/telekom/scale/commit/e40d54dfd46b0580f1067e3d31547b79a3bed313))
* readme build leads to undeterministic results ([#2460](https://github.com/telekom/scale/issues/2460)) ([7fb79f1](https://github.com/telekom/scale/commit/7fb79f1b21c65579e01c1160f10e2923eaf7b1f5))
* remove disabled attribute when false ([#2390](https://github.com/telekom/scale/issues/2390)) ([#2447](https://github.com/telekom/scale/issues/2447)) ([6d4d9e9](https://github.com/telekom/scale/commit/6d4d9e918956941bb6f3c8094635874d4ceea36b))
* update node version from 16 to 22 in release workflow ([d967f68](https://github.com/telekom/scale/commit/d967f68e0db0be8a52197ed80ee51306d3a168d6))
* **date-picker:** Fix date-picker button label localization([#2417](https://github.com/telekom/scale/issues/2417)) ([#2438](https://github.com/telekom/scale/issues/2438)) ([4608fb9](https://github.com/telekom/scale/commit/4608fb9a57e9693cea44fd7d6fe97ce17f765a1e))
* **text-field:** auto-size textfield height accesability ([#2439](https://github.com/telekom/scale/issues/2439)) ([d6b4d67](https://github.com/telekom/scale/commit/d6b4d676a62c1153418eaef9cbe5c1066330e25c))


### Features

* add combobox component ([#2445](https://github.com/telekom/scale/issues/2445)) ([4d64560](https://github.com/telekom/scale/commit/4d64560a65395ce60ac96010528230af5408617e))
* add data-qa for input fields ([#2451](https://github.com/telekom/scale/issues/2451)) ([361def0](https://github.com/telekom/scale/commit/361def0dabeb5f260b2929a946644bf9c18eac70))






# [3.0.0-beta.158](https://github.com/telekom/scale/compare/v3.0.0-beta.157...v3.0.0-beta.158) (2025-10-29)


### Bug Fixes

* **telekom-header:** fixes minimum size for the language switcher for i18n compatibility  ([c8cda97](https://github.com/telekom/scale/commit/c8cda97f2f86e5cf488bd425c39e0bd6897f1da1))
* **text-field:** the label accessibility is fixed to work when the hide-label-visually is set  ([f4ba48d](https://github.com/telekom/scale/commit/f4ba48dea477cae1eef547bcfe77fbb02034ad05))
* **text-field:** update styles of input components to prevent overflow ([#2433](https://github.com/telekom/scale/issues/2433)) ([0ab297c](https://github.com/telekom/scale/commit/0ab297c532a2209b338a573d724c7c78e6e64e9e))






# [3.0.0-beta.157](https://github.com/amir-ba/scale/compare/v3.0.0-beta.156...v3.0.0-beta.157) (2025-09-17)


### Bug Fixes

* **data-grid:** fix issue with table header overlapping the table body ([#2426](https://github.com/amir-ba/scale/issues/2426)) ([81dc80c](https://github.com/amir-ba/scale/commit/81dc80c965cf10ac1674f3eb5d59168bcfbfdb4e))
* **data-grid:** fix overflowing table header text when title space reduced ([#2425](https://github.com/amir-ba/scale/issues/2425)) ([3279e36](https://github.com/amir-ba/scale/commit/3279e36144a79e7453684b8880575fc1b364153a))
* **helper-text:** add aria-hidden to helper icons ([#2402](https://github.com/amir-ba/scale/issues/2402)) ([f71532d](https://github.com/amir-ba/scale/commit/f71532dc127bac802aed8e06b7e4420e41a79a82))






# [3.0.0-beta.156](https://github.com/amir-ba/scale/compare/v3.0.0-beta.154...v3.0.0-beta.156) (2025-06-19)


### Bug Fixes

* **data-grid:** prevents null or undefined break max content length calculation ([#2395](https://github.com/amir-ba/scale/issues/2395)) ([32afca9](https://github.com/amir-ba/scale/commit/32afca9044067a53c71a4d28d82086319b2d5b5b))
* **date-picker:** check for querySelector value added ([#2374](https://github.com/amir-ba/scale/issues/2374)) ([dac9e93](https://github.com/amir-ba/scale/commit/dac9e93f2f30ef18d84d586a74b200476646148a))
* **drop-down:** fixes hidden input in dropdown-select with null check ([#2361](https://github.com/amir-ba/scale/issues/2361)) ([8a04a5e](https://github.com/amir-ba/scale/commit/8a04a5e8c0bb3b72a2fbb90822600f6b8feefc06))
* **mega-menu-column:** fixed its positioning when screen is small ([#2388](https://github.com/amir-ba/scale/issues/2388)) ([cb4f115](https://github.com/amir-ba/scale/commit/cb4f115b63f49a4986cace687f81043f4bfd22d8))
* **nav-item:** add null check for child element before setting role to menuitem ([#2369](https://github.com/amir-ba/scale/issues/2369)) ([5fd16f1](https://github.com/amir-ba/scale/commit/5fd16f1d9f3f5259c004ae6f155117150ee8a0a3))
* **nav-item:** makes nav-itemcomponent respect the active=false  ([#2364](https://github.com/amir-ba/scale/issues/2364)) ([9a999fb](https://github.com/amir-ba/scale/commit/9a999fb298f481d7d94dd430434678021acb007c))
* **segmented button:** Scale Segmented Button doesn't respect controlled selected state ([#2166](https://github.com/amir-ba/scale/issues/2166)) ([#2384](https://github.com/amir-ba/scale/issues/2384)) ([39ad8ab](https://github.com/amir-ba/scale/commit/39ad8ab04f457ebe84b122ca3bd17802e9a4cacf))
* **segmented-button:** fixed ratio contrast to fulfill AA requirement ([#2385](https://github.com/amir-ba/scale/issues/2385)) ([de88dfc](https://github.com/amir-ba/scale/commit/de88dfcf7a91349e3d8acfb8d4aa2fbd92cd62e5))
* **switch:** add text color for switch toggle ([#2396](https://github.com/amir-ba/scale/issues/2396)) ([39accf4](https://github.com/amir-ba/scale/commit/39accf4ef6004b6624ade3477d6cc0f00d5d13e1))
* **telekom-mobile-menu-item:** fixed icon placing ([#2387](https://github.com/amir-ba/scale/issues/2387)) ([0307f25](https://github.com/amir-ba/scale/commit/0307f25d8f7bffe68adcd859fa3e9aab46a4615e))


### Features

* **dropdown-select:** add clear button to improve user experience ([#2391](https://github.com/amir-ba/scale/issues/2391)) ([9fbe1c6](https://github.com/amir-ba/scale/commit/9fbe1c64ca0ae7360645d7f9263897fcae206c97))






# [3.0.0-beta.155](https://github.com/amir-ba/scale/compare/v3.0.0-beta.154...v3.0.0-beta.155) (2024-11-26)


### Bug Fixes

* **drop-down:** fixes hidden input in dropdown-select with null check ([#2361](https://github.com/amir-ba/scale/issues/2361)) ([8a04a5e](https://github.com/amir-ba/scale/commit/8a04a5e8c0bb3b72a2fbb90822600f6b8feefc06))
* **nav-item:** add null check for child element before setting role to menuitem ([#2369](https://github.com/amir-ba/scale/issues/2369)) ([5fd16f1](https://github.com/amir-ba/scale/commit/5fd16f1d9f3f5259c004ae6f155117150ee8a0a3))
* **nav-item:** makes nav-itemcomponent respect the active=false  ([#2364](https://github.com/amir-ba/scale/issues/2364)) ([9a999fb](https://github.com/amir-ba/scale/commit/9a999fb298f481d7d94dd430434678021acb007c))






# [3.0.0-beta.154](https://github.com/amir-ba/scale/compare/v3.0.0-beta.152...v3.0.0-beta.154) (2024-11-06)


### Bug Fixes

* **button:** Include name and value properties on temporary submit button ([#2351](https://github.com/amir-ba/scale/issues/2351)) ([e0ff157](https://github.com/amir-ba/scale/commit/e0ff15764128fecc0a643d14e1ee01f64ab67d0f))
* **data-grid:** imporves pagination with 0 elements ([#2316](https://github.com/amir-ba/scale/issues/2316)) ([42a3b36](https://github.com/amir-ba/scale/commit/42a3b3699df5b361b63fc9c466461e2af61d67ed))
* **nav-item:** hover underline on function slots ([#2260](https://github.com/amir-ba/scale/issues/2260)) ([6e8c380](https://github.com/amir-ba/scale/commit/6e8c38027a861babd28e8925dcc5db1c87a4b05d))
* **segment:** improves loading of the component and solves nested elemnts sizing issue ([#2358](https://github.com/amir-ba/scale/issues/2358)) ([299be7d](https://github.com/amir-ba/scale/commit/299be7d00122ed34fcde07cff9e288e291e33318))
* **tab-nav:** fixes preselect logic in tabs with disabled attribute ([#2320](https://github.com/amir-ba/scale/issues/2320)) ([bd30a6f](https://github.com/amir-ba/scale/commit/bd30a6f2a187976ae85234b5f526537f68b3ea80))
* dropdown scroll fixed ([#2333](https://github.com/amir-ba/scale/issues/2333)) ([592c69d](https://github.com/amir-ba/scale/commit/592c69d00e4a50f7113973bc583dff19f1cc8979))


### Features

* **accordion:** allow collapsible to be individually expanded ([#2263](https://github.com/amir-ba/scale/issues/2263)) ([9b02151](https://github.com/amir-ba/scale/commit/9b021511c94e29e9644680afcb15236b96ab35b5))
* **data-grid:** add scale-selection event and enhance editable text field ([#2362](https://github.com/amir-ba/scale/issues/2362)) ([eeaecaf](https://github.com/amir-ba/scale/commit/eeaecaf461f014fb57c4ad14e3f279640b777c5f))
* aria-details added to all input types ([#2359](https://github.com/amir-ba/scale/issues/2359)) ([4c45650](https://github.com/amir-ba/scale/commit/4c45650e14eff01ef42525f08ba27c1c7b0f2109))
* **data-grid:** added tooltip and scale-icon in data-grid action cell  ([#2308](https://github.com/amir-ba/scale/issues/2308)) ([30a0ce5](https://github.com/amir-ba/scale/commit/30a0ce5bdb8ca13d0c6a067894a0ee4aef6dd98b))
* **data-grid:** adds presort to grid ([#2335](https://github.com/amir-ba/scale/issues/2335)) ([f657202](https://github.com/amir-ba/scale/commit/f6572021489ae07914dbbb6d31cb0aa2d20ea74c))






# [3.0.0-beta.153](https://github.com/amir-ba/scale/compare/v3.0.0-beta.152...v3.0.0-beta.153) (2024-09-19)


### Bug Fixes

* dropdown scroll fixed ([#2327](https://github.com/scale/issues/2327)) ([6f326eb](https://github.com/telekom/scale/commit/6f326eb138eff93080d39b1c74d48d9393fd1684))
* chip accessibility fix ([#2328](https://github.com/telekom/scale/issues/2328)) ([0b21978](https://github.com/telekom/scale/commit/0b21978bad9516d9958aa61e733a3f8348d11799))
* checkbox and switch css fixes for high contrast mode ([#2300](https://github.com/scale/issues/2300)) ([318df56](https://github.com/telekom/scale/commit/318df5658a21b7eea44abe37eba1fc6bedfc243c))
* ghost btn in storybook ([#2312](https://github.com/scale/issues/2312)) ([168f710](https://github.com/telekom/scale/commit/168f710fedae9df7f08decb79066b14bd7f73d1e))
* update of event descriptions in storybook ([#2315](https://github.com/scale/issues/2315)) ([8681ed8](https://github.com/telekom/scale/commit/8681ed8d4f1cd08a756cf7e952e520df840c40b4))
* aria describedby added extended for other use cases in text field ([#2349](https://github.com/scale/issues/2349)) ([2706542](https://github.com/telekom/scale/commit/270654297695571068c894aee30178729f361833))



# [3.0.0-beta.152](https://github.com/telekom/scale/compare/v3.0.0-beta.151...v3.0.0-beta.152) (2024-07-10)


### Bug Fixes

* **data-grid:** allow empty date ([#2322](https://github.com/telekom/scale/issues/2322)) ([116b50e](https://github.com/telekom/scale/commit/116b50e7a8712722f76edb9727ae0d9996aa516f))
* **data-grid:** re-apply sort on data change ([#2324](https://github.com/telekom/scale/issues/2324)) ([3558e4b](https://github.com/telekom/scale/commit/3558e4b3ffd0b39fa34e7674c94482b8f82707f9))
* **dropdown-select:** remove type keyword in import ([#2310](https://github.com/telekom/scale/issues/2310)) ([7304444](https://github.com/telekom/scale/commit/7304444f9dfee131496db39b28d99d46538946bb))





# [3.0.0-beta.151](https://github.com/telekom/scale/compare/v3.0.0-beta.150...v3.0.0-beta.151) (2024-04-12)


### Bug Fixes

* **telekom-profile-menu:** keyboard accessibility & optional logout handler ([#2306](https://github.com/telekom/scale/issues/2306)) ([bb7aabd](https://github.com/telekom/scale/commit/bb7aabdb0a56ccdce245947bd35e69861bf3bc17))


### Features

* **dropdown-select:** ensure single dropdown open at a time ([#2307](https://github.com/telekom/scale/issues/2307)) ([2ad95bd](https://github.com/telekom/scale/commit/2ad95bdae1f8fb8e2ae785ba3cea4e52de075f57))





# [3.0.0-beta.150](https://github.com/telekom/scale/compare/v3.0.0-beta.149...v3.0.0-beta.150) (2024-02-26)

**Note:** Version bump only for package telekom





# [3.0.0-beta.149](https://github.com/telekom/scale/compare/v3.0.0-beta.148...v3.0.0-beta.149) (2024-02-23)


### Bug Fixes

* **telekom-profile-menu:** stories and flyout menu fixes ([#2273](https://github.com/telekom/scale/issues/2273)) ([aa0e237](https://github.com/telekom/scale/commit/aa0e2371305515f0e37fd06acc5d3c9c381d47ac))





# [3.0.0-beta.148](https://github.com/telekom/scale/compare/v3.0.0-beta.147...v3.0.0-beta.148) (2024-02-15)


### Bug Fixes

* **data-grid:** heading height with hidden menu ([#2270](https://github.com/telekom/scale/issues/2270)) ([736a301](https://github.com/telekom/scale/commit/736a3013214540c8fe4cb7a7b62e30015fcf4e57))
* **dropdown-select:** disable keyboard navigation when disabled ([#2271](https://github.com/telekom/scale/issues/2271)) ([cc1bf66](https://github.com/telekom/scale/commit/cc1bf66ebc006ca1b07333b06be1a0c238456f0e))
* **dropdown-select:** escape name of hidden input in dropdown-select to support square brackets ([#2267](https://github.com/telekom/scale/issues/2267)) ([97b1297](https://github.com/telekom/scale/commit/97b129704d36733a650cad99229b475a3f92937c))
* **dropdown-select:** remove querySelector, store the hidden input in a variable instead ([#2279](https://github.com/telekom/scale/issues/2279)) ([6ed6c2a](https://github.com/telekom/scale/commit/6ed6c2a86aade135cbc1d9fe7ccd80ab95f824cc))
* **table:** prevent jumping headers when sorting ([#2265](https://github.com/telekom/scale/issues/2265)) ([94f0cd4](https://github.com/telekom/scale/commit/94f0cd4a197872d19c1e4334fe797c262c57de0e))
* **telekom-header:** listen for mouseleave on mega menu to close mega when moving cursor beyond mega menu ([#2280](https://github.com/telekom/scale/issues/2280)) ([ae5812a](https://github.com/telekom/scale/commit/ae5812afd64c471bd95d2292e3c4364ec29b4541))


### Features

* **telekom-profile-menu:** WIP ([#2208](https://github.com/telekom/scale/issues/2208)) ([41374f0](https://github.com/telekom/scale/commit/41374f0b8bb847507e0fd8565d01ad314d467fb6))





# [3.0.0-beta.147](https://github.com/telekom/scale/compare/v3.0.0-beta.146...v3.0.0-beta.147) (2024-01-15)


### Bug Fixes

* allow sorting of dynamically added columns2 ([#2246](https://github.com/telekom/scale/issues/2246)) ([c33b083](https://github.com/telekom/scale/commit/c33b083d3895abe65545da6e0b3e62be4c3a9525))
* enable programmatic disabled [#2248](https://github.com/telekom/scale/issues/2248) ([bab9369](https://github.com/telekom/scale/commit/bab9369d8761664454c74847b8d652929d21d743))
* remove unnecessary prop, add required aria attribute ([#2192](https://github.com/telekom/scale/issues/2192)) ([e63dbc1](https://github.com/telekom/scale/commit/e63dbc16f9eec9fd35e9a5146a984be3035a89b7))
* set color scheme ([#2257](https://github.com/telekom/scale/issues/2257)) ([0f4bdee](https://github.com/telekom/scale/commit/0f4bdee5aa2942d17c98ad002bdff599cbc73050))





# [3.0.0-beta.146](https://github.com/telekom/scale/compare/v3.0.0-beta.145...v3.0.0-beta.146) (2023-12-22)


### Bug Fixes

* add id to nav items ([#2235](https://github.com/telekom/scale/issues/2235)) ([3349e8d](https://github.com/telekom/scale/commit/3349e8da50a896b847fa84d40274934f18206c96))
* add min height css var ([#2233](https://github.com/telekom/scale/issues/2233)) ([84cc37b](https://github.com/telekom/scale/commit/84cc37b9ed26a13439a796b44eefc29c827d0063))
* focus outline on header bottom-bar ([#2205](https://github.com/telekom/scale/issues/2205)) ([949c2d7](https://github.com/telekom/scale/commit/949c2d7a8696b39b768fedc7b43f350c213f000e))
* handle setting disabled programatically ([#2240](https://github.com/telekom/scale/issues/2240)) ([6dcfdd1](https://github.com/telekom/scale/commit/6dcfdd1f3c89f85bcb73cc4cedfdc48b1cceb8fb))
* mega menu grid ([#2237](https://github.com/telekom/scale/issues/2237)) ([1c707b8](https://github.com/telekom/scale/commit/1c707b80025b77152cc930106b8101770cdbe75f))





# [3.0.0-beta.145](https://github.com/telekom/scale/compare/v3.0.0-beta.144...v3.0.0-beta.145) (2023-12-11)


### Bug Fixes

* **telekom-header:** prevent flicker that could make the footer unreachable ([#2230](https://github.com/telekom/scale/issues/2230)) ([03cdd4c](https://github.com/telekom/scale/commit/03cdd4ce049121edae9acda38235389464bfb785))





# [3.0.0-beta.144](https://github.com/telekom/scale/compare/v3.0.0-beta.143...v3.0.0-beta.144) (2023-11-30)


### Bug Fixes

* add hidden input with name attribute ([#2212](https://github.com/telekom/scale/issues/2212)) ([ebd325f](https://github.com/telekom/scale/commit/ebd325f26c208f8fb8f0803835d5571461730631))
* add prop for removing tabindex ([#2215](https://github.com/telekom/scale/issues/2215)) ([3fdafab](https://github.com/telekom/scale/commit/3fdafab34f567056044918228b84fcb6c30869d1))
* allow sorting by german date format ([#2159](https://github.com/telekom/scale/issues/2159)) ([4229de7](https://github.com/telekom/scale/commit/4229de7588dbaacf6b6be07d7694c2b88b14bd3a))
* aria role behavior ([#2171](https://github.com/telekom/scale/issues/2171)) ([59c57bc](https://github.com/telekom/scale/commit/59c57bc08d98957675bd210927cf028ceb275f89))
* exclude hidden input from dropdown select options ([#2224](https://github.com/telekom/scale/issues/2224)) ([d5e2e5b](https://github.com/telekom/scale/commit/d5e2e5bdfc82baa7cdf8bcfcc7ba74fe67731f9b))
* logo only focusable if href provided ([#2207](https://github.com/telekom/scale/issues/2207)) ([63c8657](https://github.com/telekom/scale/commit/63c8657348f99a2494c68d95e36b0fc087ebcc86))
* modal tooltip placement ([07061ef](https://github.com/telekom/scale/commit/07061ef596f1f3e821af3db8ee6ef2c2c9b13353))
* remove language from app-footer logo ([#2183](https://github.com/telekom/scale/issues/2183)) ([f8200de](https://github.com/telekom/scale/commit/f8200def12e576c343d71cab9d4f4fe3cc302714))
* revert unwanted changes on main ([78f3009](https://github.com/telekom/scale/commit/78f30093182ee2d4c64f65d8e01a34815e2b23c7))
* tooltip within modal ([#2206](https://github.com/telekom/scale/issues/2206)) ([ed10e49](https://github.com/telekom/scale/commit/ed10e49e109748d439d98ae81f7cb33246906e22))
* use spans inside labels for correct html ([#2217](https://github.com/telekom/scale/issues/2217)) ([6d1d3f7](https://github.com/telekom/scale/commit/6d1d3f795dcd7e37c431bdf830f2a3867b7ebd3a))


### Features

* **dropdown-select:** add disabled state for individual options ([#2174](https://github.com/telekom/scale/issues/2174)) ([b53b711](https://github.com/telekom/scale/commit/b53b7113ddf73725ae30cb28f39868caf2d05683))
* update ghost button color ([#2181](https://github.com/telekom/scale/issues/2181)) ([60d33c4](https://github.com/telekom/scale/commit/60d33c4fb15c5f79b43b386d077c11ea7e0c9dde))





# [3.0.0-beta.143](https://github.com/telekom/scale/compare/v3.0.0-beta.142...v3.0.0-beta.143) (2023-11-03)


### Bug Fixes

* add border radius to focussed nav item ([#2175](https://github.com/telekom/scale/issues/2175)) ([2d9795c](https://github.com/telekom/scale/commit/2d9795cbeba4308cd464e15b3cbdaba3e65b0109))
* blur behavior ([#2177](https://github.com/telekom/scale/issues/2177)) ([4f86750](https://github.com/telekom/scale/commit/4f86750c0e4ba2ad2dd5c8f9d983d12c907b90d8))
* set aria-invalid true when invalid ([#2168](https://github.com/telekom/scale/issues/2168)) ([90b8bb9](https://github.com/telekom/scale/commit/90b8bb9a1579fa55f4dc0e84617a37401171fc45))
* update parent checkbox state when new children are added dynamically ([#2145](https://github.com/telekom/scale/issues/2145)) ([5d8d71f](https://github.com/telekom/scale/commit/5d8d71fbc08db15c2d47784f579e2ec4077aafc0))


### Features

* add engines to package.json ([#2185](https://github.com/telekom/scale/issues/2185)) ([e42c984](https://github.com/telekom/scale/commit/e42c984ca509377a7a3c657245c8022b3d847cae))





# [3.0.0-beta.142](https://github.com/telekom/scale/compare/v3.0.0-beta.141...v3.0.0-beta.142) (2023-10-09)


### Bug Fixes

* align counter and helper-text ([#2150](https://github.com/telekom/scale/issues/2150)) ([8e729ca](https://github.com/telekom/scale/commit/8e729ca1900d581ff115017dd4f5eaf374dc38d6))
* prevent sorting when resizing column ([#2149](https://github.com/telekom/scale/issues/2149)) ([e78af7c](https://github.com/telekom/scale/commit/e78af7c012ae910b6c421c760bf193ffdb1bf4e5))


### Features

* new gha workflow to create releases with bundled assets ([#2153](https://github.com/telekom/scale/issues/2153)) ([ca22494](https://github.com/telekom/scale/commit/ca2249487dd69741c4fff3877e4b00a4a7424ba1))





# [3.0.0-beta.141](https://github.com/telekom/scale/compare/v3.0.0-beta.140...v3.0.0-beta.141) (2023-09-22)


### Bug Fixes

* add font-display strategy for performance ([#2135](https://github.com/telekom/scale/issues/2135)) ([ae354cf](https://github.com/telekom/scale/commit/ae354cf0600f9e9329fb9e79fb7969d59b25d185))
* allow setting href on footer logo ([#2132](https://github.com/telekom/scale/issues/2132)) ([502f9ae](https://github.com/telekom/scale/commit/502f9ae7eb69ef7e1a049d34fb9d95da2f739f24))
* nav-item positioning ([#2141](https://github.com/telekom/scale/issues/2141)) ([0640ebc](https://github.com/telekom/scale/commit/0640ebcfdab8597ca846838678b57d39a2221bb4))
* remove default language from logo to avoid deprecation warning ([#2139](https://github.com/telekom/scale/issues/2139)) ([c1589e8](https://github.com/telekom/scale/commit/c1589e8d080ce3c2b0f74c39ea5ba1fb9ec79e1f))
* set scrolled attribute only when offset is larger than the header ([#2133](https://github.com/telekom/scale/issues/2133)) ([df45405](https://github.com/telekom/scale/commit/df454054bea2d2fb3da259d786cf112b9718433c))
* **radio-button:** polish click handling and hover/active states ([#2131](https://github.com/telekom/scale/issues/2131)) ([9ea4c6a](https://github.com/telekom/scale/commit/9ea4c6a96d4e0a0b5f8824fc144049baf548988d))





# [3.0.0-beta.140](https://github.com/telekom/scale/compare/v3.0.0-beta.139...v3.0.0-beta.140) (2023-09-13)


### Bug Fixes

* **radio-button:** ensure change event is emitted when clicking input-label gap ([#2123](https://github.com/telekom/scale/issues/2123)) ([5423cb8](https://github.com/telekom/scale/commit/5423cb80520f93aae52eab4ff6a5477dcd072f09))


### Features

* **data-grid:** enable localization for flyout menu ([#1411](https://github.com/telekom/scale/issues/1411)) ([053b10d](https://github.com/telekom/scale/commit/053b10d4e75616059a889b6e1d26012645eda97d))





# [3.0.0-beta.139](https://github.com/telekom/scale/compare/v3.0.0-beta.138...v3.0.0-beta.139) (2023-09-06)


### Bug Fixes

* ignore blur when inside a tab panel ([#2111](https://github.com/telekom/scale/issues/2111)) ([3de029b](https://github.com/telekom/scale/commit/3de029b92458e135b9eafa3a7ed7015503fe41a7))
* set aria live on body part ([#2116](https://github.com/telekom/scale/issues/2116)) ([4c00769](https://github.com/telekom/scale/commit/4c00769ba49448a1ac2b8d8cb0d5874585b9ad24))
* set aria-current to false when changed ([#2015](https://github.com/telekom/scale/issues/2015)) ([51c9019](https://github.com/telekom/scale/commit/51c9019b2a5bd0dfd96905ee804a1af321547dac))
* set aria-label on nested button instead of scale-button ([#2115](https://github.com/telekom/scale/issues/2115)) ([fa502cf](https://github.com/telekom/scale/commit/fa502cfcc17fca54d87899901629c4eb29920493))
* tk-network ([#2117](https://github.com/telekom/scale/issues/2117)) ([3747093](https://github.com/telekom/scale/commit/374709357745cfa7d1618e445a0b175581ff3ddd))





# [3.0.0-beta.138](https://github.com/telekom/scale/compare/v3.0.0-beta.137...v3.0.0-beta.138) (2023-08-29)


### Bug Fixes

* update icons ([#2101](https://github.com/telekom/scale/issues/2101)) ([5cf6188](https://github.com/telekom/scale/commit/5cf61889952c5abdaea007c4ae93856be1631250))





# [3.0.0-beta.137](https://github.com/telekom/scale/compare/v3.0.0-beta.136...v3.0.0-beta.137) (2023-07-21)


### Bug Fixes

* a11y feedback ([#2049](https://github.com/telekom/scale/issues/2049)) ([3db8a8f](https://github.com/telekom/scale/commit/3db8a8fad8f80a7e94831394fb5c37225f0e9562))
* avoid additional render ([#2057](https://github.com/telekom/scale/issues/2057)) ([537f932](https://github.com/telekom/scale/commit/537f932215578f866115a2599bb0c31d425bb04f))


### Features

* adding handler for 100+ percentage ([#2043](https://github.com/telekom/scale/issues/2043)) ([989b89c](https://github.com/telekom/scale/commit/989b89cad9921e4a9f9f0ab9682ffe35b31e4c72))
* use new spacing tokens ([#2059](https://github.com/telekom/scale/issues/2059)) ([e432efd](https://github.com/telekom/scale/commit/e432efd6754d52bf0ed9a3fe9e28be11f954766a))





# [3.0.0-beta.136](https://github.com/telekom/scale/compare/v3.0.0-beta.135...v3.0.0-beta.136) (2023-06-27)


### Bug Fixes

* add missing fonts ([#2041](https://github.com/telekom/scale/issues/2041)) ([0d091c7](https://github.com/telekom/scale/commit/0d091c7e9fa40c628107948db9e98b57052edc41))
* add umd out for react wrapper ([#2018](https://github.com/telekom/scale/issues/2018)) ([1286756](https://github.com/telekom/scale/commit/12867561fb87e351c557bac017b32ae9aacc04e8)), closes [#2039](https://github.com/telekom/scale/issues/2039) [#2005](https://github.com/telekom/scale/issues/2005) [#2006](https://github.com/telekom/scale/issues/2006) [#2012](https://github.com/telekom/scale/issues/2012)





# [3.0.0-beta.135](https://github.com/telekom/scale/compare/v3.0.0-beta.134...v3.0.0-beta.135) (2023-06-21)


### Bug Fixes

* icon generation ([#2030](https://github.com/telekom/scale/issues/2030)) ([7f6b9ae](https://github.com/telekom/scale/commit/7f6b9ae0c97b20375309bd5ab86f966e7a6e93e0))
* **list:** spacing ([#2005](https://github.com/telekom/scale/issues/2005)) ([b5a501d](https://github.com/telekom/scale/commit/b5a501d2d12609ab980dae7c47c87770f5010867)), closes [#2006](https://github.com/telekom/scale/issues/2006) [#2012](https://github.com/telekom/scale/issues/2012)
* accordion spacing and icon size ([#1936](https://github.com/telekom/scale/issues/1936)) ([bf3e60d](https://github.com/telekom/scale/commit/bf3e60d44669bac07d82e0ad2f676308362d4fa3))
* checkbox group design alignment [#1998](https://github.com/telekom/scale/issues/1998)) ([ecbdcfa](https://github.com/telekom/scale/commit/ecbdcfabe352bb7b263b47cf5a312e7eecf84997))
* design qa alignment ([#1932](https://github.com/telekom/scale/issues/1932)) ([8f1877c](https://github.com/telekom/scale/commit/8f1877cfdba51856cca926990ead3a8070a35b4d))
* dropdown-select design qa ([#1995](https://github.com/telekom/scale/issues/1995)) ([87919c8](https://github.com/telekom/scale/commit/87919c8cd50587d13c494c8a80e4e1aca81d1a4a))
* flyout design alignment ([#2001](https://github.com/telekom/scale/issues/2001)) ([0ed59c9](https://github.com/telekom/scale/commit/0ed59c949f18658a8c7a1eba9f4e506d43b8706e))
* footer design alignment  ([#1982](https://github.com/telekom/scale/issues/1982)) ([00157b3](https://github.com/telekom/scale/commit/00157b36a314fa0adc6633563e2aa141ab13ab07))
* link design alignment ([#1972](https://github.com/telekom/scale/issues/1972)) ([24c1d7d](https://github.com/telekom/scale/commit/24c1d7d1a9e003ee6befe6bb2950b3a6c640d6df))
* loading spinner design qa alignment ([#1934](https://github.com/telekom/scale/issues/1934)) ([3c98c26](https://github.com/telekom/scale/commit/3c98c26f2217a83094859fb3491b37bd00b071a4))
* logo design alignment ([#1999](https://github.com/telekom/scale/issues/1999)) ([6201c9b](https://github.com/telekom/scale/commit/6201c9b7ee75ef065e0659cb6f336d91a562f446))
* more visual alignments 💅 ([#1929](https://github.com/telekom/scale/issues/1929)) ([73415ba](https://github.com/telekom/scale/commit/73415bacf09b38aaf5b8adddb4ea7c93ed7f81f3)), closes [#1931](https://github.com/telekom/scale/issues/1931) [#1938](https://github.com/telekom/scale/issues/1938)
* some visual alignments 💅 ([#1884](https://github.com/telekom/scale/issues/1884)) ([8f668a8](https://github.com/telekom/scale/commit/8f668a8bf0a4d2b74c61dcb95f31249dbcb5be5a)), closes [#1886](https://github.com/telekom/scale/issues/1886)
* table icon design alignment ([#1996](https://github.com/telekom/scale/issues/1996)) ([a2f7ac6](https://github.com/telekom/scale/commit/a2f7ac6fba991f4a99edce634ca4457b0d47f46f))
* **button:** secondary icon-only width ([#1994](https://github.com/telekom/scale/issues/1994)) ([a4e2704](https://github.com/telekom/scale/commit/a4e270498953cf7a9c2ecf6493785571b948276f))
* **grid-cell:** resolve floating point precision issue ([#1839](https://github.com/telekom/scale/issues/1839)) ([68c69f6](https://github.com/telekom/scale/commit/68c69f67cee29faeb7d13e75bff9b95e70823976))
* **loading-spinner:** center the loading icon in alignment with text ([#1809](https://github.com/telekom/scale/issues/1809)) ([797c7fd](https://github.com/telekom/scale/commit/797c7fde04875590bf01e33298e67435e76cc268))
* **radio-button:** fix disabled radio button clickable issue ([#1822](https://github.com/telekom/scale/issues/1822)) ([10accc0](https://github.com/telekom/scale/commit/10accc091d9e035fbd2b858bc0ab01fc7f45ad5c))
* **sidebar-nav:** active state colors ([#2007](https://github.com/telekom/scale/issues/2007)) ([6a32239](https://github.com/telekom/scale/commit/6a32239d9354f24899e64b93bd91294a0ab9d907))
* logo design alignment (SCL-153) ([#1986](https://github.com/telekom/scale/issues/1986)) ([a10306e](https://github.com/telekom/scale/commit/a10306ef0f3660e1f3e92ebf5253d92ed2344284))
* segmented button spacing ([#1928](https://github.com/telekom/scale/issues/1928)) ([9c6fbce](https://github.com/telekom/scale/commit/9c6fbce52c1343ea563b714cbb77fe1e2b917110))
* sidebar-nav-items design alignment ([#1981](https://github.com/telekom/scale/issues/1981)) ([46eb920](https://github.com/telekom/scale/commit/46eb920f1bd54c21a5162ed8a252d9cb3f234996))
* tab navigation design qa alignment ([#1942](https://github.com/telekom/scale/issues/1942)) ([40bf169](https://github.com/telekom/scale/commit/40bf1693d11d2e3cd96f635088d9fb5f5c2ddc94))
* textarea design alignment ([#1925](https://github.com/telekom/scale/issues/1925)) ([4280147](https://github.com/telekom/scale/commit/42801476411b7fbc11854bc140b4e8b9b57dff1b))
* **data-grid:** top padding for progress-bar status ([#1971](https://github.com/telekom/scale/issues/1971)) ([1071eb1](https://github.com/telekom/scale/commit/1071eb139f37ce27a931913c79ccf2df1acd2dcd))
* **date-picker:** sync code and figma ([#1899](https://github.com/telekom/scale/issues/1899)) ([305a42a](https://github.com/telekom/scale/commit/305a42ad1b3d399b9d0e067fffdf2a8916998af4)), closes [#1910](https://github.com/telekom/scale/issues/1910) [#1911](https://github.com/telekom/scale/issues/1911)
* **icons:** polish after icon library update ([#1921](https://github.com/telekom/scale/issues/1921)) ([1652980](https://github.com/telekom/scale/commit/1652980a4d07be45cc90b818eb0852fb14d67111)), closes [#1922](https://github.com/telekom/scale/issues/1922) [#1923](https://github.com/telekom/scale/issues/1923)
* **telekom-footer-extended-navigation:** css fixes ([#1952](https://github.com/telekom/scale/issues/1952)) ([5e3c2ba](https://github.com/telekom/scale/commit/5e3c2baf540e9a0dc6a139ac3691d0ed2cdda51c))
* **visual-test:** rating stars variant ([#1962](https://github.com/telekom/scale/issues/1962)) ([6e89551](https://github.com/telekom/scale/commit/6e89551e1aa946f0c51b3d0bc1ed70a57368e41a)), closes [#1964](https://github.com/telekom/scale/issues/1964)
* **visual-tests:** pagination buttons disabled ([#1855](https://github.com/telekom/scale/issues/1855)) ([d2068b9](https://github.com/telekom/scale/commit/d2068b9c94b5a148aaefe2d0ae5663bf5df3142a))
* **visual-tests:** switch ([#1968](https://github.com/telekom/scale/issues/1968)) ([2a3ba70](https://github.com/telekom/scale/commit/2a3ba707d76a3f2fae7c25c89fe61f8b61a4308d))
* removing unneeded firefox css ([#1876](https://github.com/telekom/scale/issues/1876)) ([d6def10](https://github.com/telekom/scale/commit/d6def10a1350ecdef3f1f138cad83e61756f5d32))
* solving multi-line problems ([#1828](https://github.com/telekom/scale/issues/1828)) ([c3d4c23](https://github.com/telekom/scale/commit/c3d4c236b0f6ff0c9c6f488e63c3127f3cbd1efa))
* visual alignments ([#1894](https://github.com/telekom/scale/issues/1894)) ([f1cd96b](https://github.com/telekom/scale/commit/f1cd96b3236288eb238e20900a57905c7f2c43e8))


### Features

* visual alignment, some more ([#2022](https://github.com/telekom/scale/issues/2022)) ([070df35](https://github.com/telekom/scale/commit/070df354a404a46e0cf2524ca23a08a1ce99f871)), closes [#2023](https://github.com/telekom/scale/issues/2023) [#2024](https://github.com/telekom/scale/issues/2024) [#2028](https://github.com/telekom/scale/issues/2028)
* **checkbox:** add required attribute ([#1851](https://github.com/telekom/scale/issues/1851)) ([5f90c75](https://github.com/telekom/scale/commit/5f90c75133d0ef60a77db76bd1ab7a6021a6833c))
* **grid:** container with max-width only in 2xl ([#1993](https://github.com/telekom/scale/issues/1993)) ([2bc74b7](https://github.com/telekom/scale/commit/2bc74b762e1df02f4a08ea5035df2b4bf60681ae))
* use sort indicator icons ([#2010](https://github.com/telekom/scale/issues/2010)) ([953c198](https://github.com/telekom/scale/commit/953c198b84398a09d0f006dc7d246da7160e7f36)), closes [#2011](https://github.com/telekom/scale/issues/2011) [#2013](https://github.com/telekom/scale/issues/2013)
* **chip:** better spacing ([#2008](https://github.com/telekom/scale/issues/2008)) ([e60a8aa](https://github.com/telekom/scale/commit/e60a8aa00fd0ebcf5eff64d09c61432bf40ca25f)), closes [#2009](https://github.com/telekom/scale/issues/2009)
* **slider:** add `platform` prop because browsers ([#1989](https://github.com/telekom/scale/issues/1989)) ([de6648a](https://github.com/telekom/scale/commit/de6648a3453f15652f9419e23a2ad2368dcce0b2))
* adding accessibility title ([#1830](https://github.com/telekom/scale/issues/1830)) ([52b2023](https://github.com/telekom/scale/commit/52b20230bff98ccd152adf8c2e5f4b75386aec75))
* more visual alignments ([#1984](https://github.com/telekom/scale/issues/1984)) ([3c7ecfd](https://github.com/telekom/scale/commit/3c7ecfd6c5449b560f86a8a764427e0dfc1be1be)), closes [#1985](https://github.com/telekom/scale/issues/1985)
* **notification:** banner, message and toast are now one single component ([#1180](https://github.com/telekom/scale/issues/1180)) ([89990af](https://github.com/telekom/scale/commit/89990af4003666f7b99d5439b48460d59b833158))





# [3.0.0-beta.134](https://github.com/telekom/scale/compare/v3.0.0-beta.133...v3.0.0-beta.134) (2023-05-09)


### Bug Fixes

* **grid:** 5 columns behavior on --l --xl ([#1798](https://github.com/telekom/scale/issues/1798)) ([b421e27](https://github.com/telekom/scale/commit/b421e276cf6e640610cd703a0b0848fe3f051e70))





# [3.0.0-beta.133](https://github.com/telekom/scale/compare/v3.0.0-beta.132...v3.0.0-beta.133) (2023-05-09)


### Bug Fixes

* **link:** bust permanent aria-disabled state ([#1807](https://github.com/telekom/scale/issues/1807)) ([6d7d93e](https://github.com/telekom/scale/commit/6d7d93e5afc62360911a59ac14aa41044a1f1d29))
* **telekom-header-mobile-menu:** proper meta nav link styles ([#1802](https://github.com/telekom/scale/issues/1802)) ([5e8dced](https://github.com/telekom/scale/commit/5e8dced050bc7774e9f93f116ed155153c20314b))





# [3.0.0-beta.132](https://github.com/telekom/scale/compare/v3.0.0-beta.131...v3.0.0-beta.132) (2023-05-05)


### Bug Fixes

* **notification-toast:** text overflowing close button ([#1771](https://github.com/telekom/scale/issues/1771)) ([3bfb6b9](https://github.com/telekom/scale/commit/3bfb6b9e922e9c38977e3842eeec25525caa77f0))
* **notification-toast:** z-index over telekom-header ([#1767](https://github.com/telekom/scale/issues/1767)) ([e7c4f3d](https://github.com/telekom/scale/commit/e7c4f3d274bc6fdfddf42ad38191e4bb0cd7b7b5))
* **telekom-header:** add data-back-compat logoHref, more specific styling for nav-item ([#1779](https://github.com/telekom/scale/issues/1779)) ([8ae175b](https://github.com/telekom/scale/commit/8ae175b7f7b611a7793fd578944edc793d991c9a))
* **telekom-header:** allow link for logo ([#1762](https://github.com/telekom/scale/issues/1762)) ([5dd544a](https://github.com/telekom/scale/commit/5dd544a5d8259a326b346e4bf7847be5cf0e9206))
* **telekom-nav-flyout:** add variant prop (mobile) ([#1764](https://github.com/telekom/scale/issues/1764)) ([fa1ee1a](https://github.com/telekom/scale/commit/fa1ee1a329d99479d3aec1c349eeda8d14ba1f31))


### Features

* **header-back-compat:** add support for userMenu ([#1775](https://github.com/telekom/scale/issues/1775)) ([b5445cf](https://github.com/telekom/scale/commit/b5445cf384d06165207d6e664b4289bd005746f6))
* **telekom-header-data-back-compat:** support for prop that hides label in iconNavigation and alternate text ([#1785](https://github.com/telekom/scale/issues/1785)) ([4d5bda4](https://github.com/telekom/scale/commit/4d5bda4e5390226c99ce0f41ac774c18d29c4a03))





# [3.0.0-beta.131](https://github.com/telekom/scale/compare/v3.0.0-beta.130...v3.0.0-beta.131) (2023-04-18)


### Bug Fixes

* undo unwanted commit ([2c8819f](https://github.com/telekom/scale/commit/2c8819f239e454cecb2f08f6c0fc38f5ec57f109))
* **tab-header:** focus problems ([#1729](https://github.com/telekom/scale/issues/1729)) ([d1ed031](https://github.com/telekom/scale/commit/d1ed031d376bab029a402ee5ceda0eae9b3bafc1))
* fix footer not taking full width of container ([#1714](https://github.com/telekom/scale/issues/1714)) ([a17e9df](https://github.com/telekom/scale/commit/a17e9df5e758fa2939d588e0e42dc36a95bf9b62))
* hide double logo ([#1627](https://github.com/telekom/scale/issues/1627)) ([83169a1](https://github.com/telekom/scale/commit/83169a1f853eba2d5b52b5f78019313b4abdcec1))


### Features

* add placeholder prop in date picker ([#1720](https://github.com/telekom/scale/issues/1720)) ([335c78f](https://github.com/telekom/scale/commit/335c78f244bd1061b25c46d4877ee75e43a34603))
* adding close and closing event ([#1698](https://github.com/telekom/scale/issues/1698)) ([5c325d9](https://github.com/telekom/scale/commit/5c325d905e6b2d86e6431c22d7ba7cbb2c3e0364))





# [3.0.0-beta.130](https://github.com/telekom/scale/compare/v3.0.0-beta.129...v3.0.0-beta.130) (2023-04-06)


### Bug Fixes

* add scroll container around listbox ([#1708](https://github.com/telekom/scale/issues/1708)) ([a7b73d6](https://github.com/telekom/scale/commit/a7b73d638e8aaffcbbb492a90eb715efc0348df1))
* no value is set in DropdownSelect and SegmentedButton when using vue-router ([#1597](https://github.com/telekom/scale/issues/1597)) ([72bd5de](https://github.com/telekom/scale/commit/72bd5de2c30cf58dcead22f8c368a6c53c08aa14))
* replace _footnote_ typography size token ([#1696](https://github.com/telekom/scale/issues/1696)) ([a33843f](https://github.com/telekom/scale/commit/a33843f50abf6fb93da550e35219f4fbf6048b4b))


### Features

* adding closeButtonLabel and -Title to notifications ([#1694](https://github.com/telekom/scale/issues/1694)) ([021c9c9](https://github.com/telekom/scale/commit/021c9c9cf15ea95c7ac7b22b216f3a1369f6e377))





# [3.0.0-beta.129](https://github.com/telekom/scale/compare/v3.0.0-beta.128...v3.0.0-beta.129) (2023-03-24)


### Bug Fixes

* **tab-nav:** content clickable for screen readers ([#1692](https://github.com/telekom/scale/issues/1692)) ([6d4c323](https://github.com/telekom/scale/commit/6d4c323a82c2766b0af1857afdcdb43b66fe33e7))
* add disabled link option ([#1430](https://github.com/telekom/scale/issues/1430)) ([0128a9e](https://github.com/telekom/scale/commit/0128a9e50aaeeabeae826c04954f973c37aa5874))
* add focus outline to brand header ([#1621](https://github.com/telekom/scale/issues/1621)) ([86ee300](https://github.com/telekom/scale/commit/86ee3003a2a7367a6c6a5031dab5d4168f6a6337))
* do not render expand button when html field is empty ([#1573](https://github.com/telekom/scale/issues/1573)) ([1fe6a9b](https://github.com/telekom/scale/commit/1fe6a9bae993f6054454930a94db6d7c0d85b444))
* do not show arrow when unsorted  ([4c324c7](https://github.com/telekom/scale/commit/4c324c7f6819491dd91c72307dcb418c43738f1f))
* fix style issue in data-grid pagination ([#1664](https://github.com/telekom/scale/issues/1664)) ([171ed79](https://github.com/telekom/scale/commit/171ed79f5c59353f19e10ef3aac7835affc589d9)), closes [#1665](https://github.com/telekom/scale/issues/1665) [#1677](https://github.com/telekom/scale/issues/1677)
* reset pagination to last page if new records are rendered are less than previous ([#1690](https://github.com/telekom/scale/issues/1690)) ([1e45f88](https://github.com/telekom/scale/commit/1e45f8853f2ff46cff1334bbcac10550a856327c))
* use color token ([#1687](https://github.com/telekom/scale/issues/1687)) ([b6e2be8](https://github.com/telekom/scale/commit/b6e2be800911cd8aa5ca7e366d7f192b1dfc9288))
* use color token for switch ([#1689](https://github.com/telekom/scale/issues/1689)) ([870ad52](https://github.com/telekom/scale/commit/870ad528ef62527c2e3ae90c21ca22f4d290090e))


### Features

* adding high-contrast border due to better accessibility ([#1603](https://github.com/telekom/scale/issues/1603)) ([21f5d4f](https://github.com/telekom/scale/commit/21f5d4f72b6cd3be165d0088e9815c2333c28985))





# [3.0.0-beta.128](https://github.com/telekom/scale/compare/v3.0.0-beta.127...v3.0.0-beta.128) (2023-03-20)

**Note:** Version bump only for package telekom





# [3.0.0-beta.127](https://github.com/telekom/scale/compare/v3.0.0-beta.126...v3.0.0-beta.127) (2023-03-20)


### Bug Fixes

* [#1467](https://github.com/telekom/scale/issues/1467) fixed event bubbling issue ([#1653](https://github.com/telekom/scale/issues/1653)) ([0183965](https://github.com/telekom/scale/commit/01839653cad373ef9cc3b6d242dbf8768d919736))
* **app-navigation-main-mobile:** second level if no children (actual child element) ([#1660](https://github.com/telekom/scale/issues/1660)) ([ccc5749](https://github.com/telekom/scale/commit/ccc57494d64b58005cdfb5daf84922dbfe53b36e))
* remove firstRender attribute and revert to initial autofocus app… ([#1631](https://github.com/telekom/scale/issues/1631)) ([643245b](https://github.com/telekom/scale/commit/643245bbd303855a22404fd074a3dc8af0f676b9))
* remove unused css vars, pass helper text vars to helper text component, update story docs ([77a42bc](https://github.com/telekom/scale/commit/77a42bc62468fa036e09dc3d9ad770402795cd0a))


### Features

* **header:** add slim and subtle types ([#1640](https://github.com/telekom/scale/issues/1640)) ([1f92285](https://github.com/telekom/scale/commit/1f92285d48a4c64840d522e1f69dc6416a20fbb0))
* adding brand-header usage text picture for dropdown nav ([#1669](https://github.com/telekom/scale/issues/1669)) ([499ca21](https://github.com/telekom/scale/commit/499ca212ac4dbb0f511594960c2283ec2a205aa3))
* adding section for selected icons from icon library ([#1589](https://github.com/telekom/scale/issues/1589)) ([eb5f8a8](https://github.com/telekom/scale/commit/eb5f8a8bbb9496278c4be890fd717c5713a97a8e))
* improving high-contrast mode accessibility ([#1585](https://github.com/telekom/scale/issues/1585)) ([62e42b7](https://github.com/telekom/scale/commit/62e42b7f4d5b6f64aa415ff2309d6203b11be8fc))


### Reverts

* Revert "Fix/media query 1024 (#1650)" ([e17f3f8](https://github.com/telekom/scale/commit/e17f3f8487f900f12b26fcb8f4be7303f9bd5d56)), closes [#1650](https://github.com/telekom/scale/issues/1650)





# [3.0.0-beta.126](https://github.com/telekom/scale/compare/v3.0.0-beta.125...v3.0.0-beta.126) (2023-02-24)


### Bug Fixes

* **tab-header:** unsafe querySelector ([#1608](https://github.com/telekom/scale/issues/1608)) ([82d0f14](https://github.com/telekom/scale/commit/82d0f149fd34a8671b52287a7d3cff2ee368cb21))
* add focusable attribute to scale-icons ([#1610](https://github.com/telekom/scale/issues/1610)) ([4e2e19e](https://github.com/telekom/scale/commit/4e2e19ec4ab1714315b3bb850dbbb25a6d24ade5))
* rename role to innerRole, match native type definition ([#1616](https://github.com/telekom/scale/issues/1616)) ([ceac390](https://github.com/telekom/scale/commit/ceac390197bb1ad7bc89c0e3aa30e1cb02f838f3))
* **app-navigation-main-mobile:** second level if no children ([#1612](https://github.com/telekom/scale/issues/1612)) ([88e0cd2](https://github.com/telekom/scale/commit/88e0cd215577234bb143505b5583f88e45f93e59))


### Features

* **back-compat:** header and footer backward compatibility components ([#1535](https://github.com/telekom/scale/issues/1535)) ([2ae1afd](https://github.com/telekom/scale/commit/2ae1afd8db2f8a6cc537ac5a43eaf4d3d8413d29))





# [3.0.0-beta.125](https://github.com/telekom/scale/compare/v3.0.0-beta.124...v3.0.0-beta.125) (2023-02-20)


### Features

* **nav:** link targets in main navigation ([#1602](https://github.com/telekom/scale/issues/1602)) ([bfda3aa](https://github.com/telekom/scale/commit/bfda3aab0e7f28c4aa8068980b08023cfc0b374e))





# [3.0.0-beta.124](https://github.com/telekom/scale/compare/v3.0.0-beta.123...v3.0.0-beta.124) (2023-02-17)


### Bug Fixes

* **app-header:** esc key only when open, for user menu ([#1590](https://github.com/telekom/scale/issues/1590)) ([2356ffa](https://github.com/telekom/scale/commit/2356ffabfb1f3a6c5112cb7d2a3f034d92c414a7))
* **data-grid:** accessibility affecting buttons ([#1591](https://github.com/telekom/scale/issues/1591)) ([c8d1cbc](https://github.com/telekom/scale/commit/c8d1cbc5e9072ea0f339bb977e221846626446b9))
* **grid:** max-width, affecting new header ([#1586](https://github.com/telekom/scale/issues/1586)) ([92ce4f3](https://github.com/telekom/scale/commit/92ce4f3511224f8041ff0127f9091720ed02c90a))
* **nav-icon:** accessibility, role=button when no href ([#1593](https://github.com/telekom/scale/issues/1593)) ([0387bde](https://github.com/telekom/scale/commit/0387bde49935541e61c2338436aadf784c7fb7c4))
* **telekom-footer-extended-navigation-column:** expand arrow direction ([#1601](https://github.com/telekom/scale/issues/1601)) ([39b4c5b](https://github.com/telekom/scale/commit/39b4c5bc6ec71c6af7bb08dad88cee6f44e7c483))


### Features

* **brand-header:** add link target variables to menu and footer ([#1592](https://github.com/telekom/scale/issues/1592)) ([e119627](https://github.com/telekom/scale/commit/e1196271daa99a7b6e9a25527f59c8669023b15a))





# [3.0.0-beta.123](https://github.com/telekom/scale/compare/v3.0.0-beta.122...v3.0.0-beta.123) (2023-02-13)


### Bug Fixes

* **tooltip:** should not receive focus ([#1170](https://github.com/telekom/scale/issues/1170)) ([33571f7](https://github.com/telekom/scale/commit/33571f747ceb536d3a10c7aaf4a7e2388bf9ddac))


### Features

* **button:** inner aria-label prop ([#1376](https://github.com/telekom/scale/issues/1376)) ([f936f81](https://github.com/telekom/scale/commit/f936f813f22f04677bbb90722f25b55cb27dec7c))





# [3.0.0-beta.122](https://github.com/telekom/scale/compare/v3.0.0-beta.121...v3.0.0-beta.122) (2023-02-07)


### Bug Fixes

* change icon size on xl ([#1569](https://github.com/telekom/scale/issues/1569)) ([e1fddba](https://github.com/telekom/scale/commit/e1fddbacb2ccff206f73135e2493e1e0525e3d1b))





# [3.0.0-beta.121](https://github.com/telekom/scale/compare/v3.0.0-beta.120...v3.0.0-beta.121) (2023-02-02)


### Bug Fixes

* **progress-bar:** inner bar for percentage 0 ([#1563](https://github.com/telekom/scale/issues/1563)) ([4f9c0c4](https://github.com/telekom/scale/commit/4f9c0c41c23004812cb23063d230dd6e1d785938))





# [3.0.0-beta.120](https://github.com/telekom/scale/compare/v3.0.0-beta.119...v3.0.0-beta.120) (2023-01-31)


### Bug Fixes

* **telekom-header:** scroll transitions ([#1557](https://github.com/telekom/scale/issues/1557)) ([acf398d](https://github.com/telekom/scale/commit/acf398dbc9ce5d14eb406a1986f0c26a35411201))
* adjust main content max-width for storybook ([#1541](https://github.com/telekom/scale/issues/1541)) ([0f9564e](https://github.com/telekom/scale/commit/0f9564e3661a2ad68cba5013f382c92a2923fae2))
* **telekom-header:** adjust alignments related to grid ([#1508](https://github.com/telekom/scale/issues/1508)) ([1046f56](https://github.com/telekom/scale/commit/1046f565e4abf2f1ef234f78e4b8bc9a48f00f62))
* **telekom-header:** app-name display ([#1548](https://github.com/telekom/scale/issues/1548)) ([69b69c4](https://github.com/telekom/scale/commit/69b69c431661e0d593cf67f79536d1a835f1f22d))
* **telekom-header:** mobile close button position ([#1554](https://github.com/telekom/scale/issues/1554)) ([fff4702](https://github.com/telekom/scale/commit/fff4702e3872f9eb92cff750eccd36f0b9f16181))
* **telekom-header:** more feedback ([#1531](https://github.com/telekom/scale/issues/1531)) ([5c942ad](https://github.com/telekom/scale/commit/5c942ad9eb34a29e1251bef4cfa356ac56b4c155))
* **telekom-header:** QA ([#1539](https://github.com/telekom/scale/issues/1539)) ([5c4c448](https://github.com/telekom/scale/commit/5c4c44813347e930c99bcfe71e7cb256ec7fc626))
* implement ux/ui feedback ([8a314c7](https://github.com/telekom/scale/commit/8a314c71cf2ac5650498146280e3a0dcb8204b95))
* **telekom-header:** use mobile flyout canvas ([#1525](https://github.com/telekom/scale/issues/1525)) ([fcf3081](https://github.com/telekom/scale/commit/fcf308138c65b1fe4ec7097db436bfabb2f7e86d))


### Features

* **telekom-header:** updated app shell, fixed position ([#1543](https://github.com/telekom/scale/issues/1543)) ([c2b5919](https://github.com/telekom/scale/commit/c2b5919d9ce1785f2fa3d5353174d2015d2015ea))
* adding usage text ([#1537](https://github.com/telekom/scale/issues/1537)) ([09eb2f3](https://github.com/telekom/scale/commit/09eb2f3e199cba034bf8e9d7d19cad45cf712b2a))





# [3.0.0-beta.119](https://github.com/telekom/scale/compare/v3.0.0-beta.118...v3.0.0-beta.119) (2023-01-25)


### Bug Fixes

* **telekom-header:** adjust layout to match grid ([#1499](https://github.com/telekom/scale/issues/1499)) ([0acb7cc](https://github.com/telekom/scale/commit/0acb7cc60b0ce3f096438220e9f976a2ef1c6e2e))
* **telekom-header:** flyout hover/click handling ([#1505](https://github.com/telekom/scale/issues/1505)) ([b8325dd](https://github.com/telekom/scale/commit/b8325dd82361f961f3089e274e134cff73efe4ea))
* megamenu links ([#1498](https://github.com/telekom/scale/issues/1498)) ([bd9c848](https://github.com/telekom/scale/commit/bd9c8484083be048a956ae89ed59a7cfcd8057e5))


### Features

* **segmented-button:** add new beta components ([#1495](https://github.com/telekom/scale/issues/1495)) ([d0e38ab](https://github.com/telekom/scale/commit/d0e38abbf00342c0fd180fa29c9eccdbb4378717)), closes [#1434](https://github.com/telekom/scale/issues/1434) [#1436](https://github.com/telekom/scale/issues/1436) [#1456](https://github.com/telekom/scale/issues/1456) [#1458](https://github.com/telekom/scale/issues/1458) [#1457](https://github.com/telekom/scale/issues/1457) [#1459](https://github.com/telekom/scale/issues/1459) [#1461](https://github.com/telekom/scale/issues/1461) [#1462](https://github.com/telekom/scale/issues/1462) [#1496](https://github.com/telekom/scale/issues/1496) [#1501](https://github.com/telekom/scale/issues/1501) [#1512](https://github.com/telekom/scale/issues/1512) [#1429](https://github.com/telekom/scale/issues/1429) [#1497](https://github.com/telekom/scale/issues/1497) [#1513](https://github.com/telekom/scale/issues/1513) [#1514](https://github.com/telekom/scale/issues/1514) [#1516](https://github.com/telekom/scale/issues/1516)
* **telekom-header:** consolidate slots, improve markup ([#1477](https://github.com/telekom/scale/issues/1477)) ([1568385](https://github.com/telekom/scale/commit/1568385053e3a5dac65d29a06acce24e0a109048))
* **telekom-header:** no shadow dom for `nav-list` and `nav-item` ([#1484](https://github.com/telekom/scale/issues/1484)) ([9665120](https://github.com/telekom/scale/commit/96651204085c4ecccaf6b957ea602be773186fc6))
* **telekom-mega-menu:** add new components ([#1491](https://github.com/telekom/scale/issues/1491)) ([282026c](https://github.com/telekom/scale/commit/282026c48a498d1e866de0d8e77844838acfa8d7)), closes [#1492](https://github.com/telekom/scale/issues/1492)





# [3.0.0-beta.118](https://github.com/telekom/scale/compare/v3.0.0-beta.117...v3.0.0-beta.118) (2023-01-13)


### Bug Fixes

* remove broken link ([#1474](https://github.com/telekom/scale/issues/1474)) ([09a09f0](https://github.com/telekom/scale/commit/09a09f09c4e66dc2578aa99c204d3937be1d08d3))
* **docs:** typo in _loading the library_ section  ([#1416](https://github.com/telekom/scale/issues/1416)) ([d8a3259](https://github.com/telekom/scale/commit/d8a325928cd0beddd2a09cadd1851f86d94a66e0))
* fixing possible default z-index problems ([#1090](https://github.com/telekom/scale/issues/1090)) ([bb86535](https://github.com/telekom/scale/commit/bb865352bf9c99fdf4132f7e409161dddbd8676e))
* prevent focus on first render ([#1383](https://github.com/telekom/scale/issues/1383)) ([b455cda](https://github.com/telekom/scale/commit/b455cda6857291f85ac49daa43399ad639c63b07))
* solving random deprecated console output ([#1390](https://github.com/telekom/scale/issues/1390)) ([6a63529](https://github.com/telekom/scale/commit/6a635295c3c7d6f74cb26f85f178bb9a795d8e3e))
* wrong tag coloring ([#1397](https://github.com/telekom/scale/issues/1397)) ([fe445cf](https://github.com/telekom/scale/commit/fe445cfdd2d3bf72359ecc2664c04c1184f57399))
* **radio-button:** solving spacing clickability problem ([#1343](https://github.com/telekom/scale/issues/1343)) ([7b88772](https://github.com/telekom/scale/commit/7b88772d5ac822fb83e47b7c5b7234b8505a95a9))


### Features

* **brand-bar:** add new components ([#1370](https://github.com/telekom/scale/issues/1370)) ([89f7d36](https://github.com/telekom/scale/commit/89f7d36501a9d3f9db9243ccc4f9b1256d0b6f7e))
* **dropdown-select:** add _name_ prop ([#1417](https://github.com/telekom/scale/issues/1417)) ([37f1612](https://github.com/telekom/scale/commit/37f1612c69331a2ceca45d8720ba3d312cfdeef4))
* **menu-flyout:** expose original event in scale-select event ([#1367](https://github.com/telekom/scale/issues/1367)) ([a76449a](https://github.com/telekom/scale/commit/a76449a3334cbbdc9d211bb3914f951bb38cba80))
* **telekom-header:** icon navigation ([#1439](https://github.com/telekom/scale/issues/1439)) ([490f7c6](https://github.com/telekom/scale/commit/490f7c6d89db8d28350b4c5b2e42581df456a42c))
* **telekom-header:** prototyping stuff ([#1431](https://github.com/telekom/scale/issues/1431)) ([2815b78](https://github.com/telekom/scale/commit/2815b78b6b51b9e4862082c0ccfac247e7b9fddb))
* **telekom-mobile-menu:** add new component ([#1398](https://github.com/telekom/scale/issues/1398)) ([f32c55a](https://github.com/telekom/scale/commit/f32c55a0ddeacd4208761d775f6b1aa274fa74b8))
* **telekom-nav-flyout:** add default x spacing to match header container ([#1468](https://github.com/telekom/scale/issues/1468)) ([34323e4](https://github.com/telekom/scale/commit/34323e44281167939487a0865469295263c01743))
* **telekon-header:** improve styles for list and item ([#1437](https://github.com/telekom/scale/issues/1437)) ([cb64d01](https://github.com/telekom/scale/commit/cb64d01d6da7b16998fdd8df3f36141a00991066))
* **text-field:** add autocomplete property ([#1400](https://github.com/telekom/scale/issues/1400)) ([24f064d](https://github.com/telekom/scale/commit/24f064dfec642c2fed62f64850d9436cf8d2a31d))





# [3.0.0-beta.117](https://github.com/telekom/scale/compare/v3.0.0-beta.116...v3.0.0-beta.117) (2022-11-07)


### Bug Fixes

* **data-grid:** make textAlign work ([#1289](https://github.com/telekom/scale/issues/1289)) ([c501409](https://github.com/telekom/scale/commit/c5014093339c2ed96e25cec974ce6df2b05c2236))
* **footer:** remove whitespace above footer ([#1172](https://github.com/telekom/scale/issues/1172)) ([00ccea7](https://github.com/telekom/scale/commit/00ccea7996c523e5995b314420ddda263d564b15)), closes [#1345](https://github.com/telekom/scale/issues/1345)
* **helper-text:** improve styles, icon position ([#1351](https://github.com/telekom/scale/issues/1351)) ([ca8ad1c](https://github.com/telekom/scale/commit/ca8ad1cb780fff92fb3eb8f88a81a978bf73cb98))
* handle prefers-color-scheme ([#1285](https://github.com/telekom/scale/issues/1285)) ([b889334](https://github.com/telekom/scale/commit/b88933469d1b23b90905b48eccbd62fea2684253))
* user-file-user-selected svg dimensions ([#1344](https://github.com/telekom/scale/issues/1344)) ([72a8e0c](https://github.com/telekom/scale/commit/72a8e0c8eb02f0a25fb899bf929a85ceba25e487))





# [3.0.0-beta.116](https://github.com/telekom/scale/compare/v3.0.0-beta.115...v3.0.0-beta.116) (2022-10-31)


### Bug Fixes

* typography documentation variable name ([#1330](https://github.com/telekom/scale/issues/1330)) ([8d200a3](https://github.com/telekom/scale/commit/8d200a3a3b6ade9b9ef43e4f84aea4b1e1d984ce))
* **slider:** bar styles ([#1328](https://github.com/telekom/scale/issues/1328)) ([c924e6f](https://github.com/telekom/scale/commit/c924e6f08c18ad656a054457286fc22d9a6152bb))


### Features

* adding UI black and white ([#1212](https://github.com/telekom/scale/issues/1212)) ([a8f88a0](https://github.com/telekom/scale/commit/a8f88a04e2f6119b615ecc4d25da32ed1b5bc181))





# [3.0.0-beta.115](https://github.com/telekom/scale/compare/v3.0.0-beta.114...v3.0.0-beta.115) (2022-10-27)


### Features

* **button:** add secondary white variant ([#1220](https://github.com/telekom/scale/issues/1220)) ([a6ed3a6](https://github.com/telekom/scale/commit/a6ed3a65c040900f049da35b72ee7b5c1e195203))
* **callout:** refactor, improve accessibility ([#1175](https://github.com/telekom/scale/issues/1175)) ([23f4b8a](https://github.com/telekom/scale/commit/23f4b8a0099a7c1e1d515c0589d8e3f040f5e95a))
* **checkbox+radio-button:** mobile optimisation ([#1214](https://github.com/telekom/scale/issues/1214)) ([52e8367](https://github.com/telekom/scale/commit/52e836730877962875c12c52841e12c26f263a5f))
* **dropdown-select:** mobile optimisation ([#1215](https://github.com/telekom/scale/issues/1215)) ([8dc1fa4](https://github.com/telekom/scale/commit/8dc1fa40b77b8fbd7f93b125f9a62fd3e8ecdd46))
* **focus-outline:** mobile optimisation ([de48476](https://github.com/telekom/scale/commit/de48476c9c36f27d7aa47fdda6bba7a2980c493d))
* **helper-text:** mobile optimisation, reusable helper-text ([#1222](https://github.com/telekom/scale/issues/1222)) ([819c9d6](https://github.com/telekom/scale/commit/819c9d67337565c4c3415a93027ee815a8dacd7e))
* **progress-bar:** mobile optimisation ([14934d3](https://github.com/telekom/scale/commit/14934d3bb93bd04e2ad07a155d3d9168dc4a89f0))
* **progress-bar:** mobile optimisation ([#1246](https://github.com/telekom/scale/issues/1246)) ([c11beda](https://github.com/telekom/scale/commit/c11bedab48255f1b81eb457c9ae6a302804c07e2))
* **slider:** mobile optimisation ([#1221](https://github.com/telekom/scale/issues/1221)) ([5d41da7](https://github.com/telekom/scale/commit/5d41da774de8df7db7baba84baf1f11e9f0874eb))
* **switch:** mobile optimisation ([#1184](https://github.com/telekom/scale/issues/1184)) ([#1244](https://github.com/telekom/scale/issues/1244)) ([ec0a078](https://github.com/telekom/scale/commit/ec0a078577ddebcb6636c530a76f85a5ae6ffe8a))
* **tag:** mobile optimisation ([#1163](https://github.com/telekom/scale/issues/1163)) ([3ac7fd1](https://github.com/telekom/scale/commit/3ac7fd12176342f751ef16781c3c05368bf4c7bc))





# [3.0.0-beta.114](https://github.com/telekom/scale/compare/v3.0.0-beta.113...v3.0.0-beta.114) (2022-10-05)


### Bug Fixes

* **accordion:** deal only with direct collapsible children ([#1243](https://github.com/telekom/scale/issues/1243)) ([19a137b](https://github.com/telekom/scale/commit/19a137bcbd8346ab4b92302ba6000a6c1406606c))
* **checkbox:** rename private class property to avoid clashing with restricted name ([#1241](https://github.com/telekom/scale/issues/1241)) ([368a5a7](https://github.com/telekom/scale/commit/368a5a7a0dcf34cb42cd2ad2875ca0d204a73028))





# [3.0.0-beta.113](https://github.com/telekom/scale/compare/v3.0.0-beta.112...v3.0.0-beta.113) (2022-09-28)


### Bug Fixes

* add displayCloseButton prop, update storybook ([#1197](https://github.com/telekom/scale/issues/1197)) ([2e7898b](https://github.com/telekom/scale/commit/2e7898b6e5c9be282609407f7cc3801bf6ac648e)), closes [#1194](https://github.com/telekom/scale/issues/1194) [#1196](https://github.com/telekom/scale/issues/1196) [#1195](https://github.com/telekom/scale/issues/1195)
* replace deprecated `dist-custom-elements-bundle` dist ([#1202](https://github.com/telekom/scale/issues/1202)) ([6bd34e9](https://github.com/telekom/scale/commit/6bd34e989c134938b257968cafdd330be49e2918))


### Features

* **progress-bar:** add optional percentageStart prop ([#1204](https://github.com/telekom/scale/issues/1204)) ([573baf3](https://github.com/telekom/scale/commit/573baf3634c0480508ca3b90223da358dfcd2cf6))





# [3.0.0-beta.112](https://github.com/telekom/scale/compare/v3.0.0-beta.111...v3.0.0-beta.112) (2022-09-09)


### Bug Fixes

* **dropdown-select-item:** reflect value prop, fixes [#1194](https://github.com/telekom/scale/issues/1194) ([#1196](https://github.com/telekom/scale/issues/1196)) ([85bd383](https://github.com/telekom/scale/commit/85bd3834e29070d8f6cd278ede3afcf30c5e3185))
* checkbox group leads to double scroll in modal window ([#1188](https://github.com/telekom/scale/issues/1188)) ([fc08dcf](https://github.com/telekom/scale/commit/fc08dcfd2d84ad0419a940cfb6c371b8b0850497))


### Features

* **TeleNeo:** update fonts to latest ([#1186](https://github.com/telekom/scale/issues/1186)) ([cb5a8bf](https://github.com/telekom/scale/commit/cb5a8bf822f012fb49a577df9254c21c8989f42f))





# [3.0.0-beta.111](https://github.com/telekom/scale/compare/v3.0.0-beta.110...v3.0.0-beta.111) (2022-08-29)


### Bug Fixes

* add controlled prop ([#1140](https://github.com/telekom/scale/issues/1140)) ([fb828fb](https://github.com/telekom/scale/commit/fb828fbdb4f7c3c6342538aab3d0932b0766011e))
* **scale-link:** use currentColor when inside Tooltip (a11y) ([#1166](https://github.com/telekom/scale/issues/1166)) ([8f557e5](https://github.com/telekom/scale/commit/8f557e53a50e8acd5bcbc019e40685fea6dc5d4f))
* **tooltip:** a few issues ([#1165](https://github.com/telekom/scale/issues/1165)) ([4656a51](https://github.com/telekom/scale/commit/4656a5188c8649506d14fc5a2e932e78bc5ea335))





# [3.0.0-beta.110](https://github.com/telekom/scale/compare/v3.0.0-beta.109...v3.0.0-beta.110) (2022-08-03)


### Bug Fixes

* add _experimentalImportInjection_ in stencil.config ([#1158](https://github.com/telekom/scale/issues/1158)) ([2495eb5](https://github.com/telekom/scale/commit/2495eb59243de55838ca6c2c87d31a52e0774331)), closes [#369](https://github.com/telekom/scale/issues/369)





# [3.0.0-beta.109](https://github.com/telekom/scale/compare/v3.0.0-beta.108...v3.0.0-beta.109) (2022-08-02)


### Bug Fixes

* footer border color ([#1157](https://github.com/telekom/scale/issues/1157)) ([e3ad388](https://github.com/telekom/scale/commit/e3ad38863ca63906ea4dfd2269c6c602430697e0))


### Features

* dropdown-select ([#1069](https://github.com/telekom/scale/issues/1069)) ([ceb92ae](https://github.com/telekom/scale/commit/ceb92aed459882369b0cf25c11d50f368aa91b4e)), closes [#2](https://github.com/telekom/scale/issues/2)





# [3.0.0-beta.108](https://github.com/telekom/scale/compare/v3.0.0-beta.107...v3.0.0-beta.108) (2022-07-13)


### Bug Fixes

* **menu-flyout:** properly close sublists ([#1131](https://github.com/telekom/scale/issues/1131)) ([b47d6e9](https://github.com/telekom/scale/commit/b47d6e983f3c4cbb23ca88062ca1d04aa1978faa))
* Potential a11y issue with switch [#822](https://github.com/telekom/scale/issues/822) ([#1121](https://github.com/telekom/scale/issues/1121)) ([4e959aa](https://github.com/telekom/scale/commit/4e959aabe59ca124bc44a0b9449633abf806ad9a))
* use correct border color token ([#1112](https://github.com/telekom/scale/issues/1112)) ([077633b](https://github.com/telekom/scale/commit/077633b751e9b1c11c759ca28901ecd44cb8ec70))
* use next release version for working nuxt3 app ([#1129](https://github.com/telekom/scale/issues/1129)) ([29e9e5b](https://github.com/telekom/scale/commit/29e9e5b3752f2fa4b4b28bb1814148b4dcda5d94))
* **flyout:** avoid type errors of this.list ([#1118](https://github.com/telekom/scale/issues/1118)) ([6b4e505](https://github.com/telekom/scale/commit/6b4e50593ed26840f329a038e7827b9fe996f55c))


### Features

* **button:** forms will submit with Enter key ([#1120](https://github.com/telekom/scale/issues/1120)) ([73af76f](https://github.com/telekom/scale/commit/73af76f2ecb367be0345d5fc192eb04cd8f2b0d2))
* **menu-flyout:** close menu with click on trigger ([#1126](https://github.com/telekom/scale/issues/1126)) ([2372c43](https://github.com/telekom/scale/commit/2372c4359bdfa1b6c36e063a4ffce9ea8f534d37))
* **modal:** add --min-height-window var ([#1127](https://github.com/telekom/scale/issues/1127)) ([bb48463](https://github.com/telekom/scale/commit/bb4846394b84e4c4f81123b1766ca00bfe5f0c18))
* adding possibility to use a tags with scale-link inside breadcrumbs ([#1089](https://github.com/telekom/scale/issues/1089)) ([8b44a3b](https://github.com/telekom/scale/commit/8b44a3b8edc22d8968f36e53aa04fa41d904f4b8))





# [3.0.0-beta.107](https://github.com/telekom/scale/compare/v3.0.0-beta.106...v3.0.0-beta.107) (2022-06-23)


### Bug Fixes

* **data-grid:** enable content width check for actions cell ([#1108](https://github.com/telekom/scale/issues/1108)) ([49a3966](https://github.com/telekom/scale/commit/49a396638d21973dc841244d0d096d33af82a7a9))
* **modal:** remove customClass attribute leftover ([#1094](https://github.com/telekom/scale/issues/1094)) ([fdf09cc](https://github.com/telekom/scale/commit/fdf09ccba8ce9a533ba7b8a1c31174a9f7bc377b))


### Features

* new color table ([#1105](https://github.com/telekom/scale/issues/1105)) ([a0c663d](https://github.com/telekom/scale/commit/a0c663d5cf6fcc581f32901989c58e8e74432e82))


### Reverts

* Revert "docs: restore B&D links" ([c83b6ba](https://github.com/telekom/scale/commit/c83b6ba75cb51dfff569f4cb999d4f0a3d133eab))





# [3.0.0-beta.106](https://github.com/telekom/scale/compare/v3.0.0-beta.105...v3.0.0-beta.106) (2022-05-24)


### Bug Fixes

* **header:** add logo-inverse slot ([#1070](https://github.com/telekom/scale/issues/1070)) ([37eff58](https://github.com/telekom/scale/commit/37eff58bd82511c3a6bb1724995a5f304d0b4f3a))
* **menu-flyout:** add default value for lists to avoid early type errors ([#1073](https://github.com/telekom/scale/issues/1073)) ([7f20cef](https://github.com/telekom/scale/commit/7f20cef0f3bdab463f97e29a64abd6b3e0e54cd6))
* **notification:** stop disappearing right after opening and omit white border ([#1080](https://github.com/telekom/scale/issues/1080)) ([d20aad1](https://github.com/telekom/scale/commit/d20aad1d9a56eacf6e7609ef8c4a784c6280d99d))
* **pagination:** use proper border-radius ([#1079](https://github.com/telekom/scale/issues/1079)) ([870d1a9](https://github.com/telekom/scale/commit/870d1a90fa115430f1ced46fd355aa898eedc4ee))


### Features

* **logo:** shadow parts and css variables ([#1071](https://github.com/telekom/scale/issues/1071)) ([cf037b3](https://github.com/telekom/scale/commit/cf037b30c7808ebd654b674ec9f1ef691befb126))
* **tooltip:** shadow parts and css variables ([#1072](https://github.com/telekom/scale/issues/1072)) ([2232164](https://github.com/telekom/scale/commit/223216476828c369824927198f5ae780572409a1))
* deploy Storybook to GitHub pages 🌍 ([#746](https://github.com/telekom/scale/issues/746)) ([543e759](https://github.com/telekom/scale/commit/543e75979c2e31de1e1dc2a397a8b6c4a36c1901))





# [3.0.0-beta.105](https://github.com/telekom/scale/compare/v3.0.0-beta.104...v3.0.0-beta.105) (2022-05-20)


### Bug Fixes

* **dropdown:** hardcoded bg color in dark mode (temp) ([#1059](https://github.com/telekom/scale/issues/1059)) ([3818ed8](https://github.com/telekom/scale/commit/3818ed8039d369339b4c0ed04144d8533b5a2dab))
* **header:** avoid hiding elements directly under scrolled header ([#1067](https://github.com/telekom/scale/issues/1067)) ([c8a3d2f](https://github.com/telekom/scale/commit/c8a3d2fac89bf1f1da88c9a9999b1a7dbf5f709d))
* **link:** download attribute is string ([#1061](https://github.com/telekom/scale/issues/1061)) ([3278442](https://github.com/telekom/scale/commit/32784423627a199be86f3b4ee248a812580ca5a1))


### Features

* **notification:** emit scale-close on close ([#1066](https://github.com/telekom/scale/issues/1066)) ([88af117](https://github.com/telekom/scale/commit/88af11720f71e16f800036ba01d6176198cce8fa))





# [3.0.0-beta.104](https://github.com/telekom/scale/compare/v3.0.0-beta.103...v3.0.0-beta.104) (2022-05-12)


### Bug Fixes

* **date-picker:** keyboard nav styles ([#1034](https://github.com/telekom/scale/issues/1034)) ([6f30cd5](https://github.com/telekom/scale/commit/6f30cd54201c8043dccfb971a87dabc0f8c7c0fd))
* css transition values ([#1033](https://github.com/telekom/scale/issues/1033)) ([eb71637](https://github.com/telekom/scale/commit/eb71637ee607d8be4bea038549adcfdbc4c2f327))


### Features

* **notification-toast:** add css var for z-index ([#1041](https://github.com/telekom/scale/issues/1041)) ([e4c9820](https://github.com/telekom/scale/commit/e4c982093a7f0339aac21d982ad6f64248cf38a7))





# [3.0.0-beta.103](https://github.com/telekom/scale/compare/v3.0.0-beta.102...v3.0.0-beta.103) (2022-05-04)


### Bug Fixes

* **modal:** clicking esc key to close all opened modal window ([#1003](https://github.com/telekom/scale/issues/1003)) ([dbe17fd](https://github.com/telekom/scale/commit/dbe17fd46ae7d136be358a5699d878a18c7f939b))
* **text-input:** remove padding, add font-weight to helper text ([#1019](https://github.com/telekom/scale/issues/1019)) ([373ca47](https://github.com/telekom/scale/commit/373ca4789e98f39ff593364df1a69314678d6805))
* transition ([#1028](https://github.com/telekom/scale/issues/1028)) ([a36e97f](https://github.com/telekom/scale/commit/a36e97fe635472bfa9bc1cf11743f6f3e84f571a))
* **header:** use valid li > a html nesting + a11y improvements ([#1015](https://github.com/telekom/scale/issues/1015)) ([614f83d](https://github.com/telekom/scale/commit/614f83d485bdd9fed05282b9ff5201bf9cbed804))
* increase flyout zindex ([#1022](https://github.com/telekom/scale/issues/1022)) ([6e75493](https://github.com/telekom/scale/commit/6e75493625484319bd863323989431862596f18b))
* remove transform to maintain fixed positioning in child elements ([#1006](https://github.com/telekom/scale/issues/1006)) ([2fea224](https://github.com/telekom/scale/commit/2fea224a3594aa60bbddd6383c5337c75d22e28d))
* **storybook:** broken path in import snippet ([#1014](https://github.com/telekom/scale/issues/1014)) ([8724bfc](https://github.com/telekom/scale/commit/8724bfc669e5cad4bb8234148240c9727ff84e5f))


### Features

* **toggle-button:** add setFocus method ([#1005](https://github.com/telekom/scale/issues/1005)) ([8754b66](https://github.com/telekom/scale/commit/8754b663765f035e1344cadb6bdb4f012bed1435))





# [3.0.0-beta.102](https://github.com/telekom/scale/compare/v3.0.0-beta.101...v3.0.0-beta.102) (2022-04-19)


### Features

* **button:** add name and value props ([#996](https://github.com/telekom/scale/issues/996)) ([32270da](https://github.com/telekom/scale/commit/32270dae2bf1dd6d463ff0bef0dcf14e033b2a32))
* **modal:** add closeButtonTitle prop, closes [#771](https://github.com/telekom/scale/issues/771) ([#995](https://github.com/telekom/scale/issues/995)) ([1555fe3](https://github.com/telekom/scale/commit/1555fe3a25b2bcf3132ae664065de03de0c91cac))
* **notification-toast:** add auto-hide prop, closes [#948](https://github.com/telekom/scale/issues/948) ([#979](https://github.com/telekom/scale/issues/979)) ([aa1c3be](https://github.com/telekom/scale/commit/aa1c3bef2c8a3267155f0a40eaed12a01bdb81e2))
* **text-field:** add min and max attributes ([#988](https://github.com/telekom/scale/issues/988)) ([a073dfb](https://github.com/telekom/scale/commit/a073dfb3120997bc16cd9923cb2ec3b32d88aa37))





# [3.0.0-beta.101](https://github.com/telekom/scale/compare/v3.0.0-beta.100...v3.0.0-beta.101) (2022-04-07)


### Bug Fixes

* update design tokens and corresponding storybook docs, remove duplicates and unused vars ([991ed7e](https://github.com/telekom/scale/commit/991ed7e63466c59efca9bd7624ae8e91be274b43)), closes [#978](https://github.com/telekom/scale/issues/978) [#977](https://github.com/telekom/scale/issues/977)
* **modal:** bust double scrollbars when checkbox is present ([#981](https://github.com/telekom/scale/issues/981)) ([ca3551a](https://github.com/telekom/scale/commit/ca3551a0b50adf1bf6d0bc8c358393de3e0ac53b))





# [3.0.0-beta.100](https://github.com/telekom/scale/compare/v3.0.0-beta.54...v3.0.0-beta.100) (2022-04-05)


### Bug Fixes

* **card:** remove clickCard prop ([#949](https://github.com/telekom/scale/issues/949)) ([ecb7cae](https://github.com/telekom/scale/commit/ecb7cae0fa85a53673283eab6f87176bdd7d6eff))


### Features

* dark mode 🌓 ([#900](https://github.com/telekom/scale/issues/900)) ([b7f580f](https://github.com/telekom/scale/commit/b7f580f8cf3097d645a394d55c61d3a7fc6265dd))





# [3.0.0-beta.54](https://github.com/telekom/scale/compare/v3.0.0-beta.53...v3.0.0-beta.54) (2022-03-31)


### Bug Fixes

* **button:** remove deprecated small prop warning ([#945](https://github.com/telekom/scale/issues/945)) ([505d7f5](https://github.com/telekom/scale/commit/505d7f53615f24ab370599c034a9791622442fe5))
* **pagination:** add direction to events ([#931](https://github.com/telekom/scale/issues/931)) ([#950](https://github.com/telekom/scale/issues/950)) ([776c9ee](https://github.com/telekom/scale/commit/776c9eefd12fccc44b50680147bf224b98a03543))
* **radio-button-group:** remove form element ([#946](https://github.com/telekom/scale/issues/946)) ([2ab9cf5](https://github.com/telekom/scale/commit/2ab9cf50782b221d764aec59428b626cf87859cf))





# [3.0.0-beta.53](https://github.com/telekom/scale/compare/v3.0.0-beta.52...v3.0.0-beta.53) (2022-03-14)


### Bug Fixes

* binary files conflicts ([cfd1366](https://github.com/telekom/scale/commit/cfd1366ad7de3ddf78658366bbe763817602af66))
* windows firefox problem with fit-content ([#928](https://github.com/telekom/scale/issues/928)) ([1499ba9](https://github.com/telekom/scale/commit/1499ba9051e3059fccc578441354a8ce732a4f8d))


### Features

* updates sketch library name for rss feed ([#941](https://github.com/telekom/scale/issues/941)) ([971d305](https://github.com/telekom/scale/commit/971d305d7a158a8da8338208112212c85c9a34a0))





# [3.0.0-beta.52](https://github.com/telekom/scale/compare/v3.0.0-beta.51...v3.0.0-beta.52) (2022-03-02)


### Features

* add new logo and the footer to the sketch library.  ([#912](https://github.com/telekom/scale/issues/912)) ([e6842cf](https://github.com/telekom/scale/commit/e6842cf2ef4d401ef2c2261e7d1bc6ed95b7645b))





# [3.0.0-beta.51](https://github.com/telekom/scale/compare/v3.0.0-beta.50...v3.0.0-beta.51) (2022-03-01)


### Bug Fixes

* **app-logo:** make it focusable when header is sticky ([#898](https://github.com/telekom/scale/issues/898)) ([d26d314](https://github.com/telekom/scale/commit/d26d31470cb4e6aa99683df24d547df5bef3cb03))


### Features

* **accordion:**  add option for the icon being displayed on the right ([#863](https://github.com/telekom/scale/issues/863)) ([7ab140d](https://github.com/telekom/scale/commit/7ab140db1588d0d55da0ad4b826fef440816e0d0))





# [3.0.0-beta.50](https://github.com/telekom/scale/compare/v3.0.0-beta.49...v3.0.0-beta.50) (2022-02-23)


### Features

* **slider:** add name prop ([#894](https://github.com/telekom/scale/issues/894)) ([b1ad291](https://github.com/telekom/scale/commit/b1ad29168bee6e0eeb95563f9c4877134f11f4ae))





# [3.0.0-beta.49](https://github.com/telekom/scale/compare/v3.0.0-beta.48...v3.0.0-beta.49) (2022-02-22)


### Bug Fixes

* **checkbox:** show icon in neutral mode ([#896](https://github.com/telekom/scale/issues/896)) ([839c3de](https://github.com/telekom/scale/commit/839c3debfe951dc80e3d4c57ff588658f73b9463))


### Features

* **tooltip:** add styles prop ([#895](https://github.com/telekom/scale/issues/895)) ([4bae4a9](https://github.com/telekom/scale/commit/4bae4a91fb04ff884bc9b6882730ebade97b70a6))





# [3.0.0-beta.48](https://github.com/telekom/scale/compare/v3.0.0-beta.47...v3.0.0-beta.48) (2022-02-08)


### Bug Fixes

* **modal:** remove title attribute from modal window ([#852](https://github.com/telekom/scale/issues/852)) ([3e4213b](https://github.com/telekom/scale/commit/3e4213b23b2aebd6ac44797b0a86832e1de7763f))





# [3.0.0-beta.47](https://github.com/telekom/scale/compare/v3.0.0-beta.46...v3.0.0-beta.47) (2022-02-04)


### Bug Fixes

* **app-header:** check for userMenuToggle presence before trying to focus ([#847](https://github.com/telekom/scale/issues/847)) ([186576c](https://github.com/telekom/scale/commit/186576ce1175ae730c8c8b9f8f83c4e4187b0d11))


### Features

* **data-table:** add email and phone cells ([#808](https://github.com/telekom/scale/issues/808)) ([9327af2](https://github.com/telekom/scale/commit/9327af2b0dd4b06362af97380303c8fa1cb4dbdd))





# [3.0.0-beta.46](https://github.com/telekom/scale/compare/v3.0.0-beta.45...v3.0.0-beta.46) (2022-02-02)


### Bug Fixes

* **sidebar-nav:** set initial collapsible state ([#839](https://github.com/telekom/scale/issues/839)) ([fad731e](https://github.com/telekom/scale/commit/fad731ee42eed94c4234a1ecaa9c5e1bc794d87f))
* **sidebar-nav-collapsible:** proper opacity for chevron ([#840](https://github.com/telekom/scale/issues/840)) ([363cbcc](https://github.com/telekom/scale/commit/363cbcc25400a0bdcda74bd9c6333c12b83fbed8))
* **tooltip:** add z-index ([#821](https://github.com/telekom/scale/issues/821)) ([b3773b0](https://github.com/telekom/scale/commit/b3773b032389ee75d3992b8ac03a4729d0890c60))





# [3.0.0-beta.45](https://github.com/telekom/scale/compare/v3.0.0-beta.44...v3.0.0-beta.45) (2022-02-01)


### Bug Fixes

* **checkbox:** do not emit change from watching _disabled_ ([#836](https://github.com/telekom/scale/issues/836)) ([a7d50e2](https://github.com/telekom/scale/commit/a7d50e21b400d432d2ca882c0e8d762e310bad9e))





# [3.0.0-beta.44](https://github.com/telekom/scale/compare/v3.0.0-beta.43...v3.0.0-beta.44) (2022-01-31)


### Bug Fixes

* **checkbox:** apply scoped css variable spacing control ([#807](https://github.com/telekom/scale/issues/807)) ([8545c21](https://github.com/telekom/scale/commit/8545c211438ee21d89191181ab8314bec7eeaf8f))





# [3.0.0-beta.43](https://github.com/telekom/scale/compare/v3.0.0-beta.42...v3.0.0-beta.43) (2022-01-18)


### Bug Fixes

* **flyout:** close inactive menu ([#798](https://github.com/telekom/scale/issues/798)) ([762f892](https://github.com/telekom/scale/commit/762f89248ebc17c15c8f3bfde80ee7f435bb4b08))





# [3.0.0-beta.42](https://github.com/telekom/scale/compare/v3.0.0-beta.41...v3.0.0-beta.42) (2022-01-14)


### Bug Fixes

* **checkbox:** spacing problem ([#783](https://github.com/telekom/scale/issues/783)) ([3507aa2](https://github.com/telekom/scale/commit/3507aa24d37bcdf6c2ea5781e5669c517e358072))
* **dropdown:** set default background color ([#787](https://github.com/telekom/scale/issues/787)) ([b381940](https://github.com/telekom/scale/commit/b381940f135619e1945db00876b8de30973c7d3f))
* **notification-message:** add lifecycle method for slots ([#793](https://github.com/telekom/scale/issues/793)) ([026fbd3](https://github.com/telekom/scale/commit/026fbd355fd891944583079373c417e2e37203ee))
* **spinner:** centering problems ([#791](https://github.com/telekom/scale/issues/791)) ([8f84642](https://github.com/telekom/scale/commit/8f84642c1f3cb0991ca4e3c9b713973b7d32599e))
* **toggle-button:** left side border is missing when there is only one button in the group ([#782](https://github.com/telekom/scale/issues/782)) ([71469b1](https://github.com/telekom/scale/commit/71469b19f6a02651b690f22dcff78b1826dabc34))





# [3.0.0-beta.41](https://github.com/telekom/scale/compare/v3.0.0-beta.40...v3.0.0-beta.41) (2022-01-11)


### Bug Fixes

* **footer:** add flex value to main content ([#772](https://github.com/telekom/scale/issues/772)) ([7216fa8](https://github.com/telekom/scale/commit/7216fa84531dcaac6b375c1642be95847625a6d0))





# [3.0.0-beta.40](https://github.com/telekom/scale/compare/v3.0.0-beta.39...v3.0.0-beta.40) (2022-01-06)


### Bug Fixes

* **colors:** use correct gray ([#769](https://github.com/telekom/scale/issues/769)) ([71ab821](https://github.com/telekom/scale/commit/71ab82139d68435e6f3c68fe829350bca77adb65))
* **radio-button:** hover area problems because of flex ([#768](https://github.com/telekom/scale/issues/768)) ([b20d1f4](https://github.com/telekom/scale/commit/b20d1f42eadf2b1c2814f832ba0c4aad59463ac5))


### Features

* **notification-toast:** add new beta component ([#714](https://github.com/telekom/scale/issues/714)) ([1a9abb5](https://github.com/telekom/scale/commit/1a9abb51ce5dc393019260d4b2a65b877bf52873))





# [3.0.0-beta.39](https://github.com/telekom/scale/compare/v3.0.0-beta.38...v3.0.0-beta.39) (2021-12-21)


### Bug Fixes

* **toggle-group:** unreactive props ([#753](https://github.com/telekom/scale/issues/753)) ([f700a94](https://github.com/telekom/scale/commit/f700a947fb2817f95dfa25e000071cfedbad4d6f))
* **user-menu:** improve accessibility ([#756](https://github.com/telekom/scale/issues/756)) ([1460b97](https://github.com/telekom/scale/commit/1460b97c27fd85f19e9f1bbc2fe93d710d72ab54))
* use _semantic_ CSS variables for consistency ([#742](https://github.com/telekom/scale/issues/742)) ([15af88b](https://github.com/telekom/scale/commit/15af88b6c48c0418912074968611734b2e48c265))





# [3.0.0-beta.38](https://github.com/telekom/scale/compare/v3.0.0-beta.37...v3.0.0-beta.38) (2021-12-16)


### Bug Fixes

* enable `extras.cloneNodeFix` config for Stencil ([#748](https://github.com/telekom/scale/issues/748)) ([1d10fac](https://github.com/telekom/scale/commit/1d10fac6c632f37bd1577440094880c56b514e93))





# [3.0.0-beta.37](https://github.com/telekom/scale/compare/v3.0.0-beta.35...v3.0.0-beta.37) (2021-12-15)


### Bug Fixes

* **date-picker:** fix layout glitch when zoomed out ([#747](https://github.com/telekom/scale/issues/747)) ([b895d34](https://github.com/telekom/scale/commit/b895d34d0cc315afe9f4775dd1de7a39f1dc44bf))


### Features

* **notification-banner:** release first beta ([#704](https://github.com/telekom/scale/issues/704)) ([8e607cf](https://github.com/telekom/scale/commit/8e607cfda72abb9cb7b0eb4b66f334e0450d115e))
* adapt icon size automatically based on context ([#725](https://github.com/telekom/scale/issues/725)). Fixes [#702](https://github.com/telekom/scale/issues/702) ([e0ca5d7](https://github.com/telekom/scale/commit/e0ca5d7df479700903cd92c5ff6c3e172ecef536))
* **examples:** add vanilla ([#733](https://github.com/telekom/scale/issues/733)) ([91259f8](https://github.com/telekom/scale/commit/91259f8a6f1f87f64afe784a6fcc768b307d70dc))





# [3.0.0-beta.36](https://github.com/telekom/scale/compare/v3.0.0-beta.35...v3.0.0-beta.36) (2021-12-15)


### Features

* **notification-banner:** release first beta ([#704](https://github.com/telekom/scale/issues/704)) ([8e607cf](https://github.com/telekom/scale/commit/8e607cfda72abb9cb7b0eb4b66f334e0450d115e))
* adapt icon size automatically based on context ([#725](https://github.com/telekom/scale/issues/725)). Fixes [#702](https://github.com/telekom/scale/issues/702) ([e0ca5d7](https://github.com/telekom/scale/commit/e0ca5d7df479700903cd92c5ff6c3e172ecef536))
* **examples:** add vanilla ([#733](https://github.com/telekom/scale/issues/733)) ([91259f8](https://github.com/telekom/scale/commit/91259f8a6f1f87f64afe784a6fcc768b307d70dc))





# [3.0.0-beta.35](https://github.com/telekom/scale/compare/v3.0.0-beta.34...v3.0.0-beta.35) (2021-12-10)

**Note:** Version bump only for package telekom





# [3.0.0-beta.34](https://github.com/telekom/scale/compare/v3.0.0-beta.33...v3.0.0-beta.34) (2021-12-10)


### Bug Fixes

* add selected state for device/device-tv and content/media-folder icons ([#728](https://github.com/telekom/scale/issues/728)). Fixes [#726](https://github.com/telekom/scale/issues/726) ([acc63d8](https://github.com/telekom/scale/commit/acc63d89d065b94851202efa13bc44ea19f289a0))


### Features

* **input:** enable autofocus attribute ([#729](https://github.com/telekom/scale/issues/729)) ([519db5d](https://github.com/telekom/scale/commit/519db5dbe378beee8b7b4455ca9ef2b197803862))





# [3.0.0-beta.33](https://github.com/telekom/scale/compare/v3.0.0-beta.32...v3.0.0-beta.33) (2021-12-06)


### Features

* **header:** add prop sticky to header ([#716](https://github.com/telekom/scale/issues/716)) ([1982411](https://github.com/telekom/scale/commit/1982411be9d742eb4e4dd8f8d858e2d4a3b95fce))





# [3.0.0-beta.32](https://github.com/telekom/scale/compare/v3.0.0-beta.31...v3.0.0-beta.32) (2021-11-30)


### Bug Fixes

* **header:** improve mobile logo transition ([495a8f7](https://github.com/telekom/scale/commit/495a8f77bd7d0eed4c1be75dd13dca08208cc64f))
* **notification-badge:** vertical center alignment ([#692](https://github.com/telekom/scale/issues/692)) ([242254d](https://github.com/telekom/scale/commit/242254d32112ec422f8ed2d14b79ac5e3a8b8ccc))
* **shell-content:** center box when max-width is set ([#709](https://github.com/telekom/scale/issues/709)) ([8312623](https://github.com/telekom/scale/commit/83126238d84599bdea3cc5b50352fbba7c3d0e81))


### Features

* new sketch lib release ([#699](https://github.com/telekom/scale/issues/699)) ([b9127b1](https://github.com/telekom/scale/commit/b9127b1e699ab20df30fd04ba5ab33af3fe538a1))





# [3.0.0-beta.31](https://github.com/telekom/scale/compare/v3.0.0-beta.30...v3.0.0-beta.31) (2021-11-15)


### Features

* rounding radius refactor ([#691](https://github.com/telekom/scale/issues/691)) ([f03a762](https://github.com/telekom/scale/commit/f03a762e6c3c5b4ac38ce70a347eedbf8c9f4dda))
* **storybook:** better tracking, new version, viewport plugin ([#696](https://github.com/telekom/scale/issues/696)) ([6c5eb34](https://github.com/telekom/scale/commit/6c5eb34bfe7e42fd8bdbc4b4cdf1c407c3d5650e))





# [3.0.0-beta.30](https://github.com/telekom/scale/compare/v3.0.0-beta.29...v3.0.0-beta.30) (2021-11-15)


### Bug Fixes

* **date-picker:** stop updating local value on key press ([#695](https://github.com/telekom/scale/issues/695)) ([ee619d0](https://github.com/telekom/scale/commit/ee619d0afed1bacd121c0cbeee29813d671ddf19))





# [3.0.0-beta.29](https://github.com/telekom/scale/compare/v3.0.0-beta.28...v3.0.0-beta.29) (2021-11-11)


### Bug Fixes

* rotation of order icon on title table head ([#689](https://github.com/telekom/scale/issues/689)) ([4351d9e](https://github.com/telekom/scale/commit/4351d9ee0dac15a658c81a4a09b775bf4eaf7f55))
* **modal:** closing is prevented with legacy event ([#687](https://github.com/telekom/scale/issues/687)) ([e712c3a](https://github.com/telekom/scale/commit/e712c3af4fd49124e37afdba0c2e45ccfb2ec76c))
* **user-menu:** provide unique name ([1ad00ca](https://github.com/telekom/scale/commit/1ad00cafe6bac58621c05dc232c35babe86fcf4c))


### Features

* add innerTabindex prop to link and button (685) ([#686](https://github.com/telekom/scale/issues/686)) ([15288ee](https://github.com/telekom/scale/commit/15288ee73ff259a7379d1c0e8f3a48f13617c4eb))





# [3.0.0-beta.28](https://github.com/telekom/scale/compare/v3.0.0-beta.27...v3.0.0-beta.28) (2021-11-08)


### Bug Fixes

* minor visual regressions ([#680](https://github.com/telekom/scale/issues/680)) ([dffb03f](https://github.com/telekom/scale/commit/dffb03f21dac8c2d0cb1efccb39955b62a1067bd))
* **a11y:** address AXE violations ([#672](https://github.com/telekom/scale/issues/672)) ([0eeafea](https://github.com/telekom/scale/commit/0eeafea793d26ba8f5bea6319fca2389992b6fe5))


### Features

* **callout:** add as beta component ([e30f32f](https://github.com/telekom/scale/commit/e30f32f682e2ad0a72778a65c1065c565542d7bc))
* **header:** user menu ([#654](https://github.com/telekom/scale/issues/654)) ([9c7e9ad](https://github.com/telekom/scale/commit/9c7e9ada1328d4233948d67ff57adb88d5354ed5))
* **notification-badge:** add first beta ([#655](https://github.com/telekom/scale/issues/655)) ([5991853](https://github.com/telekom/scale/commit/599185342fe05a2c4f87a4f0febce3c5a39bd90d))
* **tooltip:** add beta component ([#607](https://github.com/telekom/scale/issues/607)) ([a6441fc](https://github.com/telekom/scale/commit/a6441fc976637a6ccc79e5248735bfa7dd9c8671)), closes [#415](https://github.com/telekom/scale/issues/415) [#465](https://github.com/telekom/scale/issues/465)
* add setFocus method to button and link ([#661](https://github.com/telekom/scale/issues/661)) ([94eb907](https://github.com/telekom/scale/commit/94eb9072b6be44e93377c673bf40d889d975cfa7))





# [3.0.0-beta.27](https://github.com/telekom/scale/compare/v3.0.0-beta.26...v3.0.0-beta.27) (2021-11-01)


### Bug Fixes

* **date-picker:** input value handling, calendarHeading + styles ([#660](https://github.com/telekom/scale/issues/660)) ([3311bf2](https://github.com/telekom/scale/commit/3311bf2ec3aa72c095cbe18bad50452fa63c57ac))





# [3.0.0-beta.26](https://github.com/telekom/scale/compare/v3.0.0-beta.25...v3.0.0-beta.26) (2021-10-28)


### Bug Fixes

* **date-picker:** firefox placeholder, small icon styles ([#657](https://github.com/telekom/scale/issues/657)) ([a95fdd9](https://github.com/telekom/scale/commit/a95fdd9b4210ccc8caf39daf7f6e5dc25877accb))
* checkbox resizing issue on sketch lib ([#653](https://github.com/telekom/scale/issues/653)) ([b7768c4](https://github.com/telekom/scale/commit/b7768c43ae11f6612f65e7f702af9e04b1bf1b30))





# [3.0.0-beta.25](https://github.com/telekom/scale/compare/v3.0.0-beta.24...v3.0.0-beta.25) (2021-10-27)

**Note:** Version bump only for package telekom





# [3.0.0-beta.24](https://github.com/telekom/scale/compare/v3.0.0-beta.23...v3.0.0-beta.24) (2021-10-27)


### Bug Fixes

* **button:** download despite download prop set to 'false' ([#648](https://github.com/telekom/scale/issues/648)) ([6a7c368](https://github.com/telekom/scale/commit/6a7c3682feae0922cccc0e6807cc7a71bf025060))





# [3.0.0-beta.23](https://github.com/telekom/scale/compare/v3.0.0-beta.22...v3.0.0-beta.23) (2021-10-18)


### Features

* **switch:** add name prop ([#629](https://github.com/telekom/scale/issues/629)) ([83cd99a](https://github.com/telekom/scale/commit/83cd99ac7aaf26e7b7681d1881ab0b4f1efcde17))





# [3.0.0-beta.22](https://github.com/telekom/scale/compare/v3.0.0-beta.21...v3.0.0-beta.22) (2021-10-15)


### Bug Fixes

* index file ([b43df9a](https://github.com/telekom/scale/commit/b43df9adb7ec6684095a821b63ac6ba6a5061ec5))





# [3.0.0-beta.21](https://github.com/telekom/scale/compare/v3.0.0-beta.20...v3.0.0-beta.21) (2021-09-30)


### Bug Fixes

* **button:** add more defense to setIconPositionProps against type errors ([#602](https://github.com/telekom/scale/issues/602)) ([5263ccd](https://github.com/telekom/scale/commit/5263ccdfe0442fcb7d457c179ff0baa803a247d1))


### Features

* **rating-stars:** improve prop naming ([#558](https://github.com/telekom/scale/issues/558)) ([3ceb6c1](https://github.com/telekom/scale/commit/3ceb6c12473c0feaadf97593154ea4288668fb2e))





# [3.0.0-beta.20](https://github.com/telekom/scale/compare/v3.0.0-beta.19...v3.0.0-beta.20) (2021-09-03)


### Bug Fixes

* **app-header:** change sticky class to follow BEM ([#565](https://github.com/telekom/scale/issues/565)) ([f400908](https://github.com/telekom/scale/commit/f400908c3fbd4d48111f33ff3b72df479fced3a3))
* **checkbox:** use other selector strategy for styling ([#567](https://github.com/telekom/scale/issues/567)) ([92e435b](https://github.com/telekom/scale/commit/92e435b14bde56c601465fd9b6aa18e3d623638f))


### Features

* **app-header:** let mobile menu render w/ config object when menu-main is on ([#566](https://github.com/telekom/scale/issues/566)) ([c5d0166](https://github.com/telekom/scale/commit/c5d0166a79bd8138d5e027edc8e3d883029af250))





# [3.0.0-beta.19](https://github.com/telekom/scale/compare/v3.0.0-beta.18...v3.0.0-beta.19) (2021-09-01)


### Bug Fixes

* **checkbox:** agent states ([#543](https://github.com/telekom/scale/issues/543)) ([c489496](https://github.com/telekom/scale/commit/c48949684a49c9644493c0889773b9f362e2d303))


### Features

* **date-picker:** add styles prop ([#554](https://github.com/telekom/scale/issues/554)) ([13b922e](https://github.com/telekom/scale/commit/13b922ee435f622e815b2a106405ef5282f34594))
* introduce kebab-cased events ([#526](https://github.com/telekom/scale/issues/526)) ([600e2f4](https://github.com/telekom/scale/commit/600e2f45618f75f8f6ffa7b845ebd7ae579d9524))





# [3.0.0-beta.18](https://github.com/telekom/scale/compare/v3.0.0-beta.17...v3.0.0-beta.18) (2021-08-30)


### Bug Fixes

* **modal:** init internal opened state with the Prop value ([#550](https://github.com/telekom/scale/issues/550)) ([3dd6cee](https://github.com/telekom/scale/commit/3dd6cee259a147d1efa839b67dde6bbd3ff6c771))





# [3.0.0-beta.17](https://github.com/telekom/scale/compare/v3.0.0-beta.16...v3.0.0-beta.17) (2021-08-23)


### Bug Fixes

* **tag:** keyboard support for dismiss button ([#533](https://github.com/telekom/scale/issues/533)) ([952218d](https://github.com/telekom/scale/commit/952218d6fc2b3347f99f9f7d10373d804e74b8a1))
* adapt storybook ([1a5933e](https://github.com/telekom/scale/commit/1a5933e4332c32259e96a78931fb4daeca3a7240))
* add snapshots ([8f2704f](https://github.com/telekom/scale/commit/8f2704f9b3a1212170f0018e85504285ac029380))
* also allow customized icons ([ef9c5c9](https://github.com/telekom/scale/commit/ef9c5c9d96e66a56a0f308208a3000b48179b47d))
* broken release pipeline (hopefully) with ([#468](https://github.com/telekom/scale/issues/468)) ([b753316](https://github.com/telekom/scale/commit/b753316fa26b74547199f2f5c0fc4d9fa4b35900))
* colorScheme default value ([b75b6d4](https://github.com/telekom/scale/commit/b75b6d4101fa8ccab546302af8bec660dc29acbf))
* css background ([f4c90ac](https://github.com/telekom/scale/commit/f4c90ac6b8e33c1d79e40cc515d3661f5b4cf1c6))
* disabled handling ([e676d7c](https://github.com/telekom/scale/commit/e676d7c265699516e26805a9fc51fdf338380e28))
* disabled indeterminate state master handling ([c496b86](https://github.com/telekom/scale/commit/c496b866461d9d1ec3d26e19cbf1047ec3b861a4))
* make handleClick an arrow function (to bind .this) ([328edd1](https://github.com/telekom/scale/commit/328edd1a9b8ad9c9965bd836884b7fad319208fe))
* spacing bug with helper text in checkbox ([7c7c02e](https://github.com/telekom/scale/commit/7c7c02e2cd16f28382da7e10af548636a88b6588))
* **checkbox:** testing snapshots ([cba0783](https://github.com/telekom/scale/commit/cba078304781edbdc377541795613d5297465524))
* multiple times used id ([0d1eab1](https://github.com/telekom/scale/commit/0d1eab175465f2b068fc155a13d24288918b2308))


### Features

* accessibility story toggle group ([cda7855](https://github.com/telekom/scale/commit/cda7855382615fe63d02f50f63444b82b10203e0))
* adapt css to new classes ([dcea072](https://github.com/telekom/scale/commit/dcea0721a71fc70e78ec013a25d8ead9ce62ac5e))
* adapt css to state indeterminate ([d7c95cc](https://github.com/telekom/scale/commit/d7c95cc35ebce85964bfcb0c65e6ccd9a13a5837))
* add _list_ attribute to text-field ([#532](https://github.com/telekom/scale/issues/532)) ([4f50b6a](https://github.com/telekom/scale/commit/4f50b6aa47c8674dea702ce0d041b19a9f281406))
* add accessibility features ([82a25aa](https://github.com/telekom/scale/commit/82a25aac0dcd01e5af8653f87a49fd3740414fa7))
* add accessibility story to toggle-button ([aaeabc6](https://github.com/telekom/scale/commit/aaeabc67065987af761aa57b2d361277ae36dbf3))
* add aria-pressed ([fb587d5](https://github.com/telekom/scale/commit/fb587d5ce5ff757d7b249530389aeab4da5973c4))
* add black color for selected toggle button ([408d5be](https://github.com/telekom/scale/commit/408d5be920b3b320feecd74fe5f0c2ff6473f04a))
* add EventEmitter ([994083d](https://github.com/telekom/scale/commit/994083d9d0c8a9303ed785ebf24ab5583aae9c0b))
* add media query for high contrast ([87d12bc](https://github.com/telekom/scale/commit/87d12bc7544b17a497c52169ff333e97642bf242))
* add state to checkbox group ([997baae](https://github.com/telekom/scale/commit/997baae8a5bed1edead0bef437e1fcafd4602147))
* add tests to toggle-group ([d452bc6](https://github.com/telekom/scale/commit/d452bc6774223ac65eed4af9603ad939fb499fde))
* add toggle button to storybook-vue ([35b5f6c](https://github.com/telekom/scale/commit/35b5f6c499c25fc1ca7a397aa9567216046df903))
* add toggle group stories ([1ce3f62](https://github.com/telekom/scale/commit/1ce3f6237940a547d2a5d2d10de595257005552e))
* adding error status hbt ([b6e2804](https://github.com/telekom/scale/commit/b6e2804dfcb23c6a10eba2b062e1205165d66e7e))
* adding error storie ([751130e](https://github.com/telekom/scale/commit/751130ea2e0b9597ffcf2deb290dc86f6ec53663))
* adding handle bar template ([fcd8ef5](https://github.com/telekom/scale/commit/fcd8ef56875a578e448be2bff10f0f38b9cfea51))
* adding missing test cases ([cfcabb4](https://github.com/telekom/scale/commit/cfcabb428487230868e7bab1404b385ab627d660))
* adding padding to the slots ([1669d4a](https://github.com/telekom/scale/commit/1669d4ab747f9d009369fa3bea6f359080cbc170))
* adding stories ([c017122](https://github.com/telekom/scale/commit/c0171228e0dde726dbb6e96835be3ac58825ddc4))
* adding testing ([b4ecaf9](https://github.com/telekom/scale/commit/b4ecaf9f418f4b97a879e5cc2804d183df336489))
* adding the usage beta files ([f21c0af](https://github.com/telekom/scale/commit/f21c0af9180bde6d0fc016c3c0384e84829d02b2))
* aria translation ([a41d150](https://github.com/telekom/scale/commit/a41d1508a06dd7401970c4ab2849f6cc8fd2be4a))
* block or inline; adapt border-radius of slotted elements ([3fa556e](https://github.com/telekom/scale/commit/3fa556edb4d431a7eaaaada484b9f24c6c0005d1))
* change translation features ([a7092bb](https://github.com/telekom/scale/commit/a7092bbf7c77d87c4e9c896d4e858fcbd17b3458))
* changing cursor to pointer ([0ee4d43](https://github.com/telekom/scale/commit/0ee4d43fc89d9ddb5243244c3ca9517fc147d2d7))
* clean up adaptNewState function and console.logs ([2b3fb0d](https://github.com/telekom/scale/commit/2b3fb0d84ee9f299c6dc7c5db9d7c8938296abc2))
* code clean up ([567908f](https://github.com/telekom/scale/commit/567908f66860ba7aaf3e6985a1138c614eb8d65e))
* component renders according to state; Eventemitter ([68a206b](https://github.com/telekom/scale/commit/68a206b8976afa457005e6a3464f5d9bae740559))
* disable property logic ([08d11da](https://github.com/telekom/scale/commit/08d11da6f49f46d02e51341f27470dca4e64acae))
* disabled and checked recognition ([418b5dd](https://github.com/telekom/scale/commit/418b5dd0543babc51674968fd76412b52b10fa2f))
* disabled tab-header ([#484](https://github.com/telekom/scale/issues/484)) ([ed12fd1](https://github.com/telekom/scale/commit/ed12fd1e51b59e3967a8e74595630311a0a4b095))
* distinguish between master and normal checkbox ([dca9eab](https://github.com/telekom/scale/commit/dca9eab14c7b35ac6cf1d4d7326a6fd3a11dd153))
* enable border-radius ([c4c9ada](https://github.com/telekom/scale/commit/c4c9adabab942b33b74ea30787a809d40b483b05))
* enable translation for aria texts ([7550b77](https://github.com/telekom/scale/commit/7550b77ebbb5b5a8afd222a8ed8bddaec5337753))
* final radio button group ([6e978c4](https://github.com/telekom/scale/commit/6e978c42305a0716fa36f0a0e1bfc445a525135f))
* first commit ([1f3aae2](https://github.com/telekom/scale/commit/1f3aae2d349031bdfde13f3ff0077b82b98ece9a))
* first draft checkbox-group ([0d77ccc](https://github.com/telekom/scale/commit/0d77ccc2edaa762d8302ed2fc2d70dccb4010084))
* format & lint ([98b4759](https://github.com/telekom/scale/commit/98b47592e4d9edbf1d4fbe734a97442e11191b46))
* format and lint ([90f97c7](https://github.com/telekom/scale/commit/90f97c70eb7f70381e7cd7df4b6214e11bb3d4da))
* handle icon size ([c751a62](https://github.com/telekom/scale/commit/c751a6286e535665d6e9394095ba1262d96fb8ca))
* handling of disabled master ([78bbe0f](https://github.com/telekom/scale/commit/78bbe0f54733baeaa924f57b43ddfa9b87255f66))
* hover, focus, active, disabled ([c194375](https://github.com/telekom/scale/commit/c194375ce5f3f3d378f60731f5a6e127a6cec3ae))
* init checkbox handle bar template ([5c2cd24](https://github.com/telekom/scale/commit/5c2cd24b272011a0213a9435a837358be93932e8))
* init files ([0073e69](https://github.com/telekom/scale/commit/0073e6986e3fd48141115d1e30b55029b7246400))
* init storybook ([1bd42a6](https://github.com/telekom/scale/commit/1bd42a6b8dcef09215d78a2ebb087b37ade2416d))
* initialize css and tsx ([4161e8b](https://github.com/telekom/scale/commit/4161e8bdeebccdcdf3badd3b46c9bcb5ac839ab7))
* logic multi vs single ([6c9f8bb](https://github.com/telekom/scale/commit/6c9f8bbeea8134aa7f7adde3850c674450581002))
* new stories ([698fd81](https://github.com/telekom/scale/commit/698fd81deebc6e04bdddde674f939535cc3b75d3))
* refactor clickHandler; add tests; ([08a2940](https://github.com/telekom/scale/commit/08a29407ac6fca41e5d0fde38fba83564d9bf12b))
* selected state - first draft ([a5c4b8a](https://github.com/telekom/scale/commit/a5c4b8a354ced471854de84c31cd4e776650b150))
* set initial state; set tempState on button click ([1f12e3d](https://github.com/telekom/scale/commit/1f12e3d0bb82dbd13631d80bbb5bc2b2316bb363))
* sizes ([4bd83f7](https://github.com/telekom/scale/commit/4bd83f7b4aa52fcf1619ebd0db6767f0efd2beee))
* storybook aria-translation ([467cbcf](https://github.com/telekom/scale/commit/467cbcf105b89534f74140170240d2f849c73a6a))
* storybook stories ([20739c6](https://github.com/telekom/scale/commit/20739c68b64ac68dba165ac766e3cc4a719e9464))
* striped tables ([#489](https://github.com/telekom/scale/issues/489)) ([9fb0999](https://github.com/telekom/scale/commit/9fb099903b84e001518844426b6f9c894f30dfae))
* variants, icon handling ([8c65730](https://github.com/telekom/scale/commit/8c657303bd627e911586005fa6c5e84eda36bffd))
* **checkbox:** add indeterminate state ([0a895c4](https://github.com/telekom/scale/commit/0a895c4cbd668ff49cd35550091549cb830672a1))
* **date-picker:** accessibility enhancements ([#462](https://github.com/telekom/scale/issues/462)) ([117c4d7](https://github.com/telekom/scale/commit/117c4d7c4fe145bc5239bc2bce26ae0e90627ff8))
* **storybook:** add CSS scoped variables to checkbox group ([3aea0bc](https://github.com/telekom/scale/commit/3aea0bc8eeda71e97577b1cee95298a0c890b715))
* handle bar template without error ([3f288c3](https://github.com/telekom/scale/commit/3f288c3b3e8b27f9f39b3ef651e8d586b8a5cf10))
* initial state handles all variants of disabled ([dc72a2e](https://github.com/telekom/scale/commit/dc72a2ecbbf2ca44ce740203727c01b0c5f0edc6))
* initiallise group ([3f4264b](https://github.com/telekom/scale/commit/3f4264b8db53ea41782b5d2bccdbfcdde92ade4b))
* logic between label checkbox and functional checkboxes ([f6669b9](https://github.com/telekom/scale/commit/f6669b9b613fe1cdbf301fd70ba450d34c709e79))
* make checkboxes slots ([dbacb8a](https://github.com/telekom/scale/commit/dbacb8a1631598532772bd749a63d4816678ac8e))
* make slots customasible ([f0b7ba2](https://github.com/telekom/scale/commit/f0b7ba2d610dd96f1248522983ab455ccd6a0bf4))
* master checkbox state disabled ([5bba2e9](https://github.com/telekom/scale/commit/5bba2e930b379531b1c0a9e7b610ca6161b9c9ab))
* prepare disabled ([4adbc00](https://github.com/telekom/scale/commit/4adbc0072f77a19a27da7ecb54a518538da8ca21))
* refactor checkForSubCheckboxChange() ([9fec351](https://github.com/telekom/scale/commit/9fec351486b4336e462227b4f6148e4fb730f85a))
* refactor state management ([457baa8](https://github.com/telekom/scale/commit/457baa87a1d20b2adaf34ce7b6c361d6f3e1ebc3))
* updating status immediately ([ed1ce75](https://github.com/telekom/scale/commit/ed1ce755f87ef55ca3ac30150f336f8c1181b4f0))
* **footer:** enable custom slots ([56d798c](https://github.com/telekom/scale/commit/56d798cb98dcb33b4cff2508d83274c2d6685139))


### Reverts

* Revert "docs(storybook): separate header from shell" (#493) ([ed9abf8](https://github.com/telekom/scale/commit/ed9abf8a0b3c42a581315355f5655d66e2d529bd)), closes [#493](https://github.com/telekom/scale/issues/493)





# [3.0.0-beta.16](https://github.com/telekom/scale/compare/v3.0.0-beta.15...v3.0.0-beta.16) (2021-07-20)


### Bug Fixes

* datepicker not updating on outside value change ([#441](https://github.com/telekom/scale/issues/441)) ([cb5773c](https://github.com/telekom/scale/commit/cb5773ce7ab9ca097a667c8c6ab849f19954dc37))
* events and `checked` prop in Radio ([#426](https://github.com/telekom/scale/issues/426)) ([c9e780c](https://github.com/telekom/scale/commit/c9e780c1841590320d1bfd8d5ea618a406eef9d5))
* format ([#453](https://github.com/telekom/scale/issues/453)) ([de170f7](https://github.com/telekom/scale/commit/de170f7e159e7bc05a804b0e391dc7d3b7af6c3f))


### Features

* add documentation for new Actions data-grid cell type ([#464](https://github.com/telekom/scale/issues/464)) ([5f9f6ef](https://github.com/telekom/scale/commit/5f9f6ef04c20a8892b55850017e65bfeea6937ef))
* badge ([#394](https://github.com/telekom/scale/issues/394)) ([686ac2d](https://github.com/telekom/scale/commit/686ac2d6f366e2676ad0d96abce2714a02c334e1))
* implement scaleBeforeClose event in Modal ([#430](https://github.com/telekom/scale/issues/430)) ([bdc6786](https://github.com/telekom/scale/commit/bdc678655e4d3921ab546448cca70f38ae4057ee))





# [3.0.0-beta.15](https://github.com/telekom/scale/compare/v3.0.0-beta.14...v3.0.0-beta.15) (2021-06-21)


### Bug Fixes

* **a11y:** axe audit ([#421](https://github.com/telekom/scale/issues/421)) ([39a0021](https://github.com/telekom/scale/commit/39a002141aa909eb1100bc5a8f727e0a1ba462a0))


### Features

* add fill prop to icon with higher priority than color ([#412](https://github.com/telekom/scale/issues/412)) ([4f4bac4](https://github.com/telekom/scale/commit/4f4bac41915b0c64d6f43ca91eef6254c08bb29f))





# [3.0.0-beta.14](https://github.com/telekom/scale/compare/v3.0.0-beta.13...v3.0.0-beta.14) (2021-06-15)


### Bug Fixes

* **components-vue:** update proxies form control config ([#407](https://github.com/telekom/scale/issues/407)) ([acf7e22](https://github.com/telekom/scale/commit/acf7e22395634cdc5b54c0600631959fa0063460))
* ignore empty text nodes while setting icon-position attribute in button ([#390](https://github.com/telekom/scale/issues/390)) ([d88c2b8](https://github.com/telekom/scale/commit/d88c2b80da831a67033fc34c20e8e5b133320024))


### Features

* **button:** add download attribute ([#380](https://github.com/telekom/scale/issues/380)) ([49b14c0](https://github.com/telekom/scale/commit/49b14c0e1c211f7fa882943d2c82ab93699cc7f0))





# [3.0.0-beta.13](https://github.com/telekom/scale/compare/v3.0.0-beta.12...v3.0.0-beta.13) (2021-06-07)


### Bug Fixes

* **app-header:** use ID as visible mega-menu matcher ([#391](https://github.com/telekom/scale/issues/391)) ([d806408](https://github.com/telekom/scale/commit/d8064080be09d34faae81f5e2f99e395a6d26df1))
* **slider:** z-index for thumb, it was clashing with the modal ([#386](https://github.com/telekom/scale/issues/386)) ([a681b98](https://github.com/telekom/scale/commit/a681b98e09c4135097b759357915979a7abc2e90))


### Features

* add styles attributes to table and switch ([#378](https://github.com/telekom/scale/issues/378)) ([e40e2f4](https://github.com/telekom/scale/commit/e40e2f42f77e8cd699f4351e623c43a3b637d786))
* **config:** add dist-custom-elements-bundle output ([#371](https://github.com/telekom/scale/issues/371)) ([2d68e3f](https://github.com/telekom/scale/commit/2d68e3f9db7aea57e90772fe5c7744a9ccce27e6)), closes [#369](https://github.com/telekom/scale/issues/369)





# [3.0.0-beta.12](https://github.com/telekom/scale/compare/v3.0.0-beta.11...v3.0.0-beta.12) (2021-05-27)


### Bug Fixes

* **app-header:** remove list bullet point from portal name ([#367](https://github.com/telekom/scale/issues/367)) ([fc5364d](https://github.com/telekom/scale/commit/fc5364df90a9c84ec794948e67e05af6f7c21609))





# [3.0.0-beta.11](https://github.com/telekom/scale/compare/v3.0.0-beta.10...v3.0.0-beta.11) (2021-05-26)


### Bug Fixes

* **app-header:** pass href to nav-main ([#363](https://github.com/telekom/scale/issues/363)) ([a122036](https://github.com/telekom/scale/commit/a1220365d7cb7ed9d9fff54c9e8b4b6b518330c6))


### Features

* **design-tokens:** add functional colors to match current documentation ([#364](https://github.com/telekom/scale/issues/364)) ([a3a0821](https://github.com/telekom/scale/commit/a3a08216e872732ad81a1f555a9a2b65a06c7f97))





# [3.0.0-beta.10](https://github.com/telekom/scale/compare/v3.0.0-beta.9...v3.0.0-beta.10) (2021-05-25)


### Bug Fixes

* **footer:** accept any icon ([#359](https://github.com/telekom/scale/issues/359)) ([a94f90c](https://github.com/telekom/scale/commit/a94f90c442ac3a57098cdd51d3a9ae893906db75))
* broken `min` and `max` attributes in Slider and more ([66543d0](https://github.com/telekom/scale/commit/66543d0ec36cfdd9f57ce14d85f6e9bedae4ea43))
* deprecate direct DOM manipulation in Collapsible, fixes [#316](https://github.com/telekom/scale/issues/316) ([06e8e2c](https://github.com/telekom/scale/commit/06e8e2c34e8449b37cdf4b9b52f2131b30dffad2))
* **design-tokens:** value for h5 line-height ([#349](https://github.com/telekom/scale/issues/349)) ([b2873b7](https://github.com/telekom/scale/commit/b2873b76b277d66bce36d35820c4e2a74c550d1d))


### Features

* **date-picker:** flatten top/bottom left border radius ([#355](https://github.com/telekom/scale/issues/355)) ([2345728](https://github.com/telekom/scale/commit/23457285b6d07ba94647c139bf5276cae801f94f))
* **sketch-generator:** add icon merging to generator ([#324](https://github.com/telekom/scale/issues/324)) ([3b7cbd6](https://github.com/telekom/scale/commit/3b7cbd6fbb92393a408126601c909ee6b4a1e89f))





# [3.0.0-beta.9](https://github.com/telekom/scale/compare/v3.0.0-beta.8...v3.0.0-beta.9) (2021-05-17)


### Bug Fixes

* **app-navigation:** remove leaky svg style ([#341](https://github.com/telekom/scale/issues/341)) ([dd4a5cc](https://github.com/telekom/scale/commit/dd4a5cc6b111dab86fb20942550a30ba429328fb))


### Features

* **sidebar-nav:** make current prop work with boolean values ([#343](https://github.com/telekom/scale/issues/343)) ([b847222](https://github.com/telekom/scale/commit/b847222f7cd27d5b1a1ea8e51edd3793c88fa59a))





# [3.0.0-beta.8](https://github.com/telekom/scale/compare/v3.0.0-beta.7...v3.0.0-beta.8) (2021-05-12)


### Bug Fixes

* **rating-stars:** no hover while disable ([#336](https://github.com/telekom/scale/issues/336)) ([138c6e8](https://github.com/telekom/scale/commit/138c6e850b615865d83e8b12252f89a1b088a35f))
* **select:** add  -moz query for rendering visual padding correctly ([#323](https://github.com/telekom/scale/issues/323)) ([808678b](https://github.com/telekom/scale/commit/808678bc72e47fcbb0c4e6a0c9f67a12c766c27b))





# [3.0.0-beta.7](https://github.com/telekom/scale/compare/v3.0.0-beta.6...v3.0.0-beta.7) (2021-05-06)


### Features

* **text-field:** styled read-only attribute w/ tokens ([#313](https://github.com/telekom/scale/issues/313)) ([1abbdd6](https://github.com/telekom/scale/commit/1abbdd6c2bbda810ab3529026d0f837e649ae792))





# [3.0.0-beta.6](https://github.com/telekom/scale/compare/v3.0.0-beta.5...v3.0.0-beta.6) (2021-05-03)


### Features

* **footer:** dynamic copyright text ([#318](https://github.com/telekom/scale/issues/318)) ([04d1ad3](https://github.com/telekom/scale/commit/04d1ad3b247159e10a51db88ce56e658b42147ed))





# [3.0.0-beta.5](https://github.com/telekom/scale/compare/v3.0.0-beta.4...v3.0.0-beta.5) (2021-04-28)


### Bug Fixes

* tokens for headings ([#283](https://github.com/telekom/scale/issues/283)) ([6175d2b](https://github.com/telekom/scale/commit/6175d2bdf5b901d80444025eb8bd22345e1b58bf))
* **components:** add _readonly_ attribute for text-field and textarea ([#284](https://github.com/telekom/scale/issues/284)) ([ac469a5](https://github.com/telekom/scale/commit/ac469a581f6d076bdcbfd63f78cea3fb1ac90a37))
* button ([#282](https://github.com/telekom/scale/issues/282)) ([d82a02f](https://github.com/telekom/scale/commit/d82a02f7f604bfa3b813d94f54c29b241056fd46))





# [3.0.0-beta.4](https://github.com/telekom/scale/compare/v3.0.0-beta.3...v3.0.0-beta.4) (2021-04-27)


### Bug Fixes

* **brand-header:** make shrunk logo clickable ([#276](https://github.com/telekom/scale/issues/276)) ([d1f784f](https://github.com/telekom/scale/commit/d1f784f7336a50d6b3abcb60509b417b70b61738))





# [3.0.0-beta.3](https://github.com/telekom/scale/compare/v0.1.4...v3.0.0-beta.3) (2021-04-26)


### Bug Fixes

* add checkbox and radio input examples to html ([#229](https://github.com/telekom/scale/issues/229)) ([ae36124](https://github.com/telekom/scale/commit/ae36124096db80cff088d0af6ef705712f3d357a))
* corrects the regular expression to get circleci to recognize feat branches ([#219](https://github.com/telekom/scale/issues/219)) ([a98470e](https://github.com/telekom/scale/commit/a98470ef1c8d1a8adac29cf6e9f21f91a3a454f7))
* decouple from @scaleds/components, transpile @scaleds/docs ([#239](https://github.com/telekom/scale/issues/239)) ([4339f7a](https://github.com/telekom/scale/commit/4339f7a142521e0fed1c92b0d004bb72371666e9))
* fixes the versions on boilerplates ([58d9e55](https://github.com/telekom/scale/commit/58d9e55618ccde2803c4d3e8d7812fe67a616a8d))
* regenerate classes only when styles prop changes ([#235](https://github.com/telekom/scale/issues/235)) ([c1f16dc](https://github.com/telekom/scale/commit/c1f16dc6f4af1cacc7c8d27b4959a2ac5808c9ea))
* turn off annotation for proper client render ([#231](https://github.com/telekom/scale/issues/231)) ([dd3ce76](https://github.com/telekom/scale/commit/dd3ce768906a75c4cffeebb72622745de6727bce))


### Features

* **components:** add readonly attribute to text-field (no styles) ([#267](https://github.com/telekom/scale/issues/267)) ([7cf3ba4](https://github.com/telekom/scale/commit/7cf3ba45b7e6d5ecd1624f07ab0542c233049756))
* make docs a cli app ([#234](https://github.com/telekom/scale/issues/234)) ([890cc3a](https://github.com/telekom/scale/commit/890cc3adbb7e7e728c5d93f1007f01e61d9b92c1))





# [3.0.0-beta.2](https://github.com/telekom/scale/compare/v0.1.4...v3.0.0-beta.2) (2021-04-20)


### Bug Fixes

* add checkbox and radio input examples to html ([#229](https://github.com/telekom/scale/issues/229)) ([ae36124](https://github.com/telekom/scale/commit/ae36124096db80cff088d0af6ef705712f3d357a))
* corrects the regular expression to get circleci to recognize feat branches ([#219](https://github.com/telekom/scale/issues/219)) ([a98470e](https://github.com/telekom/scale/commit/a98470ef1c8d1a8adac29cf6e9f21f91a3a454f7))
* decouple from @scaleds/components, transpile @scaleds/docs ([#239](https://github.com/telekom/scale/issues/239)) ([4339f7a](https://github.com/telekom/scale/commit/4339f7a142521e0fed1c92b0d004bb72371666e9))
* fixes the versions on boilerplates ([58d9e55](https://github.com/telekom/scale/commit/58d9e55618ccde2803c4d3e8d7812fe67a616a8d))
* regenerate classes only when styles prop changes ([#235](https://github.com/telekom/scale/issues/235)) ([c1f16dc](https://github.com/telekom/scale/commit/c1f16dc6f4af1cacc7c8d27b4959a2ac5808c9ea))
* turn off annotation for proper client render ([#231](https://github.com/telekom/scale/issues/231)) ([dd3ce76](https://github.com/telekom/scale/commit/dd3ce768906a75c4cffeebb72622745de6727bce))


### Features

* make docs a cli app ([#234](https://github.com/telekom/scale/issues/234)) ([890cc3a](https://github.com/telekom/scale/commit/890cc3adbb7e7e728c5d93f1007f01e61d9b92c1))
