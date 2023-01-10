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

import {
  Component,
  Prop,
  h,
  Element,
  Host,
  Watch,
  State,
  Event,
  EventEmitter,
} from '@stencil/core';
import {
  CELL_TYPES,
  DEFAULT_CELL_TYPE,
  CELL_DEFAULTS,
} from './data-grid-cells';
import classNames from 'classnames';
import { emitEvent } from '../../utils/utils';

// [ ] add options to show nested content without the html column
// [ ] add options to pre-expand all html content
// [ ] Uber cell type where all options are available for user
// [ ] Add custom elipsis for cropped content - with a tooltip that shows full content

// Const for testing auto-width. Will stop re-render.
// Need to manually set opacity and overflow to debug.
const TEST_AUTO_WIDTH_RENDER = false;

/* Interfaces */
export interface DataGridEditEventDetail {
  rows: any;
  rowIndex: number;
  columnIndex: number;
  value: string | number | boolean | undefined | null;
}

export interface DataGridSortedEventDetail {
  rows: any;
  type: 'text' | 'number';
  sortDirection: 'ascending' | 'descending' | 'none';
  columnIndex: number;
}

/* Reused Private Variables */
let resizeObserver: any;

const name = 'data-grid';
/* Component Declaration */
@Component({
  tag: 'scale-data-grid',
  styleUrl: 'data-grid.css',
  shadow: true,
})
export class DataGrid {
  /* 1. Host HTML Element */
  @Element() hostElement: HTMLElement;

  /* 2. State Variables (alphabetical) */
  /** Used to force render after sorting/selection */
  @State() forceRender: number = 0;
  /** Pagination starting index */
  @State() paginationStart: number = 0;
  /** Table scroll value for frozen header  */
  @State() scrollY: number = 0;

  /* 3. Public Properties (alphabetical) */
  /** Input fields config array */
  @Prop() fields: any;
  /** (optional) Freeze header row from scrolling */
  @Prop() freezeHeader?: boolean = false;
  /** (optional) Heading string */
  @Prop() heading?: string = '';
  /** (optional) Set static table height, by default will auto-resize */
  @Prop() height?: string;
  /** (optional) Set to true to remove border */
  @Prop() hideBorder?: boolean = false;
  /** (optional) Set to true to hide header row */
  @Prop() hideHeader?: boolean = false;
  /** (optional) Set to true to remove info footer block including pagination and selection status */
  @Prop() hideInfo?: boolean = false;
  /** (optional) Set to true to hide settings menu */
  @Prop() hideMenu?: boolean = false;
  /** (optional) Set to true to add numbers column */
  @Prop() numbered?: boolean = false;
  /** (optional) Set number of rows to display per pagination page */
  @Prop() pageSize?: number = Infinity;
  /** Input data array */
  @Prop() rows: any;
  /** (optional) Set to true to add selection column */
  @Prop() selectable?: boolean = false;
  /** Read-only selection array - populated with raw data from selected rows */
  @Prop() selection: string[] = [];
  /** (optional) Shade every second row darker */
  @Prop() shadeAlternate?: boolean = true;
  /** (optional) Injected css styles */
  @Prop() styles: any;
  /** (optional) Set to false to hide table, used for nested tables to re-render upon toggle */
  @Prop() visible?: boolean = true;

  /* 4. Events (alphabetical) */
  /** Event triggered every time the editable cells are changed, updating the original rows data */
  @Event({ eventName: 'scale-edit' })
  scaleEdit: EventEmitter<DataGridEditEventDetail>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleEdit' })
  scaleEditLegacy: EventEmitter<DataGridEditEventDetail>;
  /** Event triggered every time the data is sorted, changing original rows data */
  @Event({ eventName: 'scale-sort' })
  scaleSort: EventEmitter<DataGridSortedEventDetail>;
  /** @deprecated in v3 in favor of kebab-case event names */
  @Event({ eventName: 'scaleSort' })
  scaleSortLegacy: EventEmitter<DataGridSortedEventDetail>;
  /* 5. Private Properties (alphabetical) */
  /** Used to update column divider during interaction */
  private activeDivider: any;
  /** Stored active sorting column index, for state removal */
  private activeSortingIndex = -1;
  /** Track component width to constrict nested content, which is necessary with table layout */
  private contentWidth: number = 100;
  /** Flag to know to check for data completeness */
  private dataNeedsCheck: boolean = true;
  /** Track main container for element resize */
  private elMmainContainer?: any;
  /** Track table container for scroll */
  private elScrollContainer?: HTMLElement;
  /** Table head for frozen header */
  private elTableHead?: HTMLElement;
  /** Checkbox for getting toggle-all state */
  private elToggleSelectAll?: HTMLScaleCheckboxElement;
  /** Flag to know if rendering can commence */
  private hasData: boolean = false;
  /** Flag that is true when width below a certain limit */
  private isMobile: boolean = false;
  /** Flag that enough data supplied to warrant pagination */
  private isPagination: boolean = false;
  /** Flag that is true if any fields are sortable */
  private isSortable: boolean = false;
  /** Track container width to avoid re-calculating column stretching */
  private lastContainerWidth: number = 100;
  /** Index of field to use as mobile title, if any */
  private mobileTitleIndex: number = -1;
  /** Determine if auto-width parsing needed */
  private needsAutoWidthParse: boolean = false;
  /** Force column resize after render */
  private needsColumnResize: boolean = false;
  /** Auto-calculated number column width */
  private numberColumnWidth: number = 0;
  /** Selection column width */
  private selectionColumnWidth: number = 22;

