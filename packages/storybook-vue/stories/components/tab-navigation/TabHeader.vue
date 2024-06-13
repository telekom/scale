<script>
export default {
  name: 'Tab Header',
  props: {
    styles: {type: String},
    disabled: {type: Boolean, default: 'false'},
    selected: {type: Boolean, default: 'false'},
    size: {
      control: {type: 'select', options: ['large', 'small'], defaultValue: 'small'},
    },
  }
};
</script>
