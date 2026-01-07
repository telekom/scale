import {
  Component,
  Prop,
  h,
  Host,
  Element,
  State,
  Event,
  EventEmitter,
  Watch,
} from '@stencil/core';
import classNames from 'classnames';
import { computePosition, flip } from '@floating-ui/dom';
import { emitEvent, generateUniqueId } from '../../utils/utils';

export interface ComboboxChangeEventDetail {
  value: string;
}

@Component({
  tag: 'scale-combobox',
  styleUrl: 'combobox.css',
  shadow: true,
})
export class Combobox {
  @Element() hostElement: HTMLElement;

  /** (optional) Injected CSS styles */
  @Prop() styles?: string;

  /** Combobox label */
  @Prop() label?: string = '';

  /** Combobox placeholder */
  @Prop() placeholder?: string = '';

  /** Available options for the combobox */
  @Prop() options: string[] = [];

  /** Current selected value */
  @Prop() value?: string = '';

  /** Whether the combobox is disabled */
  @Prop() disabled?: boolean = false;

  /** Whether to allow custom values not in the options list */
  @Prop() allowCustom?: boolean = true;

  /** Helper text shown below the combobox */
  @Prop() helperText?: string = '';

  /** Invalid state */
  @Prop() invalid?: boolean = false;

  @State() isOpen = false;
  @State() filteredOptions: string[] = [];
  @State() highlightedIndex = -1;
  @State() inputValue = '';
  @State() hasFocus = false;

  /** Emitted when the value changes */
  @Event() scaleChange: EventEmitter<ComboboxChangeEventDetail>;

  private inputId = `combobox-input-${generateUniqueId()}`;
  private listboxId = `combobox-listbox-${generateUniqueId()}`;
  private helperTextId = `combobox-helper-text-${generateUniqueId()}`;
  private comboEl: HTMLInputElement;
  private listboxPadEl: HTMLElement;
  private scrollTimeout: NodeJS.Timeout | null = null;

  @Watch('value')
  valueChanged(newValue: string) {
    this.inputValue = newValue;
  }

  @Watch('options')
  optionsChanged() {
    this.filterOptions(this.inputValue);
  }

  @Watch('highlightedIndex')
  highlightedIndexChanged() {
    this.scrollToHighlighted();
  }

  @Watch('isOpen')
  isOpenChanged() {
    if (this.isOpen) {
      // Use setTimeout to ensure DOM is fully rendered before calculating position
      setTimeout(() => {
        this.updateListboxPosition();
      }, 0);
    }
  }

  componentDidLoad() {
    this.inputValue = this.value || '';
    this.filterOptions(this.inputValue);

    // Add scroll listener to update position when window scrolls
    window.addEventListener('scroll', this.handleWindowScroll, true);
  }

  disconnectedCallback() {
    window.removeEventListener('scroll', this.handleWindowScroll, true);
    if (this.scrollTimeout) {
      clearTimeout(this.scrollTimeout);
    }
  }

