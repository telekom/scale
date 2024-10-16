import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Watch,
  Event,
  EventEmitter,
  VNode,
} from '@stencil/core';
import classNames from 'classnames';
import statusNote from '../../utils/status-note';
import { computePosition } from '@floating-ui/dom';
import { emitEvent, generateUniqueId } from '../../utils/utils';

enum Actions {
  Close = 'Close',
  CloseSelect = 'CloseSelect',
  First = 'First',
  Last = 'Last',
  Next = 'Next',
  Open = 'Open',
  PageDown = 'PageDown',
  PageUp = 'PageUp',
  Previous = 'Previous',
  Select = 'Select',
  Type = 'Type',
}

const DEFAULT_ICON_SIZE = 20;

interface SelectOption {
  label: string;
  value: any;
  disabled: boolean;
  ItemElement: VNode;
}

const isElementValue = (x: unknown): x is Element & { value: string } =>
  typeof (x as { value: unknown }).value === 'string';
const readValue = (element: Element) =>
  isElementValue(element) ? element.value : null;

const isElementDisabled = (x: unknown): x is Element & { disable: boolean } => {
  return typeof (x as { disable: unknown }).disable === 'boolean';
};
const readDisabled = (element: Element) => {
  const attr = element.getAttribute('disabled');
  return (
    (attr !== null && `${attr}` !== 'false') ||
    (isElementDisabled(element) ? element.disable : false)
  );
};

const readOptions = (hostElement: HTMLElement): SelectOption[] => {
  const children = Array.from(hostElement.children);
  const options = children.filter(
    (x: HTMLElement) => x.tagName !== 'INPUT' && x.hidden === false
  );
  return options.map((x) => ({
    label: x.textContent.trim(),
    value: x.getAttribute('value') ?? readValue(x),
    disabled: readDisabled(x),
    ItemElement: <span innerHTML={x.outerHTML}></span>,
  }));
};

