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
            document.querySelectorAll('#storybook-preview-iframe').forEach( item =>
                {   
                        // wait for the sb iframe to have finished loading before applying additional styles  
                        item.addEventListener("load", () => {
                            const canvasHeight = mobilePreview == 'full' ? '612px' : '306px';
                            const canvasBorderRadius = mobilePreview == 'full' ? '45px' : mobilePreview == 'bottom' ? '0 0 45px 45px' : '45px 45px 0 0'; 
                            const storyCanvas = item.contentWindow.document.body.querySelectorAll('.docs-story')
                            storyCanvas.forEach(el => {
                                const firstChild = el.firstChild;
                                firstChild.style = "padding: 0; height: 100%; margin: 0;"
                                const wrapper = el.querySelector('.innerZoomElementWrapper');
                                wrapper.firstChild.style = "border: none !important;"
                                const rootEl = el.querySelector('#root')
                                rootEl.style = `position: relative; height: ${canvasHeight};`
                                const parentNode = el.parentNode;

                                var parentWrapper = document.createElement('div');
                                parentWrapper.classList.add(`parentWrapper`)
                                parentWrapper.style = "width: 100%; display: flex; justify-content: center; align-items: center; background-color: #F7F7F8; border: 1px solid rgba(255, 255, 255, 0.4);"
                                if ( !el.parentNode.parentNode.classList.contains('parentWrapper')) {
                                    parentNode.parentNode.replaceChild(parentWrapper, parentNode)
                                    parentWrapper.appendChild(parentNode)
                                }
                                parentNode.style = `width: 375px; border-radius: ${canvasBorderRadius}; box-shadow: var(--telekom-shadow-floating-standard); ${mobilePreview == 'top' ? 'margin-bottom: 0;' : mobilePreview =='bottom' ? 'margin-top: 0;' : '' } border: none;`
            
                                let topFrame = document.createElement("div");
                                topFrame.classList.add("top-frame")
                                let bottomFrame = document.createElement("div");
                                bottomFrame.classList.add("bottom-frame")
                                topFrame.style = "height: 77px; background-color: #FBFBFB; border-radius: 45px 45px 0 0;"
                                bottomFrame.style = "height: 77px; background-color: #FBFBFB; border-radius: 0 0 45px 45px;"
                                const topFrameExists = parentNode.querySelector('.top-frame')
                                const bottomFrameExists = parentNode.querySelector('.bottom-frame')
                                if (mobilePreview == 'full' && topFrameExists == null ) {
                                    parentNode.insertBefore(topFrame, el)
                                    parentNode.insertBefore(bottomFrame, null)
                                } else if (mobilePreview == 'bottom' && bottomFrameExists == null) {
                                    parentNode.insertBefore(bottomFrame, null)
                                } else if (mobilePreview == 'top' && topFrameExists == null) {
                                    parentNode.insertBefore(topFrame, el)
                                }
                                el.style = `${mobilePreview == 'bottom' ? 'border-bottom: 1px solid #E7E7E9;' : mobilePreview == 'top' ? 'border-top: 1px solid #E7E7E9;' : 'border-bottom: 1px solid #E7E7E9; border-top: 1px solid #E7E7E9;' } height: ${canvasHeight};`
                            })                            
                        });
                        
                }
            )

        }
        return null
      },
      render: () => null,
      match: () =>  null,
    });
  });
  