  /* 6. Lifecycle Events (call order) */
  constructor() {
    // Bind certain callbacks to scope
    this.onDividerMove = this.onDividerMove.bind(this);
    this.onDividerUp = this.onDividerUp.bind(this);
    this.applyResponsiveClasses = this.applyResponsiveClasses.bind(this);
    this.updateColumnStretching = this.updateColumnStretching.bind(this);
  }
  componentWillLoad() {
    this.fieldsHandler();
    this.rowsHandler();
  }
  componentWillUpdate() {}
  componentDidRender() {
    if (this.needsAutoWidthParse) {
      this.calculateAutoWidths();
    }
    // Wait a frame to avoid warning about possible infinite loop
    setTimeout(() => {
      if (this.needsColumnResize) {
        this.updateColumnStretching();
      }
    });
  }
  componentDidLoad() {
    this.addResizeObserver();
  }
  componentDidUpdate() {
    this.selectable && this.updateReadableSelection();
  }
  disconnectedCallback() {
    this.removeResizeObserver();
  }

  /* 7. Listeners */
  @Watch('fields')
  fieldsHandler() {
    this.parseFields();
    this.checkForMobileTitle();
    this.checkForSortableFields();
    this.dataNeedsCheck = true;
  }
  @Watch('rows')
  rowsHandler() {
    this.parseRows();
    this.setInitialRowProps();
    this.resetSortingToggle();
    this.dataNeedsCheck = true;
    // Set flag to dirty to redo column width with new data
    this.needsAutoWidthParse = true;
    this.needsColumnResize = true;

    if (
      // when we run out of items on the current page
      this.rows.length <= this.paginationStart &&
      // and we are NOT on the first page
      this.paginationStart - this.pageSize > -1
    ) {
      // step back one page
      this.paginationStart = this.paginationStart - this.pageSize;
    }
  }

  /* 8. Public Methods */

  /* 9. Local Methods */
  parseFields() {
    if (this.fields && typeof this.fields === 'string') {
      this.fields = JSON.parse(this.fields);
    }
  }

  parseRows() {
    if (this.rows && typeof this.rows === 'string') {
      this.rows = JSON.parse(this.rows);
    }
  }

  setInitialRowProps() {
    if (!this.rows || !this.rows.length) {
      return;
    }
    this.rows.forEach((row, i) => {
      // Store indices of original order on rows for resetting sorting
      row.initialIndex = i;
      // Set initial selected flag
      row.selected = false;
    });
    // Determine if pagination will be required
    this.isPagination = this.pageSize <= this.rows.length - 1;
  }

  checkHasData() {
    // Need both fields and data content in order to populate
    if (!this.fields) {
      return false;
    }
    for (let i = 0; i < this.fields.length; i++) {
      // Use default type if none set
      if (!this.fields[i].type) {
        this.fields[i].type = DEFAULT_CELL_TYPE;
      }
      if (!CELL_TYPES[this.fields[i].type]) {
        // tslint:disable-next-line: no-console
        console.warn(`Unrecognised field type: "${this.fields[i].type}"`);
        return false;
      }
    }
    if (!this.rows || !this.rows.length) {
      return false;
    }
    for (let i = 0; i < this.rows.length; i++) {
      if (this.rows[i].length !== this.fields.length) {
        // tslint:disable-next-line: no-console
        console.warn(
          `Unable to render ${
            this.heading && `"${this.heading}" `
          }table: row data length not equal to supplied fields.`
        );
        return false;
      }
    }
    return true;
  }

  checkForMobileTitle() {
    // Reset for new data
    this.mobileTitleIndex = -1;
    if (!this.fields) {
      return;
    }
    this.fields.every(({ mobileTitle }, i) => {
      if (mobileTitle) {
        this.mobileTitleIndex = i;
        return false;
      }
      return true;
    });
  }

  checkForSortableFields() {
    this.isSortable = false;
    if (!this.fields) {
      return;
    }
    this.fields.forEach(({ sortable }) => {
      if (sortable) {
        this.isSortable = true;
      }
    });
  }

  getCssClassMap() {
    return classNames(
      name,
      !this.isMobile && `${name}--desktop`,
      this.isMobile && `${name}--mobile`,
      this.shadeAlternate && `${name}--shade-alternate`,
      this.freezeHeader && `${name}--freeze-header`,
      this.hideBorder && `${name}--hide-border`,
      this.hideMenu && `${name}--hide-menu`
    );
  }

