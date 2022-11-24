import { addons, types } from '@storybook/addons';
import { useParameter } from '@storybook/api';

addons.register('@telekom/scale-mobile-prpeview', (api) => {
    addons.add(`@telekom/scale-mobile-preview`, {
      type: types.TAB,
      title: 'MobilePreview',
      route: () => {
        const value = useParameter('mobilePreview', false);
        const previewIframe = document.querySelector('#storybook-preview-iframe');       
        if (value) {
            setTimeout( () => {
                document.querySelectorAll('#storybook-preview-iframe').forEach( item =>
                    {
                            const storyCanvas = item.contentWindow.document.body.querySelectorAll('.docs-story')
                            storyCanvas.forEach(el => {
                                const firstChild = el.firstChild;
                                firstChild.style = "padding: 0; height: 100%; margin: 0;"
                                const wrapper = el.querySelector('.innerZoomElementWrapper');
                                wrapper.firstChild.style = "border: none !important;"

                                const rootEl = el.querySelector('#root').firstChild
                                rootEl.style = "position: relative; height: 612px;"

                                const parentNode = el.parentNode;
                                let topEl = document.createElement("div");
                                topEl.classList.add("top-frame")
                                let bottomEl = document.createElement("div");
                                bottomEl.classList.add("bottom-frame")
                                parentNode.style = "width: 375px; border-radius: 45px; filter: drop-shadow(0px 6px 16px rgba(0, 0, 0, 0.15)) drop-shadow(0px 12px 48px rgba(0, 0, 0, 0.1));"
                                topEl.style = "height: 77px; background-color: #FBFBFB; border-radius: 45px 45px 0 0;"
                                bottomEl.style = "height: 77px; background-color: #FBFBFB; border-radius: 0 0 45px 45px;"
                                const topFrame = parentNode.querySelector('.top-frame')
                                if (topFrame == null ) {
                                    parentNode.insertBefore(topEl, el)
                                    parentNode.insertBefore(bottomEl, null)
                                }
                                el.style = "border: 1px solid #E7E7E9; height: 612px;"
                            })
                    }
                )
            }, 200)
        }
        return null
      },
      render: () => null,
      match: () =>  null,
    });
  });
  