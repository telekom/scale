const mobilePreviewDecorator = (story, context) => {
    const mobilePreview = context.parameters.mobilePreview;
    const viewMode = context.viewMode
    const canvasHeight = mobilePreview == 'full' ? '612px' : '306px';
    const canvasBorderRadius = mobilePreview == 'full' ? '45px' : mobilePreview == 'bottom' ? '0 0 45px 45px' : '45px 45px 0 0';
    const spacing = mobilePreview == 'full' ? '40px 0 40px 0' : mobilePreview == 'bottom' ? '0 0 40px 0' : '40px 0 0 0';
    if (viewMode === 'docs') {  
        return ({
        template: `
            <div style="width: 100%; display: flex; justify-content: center; align-items: center; background-color: #F7F7F8; border: 1px solid #e7e7e9;">
                <div class="mobileContainer" style="margin: ${spacing}">
                    <div class="foobar" style="width: 375px; border-radius: ${canvasBorderRadius}; box-shadow: var(--telekom-shadow-floating-standard);">
                        
                        ${mobilePreview === 'top' || mobilePreview === 'full' ? `<div style="height: 77px; background-color: #FBFBFB; border-radius: ${canvasBorderRadius}; border-bottom: 1px solid #e7e7e9;"></div>` : ''}
                        <div style="height:${canvasHeight}; background-color: #fff; position: relative;">
                            <story />
                        </div>
                        ${mobilePreview === 'bottom' || mobilePreview === 'full' ? `<div style="height: 77px; background-color: #FBFBFB; border-radius: ${canvasBorderRadius}; border-top: 1px solid #e7e7e9;"></div>` : ''}
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