  polyfillMousePosition(e) {
    // For touch
    if (e.changedTouches && e.changedTouches.length) {
      e.x = e.changedTouches[0].pageX;
      e.y = e.changedTouches[0].pageY;
    }
    // For cross browser support
    if (e.x === undefined) {
      e.x = e.clientX;
      e.y = e.clientY;
    }
  }

  getDefaultLongestContent({ rows, columnIndex }) {
    let maxLength = 0;
    let longestContent;
    rows.forEach((row) => {
      const length = row[columnIndex].toString().length;
      if (length > maxLength) {
        longestContent = row[columnIndex];
        maxLength = length;
      }
    });
    return longestContent;
  }

  // Selection handlers
  toggleSelectAll() {
    if (!this.elToggleSelectAll) {
      return;
    }
    this.rows.forEach((row) => (row.selected = this.elToggleSelectAll.checked));
    this.updateReadableSelection();
    this.forceRender++;
  }

  toggleRowSelect({ target }, rowIndex) {
    this.rows[rowIndex].selected = target.checked;
    this.updateReadableSelection();
    this.forceRender++;
  }

  updateReadableSelection() {
    this.selection.length = 0;
    this.rows.forEach((row) => row.selected && this.selection.push(row));

    // Check header checkbox if any or none are selected
    const selectAll = this.hostElement.shadowRoot.querySelector(
      '.thead__cell--selection scale-checkbox'
    ) as HTMLInputElement;
    selectAll.checked = !!this.selection.length;
    // selectAll.indeterminate = !!this.selection.length;
  }

  // Sorting handlers
  toggleTableSorting(sortDirection, columnIndex, type) {
    // Remove sorting from previous column index
    if (
      this.activeSortingIndex > -1 &&
      this.activeSortingIndex !== columnIndex
    ) {
      this.fields[this.activeSortingIndex].sortDirection = 'none';
    }
    // Store new column index
    this.activeSortingIndex = columnIndex;

    const newSortDirection =
      sortDirection === 'none'
        ? 'ascending'
        : sortDirection === 'ascending'
        ? 'descending'
        : 'none';
    this.fields[columnIndex].sortDirection = newSortDirection;
    this.sortTable(newSortDirection, type, columnIndex);
  }

  sortTable(sortDirection, type, columnIndex) {
    if (sortDirection === 'none') {
      this.rows.sort((a, b) => {
        return a.initialIndex - b.initialIndex;
      });
    } else {
      switch (
        (CELL_TYPES[type] &&
          CELL_TYPES[type].defaults &&
          CELL_TYPES[type].defaults.sortBy) ||
        CELL_DEFAULTS.sortBy
      ) {
        case 'text':
          if (sortDirection === 'ascending') {
            this.rows.sort((a, b) => {
              const textA = a[columnIndex].toLowerCase();
              const textB = b[columnIndex].toLowerCase();
              return textA < textB ? -1 : textA > textB ? 1 : 0;
            });
          } else {
            this.rows.sort((a, b) => {
              const textA = a[columnIndex].toLowerCase();
              const textB = b[columnIndex].toLowerCase();
              return textA > textB ? -1 : textA < textB ? 1 : 0;
            });
          }
          break;
        case 'number':
          if (sortDirection === 'ascending') {
            this.rows.sort((a, b) => {
              return Number(a[columnIndex]) - Number(b[columnIndex]);
            });
          } else {
            this.rows.sort((a, b) => {
              return Number(b[columnIndex]) - Number(a[columnIndex]);
            });
          }
          break;
      }
    }
    this.forceRender++;
    // Trigger event
    this.triggerSortEvent(sortDirection, type, columnIndex);
  }

  resetSortingToggle() {
    if (this.activeSortingIndex > -1) {
      this.fields[this.activeSortingIndex].sortDirection = 'none';
    }
    this.activeSortingIndex = -1;
  }

  // Column resize handlers
  onDividerDown(e) {
    this.polyfillMousePosition(e);
    // For touch -  Prevent mousedown firing, and native scroll
    e.preventDefault();
    // Store divider elem for use in move and end events
    this.activeDivider = e.target;
    // Store initial value to calculate change
    e.target.downX = e.x;
    // Reset to avoid reapplying previous change
    this.activeDivider.interactiveWidth = 0;
    window.addEventListener('mousemove', this.onDividerMove);
    window.addEventListener('touchmove', this.onDividerMove);
    window.addEventListener('mouseup', this.onDividerUp);
    window.addEventListener('touchend', this.onDividerUp);
  }

  onDividerMove(e) {
    // TODO: calculate width stretchWidth to drop in correct location
    this.polyfillMousePosition(e);
    const { width, min, max } = this.activeDivider.dataset;
    const diff = e.x - this.activeDivider.downX;
    const newWidth = Math.min(
      Number(max),
      Math.max(Number(min), Number(width) + diff)
    );
    const adjustedDiff = newWidth - Number(width);
    this.activeDivider.interactiveWidth = newWidth;
    // Give immediate visual feedback
    this.activeDivider.style.transform = `translateX(${adjustedDiff}px)`;
  }