function getActionFromKey(event: KeyboardEvent, open: boolean) {
  const { key, altKey, ctrlKey, metaKey } = event;

  if (!open && ['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(key)) {
    return Actions['Open'];
  }

  if (key === 'Home') {
    return Actions['First'];
  }

  if (key === 'End') {
    return Actions['Last'];
  }

  if (
    ['Backspace', 'Clear'].includes(key) ||
    (key.length === 1 && key !== ' ' && !altKey && !ctrlKey && !metaKey)
  ) {
    return Actions['Type'];
  }

  if (!open) {
    return;
  }

  if (key === 'ArrowUp' && altKey) {
    return Actions['CloseSelect'];
  }
  if (key === 'ArrowDown' && !altKey) {
    return Actions['Next'];
  }

  switch (key) {
    case 'ArrowUp':
      return Actions['Previous'];
    case 'PageUp':
      return Actions['PageUp'];
    case 'PageDown':
      return Actions['PageDown'];
    case 'Escape':
      return Actions['Close'];
    case 'Enter':
      return Actions['CloseSelect'];
    case ' ':
      return Actions['CloseSelect'];
  }
}

function jumpToIndex(from: number, action: Actions, options: SelectOption[]) {
  const JUMP_SIZE = 10;
  const findNearestEnabled = (current: number, step: number) => {
    let nextIndex: number = current;
    let nextOption: SelectOption;

    do {
      nextIndex += step;
      nextOption = options[nextIndex];
      if (nextOption === undefined) {
        break;
      }
    } while (nextOption?.disabled);

    return nextOption ? nextIndex : current;
  };

  let nearest: number;
  switch (action) {
    case Actions['First']:
      return options[0]?.disabled ? findNearestEnabled(-1, 1) : 0;
    case Actions['Last']:
      nearest = findNearestEnabled(options.length, -1);
      return nearest === options.length ? -1 : nearest; // rare case when all options are disabled
    case Actions['Previous']:
      nearest = findNearestEnabled(from, from === -1 ? 1 : -1);
      return nearest === options.length ? -1 : nearest; // rare case when all options are disabled
    case Actions['Next']:
      return findNearestEnabled(from, 1);
    case Actions['PageUp']:
      const lowerBound = Math.max(from - JUMP_SIZE, -1);
      return findNearestEnabled(lowerBound, 1);
    case Actions['PageDown']:
      const upperBound = Math.min(from + JUMP_SIZE, options.length);
      nearest = findNearestEnabled(upperBound, -1);
      return nearest === options.length ? -1 : nearest; // rare case when all options are disabled
    default:
      return from;
  }
}

function matchEnabledOptions(options: SelectOption[] = [], filter: string) {
  return options.filter(
    (option) =>
      !option.disabled &&
      option.label.toLowerCase().indexOf(filter.toLowerCase()) === 0
  );
}

function getIndexByChar(
  values: SelectOption[],
  filter: string,
  startIndex = 0
) {
  const sortedOptions = [
    ...values.slice(startIndex),
    ...values.slice(0, startIndex),
  ];
  const firstHit = matchEnabledOptions(sortedOptions, filter)[0];
  const allMatchingChars = (array) => array.every((char) => char === array[0]);

  if (firstHit) {
    return values.indexOf(firstHit);
  }

  if (allMatchingChars(filter.split(''))) {
    const hits = matchEnabledOptions(sortedOptions, filter[0]);
    return values.indexOf(hits[0]);
  }

  return -1;
}

function keepInView(activeElement: HTMLElement, scrollParent: HTMLElement) {
  const { offsetHeight, offsetTop } = activeElement;
  const { offsetHeight: parentOffsetHeight, scrollTop } = scrollParent;

  const isAboveParent = offsetTop < scrollTop;
  const isBelowParent =
    offsetTop + offsetHeight > scrollTop + parentOffsetHeight;

  if (isBelowParent) {
    return (scrollParent.scrollTop =
      offsetTop + offsetHeight - parentOffsetHeight);
  }

  if (isAboveParent) {
    return (scrollParent.scrollTop = offsetTop);
  }
}

function hasOverflow(element: HTMLElement) {
  return element && element.clientHeight < element.scrollHeight;
}

function isInView(element: HTMLElement) {
  const rect = element.getBoundingClientRect();
  const parentRect = {
    top: 0,
    left: 0,
    right: window.innerWidth || document.documentElement.clientWidth,
    bottom: window.innerHeight || document.documentElement.clientHeight,
  };

  return (
    rect.top >= parentRect.top &&
    rect.left >= parentRect.left &&
    rect.bottom <= parentRect.bottom &&
    rect.right <= parentRect.right
  );
}

let activeDropdown = null;

@Component({
  tag: 'scale-dropdown-select',
  styleUrl: 'dropdown-select.css',
  shadow: true,
})
export class DropdownSelect {
  @Element() hostElement: HTMLElement;

  @Prop() comboboxId?: string = 'combobox';
  @Prop() label: string;
  @Prop() name?: string;
  @Prop() helperText?: string = '';
  @Prop() disabled?: boolean;
  @Prop() readonly?: boolean;
  @Prop() transparent?: boolean;
  @Prop() invalid?: boolean = false;
  @Prop() variant?: 'informational' | 'warning' | 'danger' | 'success' =
    'informational';
  @Prop({ mutable: true, reflect: true }) value: any;
  /** @see {@url https://floating-ui.com/docs/computePosition#strategy} */
  @Prop() floatingStrategy: 'absolute' | 'fixed' = 'absolute';
  /** (optional) to hide the label */
  @Prop() hideLabelVisually?: boolean = false;
  /** (optional) Screen reader text appended to the selected element */
  @Prop() ariaLabelSelected?: string = 'selected';
  /** (optional) Text displayed in high contrast mode only to indicate disabled state */
  @Prop() hcmLabelDisabled?: string = 'this field is disabled';
  /** (optional) id or space separated list of ids of elements that provide or link to additional related information. */
  @Prop() ariaDetailsId?: string;

  @Event({ eventName: 'scale-change' }) scaleChange!: EventEmitter<void>;
  @Event({ eventName: 'scale-focus' }) scaleFocus!: EventEmitter<void>;
  @Event({ eventName: 'scale-blur' }) scaleBlur!: EventEmitter<void>;
  @Event({ eventName: 'scale-keydown' }) scaleKeydown!: EventEmitter<void>;
  @State() options?: string | Array<{ label: string; value: any }> = '';
  @State() open: boolean = false;
  @State() currentIndex: number = -1;
  @State() queryString: string = '';
  @State() queryTimeout: any = null;
  @State() hasFocus: boolean = false;

  private comboEl: HTMLElement;
  private scrollContainer: HTMLElement;
  private listboxPadEl: HTMLElement;
  private hiddenInput: HTMLInputElement;

  @Watch('value')
  valueChange(newValue) {
    this.currentIndex = readOptions(this.hostElement).findIndex(
      ({ value }) => value === newValue
    );
    this.updateInputHidden(newValue);
  }

  connectedCallback() {
    statusNote({ source: this.hostElement, tag: 'beta' });
    this.currentIndex =
      readOptions(this.hostElement).findIndex(
        ({ value }) => value === this.value
      ) || -1;
  }

  componentDidRender() {
    if (!this.open) {
      return;
    }
    if (this.floatingStrategy === 'fixed') {
      this.listboxPadEl.style.width = `${
        this.comboEl.getBoundingClientRect().width
      }px`;
    }
    computePosition(this.comboEl, this.listboxPadEl, {
      placement: 'bottom',
      strategy: this.floatingStrategy,
    }).then(({ x, y }) => {
      Object.assign(this.listboxPadEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  // this workaround is needed to make the component work with form
  // https://github.com/ionic-team/stencil/issues/2284
  componentDidLoad() {
    this.appendInputHidden();
  }

  appendInputHidden(): void {
    const input = document.createElement('input');
    input.name = this.name;
    input.id = this.name;
    input.value = this.value;
    input.type = 'hidden';
    this.hostElement.appendChild(input);
    this.hiddenInput = input;
  }

  updateInputHidden(value: string = this.value): void {
    this.hiddenInput.value = value;
  }

  selectOption = (index) => {
    this.currentIndex = index;
    this.value = readOptions(this.hostElement)[index].value;
    emitEvent(this, 'scaleChange', { value: this.value });
  };

  handleOptionChange(index) {
    this.currentIndex = index;

    if (index > -1) {
      this.bringIntoView(index);
    }
  }

  bringIntoView(index) {
    const options: NodeListOf<HTMLElement> =
      this.scrollContainer.querySelectorAll('[role=option]');

    if (hasOverflow(this.scrollContainer)) {
      keepInView(options[index], this.scrollContainer);
    }

    if (!isInView(options[index])) {
      options[index].scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  setOpen(open) {
    if (this.open === open) {
      return;
    }

    if (this.disabled) {
      return;
    }
    this.open = open;

    if (!this.open) {
      this.comboEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      this.comboEl.focus();
      this.currentIndex = -1;
    }
  }

  handleOptionClick(event, index) {
    event.stopPropagation();
    if (readOptions(this.hostElement)[index].disabled) {
      return;
    }

    this.handleOptionChange(index);
    this.selectOption(index);
    this.setOpen(false);
  }

  getSearchString(char) {
    if (typeof this.queryTimeout === 'number') {
      window.clearTimeout(this.queryTimeout);
    }

    this.queryTimeout = window.setTimeout(() => {
      this.queryString = '';
    }, 500);

    this.queryString += char;
    return this.queryString;
  }

  buildQueryString(char) {
    this.setOpen(true);

    const queryString = this.getSearchString(char);
    const queryIndex = getIndexByChar(
      readOptions(this.hostElement),
      queryString,
      this.currentIndex + 1
    );

    if (queryIndex >= 0) {
      this.handleOptionChange(queryIndex);
    } else {
      window.clearTimeout(this.queryTimeout);
      this.queryString = '';
    }
  }

  handleKeyDown = (event) => {
    const { key } = event;
    const options = readOptions(this.hostElement);
    const action = getActionFromKey(event, this.open);
    emitEvent(this, 'scaleKeydown', event);

    switch (action) {
      case Actions['Last']:
      case Actions['First']:
        this.setOpen(true);
      case Actions['Next']:
      case Actions['Previous']:
      case Actions['PageUp']:
      case Actions['PageDown']:
        event.preventDefault();
        return this.handleOptionChange(
          jumpToIndex(this.currentIndex, action, options)
        );
      case Actions['CloseSelect']:
        event.preventDefault();
        if (options[this.currentIndex]?.disabled) {
          return;
        }
        if (this.currentIndex !== -1) {
          this.selectOption(this.currentIndex);
        }
      case Actions['Close']:
        event.preventDefault();
        return this.setOpen(false);
      case Actions['Type']:
        return this.buildQueryString(key);
      case Actions['Open']:
        event.preventDefault();
        return this.setOpen(true);
    }
  };

  handleBlur = () => {
    this.setOpen(false);
    emitEvent(this, 'scaleBlur');
  };

  handleFocus = () => {
    emitEvent(this, 'scaleFocus');
  };

  handleClick = () => {
    // * This is a fix to prevent the dropdown from being opened when the user clicks on another combobox.
    // ! https://github.com/telekom/scale/issues/2285
    if (activeDropdown && activeDropdown !== this) {
      activeDropdown.setOpen(false);
    }

    this.setOpen(!this.open);
    activeDropdown = this;

    const indexOfValue = readOptions(this.hostElement).findIndex(
      ({ value }) => value === this.value
    );
    if (indexOfValue > -1) {
      setTimeout(() => {
        this.bringIntoView(indexOfValue);
      });
    }
  };

  render() {
    const element =
      readOptions(this.hostElement).find(({ value }) => value === this.value) ??
      ({} as any);

    const ValueElement = element.ItemElement;
    const hasEmptyValueElement = element.value === '';
    const helperTextId = `helper-message-${generateUniqueId()}`;
    const describedBy = this.helperText ? helperTextId : this.ariaDetailsId;
    const ariaDescribedByAttr = { 'aria-describedBy': describedBy };

    return (
      <Host>
        <div part={this.getBasePartMap()}>
          <div part="combobox-container">
            <label id={`${this.comboboxId}-label`} part="label">
              {this.label}
            </label>
            <div
              ref={(el) => (this.comboEl = el)}
              aria-controls={`${this.comboboxId}-listbox`}
              aria-expanded={this.open ? 'true' : 'false'}
              aria-haspopup="listbox"
              aria-labelledby={`${this.comboboxId}-label`}
              id={this.comboboxId}
              part="combobox"
              role="combobox"
              tabindex={this.disabled ? '-1' : '0'}
              onBlur={this.handleBlur}
              onFocus={this.handleFocus}
              onClick={this.handleClick}
              onKeyDown={this.handleKeyDown}
              {...(this.open
                ? {
                    'aria-activedescendant': (
                      readOptions(this.hostElement)[this.currentIndex] ||
                      ({} as any)
                    ).value,
                  }
                : {})}
              {...(this.helperText ? ariaDescribedByAttr : {})}
              {...(this.invalid ? { 'aria-invalid': 'true' } : {})}
            >
              <span part="combobox-value">
                {hasEmptyValueElement ? '' : ValueElement}
              </span>
            </div>
            <div part="listbox-pad" ref={(el) => (this.listboxPadEl = el)}>
              <div
                ref={(el) => (this.scrollContainer = el)}
                part="listbox-scroll-container"
                onMouseDown={(e) => {
                  e.preventDefault();
                }}
              >
                <div
                  part="listbox"
                  role="listbox"
                  id={`${this.comboboxId}-listbox`}
                  aria-labelledby={`${this.comboboxId}-label`}
                  tabindex="-1"
                >
                  {readOptions(this.hostElement).map(
                    ({ value, disabled, ItemElement }, index) => (
                      <div
                        role="option"
                        part={this.getOptionPartMap(index, disabled)}
                        id={value}
                        onClick={(event) => {
                          this.handleOptionClick(event, index);
                        }}
                        {...(value === this.value
                          ? { 'aria-selected': 'true' }
                          : {})}
                        {...(disabled ? { 'aria-disabled': 'true' } : {})}
                      >
                        {ItemElement}
                        {value === this.value ? (
                          <div>
                            <scale-icon-action-checkmark
                              size={16}
                            ></scale-icon-action-checkmark>
                            <span class="sr-only">
                              {this.ariaLabelSelected}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            <div part="icon">
              {this.open ? (
                <scale-icon-navigation-collapse-up
                  decorative
                  size={DEFAULT_ICON_SIZE}
                />
              ) : (
                <scale-icon-navigation-collapse-down
                  decorative
                  size={DEFAULT_ICON_SIZE}
                />
              )}
            </div>
          </div>

          {this.helperText && (
            <scale-helper-text
              helperText={this.helperText}
              variant={this.invalid ? 'danger' : this.variant}
              id={helperTextId}
            ></scale-helper-text>
          )}

          {this.disabled && (
            <div class="hcm-disabled">{this.hcmLabelDisabled}</div>
          )}
        </div>
      </Host>
    );
  }

  getBasePartMap() {
    const animated = this.value != null && this.value !== '';

    return classNames(
      'select',
      this.open && `open`,
      this.disabled && `disabled`,
      this.readonly && `readonly`,
      this.transparent && 'transparent',
      this.invalid && `invalid`,
      this.currentIndex > -1 && `steal-focus`,
      animated && 'animated',
      this.helperText && 'has-helper-text',
      this.floatingStrategy && `strategy-${this.floatingStrategy}`,
      this.hideLabelVisually && 'hide-label'
    );
  }

  getOptionPartMap(index: number, disabled: boolean) {
    return classNames(
      'option',
      index === this.currentIndex && `current`,
      disabled && `disabled`
    );
  }
}
