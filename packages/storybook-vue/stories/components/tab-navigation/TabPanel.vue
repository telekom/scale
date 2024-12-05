<script>
  export default {
    name: 'Tab Panel',
    props: {
        styles: { type: String },
        tabbablePanel: { type: Boolean, default: 'true'},
        size: { type: 'small' | 'large' , default: 'COMMENT: DEPRECATED - no more size difference ' },
        small: { type: Boolean , default: 'COMMENT: DEPRECATED - no more size difference ' },
    }
  };
</script>