  onDividerUp() {
    const { index } = this.activeDivider.dataset;
    // Store new width on the field data
    if (this.activeDivider.interactiveWidth) {
      this.fields[Number(index)].width = this.activeDivider.interactiveWidth;
    }
    // Reset visual feedback
    this.activeDivider.style.transform = `translateX(0px)`;
    window.removeEventListener('mousemove', this.onDividerMove);
    window.removeEventListener('touchmove', this.onDividerMove);
    window.removeEventListener('mouseup', this.onDividerUp);
    window.removeEventListener('touchend', this.onDividerUp);
    // Update column stretching before rendering
    this.needsColumnResize = true;
    this.updateColumnStretching();
    // Render to apply change
    this.forceRender++;
  }

  // Column visibility toggle handlers
  toggleVisibilityMenu(e) {
    e.preventDefault();
    // TODO: replace this with contextual menu component, when available
    const visibilityToggle = this.hostElement.shadowRoot.querySelector(
      '.visibility-toggle'
    ) as HTMLElement;
    const menu = visibilityToggle.children[1] as HTMLElement;

    // By default
    if (visibilityToggle.style.display === 'none') {
      visibilityToggle.style.display = 'block';
      menu.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    } else {
      visibilityToggle.style.display = 'none';
    }
  }

  toggleColumnVisibility(value, columnIndex) {
    this.fields[columnIndex].visible = value;
    this.forceRender++;
    // Update column stretching
    this.needsColumnResize = true;
    this.updateColumnStretching();
  }

  // Resize handlers
  addResizeObserver() {
    if (!resizeObserver) {
      // @ts-ignore
      resizeObserver = new ResizeObserver((entries: any[]) => {
        for (const entry of entries) {
          // Skip if table not visible/attached
          if (entry.target.offsetParent === null) {
            return;
          }
          entry.target.applyResponsiveClasses(entry);
          entry.target.updateColumnStretching();
        }
      });
    }
    this.elMmainContainer = this.hostElement.shadowRoot.querySelector(
      `.${name}`
    );
    // Add this instance's callbacks, as resizeObserver is reused
    this.elMmainContainer.applyResponsiveClasses = this.applyResponsiveClasses;
    this.elMmainContainer.updateColumnStretching = this.updateColumnStretching;
    resizeObserver.observe(this.elMmainContainer);
  }

  removeResizeObserver() {
    if (this.elMmainContainer) {
      resizeObserver.unobserve(this.elMmainContainer);
    }
  }

  applyResponsiveClasses() {
    // Apply container-scoped media-query-style classes
    const newIsMobile = this.elMmainContainer.offsetWidth <= 500;
    if (this.isMobile !== newIsMobile) {
      this.forceRender++;
    }
    this.isMobile = newIsMobile;
  }

  updateColumnStretching() {
    // NOTE: any styling padding/margin width changes need to be adjusted here as well
    // Ignore auto-width-check content renders
    if (this.needsAutoWidthParse) {
      return;
    }
    const container = this.elMmainContainer;

    // Minus 2 for border
    const containerWidth = container.offsetWidth - 2;
    const hasContainerWidthChanged = this.lastContainerWidth !== containerWidth;
    // If width hasn't changed, don't re-calculate
    if (!hasContainerWidthChanged && !this.needsColumnResize) {
      return;
    }
    this.needsColumnResize = false;
    this.lastContainerWidth = containerWidth;

    // Don't calculate when mobile layout
    if (container.offsetWidth <= 500) {
      return;
    }

    // The theoretical target width - ignoring any previously applied stretching
    const targetContentWidth = (() => {
      let total = 0;
      // Extra margin on first column
      total += 8;
      if (this.numbered) {
        // 32 for padding+margin
        total += this.numberColumnWidth + 32;
        // this.selectionColumnWidth;
      }
      if (this.selectable) {
        // 32 for padding+margin
        total += this.selectionColumnWidth + 32;
        // If both selectable and numbered - adjust for reduced margin between
        if (this.numbered) {
          total -= 16;
        }
      }
      // Add each visible column's target width
      this.fields.forEach(({ visible = true, width }) => {
        if (visible) {
          // 32 for padding+margin
          total += width + 32;
        }
      });
      return total;
    })();

    // Update value passed to nested content to overcome table display layout
    this.contentWidth = Math.max(targetContentWidth, containerWidth);

    const diff = containerWidth - targetContentWidth;
    if (diff <= 0) {
      // content larger than container (scrollbar), remove all stretching
      this.fields.forEach((field) => (field.stretchWidth = 0));
    } else {
      // container larger than content (gap to the right), calculate stretching
      // If stretchWeight set, divide value between total to get final weight
      // If stretchWeight unset, share remainder of 1 (if any) between all unset cols
      let totalSetWeight = 0;
      let unsetColsCount = 0;
      this.fields.forEach(({ visible = true, stretchWeight }) => {
        // Disregard invisible columns
        if (!visible) {
          return;
        }
        if (typeof stretchWeight === 'number') {
          totalSetWeight += stretchWeight;
        } else {
          unsetColsCount++;
        }
      });
      const remainderWeight = Math.max(0, 1 - totalSetWeight);
      // Set total to be divided against to be above 1 to keep total set/unset weights equal to 1
      totalSetWeight = Math.max(1, totalSetWeight);
      this.fields.forEach((field) => {
        const { visible = true, stretchWeight } = field;
        if (!visible) {
          return;
        }
        // Actual stretch weight, out of a total 1 for all columns
        let weight = 0;
        if (typeof stretchWeight === 'number') {
          weight = stretchWeight / totalSetWeight;
        } else if (remainderWeight > 0) {
          weight = remainderWeight / unsetColsCount;
        }

        // Apply stretching with the weight percentage
        field.stretchWidth = diff * weight;
      });
    }

    this.forceRender++;
  }