  render() {
    const hasValue = this.inputValue && this.inputValue !== '';
    const isAnimated = hasValue || this.hasFocus;

    const containerClass = classNames({
      'combobox-container': true,
      'combobox-open': this.isOpen,
      'combobox-disabled': this.disabled,
      'combobox-invalid': this.invalid,
      'combobox-has-focus': this.hasFocus,
      animated: isAnimated,
    });

    return (
      <Host>
        {this.styles && <style>{this.styles}</style>}

        <div part="combobox-container" class={containerClass}>
          <div class="combobox-wrapper">
            {this.label && (
              <label part="label" class="combobox-label" htmlFor={this.inputId}>
                {this.label}
              </label>
            )}

            <input
              part="combobox"
              id={this.inputId}
              type="text"
              class="combobox-input"
              value={this.inputValue}
              placeholder={this.placeholder}
              disabled={this.disabled}
              onInput={this.handleInputChange}
              onFocus={this.handleInputFocus}
              onBlur={this.handleInputBlur}
              onKeyDown={this.handleKeyDown}
              role="combobox"
              aria-autocomplete="list"
              aria-controls={this.listboxId}
              aria-expanded={this.isOpen}
              aria-describedby={this.helperText ? this.helperTextId : undefined}
              autocomplete="off"
              ref={(el) => (this.comboEl = el as HTMLInputElement)}
            />

            {this.isOpen && this.filteredOptions.length > 0 && (
              <div
                part="listbox-pad"
                ref={(el) => (this.listboxPadEl = el as HTMLElement)}
              >
                <div
                  part="listbox"
                  id={this.listboxId}
                  class="combobox-listbox"
                  role="listbox"
                >
                  {this.filteredOptions.map((option, index) => (
                    <div
                      part="option"
                      class={classNames({
                        'combobox-option': true,
                        'combobox-option-highlighted':
                          index === this.highlightedIndex,
                      })}
                      role="option"
                      aria-selected={index === this.highlightedIndex}
                      onClick={(e) => this.handleOptionClick(option, e)}
                      onMouseEnter={() => {
                        this.highlightedIndex = index;
                      }}
                    >
                      {option}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {this.helperText && (
            <div
              class="combobox-meta"
              aria-live="polite"
              aria-relevant="additions removals"
            >
              <scale-helper-text
                id={this.helperTextId}
                helperText={this.helperText}
                variant={this.invalid ? 'danger' : 'informational'}
              ></scale-helper-text>
            </div>
          )}
        </div>
      </Host>
    );
  }

  private handleWindowScroll = () => {
    if (this.isOpen) {
      // Debounce scroll updates to avoid excessive recalculations
      if (this.scrollTimeout) {
        clearTimeout(this.scrollTimeout);
      }
      this.scrollTimeout = setTimeout(() => {
        this.updateListboxPosition();
      }, 10);
    }
  };

  private filterOptions(query: string) {
    const filtered = this.options.filter((option) =>
      option.toLowerCase().includes(query.toLowerCase())
    );
    this.filteredOptions = filtered;
    this.highlightedIndex = -1;
  }

  private handleInputChange = (event: Event) => {
    const target = event.target as HTMLInputElement;
    this.inputValue = target.value;
    this.filterOptions(target.value);
    this.isOpen = true;
  };

  private handleInputFocus = () => {
    this.isOpen = true;
    this.hasFocus = true;
    this.filterOptions(this.inputValue);
  };

  private handleInputBlur = () => {
    this.hasFocus = false;
    // Delay to allow click on option to register
    // Only close if still open (in case option click already closed it)
    setTimeout(() => {
      if (this.isOpen) {
        this.isOpen = false;
      }
    }, 100);
  };

  private handleOptionClick = (option: string, event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    this.inputValue = option;
    this.value = option;
    this.isOpen = false;
    emitEvent(this, 'scaleChange', { value: option });
  };

  private handleKeyDown = (event: KeyboardEvent) => {
    if (
      !this.isOpen &&
      (event.key === 'ArrowDown' || event.key === 'ArrowUp')
    ) {
      event.preventDefault();
      this.isOpen = true;
      return;
    }

    if (!this.isOpen) {
      return;
    }

    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        this.highlightedIndex = Math.min(
          this.highlightedIndex + 1,
          this.filteredOptions.length - 1
        );
        break;

      case 'ArrowUp':
        event.preventDefault();
        this.highlightedIndex = Math.max(this.highlightedIndex - 1, -1);
        break;

      case 'Enter':
        event.preventDefault();
        if (this.highlightedIndex >= 0) {
          this.handleOptionClick(
            this.filteredOptions[this.highlightedIndex],
            event as any
          );
        } else if (this.allowCustom && this.inputValue) {
          this.value = this.inputValue;
          this.isOpen = false;
          emitEvent(this, 'scaleChange', { value: this.inputValue });
        }
        break;

      case 'Escape':
        event.preventDefault();
        this.isOpen = false;
        break;

      case 'Tab':
        this.isOpen = false;
        break;
    }
  };

  private scrollToHighlighted = () => {
    if (this.highlightedIndex < 0) {
      return;
    }

    // Use a small delay to ensure the DOM is updated
    requestAnimationFrame(() => {
      const listbox = this.hostElement.shadowRoot?.querySelector(
        '[part="listbox"]'
      ) as HTMLElement;
      if (!listbox) {
        return;
      }

      const highlightedOption = listbox.querySelector(
        `[role="option"]:nth-child(${this.highlightedIndex + 1})`
      ) as HTMLElement;
      if (!highlightedOption) {
        return;
      }

      // Scroll the option into view
      highlightedOption.scrollIntoView({
        block: 'nearest',
        behavior: 'smooth',
      });
    });
  };

  private updateListboxPosition = () => {
    if (!this.comboEl || !this.listboxPadEl) {
      return;
    }

    // Get the input's bounding rect - this will have the actual rendered width
    const inputRect = this.comboEl.getBoundingClientRect();
    const inputWidth = inputRect.width;

    // Ensure we have a valid width before proceeding
    if (inputWidth <= 0) {
      requestAnimationFrame(() => this.updateListboxPosition());
      return;
    }

    // Set width synchronously first
    this.listboxPadEl.style.width = `${inputWidth}px`;
    this.listboxPadEl.style.boxSizing = 'border-box';

    // Then update position in next frame
    requestAnimationFrame(() => {
      // Use floating-ui to compute the best position, accounting for scroll
      // The flip middleware will automatically switch to 'top' placement if there's not enough space below
      computePosition(this.comboEl, this.listboxPadEl, {
        placement: 'bottom',
        strategy: 'fixed',
        middleware: [
          flip({
            padding: 8, // Keep 8px gap from viewport edge
          }),
        ],
      }).then(({ x, y }) => {
        // Get fresh input rect for final positioning
        const freshInputRect = this.comboEl.getBoundingClientRect();
        const freshInputWidth = freshInputRect.width;

        // computePosition already provides the correct y position for 'bottom' placement
        // which places it right below the reference element
        Object.assign(this.listboxPadEl.style, {
          left: `${x}px`,
          top: `${y}px`,
          width: `${freshInputWidth}px`,
          boxSizing: 'border-box',
        });
      });
    });
  };
}
