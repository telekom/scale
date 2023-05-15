import {
  Component,
  h,
  Host,
  Prop,
  Element,
  State,
  Event,
  EventEmitter,
  Listen,
  Watch,
} from '@stencil/core';
import { computePosition } from '@floating-ui/dom';
import { findAll } from 'highlight-words-core';

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

function getActionFromKey(event: KeyboardEvent, open: boolean) {
  const { key, altKey, ctrlKey, metaKey } = event;

  if (!open && ['ArrowDown', 'ArrowUp', 'Enter'].includes(key)) {
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

@Component({
  tag: 'scale-search',
  shadow: true,
})
export class Search {
  @Element() hostElement: HTMLElement;

  @Prop() comboboxId?: string = 'combobox';
  @Prop() label: string;
  @Prop() name?: string;
  @Prop() helperText?: string = '';
  @Prop() disabled?: boolean;
  @Prop() variant?: 'informational' | 'warning' | 'danger' | 'success' =
    'informational';
  @Prop({ mutable: true, reflect: true }) value: any;

  @Event({ eventName: 'scale-change' }) scaleChange!: EventEmitter<void>;
  @Event({ eventName: 'scale-focus' }) scaleFocus!: EventEmitter<void>;
  @State() open: boolean = false;
  @State() currentIndex: number = -1;

  private comboEl: HTMLElement;
  private listboxPadEl: HTMLElement;

  get input() {
    const slotFallback = this.comboEl.shadowRoot.querySelector('input');
    const slotted = this.hostElement.shadowRoot
      .querySelector('slot[name=input]')
      // @ts-ignore
      ?.assignedNodes()[0];

    return slotted || slotFallback;
  }

  @Listen('scale-close-search', { target: 'window', capture: true })
  handleCloseUserMenu() {
    this.setOpen(false);
  }

  @Watch('value')
  handleValueUpdate() {
    this.updateHighlightedText();
  }
  componentDidRender() {
    if (!this.open) {
      return;
    }
    computePosition(this.hostElement, this.listboxPadEl, {
      placement: 'bottom',
    }).then(({ x, y }) => {
      Object.assign(this.listboxPadEl.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  getItems = () => {
    const allSearchItems = this.hostElement.querySelectorAll(
      'scale-search-list-item'
    );
    return Array.from(allSearchItems, (x) => {
      return {
        element: x,
        textContent: x.shadowRoot
          .querySelector(`[part="label"] slot`)
          // @ts-ignore
          .assignedNodes()[0].innerText,
        setTextContent: (textContent) => {
          x.shadowRoot
            .querySelector(`[part="label"] slot`)
            // @ts-ignore
            .assignedNodes()[0].innerHTML = textContent;
        },
      };
    });
  };
  setOpen(open) {
    if (this.open === open) {
      return;
    }

    if (this.disabled) {
      return;
    }

    this.comboEl.shadowRoot.querySelector('input').focus();
    this.open = open;

    if (!this.open) {
      this.comboEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      this.comboEl.focus();
    }
  }

  handleFocus = () => {
    this.setOpen(true);
  };

  updateHighlightedText = (items = this.getItems()) => {
    setTimeout(() => {
      const inputValue = this.input.value;

      const searchWords = inputValue.split(' ');

      items.forEach((item) => {
        const textToHighlight = item.textContent;

        const chunks = findAll({
          searchWords,
          textToHighlight,
        });

        const highlightedText = chunks
          .map((chunk) => {
            const { end, highlight, start } = chunk;
            const text = textToHighlight.substr(start, end - start);
            if (highlight) {
              return `<strong>${text}</strong>`;
            } else {
              return text;
            }
          })
          .join('');

        if (highlightedText) {
          item.setTextContent(highlightedText);
        }
      });
    });
  };

  handleKeyDown = (event) => {
    const action = getActionFromKey(event, this.open);
    const items = this.getItems();

    this.updateHighlightedText(items);

    switch (action) {
      case Actions['Open']:
        this.setOpen(true);
        return;
      case Actions['CloseSelect']:
      case Actions['Close']:
        this.setOpen(false);
        return;
      case Actions['Previous']:
        this.currentIndex = this.currentIndex >= 1 ? this.currentIndex - 1 : 0;
        this.handleHighlight(items);
        return;
      case Actions['Next']:
        this.currentIndex =
          this.currentIndex < items.length - 1
            ? this.currentIndex + 1
            : items.length - 1;
        this.handleHighlight(items);
        return;
    }
  };

  handleHighlight = (items) => {
    items.forEach((x, i) => {
      x.element.highlight(i === this.currentIndex);
      if (i === this.currentIndex) {
        x.element.scrollIntoView(false);
        this.input.value = x.textContent;
      }
    });
  };

  render() {
    return (
      <Host>
        <div style={{ position: 'relative' }}>
          <div part="combobox-container">
            <slot
              name="input"
              onSlotchange={() => {
                this.input.ref = (el) => (this.comboEl = el);
                this.input.inputId = this.comboboxId;
                this.input.innerAriaExpanded = this.open ? 'true' : 'false';
                this.input.inputId = this.comboboxId;

                this.input.addEventListener('focus', this.handleFocus);
                this.input.addEventListener('keydown', this.handleKeyDown);
              }}
            >
              <scale-search-input
                ref={(el) => (this.comboEl = el)}
                inputId={this.comboboxId}
                inner-aria-expanded={this.open ? 'true' : 'false'}
                onFocus={this.handleFocus}
                onKeyDown={this.handleKeyDown}
                label={this.label}
                helperText={this.helperText}
                name="search-input"
                disabled={this.disabled}
                variant={this.variant}
                value={this.value}
              >
                <scale-icon-action-search slot="prefix-icon" />
              </scale-search-input>
            </slot>

            <scale-search-list-box
              inner-id={`${this.comboboxId}-listbox`}
              open={this.open}
              refListBoxPadEl={(el) => (this.listboxPadEl = el)}
            >
              <slot></slot>
            </scale-search-list-box>
          </div>
        </div>
      </Host>
    );
  }
}
