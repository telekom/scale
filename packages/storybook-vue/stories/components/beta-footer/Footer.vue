<template>
    <scale-telekom-footer :variant="variant">
      <span slot="notice"> © Deutsche Telekom AG </span>
      <ul slot="navigation">
        <li>
          <a href="#">
            Impressum 
          </a>
        </li>
        <li>
          <a href="#">
            Datenschutz 
          </a>
        </li>
        <li>
          <a href="#">
            AGB
          </a>
        </li>
        <li>
          <a href="#">
            Produktinformationsblatt
          </a>
        </li>
        <li>
          <a href="#">
            Verbraucherinformationen
          </a>
        </li>
        <li>
          <a href="#">
            Jugendschutz
          </a>
        </li>
      </ul>
    </scale-telekom-footer>
  </template>
  
  <script>
  export default {
    props: {
        variant: String
    }
  };
  </script>
  