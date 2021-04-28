import { NgModule } from '@angular/core';
import { defineCustomElements } from '@telekom/scale-components/loader';

import { BooleanValueAccessor } from './directives/boolean-value-accessor';
import { NumericValueAccessor } from './directives/number-value-accessor';
import { RadioValueAccessor } from './directives/radio-value-accessor';
import { SelectValueAccessor } from './directives/select-value-accessor';
import {
  ScaleAccordion,
  ScaleAlert,
  ScaleBreadcrumb,
  ScaleButton,
  ScaleCard,
  ScaleCarousel,
  ScaleChartStackCard,
  ScaleCollapsible,
  ScaleDivider,
  ScaleIcon,
  ScaleInput,
  ScaleLink,
  ScaleList,
  ScaleListItem,
  ScaleModal,
  ScaleProgressBar,
  ScaleSidebarNav,
  ScaleSidebarNavCollapsible,
  ScaleSidebarNavItem,
  ScaleSlider,
  ScaleSsrSlotFix,
  ScaleSwitch,
  ScaleTabHeader,
  ScaleTabNav,
  ScaleTabPanel,
  ScaleTable,
  ScaleTag,
  ScaleToast,
} from './directives/proxies';
import { TextValueAccessor } from './directives/text-value-accessor';

defineCustomElements(window);

const DECLARATIONS = [
  // proxies
  ScaleAccordion,
  ScaleAlert,
  ScaleBreadcrumb,
  ScaleButton,
  ScaleCard,
  ScaleCarousel,
  ScaleChartStackCard,
  ScaleCollapsible,
  ScaleDivider,
  ScaleIcon,
  ScaleInput,
  ScaleLink,
  ScaleList,
  ScaleListItem,
  ScaleModal,
  ScaleProgressBar,
  ScaleSidebarNav,
  ScaleSidebarNavCollapsible,
  ScaleSidebarNavItem,
  ScaleSlider,
  ScaleSsrSlotFix,
  ScaleSwitch,
  ScaleTabHeader,
  ScaleTabNav,
  ScaleTabPanel,
  ScaleTable,
  ScaleTag,
  ScaleToast,

  // Value Accessors
  BooleanValueAccessor,
  NumericValueAccessor,
  RadioValueAccessor,
  SelectValueAccessor,
  TextValueAccessor,
];

@NgModule({
  declarations: DECLARATIONS,
  exports: DECLARATIONS,
  imports: [],
  providers: [],
})
export class ComponentLibraryModule {}
