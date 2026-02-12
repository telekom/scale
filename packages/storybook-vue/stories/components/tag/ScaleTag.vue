<script>
import { action } from '@storybook/addon-actions';
export default {
  props: {
    disabled: { type: Boolean, default: false },
    dismissable: { type: Boolean, default: false },
    href: String,
    dismissText: String,
    size: String,
    target: { type: String, default: '_self' },
    color: {
      type:
        'cyan' |
        'yellow' |
        'green' |
        'orange' |
        'red' |
        'violet' |
        'brown' |
        'olive' |
        'teal' |
        'standard',
      default: 'standard',
    },
    type: {
      type: 'strong' | 'standard',
      default: 'standard',
    },
    styles: String,
  },
  methods: {
    scaleClose($event) {
      action('scale-close')($event.detail);
      this.$emit('scale-close', $event);
    },
  },
};
</script>