  // Auto column width handlers
  calculateAutoWidths() {
    let isVisible = false;
    const columns = this.hostElement.shadowRoot.querySelectorAll(
      `.${name}__auto-width-check td`
    );
    columns.forEach((cell: HTMLElement) => {
      // Make sure table is actually rendered (eg not display:none etc)
      if (!isVisible && cell.offsetParent !== null) {
        isVisible = true;
      }
      if (!isVisible) {
        return;
      }
      // Update field width with that of largest content
      this.fields[cell.dataset.columnindex].width = cell.clientWidth;
    });

    if (!isVisible) {
      return;
    }

    // Re-render now that widths are updated
    if (TEST_AUTO_WIDTH_RENDER) {
      return;
    }
    // Wrap in setTimeout to avoid warning about forcing render within render callback
    setTimeout(() => {
      this.needsAutoWidthParse = false;
      this.forceRender++;
    });
  }

  // Event triggers
  triggerSortEvent(sortDirection, type, columnIndex) {
    const data = {
      rows: this.rows,
      type,
      sortDirection,
      columnIndex,
    } as DataGridSortedEventDetail;
    emitEvent(this, 'scaleSort', data);
  }

  triggerEditEvent(value, rowIndex, columnIndex) {
    const data = {
      rows: this.rows,
      rowIndex,
      columnIndex,
      value,
    } as DataGridEditEventDetail;
    emitEvent(this, 'scaleEdit', data);

    // Force render for checkboxes
    this.forceRender++;
  }

  onTableScroll() {
    if (!this.freezeHeader || this.hideHeader) {
      return;
    }
    // Freeze header
    const scrollY = this.elScrollContainer.scrollTop;
    this.elTableHead.style.transform = `translateY(${scrollY}px)`;
  }

  handleMenuListClick = (event) => {
    const menuItems = ['sortBy', 'toggleVisibility'];
    const currentMenuItemsIndex = menuItems.indexOf(event.target.id);
    if (currentMenuItemsIndex > -1) {
      // check if there is already opened flyout menu list with different id, if opened, close it
      const inactiveMenuItem = this.hostElement.shadowRoot.querySelector(
        `#${menuItems[1 - currentMenuItemsIndex]}List`
      ) as HTMLUListElement;
      if (inactiveMenuItem) {
        inactiveMenuItem.setAttribute('opened', 'false');
      }
    }
  };

