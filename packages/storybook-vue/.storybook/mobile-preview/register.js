import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';
import React from 'react';

addons.register('@telekom/scale-mobile-prpeview', (api) => {
    addons.add(`@telekom/scale-mobile-preview`, {
      type: types.TAB,
      title: 'MobilePreview',
      route: () => {
     
        const mobilePreview = useParameter('mobilePreview', null);
        if (mobilePreview) {
            console.log('!!!! in mobile preview ');
            setTimeout( () => {
                const iframe = document.getElementById('storybook-preview-iframe')
                const storyContainer = iframe.contentWindow.document.body.querySelectorAll('.css-1wjen9k')
                storyContainer.forEach(el => {
                    el.style = "padding: 0;"  
                })
                
                const docContainer = iframe.contentWindow.document.body.querySelectorAll('.sbdocs-preview')
                docContainer.forEach(el => {
                  el.style = "border: none; border-radius: 0;"
                })
            }, 200 )
        }
        return null
      },
      render: () => null,
      match: () =>  null,
    });
  });
  