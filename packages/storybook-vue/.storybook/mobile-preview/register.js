import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';

addons.register('@telekom/scale-mobile-prpeview', (api) => {
    addons.add(`@telekom/scale-mobile-preview`, {
      type: types.TAB,
      title: 'MobilePreview',
      route: () => {
        const mobilePreview = useParameter('mobilePreview', null);
        if (mobilePreview) {
            setTimeout( () => {
                document.querySelectorAll('#storybook-preview-iframe').forEach( item =>
                    {   
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
                                let topEl = document.createElement("div");
                                topEl.classList.add("top-frame")
                                let bottomEl = document.createElement("div");
                                bottomEl.classList.add("bottom-frame")
                                parentNode.style = `width: 375px; border-radius: ${canvasBorderRadius}; box-shadow: 0px 6px 16px rgba(0, 0, 0, 0.15), 0px 12px 48px rgba(0, 0, 0, 0.1);`
                                topEl.style = "height: 77px; background-color: #FBFBFB; border-radius: 45px 45px 0 0;"
                                bottomEl.style = "height: 77px; background-color: #FBFBFB; border-radius: 0 0 45px 45px;"
                                const topFrame = parentNode.querySelector('.top-frame')
                                const bottomFrame = parentNode.querySelector('.bottom-frame')
                                if (mobilePreview == 'full' && topFrame == null ) {
                                    parentNode.insertBefore(topEl, el)
                                    parentNode.insertBefore(bottomEl, null)
                                } else if (mobilePreview == 'bottom' && bottomFrame == null) {
                                    parentNode.insertBefore(bottomEl, null)
                                } else if (mobilePreview == 'top' && topFrame == null) {
                                    parentNode.insertBefore(topEl, el)
                                }
                                el.style = `border: 1px solid #E7E7E9; height: ${canvasHeight};`
                            })
                    }
                )
            }, 500)
        }
        return null
      },
      render: () => null,
      match: () =>  null,
    });
  });
  