  renderSettingsMenu() {
    return (
      <scale-menu-flyout class={`${name}__settings-menu`}>
        <scale-button
          slot="trigger"
          variant="secondary"
          icon-only
          data-sortable={this.isSortable}
        >
          <scale-icon-service-settings accessibilityTitle="Table options"></scale-icon-service-settings>
        </scale-button>
        <scale-menu-flyout-list>
          {this.isSortable && (
            <scale-menu-flyout-item
              id="sortBy"
              onClick={this.handleMenuListClick}
            >
              <scale-icon-action-sort slot="prefix"></scale-icon-action-sort>
              Sort By
              <scale-menu-flyout-list slot="sublist" id="sortByList">
                {this.fields.map(
                  (
                    { label, type, sortable, sortDirection = 'none' },
                    columnIndex
                  ) => {
                    if (!sortable) {
                      return '';
                    }
                    return (
                      <scale-menu-flyout-item
                        onScale-select={() =>
                          this.toggleTableSorting(
                            sortDirection,
                            columnIndex,
                            type
                          )
                        }
                      >
                        {sortDirection === 'ascending' && (
                          <scale-icon-navigation-collapse-up
                            size={16}
                            slot="prefix"
                          ></scale-icon-navigation-collapse-up>
                        )}
                        {sortDirection === 'descending' && (
                          <scale-icon-navigation-collapse-down
                            size={16}
                            slot="prefix"
                          ></scale-icon-navigation-collapse-down>
                        )}
                        {sortDirection === 'none' && (
                          <scale-icon-navigation-collapse-up
                            size={16}
                            slot="prefix"
                            style={{ opacity: '0' }}
                          ></scale-icon-navigation-collapse-up>
                        )}
                        {label || type}
                      </scale-menu-flyout-item>
                    );
                  }
                )}
              </scale-menu-flyout-list>
            </scale-menu-flyout-item>
          )}
          <scale-menu-flyout-item
            id="toggleVisibility"
            onClick={this.handleMenuListClick}
          >
            <scale-icon-action-hide-password slot="prefix"></scale-icon-action-hide-password>
            Toggle Visibility
            <scale-menu-flyout-list
              slot="sublist"
              close-on-select="false"
              id="toggleVisibilityList"
            >
              {this.fields.map(
                (
                  {
                    label,
                    type,
                    visible = CELL_TYPES[type].defaults.visible !== undefined
                      ? CELL_TYPES[type].defaults.visible
                      : CELL_DEFAULTS.visible,
                  },
                  columnIndex
                ) => {
                  return (
                    <scale-menu-flyout-item
                      checkable="checkbox"
                      checked={!!visible}
                      onScale-select={() =>
                        this.toggleColumnVisibility(!visible, columnIndex)
                      }
                    >
                      {label || type}
                    </scale-menu-flyout-item>
                  );
                }
              )}
            </scale-menu-flyout-list>
          </scale-menu-flyout-item>
          {this.selectable && (
            <scale-menu-flyout-item
              onScale-select={() => {
                this.elToggleSelectAll.checked =
                  !this.elToggleSelectAll.checked;
                this.toggleSelectAll();
              }}
            >
              <scale-icon
                slot="prefix"
                path="M20.9328 10.6668C20.5132 10.6668 20.1731 11.0069 20.1731 11.4265V20.3269H1.5194V1.67309H16.5049C16.9245 1.67309 17.2646 1.33292 17.2646 0.913386C17.2646 0.49385 16.9245 0.153687 16.5049 0.153687H0.759699C0.340163 0.153687 0 0.49385 0 0.913386V21.0866C0 21.5062 0.340163 21.8463 0.759699 21.8463H20.9328C21.3523 21.8463 21.6925 21.5062 21.6925 21.0866V11.4265C21.6925 11.0069 21.3524 10.6668 20.9328 10.6668ZM23.7774 0.653387C23.4807 0.356739 22.9997 0.356739 22.703 0.653387L10.3293 13.0272L7.25501 9.9529C6.9583 9.65625 6.47732 9.65625 6.18061 9.9529C5.88396 10.2496 5.88396 10.7306 6.18061 11.0273L9.7921 14.6388C9.94045 14.7871 10.1349 14.8613 10.3293 14.8613C10.5237 14.8613 10.7181 14.7871 10.8665 14.6388L23.7774 1.72778C24.0741 1.43108 24.0741 0.950095 23.7774 0.653387Z"
              ></scale-icon>
              Select / Deselect All
            </scale-menu-flyout-item>
          )}
          <slot name="menu"></slot>
        </scale-menu-flyout-list>
      </scale-menu-flyout>
    );
  }

  renderTable() {
    if (this.needsAutoWidthParse) {
      return this.renderAutoWidthCheck();
    }
    return (
      <div
        ref={(el) => (this.elScrollContainer = el)}
        class={`${name}__scroll-container`}
        style={{ height: this.height || 'auto' }}
        onScroll={() => this.onTableScroll()}
      >
        <table class={`${name}__table`}>
          {this.renderTableHead()}
          {this.renderTableBody()}
        </table>
      </div>
    );
  }

  renderAutoWidthCheck() {
    // Calculate number column width
    this.numberColumnWidth = this.rows.length.toString().length * 9;

    // Get columns with width option set to 'auto'
    const autoCols = [];
    this.fields.forEach(
      (
        {
          type,
          width = CELL_TYPES[type].defaults.width || CELL_DEFAULTS.width,
        },
        columnIndex
      ) => {
        if (width === 'auto') {
          autoCols.push(columnIndex);
        }
      }
    );
    if (!autoCols.length) {
      this.needsAutoWidthParse = false;
      return this.renderTable();
    }
    return (
      <table class={`${name}__auto-width-check ${name}__table`}>
        <tr class={`tbody__row`}>
          {autoCols.map((columnIndex) => {
            const field = this.fields[columnIndex];
            const { type, cell = CELL_TYPES[type] } = field;
            // Find largest content of each type. Use custom getter if exists
            const getLongestContent =
              cell.getLongestContent || this.getDefaultLongestContent;
            const content = getLongestContent({
              rows: this.rows,
              columnIndex,
              field,
            });
            return (
              <td
                class={`tbody__cell`}
                style={{ width: 'auto' }}
                data-columnindex={columnIndex}
              >
                {cell.render({
                  field,
                  content,
                  component: this,
                  isAutoWidthCheck: true,
                })}
              </td>
            );
          })}
        </tr>
      </table>
    );
  }

