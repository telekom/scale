// module.exports = beforeAll(async (mode) => {
//     await global.page.goto(
//       `http://host.docker.internal:3123/iframe.html?id=components-accordion--standard&viewMode=story`
//     );
//     await page.evaluate(() => {
//       localStorage.setItem('persistedColorMode', JSON.stringify(mode));
//     });
//   });



// beforeAll(async() => {
//     console.log('FOOOOOOOOO')
//     describe.each(['dark', 'light'])('%p', async (mode) => {
//         console.log('BAAAAAAAAAAAT')
//         await global.page.goto(
//         `http://host.docker.internal:3123/iframe.html?id=components-accordion--standard&viewMode=story`
//         );
//         await page.evaluate(() => {
//         localStorage.setItem('persistedColorMode', JSON.stringify(mode));
//         });  
//     })
// })


// beforeAll(() => {
//     describe.each(['dark', 'light'])('%p', (mode) => {
//         beforeEach(async() => {
//             console.log('BAAAAAAAAAAAT')
//             await global.page.goto(
//             `http://host.docker.internal:3123/iframe.html?id=components-accordion--standard&viewMode=story`
//             );
//             await page.evaluate(() => {
//             localStorage.setItem('persistedColorMode', JSON.stringify(mode));
//             });    
//         })
//     })
// })


beforeAll(async (mode) => {
    console.log('in glbal beforell')
    await global.page.goto(
      `http://host.docker.internal:3123/iframe.html?id=components-accordion--standard&viewMode=story`
    );
    await page.evaluate((mode) => {
      localStorage.setItem('persistedColorMode', JSON.stringify(mode));
    }, mode);
});