<template>
  <scale-date-picker
    :name="name"
    :identifier="identifier"
    :role="role"
    :direction="direction"
    :required="required"
    :min="min"
    :max="max"
    :first-day-of-week="firstDayOfWeek"
    :localization="localization"
    :date-adapter="dateAdapter"
    :value="value"
    :disabled="disabled"
    :size="size"
    :label="label"
    :helper-text="helperText"
    :invalid="invalid"
    :popup-title="popupTitle"
    :placeholder="placeholder"
    :styles="styles"
    :inner-role="innerRole"
    :status="status"
    :variant="variant"
    @scale-change="scaleChange"
    @scale-focus="scaleFocus"
    @scale-blur="scaleBlur"
  >
  </scale-date-picker>
</template>

<script>
import { action } from '@storybook/addon-actions';

export default {
  props: {
    name: { type: String },
    identifier: { type: String },
    role: { type: String },
    direction: { type: String },
    required: { type: Boolean },
    min: { type: String },
    max: { type: String },
    firstDayOfWeek: { type: String },
    localization: { type: [Object, String] },
    dateAdapter: { type: Object },
    value: { type: String },
    label: { type: String },
    helperText: { type: String },
    invalid: { type: Boolean },
    disabled: { type: Boolean },
    popupTitle: { type: String },
    styles: { type: String },
    placeholder: { type: String },
    size: { type: String },
    ariaDetailsId: { type: String },
    innerRole: { type: String },
    status: { type: String },
    variant: { type: 'informational' | 'warning' | 'danger' | 'success' | 'informational'},
  },
  mounted() {
    this.setupLocalization();
  },
  watch: {
    localization() {
      this.setupLocalization();
    },
  },
  methods: {
    setupLocalization() {
      const DATE_FORMAT = /^(\d{1,2})\.(\d{1,2})\.(\d{4})$/;
      
      if (this.localization === 'de') {
        this.$el.dateAdapter = {
          parse(value = '', createDate) {
            const matches = value.match(DATE_FORMAT);
            if (matches) {
              return createDate(matches[3], matches[2], matches[1]);
            }
          },
          format(date) {
            return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;
          },
        };
        this.$el.localization = {
          buttonLabel: 'Datum wählen',
          placeholder: 'TT.MM.JJJJ',
          selectedDateMessage: 'Gewähltes Datum',
          prevMonthLabel: 'Vorheriger Monat',
          nextMonthLabel: 'Nächster Monat',
          monthSelectLabel: 'Monat',
          yearSelectLabel: 'Jahr',
          closeLabel: 'Fenster schließen',
          keyboardInstruction: 'Sie können mit den Pfeiltasten vor und zurück navigieren',
          calendarHeading: 'Datum wählen',
          dayNames: [
            'Sonntag',
            'Montag',
            'Dienstag',
            'Mittwoch',
            'Donnerstag',
            'Freitag',
            'Samstag',
          ],
          monthNames: [
            'Januar',
            'Februar',
            'März',
            'April',
            'Mai',
            'Juni',
            'Juli',
            'August',
            'September',
            'Oktober',
            'November',
            'Dezember',
          ],
          monthNamesShort: [
            'Jan',
            'Feb',
            'Mär',
            'Apr',
            'Mai',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Okt',
            'Nov',
            'Dez',
          ],
          today: 'heute',
          locale: 'de-DE',
        };
      }
    },
    scaleChange($event) {
      action('scale-change')($event.detail);
      this.$emit('scale-change', $event);
    },
    scaleFocus($event) {
      action('scale-focus')($event.detail);
      this.$emit('scale-focus', $event);
    },
    scaleBlur($event) {
      action('scale-blur')($event.detail);
      this.$emit('scale-blur', $event);
    },
  },
};
</script>
