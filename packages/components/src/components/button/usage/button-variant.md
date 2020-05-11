## Variants
### primary

<scale-button variant="primary">
  Hello
</scale-button>

### secondary

<scale-button variant="secondary">
  Hello
</scale-button>

### error

<scale-button variant="error">
  Hello
</scale-button>

### warning

<scale-button variant="warning">
  Hello
</scale-button>

### info

<scale-button variant="info">
  Hello
</scale-button>

### success

<scale-button variant="success">
  Hello
</scale-button>

### custom
<div>
  <script>
  scale.useTheme({
    components: {
      Button: {
        "button--variant-custom": {
          background: "pink",
          borderColor: "pink",
        },
      },
    },
  })
  </script>
  <scale-button variant="custom">
    Hello
  </scale-button>
</div>
