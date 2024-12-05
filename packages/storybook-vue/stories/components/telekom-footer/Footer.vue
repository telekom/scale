<template>
    <scale-telekom-footer :type="type">
      <scale-telekom-footer-content>
        <span slot="notice"> © Deutsche Telekom AG </span>
        <ul slot="navigation">
          <li>
            <a href="#">
              Imprint 
            </a>
          </li>
          <li>
            <a href="#">
              Data privacy 
            </a>
          </li>
          <li>
            <a href="#">
              Terms and conditions
            </a>
          </li>
          <li>
            <a href="#">
              Consumer protection
            </a>
          </li>
          <li>
            <a href="#">
              Product information sheet
            </a>
          </li>
          <li>
            <a href="#">
              Youth protection
            </a>
          </li>
        </ul>
      </scale-telekom-footer-content>
    </scale-telekom-footer>
  </template>
  
  <script>
  export default {
    props: {
        type: { type: 'standard' | 'minimal' , default: 'standard'}
    }
  };
  </script>
  