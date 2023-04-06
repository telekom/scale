import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('Button', () => {
  function getInsideButton(): HTMLElement | null | undefined {
    return document.body
      .querySelector('scale-button')
      ?.shadowRoot?.querySelector('button');
  }

  beforeEach(async () => {
    document.body.innerHTML = '<scale-button>Hello</scale-button>';
    await new Promise<void>((resolve) => {
      const interval = setInterval(() => {
        if (getInsideButton()) {
          clearInterval(interval);
          resolve();
        }
      });
    });
  });

  it('should accept a slot', () => {
    expect(
      document.body
        .querySelector('scale-button')
        ?.shadowRoot?.querySelector('slot')
        ?.assignedNodes()[0].textContent
    ).toContain('Hello');
  });

  it('should dispatch click event on button click', () => {
    const spyClick = vi.fn();

    document.querySelector('scale-button')!.addEventListener('click', spyClick);

    getInsideButton()?.click();

    expect(spyClick).toHaveBeenCalled();
  });
});
