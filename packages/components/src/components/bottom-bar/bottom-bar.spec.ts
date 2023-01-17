import { newSpecPage, SpecPage } from '@stencil/core/testing';
import { BottomBar } from './bottom-bar';



describe('Bottom Bar', () => {
    it('should match snapshot', async () => {
        const page = await newSpecPage({
            components: [BottomBar],
            html: `
            <scale-bottom-bar>
                <scale-bottom-bar-item icon="home-home" selected></scale-bottom-bar-item>
                <scale-bottom-bar-item icon="action-favorite"></scale-bottom-bar-item>
                <scale-bottom-bar-item icon="content-music"></scale-bottom-bar-item>
                <scale-bottom-bar-item icon="user-file-user"></scale-bottom-bar-item>  
            </scale-bottom-bar>
            `
        });        
        expect(page.root).toMatchSnapshot();
    });
})