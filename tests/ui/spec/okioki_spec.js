const okiokiMethods = require('../methods/okioki_methods');




describe('okioki tests', () => {
    it("okioki go to website", async () => {
        await okiokiMethods.GoToOki();
        await okiokiMethods.AuthorizeWithCredentials('sherov.almanbet@gmail.com', 'Test1234');
        // await page.screenshot({path: './screenpic.jpeg'});
    });


});