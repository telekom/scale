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
import { emitEvent } from '../../utils/utils';

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

const readOptions = (
  hostElement: HTMLElement
): Array<{ label: string; value: any; ItemElement: VNode }> => {
  return Array.from(hostElement.children).map((x) => ({
    label: x.textContent.trim(),
    value: x.getAttribute('value'),
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

function jumpToIndex(currentIndex: number, maxIndex: number, action: Actions) {
  const JUMP_SIZE = 10;

  switch (action) {
    case Actions['First']:
      return 0;
    case Actions['Last']:
      return maxIndex;
    case Actions['Previous']:
      return Math.max(0, currentIndex - 1);
    case Actions['Next']:
      return Math.min(maxIndex, currentIndex + 1);
    case Actions['PageUp']:
      return Math.max(0, currentIndex - JUMP_SIZE);
    case Actions['PageDown']:
      return Math.min(maxIndex, currentIndex + JUMP_SIZE);
    default:
      return currentIndex;
  }
}

function matchOptions(options: string[] = [], filter: string) {
  return options.filter(
    (option) => option.toLowerCase().indexOf(filter.toLowerCase()) === 0
  );
}

function getIndexByChar(values: string[], filter: string, startIndex = 0) {
  const sortedValues = [
    ...values.slice(startIndex),
    ...values.slice(0, startIndex),
  ];
  const firstHit = matchOptions(sortedValues, filter)[0];
  const allMatchingChars = (array) => array.every((char) => char === array[0]);

  if (firstHit) {
    return values.indexOf(firstHit);
  }

  if (allMatchingChars(filter.split(''))) {
    const hits = matchOptions(sortedValues, filter[0]);
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

  @Event({ eventName: 'scale-change' }) scaleChange!: EventEmitter<void>;
  @Event({ eventName: 'scale-focus' }) scaleFocus!: EventEmitter<void>;
  @Event({ eventName: 'scale-blur' }) scaleBlur!: EventEmitter<void>;
  @Event({ eventName: 'scale-keydown' }) scaleKeydown!: EventEmitter<void>;
  @State() options?: string | Array<{ label: string; value: any }> = '';
  @State() open: boolean = false;
  @State() currentIndex: number = -1;
  @State() queryString: string = '';
  @State() queryTimeout: any = null;
  @State() ignoreBlur: boolean = false;
  @State() hasFocus: boolean = false;

  private comboEl: HTMLElement;
  private listboxEl: HTMLElement;
  private listboxPadEl: HTMLElement;

  @Watch('value')
  valueChange(newValue) {
    this.currentIndex = readOptions(this.hostElement).findIndex(
      ({ value }) => value === newValue
    );
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
    computePosition(this.comboEl, this.listboxPadEl, {
      placement: 'bottom',
    }).then(({ x, y }) => {
      Object.assign(this.listboxPadEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  selectOption = (index) => {
    this.currentIndex = index;
    this.value = readOptions(this.hostElement)[index].value;
    emitEvent(this, 'scaleChange', { value: this.value });
  };

  handleOptionChange(index) {
    this.currentIndex = index;
    this.bringIntoView(index);
  }

  bringIntoView(index) {
    const options: NodeListOf<HTMLElement> =
      this.listboxEl.querySelectorAll('[role=option]');

    if (hasOverflow(this.listboxEl)) {
      keepInView(options[index], this.listboxEl);
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
      readOptions(this.hostElement).map(({ label }) => label),
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
    const max = readOptions(this.hostElement).length - 1;
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
          jumpToIndex(this.currentIndex, max, action)
        );
      case Actions['CloseSelect']:
        event.preventDefault();
        this.selectOption(this.currentIndex);
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
    if (this.ignoreBlur) {
      this.ignoreBlur = false;
      return;
    }
    this.setOpen(false);
    emitEvent(this, 'scaleBlur');
  };

  handleFocus = () => {
    emitEvent(this, 'scaleFocus');
  };

  handleClick = () => {
    this.setOpen(!this.open);

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
    const ValueElement = (
      readOptions(this.hostElement).find(({ value }) => value === this.value) ||
      ({} as any)
    ).ItemElement;
    const helperTextId = `helper-message`;
    const ariaDescribedByAttr = { 'aria-describedBy': helperTextId };

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
              tabindex="0"
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
              {ValueElement}
            </div>
            <div part="listbox-pad" ref={(el) => (this.listboxPadEl = el)}>
              <div
                ref={(el) => (this.listboxEl = el)}
                part="listbox"
                role="listbox"
                id={`${this.comboboxId}-listbox`}
                aria-labelledby={`${this.comboboxId}-label`}
                tabindex="-1"
              >
                {readOptions(this.hostElement).map(
                  ({ value, ItemElement }, index) => (
                    <div
                      role="option"
                      part={`option${
                        index === this.currentIndex ? ' current' : ''
                      }`}
                      id={value}
                      onClick={(event) => {
                        this.handleOptionClick(event, index);
                      }}
                      onMouseDown={() => {
                        this.ignoreBlur = true;
                      }}
                      {...(value === this.value
                        ? { 'aria-selected': 'true' }
                        : {})}
                    >
                      {ItemElement}
                      {value === this.value ? (
                        <scale-icon-action-success
                          size={16}
                        ></scale-icon-action-success>
                      ) : null}
                    </div>
                  )
                )}
              </div>
            </div>

            <div part="icon">
              {this.open ? (
                <scale-icon-navigation-collapse-up decorative />
              ) : (
                <scale-icon-navigation-collapse-down decorative />
              )}
            </div>
          </div>

          {this.helperText && (
            <scale-helper-text
              helperText={this.helperText}
              variant={this.invalid ? 'danger' : this.variant}
            ></scale-helper-text>
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
      this.helperText && 'has-helper-text'
    );
  }
}