  renderTableHead() {
    return (
      <thead
        ref={(el) => (this.elTableHead = el)}
        class={`thead ${this.hideHeader ? 'sr-only' : ''}`}
      >
        <tr class={`thead__row`}>
          {this.numbered && this.renderTableHeadNumberedCell()}
          {this.selectable && this.renderTableHeadSelectableCell()}
          {this.fields.map(
            (
              {
                type,
                label = '',

                // Params can be set optionally in the fields options, in the cell type
                // descriptor class, or falls back to common defaults
                visible = CELL_TYPES[type].defaults.visible !== undefined
                  ? CELL_TYPES[type].defaults.visible
                  : CELL_DEFAULTS.visible,
                sortable,
                sortDirection = 'none',
                resizable = CELL_TYPES[type].defaults.resizable !== undefined
                  ? CELL_TYPES[type].defaults.resizable
                  : CELL_DEFAULTS.resizable,
                width = CELL_TYPES[type].defaults.width || CELL_DEFAULTS.width,
                minWidth = CELL_TYPES[type].defaults.minWidth ||
                  CELL_DEFAULTS.minWidth,
                maxWidth = CELL_TYPES[type].defaults.maxWidth ||
                  CELL_DEFAULTS.maxWidth,
                textAlign = CELL_TYPES[type].defaults.textAlign ||
                  CELL_DEFAULTS.textAlign,
                stretchWidth = 0,
              },
              columnIndex
            ) => {
              if (!visible) {
                return;
              }
              const props: any = {
                class: `thead__cell`,
                style: {
                  width: `calc(${width}px + ${stretchWidth}px)`,
                  'justify-content': textAlign,
                },
                'data-type': type,
              };
              if (sortable) {
                props['aria-sort'] = sortDirection;
              }
              return (
                <th
                  title="Activate to sort column"
                  {...props}
                  {...(sortable
                    ? {
                        onKeyDown: (event: KeyboardEvent) => {
                          if (['Enter', ' '].includes(event.key)) {
                            this.toggleTableSorting(
                              sortDirection,
                              columnIndex,
                              type
                            );
                          }
                        },
                        onClick: () => {
                          this.toggleTableSorting(
                            sortDirection,
                            columnIndex,
                            type
                          );
                        },
                        tabindex: 0,
                        class: `${props.class} thead-sortable`,
                      }
                    : {})}
                >
                  <div class={`thead__title`}>
                    <span class={`thead__text`}>
                      {sortable && <span class={`thead__arrow-top`}></span>}
                      {sortable && <span class={`thead__arrow-bottom`}></span>}
                      {label}
                    </span>
                  </div>

                  {resizable && (
                    <div
                      class={`thead__divider`}
                      data-index={columnIndex}
                      data-width={width}
                      data-min={minWidth}
                      data-max={maxWidth}
                      onMouseDown={(e) => this.onDividerDown(e)}
                      onTouchStart={(e) => this.onDividerDown(e)}
                      aria-hidden="true"
                    >
                      <div class={`thead__divider-line`}></div>
                    </div>
                  )}
                </th>
              );
            }
          )}
        </tr>
      </thead>
    );
  }

  renderTableHeadNumberedCell() {
    return (
      <th
        class={`thead__cell  thead__cell--numbered`}
        style={{ width: this.numberColumnWidth + 'px' }}
      >
        <span class="scl-body">#</span>
      </th>
    );
  }

  renderTableHeadSelectableCell() {
    const style = {
      width: this.selectionColumnWidth + 'px',
    } as any;
    // Make selection and numbered cells closer than regular padding
    if (this.numbered) {
      style.paddingLeft = '0px';
    }
    return (
      <th
        class={`thead__cell thead__cell--selection`}
        style={style}
        title="Select"
      >
        <scale-checkbox
          ref={(el) => (this.elToggleSelectAll = el)}
          onScaleChange={() => this.toggleSelectAll()}
          hideLabel={true}
          aria-label="Select"
        ></scale-checkbox>
      </th>
    );
  }

