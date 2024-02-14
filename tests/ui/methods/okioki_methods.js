const base_methods = require('../methods/base_methods');


const GoToOki = async (url = '/') => {
    await page.goto("https://okioki.app");
};

const AuthorizeWithCredentials = async (Username, Password) => {
    await base_methods.WaitForElement("[id='Username']");
    await base_methods.SendKeysToElement("[id='Username']", Username);
    await base_methods.SendKeysToElement("[id='Password']", Password);
    await base_methods.ClickOnElement("[name='button']");
};



module.exports = {
    GoToOki,
    AuthorizeWithCredentials
}