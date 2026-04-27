import { E2EElement, E2EPage, newE2EPage } from '@stencil/core/testing';

describe('DropdownSelect', function () {
  it('should be able to change it`s value via keyboard nav', async () => {
    const page = await newE2EPage({
      html: `
      <scale-dropdown-select>
        <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cedric">Cedric</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
      </scale-dropdown-select>`,
    });

    const selectEl = await page.find('scale-dropdown-select');
    const comboboxEl = await page.find(
      'scale-dropdown-select >>> [part="combobox"]'
    );

    await page.keyboard.down('Tab');
    await page.keyboard.down('Enter');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('ArrowDown');
    await page.keyboard.down('Enter');
    await page.waitForChanges();

    expect(comboboxEl).toEqualText('Cem');
    expect(selectEl).toEqualAttribute('value', 'cem');
  });
  it('should be able to change it`s value via typing', async () => {
    const page = await newE2EPage({
      html: `
      <scale-dropdown-select>
        <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cedric">Cedric</scale-dropdown-select-item>
        <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
      </scale-dropdown-select>`,
    });

    const selectEl = await page.find('scale-dropdown-select');
    const comboboxEl = await page.find(
      'scale-dropdown-select >>> [part="combobox"]'
    );

    await page.keyboard.down('Tab');
    await page.keyboard.down('Enter');
    await page.keyboard.down('c');
    await page.keyboard.down('e');
    await page.keyboard.down('d');
    await page.keyboard.down('r');
    await page.keyboard.down('i');
    await page.keyboard.down('c');
    await page.keyboard.down('Enter');
    await page.waitForChanges();

    expect(comboboxEl).toEqualText('Cedric');
    expect(selectEl).toEqualAttribute('value', 'cedric');
  });

  describe('when contains some disabled options', () => {
    let page: E2EPage;
    let selectEl: E2EElement;
    let comboboxEl: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage({
        html: `
        <scale-dropdown-select>
          <scale-dropdown-select-item value="adam">Adam</scale-dropdown-select-item>
          <scale-dropdown-select-item value="cedrik" disabled>Cedrik</scale-dropdown-select-item>
          <scale-dropdown-select-item value="cedric" disabled>Cedric</scale-dropdown-select-item>
          <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
          <scale-dropdown-select-item value="chris">Chris</scale-dropdown-select-item>
          <scale-dropdown-select-item value="christian">Christian</scale-dropdown-select-item>
          <scale-dropdown-select-item value="christiano">Christiano</scale-dropdown-select-item>
        </scale-dropdown-select>`,
      });

      selectEl = await page.find('scale-dropdown-select');
      comboboxEl = await page.find(
        'scale-dropdown-select >>> [part="combobox"]'
      );
    });

    it('should skip disabled options when navigating with keyboard', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      // should skip Cedrik and Cedric
      expect(comboboxEl).toEqualText('Cem');
      expect(selectEl).toEqualAttribute('value', 'cem');
    });

    it('should skip disabled options when typing', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('c');
      await page.keyboard.down('e');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      expect(comboboxEl).toEqualText('Cem');
      expect(selectEl).toEqualAttribute('value', 'cem');
    });
  });

  describe('when ALL options are disabled', () => {
    let page: E2EPage;
    let selectEl: E2EElement;
    let comboboxEl: E2EElement;

    beforeEach(async () => {
      page = await newE2EPage({
        html: `
        <scale-dropdown-select value="default">
          <scale-dropdown-select-item disabled value="adam">Adam</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="cedrik">Cedrik</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="cedric">Cedric</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="cem">Cem</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="chris">Chris</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="christian">Christian</scale-dropdown-select-item>
          <scale-dropdown-select-item disabled value="christiano">Christiano</scale-dropdown-select-item>
        </scale-dropdown-select>`,
      });

      selectEl = await page.find('scale-dropdown-select');
      comboboxEl = await page.find(
        'scale-dropdown-select >>> [part="combobox"]'
      );
    });

    it('should not be able to select any option', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('ArrowUp');
      await page.keyboard.down('ArrowUp');
      await page.keyboard.down('ArrowDown');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      expect(comboboxEl).toEqualText('');
      expect(selectEl).toEqualAttribute('value', 'default');
    });

    it('should not be able to select any option by typing', async () => {
      await page.keyboard.down('Tab');
      await page.keyboard.down('Enter');
      await page.keyboard.down('c');
      await page.keyboard.down('e');
      await page.keyboard.down('d');
      await page.keyboard.down('Enter');
      await page.waitForChanges();

      expect(comboboxEl).toEqualText('');
      expect(selectEl).toEqualAttribute('value', 'default');
    });
  });

  it('should overlay above modal content and keep tracking modal scroll', async () => {
    const page = await newE2EPage({
      html: `
      <scale-modal opened heading="Select a person">
        <div style="display: grid; gap: 1rem;">
          ${Array.from(
            { length: 12 },
            (_, index) => `<p>Filler content ${index + 1}</p>`
          ).join('')}
        </div>
        <scale-dropdown-select label="Favorite person" value="caspar">
          <scale-dropdown-select-item value="caspar">Caspar</scale-dropdown-select-item>
          <scale-dropdown-select-item value="cem">Cem</scale-dropdown-select-item>
          <scale-dropdown-select-item value="charlie">Charlie</scale-dropdown-select-item>
          <scale-dropdown-select-item value="chris">Chris</scale-dropdown-select-item>
          <scale-dropdown-select-item value="christian">Christian</scale-dropdown-select-item>
          <scale-dropdown-select-item value="christiano">Christiano</scale-dropdown-select-item>
          <scale-dropdown-select-item value="christoph">Christoph</scale-dropdown-select-item>
          <scale-dropdown-select-item value="christopher">Christopher</scale-dropdown-select-item>
          <scale-dropdown-select-item value="claas">Claas</scale-dropdown-select-item>
          <scale-dropdown-select-item value="clemens">Clemens</scale-dropdown-select-item>
          <scale-dropdown-select-item value="colin">Colin</scale-dropdown-select-item>
          <scale-dropdown-select-item value="collin">Collin</scale-dropdown-select-item>
          <scale-dropdown-select-item value="conner">Conner</scale-dropdown-select-item>
          <scale-dropdown-select-item value="connor">Connor</scale-dropdown-select-item>
          <scale-dropdown-select-item value="constantin">Constantin</scale-dropdown-select-item>
          <scale-dropdown-select-item value="corvin">Corvin</scale-dropdown-select-item>
        </scale-dropdown-select>
      </scale-modal>`,
    });

    const comboboxEl = await page.find(
      'scale-dropdown-select >>> [part="combobox"]'
    );

    await page.evaluate(() => {
      const modal = document.querySelector('scale-modal');
      const modalBody = modal.shadowRoot.querySelector(
        '.modal__body-wrapper'
      ) as HTMLElement;
      modalBody.scrollTop = modalBody.scrollHeight;
    });
    await page.waitForChanges();

    await comboboxEl.click();
    await page.waitForChanges();

    const metrics = await page.evaluate(async () => {
      const modal = document.querySelector('scale-modal');
      const dropdown = modal.querySelector('scale-dropdown-select');
      const modalBody = modal.shadowRoot.querySelector(
        '.modal__body-wrapper'
      ) as HTMLElement;
      const combobox = dropdown.shadowRoot.querySelector(
        '[part="combobox"]'
      ) as HTMLElement;
      const listboxPad = dropdown.shadowRoot.querySelector(
        '[part="listbox-pad"]'
      ) as HTMLElement;

      const readState = () => {
        const comboboxRect = combobox.getBoundingClientRect();
        const listboxRect = listboxPad.getBoundingClientRect();

        return {
          comboboxBottom: comboboxRect.bottom,
          gap: listboxRect.top - comboboxRect.bottom,
          listboxPosition: getComputedStyle(listboxPad).position,
          modalScrollTop: modalBody.scrollTop,
          listboxTop: listboxRect.top,
        };
      };

      await new Promise((resolve) => setTimeout(resolve, 100));
      const before = readState();

      modalBody.scrollTop = Math.max(0, modalBody.scrollTop - 120);
      await new Promise((resolve) => setTimeout(resolve, 100));
      const after = readState();

      return { before, after };
    });

    expect(metrics.before.listboxPosition).toBe('fixed');
    expect(metrics.before.listboxTop).toBeGreaterThan(
      metrics.before.comboboxBottom
    );
    expect(metrics.after.modalScrollTop).toBeLessThan(
      metrics.before.modalScrollTop
    );
    expect(metrics.after.listboxTop).not.toBe(metrics.before.listboxTop);
    expect(Math.abs(metrics.after.gap - metrics.before.gap)).toBeLessThan(5);
  });
});
