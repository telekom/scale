<script>
  export default {
    name: 'Tab Panel',
    props: {
        styles: { type: String },
        tabbable: { type: Boolean, default: 'true',
          argTypes:{
            table: {
              type: { summary: 'string' },
            },
            description: `(optional) Injected styles`,
            control: { type: null },
          },
        },
      }
  };
</script>