  renderTableBody() {
    return (
      <tbody class={`tbody`}>
        {(() => {
          const rows = [];
          // Pagination functionality
          const total = this.rows.length;
          const start = this.paginationStart;
          const end = Math.min(total, this.paginationStart + this.pageSize);
          for (let rowIndex = start; rowIndex < end; rowIndex++) {
            const rowData = this.rows[rowIndex];
            const rowNestedContent = [];
            let isNestedExpanded = false;
            rows.push(
              <tr class={`tbody__row`}>
                {this.renderMobileTitle(rowData)}
                {this.numbered && this.renderTableBodyNumberedCell(rowIndex)}
                {this.selectable &&
                  this.renderTableBodySelectableCell(rowIndex)}
                {rowData.map((cellContent, columnIndex) => {
                  const field = this.fields[columnIndex];
                  const visible =
                    field.visible !== undefined
                      ? field.visible
                      : CELL_TYPES[field.type].defaults.visible !== undefined
                      ? CELL_TYPES[field.type].defaults.visible
                      : CELL_DEFAULTS.visible;
                  if (!visible) {
                    return;
                  }
                  // Add rows nested tables to array
                  if (field.type === 'html') {
                    if (!!cellContent.isExpanded) {
                      isNestedExpanded = true;
                    }
                    rowNestedContent.push({
                      content: cellContent,
                    });
                  }
                  return this.renderTableCell(
                    field,
                    cellContent,
                    rowIndex,
                    columnIndex
                  );
                })}
              </tr>
            );

            // Add second row for nested content if any within the row are expanded
            if (rowNestedContent.length) {
              rows.push(
                <div
                  class={`tbody__nested`}
                  style={{
                    width: this.contentWidth + 'px',
                    display: isNestedExpanded ? 'block' : 'none',
                  }}
                >
                  <td class={`tbody__nested-cell`}>
                    {rowNestedContent.map(({ content }) => {
                      return (
                        <div
                          ref={(el) => {
                            if (el) {
                              // Remove content from other pages
                              let child = el.lastElementChild;
                              while (child) {
                                el.removeChild(child);
                                child = el.lastElementChild;
                              }
                              // Append actual content
                              el.appendChild(content);
                            }
                          }}
                        ></div>
                      );
                    })}
                  </td>
                </div>
              );
            }
          }
          return rows;
        })()}
      </tbody>
    );
  }

  renderMobileTitle(rowData) {
    if (this.mobileTitleIndex === -1) {
      return <h5 class={`tbody__mobile-title scl-h5`}>&nbsp;</h5>;
    }
    return (
      <h5 class={`tbody__mobile-title scl-h5`}>
        {rowData[this.mobileTitleIndex]}
      </h5>
    );
  }

  renderTableBodyNumberedCell(rowIndex) {
    return (
      <td
        class={`tbody__cell tbody__cell--numbered`}
        style={{ width: this.numberColumnWidth + 'px' }}
      >
        <p class="scl-body">{rowIndex + 1}</p>
      </td>
    );
  }

  renderTableBodySelectableCell(rowIndex) {
    const style = {
      width: this.selectionColumnWidth + 'px',
    } as any;
    if (this.numbered) {
      style.marginLeft = '0px';
      style.paddingLeft = '0px';
    }
    return (
      <td
        title={this.rows[rowIndex][0]}
        class={`tbody__cell tbody__cell--selection`}
        style={style}
      >
        <scale-checkbox
          checked={this.rows[rowIndex].selected}
          onScaleChange={(e) => this.toggleRowSelect(e, rowIndex)}
          hideLabel={true}
        ></scale-checkbox>
      </td>
    );
  }

  renderTableCell(field, content, rowIndex, columnIndex) {
    const cell = CELL_TYPES[field.type];
    const {
      label,
      // Use custom field, or default defined in class, or fallback default
      width = cell.defaults.width || CELL_DEFAULTS.width,
      stretchWidth = 0,
      mobileTitle, // For text cells
    } = field;

    return (
      <td
        class={`tbody__cell${
          mobileTitle ? ` tbody__cell--used-as-mobile-title` : ``
        }`}
        style={{ width: `calc(${width}px + ${stretchWidth}px)` }}
      >
        <div class={`tbody__mobile-label`}>{label}</div>
        {cell.render({
          field,
          content,
          component: this,
          rowIndex,
          columnIndex,
        })}
      </td>
    );
  }

  renderTableInfo() {
    return (
      <div class={`info`}>
        {this.selectable && !!this.selection.length && (
          <div class={`info__selection`}>
            {`${this.selection.length} row${
              this.selection.length > 1 ? 's' : ''
            } selected`}
          </div>
        )}
        {this.isPagination && (
          <scale-pagination
            class={`info__pagination`}
            hideBorder={!this.isMobile}
            startElement={this.paginationStart}
            totalElements={this.rows.length}
            pageSize={this.pageSize}
            onScalePagination={({ detail }) =>
              (this.paginationStart = detail.startElement)
            }
          ></scale-pagination>
        )}
      </div>
    );
  }

  /* 10. Render */
  render() {
    if (this.dataNeedsCheck) {
      this.hasData = this.checkHasData();
    }
    return (
      <Host
        style={{
          display: this.visible ? 'block' : 'none',
        }}
      >
        {this.styles && <style>{this.styles}</style>}
        <div class={this.getCssClassMap()}>
          <div class={`${name}__title-block`}>
            {/* h4 tag + h5 styles feels weird, ideally one should be able to set the tag with an attribute */}
            {this.heading && (
              <h4 class={`${name}__heading scl-h5`}>{this.heading}</h4>
            )}
            <div>
              <slot />
            </div>
            {this.hasData && this.renderSettingsMenu()}
          </div>
          {this.hasData && this.renderTable()}
          {this.hasData &&
            !this.hideInfo &&
            !this.needsAutoWidthParse &&
            (this.selectable || this.isPagination) &&
            this.renderTableInfo()}
        </div>
      </Host>
    );
  }
}
