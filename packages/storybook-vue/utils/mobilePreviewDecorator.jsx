const mobilePreviewDecorator = (story, context) => {
    const mobilePreview = context.parameters.mobilePreview;
    const viewMode = context.viewMode
    const canvasHeight = mobilePreview == 'full' ? '612px' : '306px';
    const canvasBorderRadius = mobilePreview == 'full' ? '45px' : mobilePreview == 'bottom' ? '0 0 45px 45px' : '45px 45px 0 0';
    const spacing = mobilePreview == 'full' ? '40px 0 40px 0' : mobilePreview == 'bottom' ? '0 0 40px 0' : '40px 0 0 0';
    if (viewMode === 'docs') {
        return ({
        template: `
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; background-color: #F7F7F8; border: 1px solid rgba(255, 255, 255, 0.4);">
                <div class="mobileContainer" style="border: 1px solid rgba(255, 255, 255, 0.4); margin: ${spacing}">
                    <div class="foobar" style="width: 375px; border-radius: ${canvasBorderRadius}; box-shadow: var(--telekom-shadow-floating-standard);">
                        <div style="height:${canvasHeight}; background-color: #fff; position: relative;">
                            <story />
                        </div>
                        <div style="height: 77px; background-color: #FBFBFB; border-radius: 0 0 45px 45px; border-top: 1px solid #e7e7e9;"></div>
                    </div>          
                </div>
            </div>
            `,
        })
    } else {
        return ({
        template: `
            <div>
                <story />     
            </div>
            `,
        })        
    }
} 

export default mobilePreviewDecorator;