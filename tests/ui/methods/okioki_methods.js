import {WaitForElement, SendKeysToElement, ClickOnElement, HoverOverElement, GetText} from './base_methods.js';
import {user_document_VAT_PATCH} from '../../api/okioki_api.js';


const GoToOki = async (url = '/') => {
    await page.goto("https://okioki.app");
};

const AuthorizeWithCredentials = async (Username, Password) => {
    await WaitForElement("[id='Username']");
    await SendKeysToElement("[id='Username']", Username);
    await SendKeysToElement("[id='Password']", Password);
    await ClickOnElement("[name='button']");
};

const GoToTheDoc = async () => {
    await WaitForElement("[class='icon icon-Hamburger pointer']");
    await HoverOverElement("[class='icon icon-Hamburger pointer']");
    await WaitForElement("xpath///*[@id='app']/div[1]/div/div[1]/div/div[1]/div[2]/div//div[6]");
    await ClickOnElement("xpath///*[@id='app']/div[1]/div/div[1]/div/div[1]/div[2]/div//div[6]");
    // await base_methods.HoverOverElement("[class='icon icon-Hamburger pointer']");
    await WaitForElement("xpath///*[@class='submenu container']/div[2]");
    await ClickOnElement("xpath///*[@class='submenu container']/div[2]");
    await WaitForElement("xpath///tbody");
    await ClickOnElement("xpath///tbody/tr[5]");
    await ClickOnElement(".overlay");

};

const EditExlVAT = async (exlVATamount) => {
    await ClickOnElement("xpath///*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/div/div[4]/div/div/div/div/div[1]/div/div[2]/ul/li[3]/div[1]/span[2]/div/div[2]/div/span[1]");
    await SendKeysToElement("xpath///*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/div/div[4]/div/div/div/div/div[1]/div/div[2]/ul/li[3]/div[1]/span[2]/div/div[2]/div/span[1]", exlVATamount)
    await page.keyboard.press('Enter');
};

const ValidateCalculations = async (expected_value) => {
    const actual_exclvat_value = await GetText("xpath///*[@id='app']/div[1]/div/div[1]/div/div[2]/div[2]/div/div[4]/div/div/div/div/div[1]/div/div[2]/ul/li[15]/div[1]/span/table/tbody/tr/td[2]/div/div/div/span[1]");
    if (actual_exclvat_value === expected_value) {
        return console.log(`the expected excl. vat value ${expected_value} is met`);
    }
    else {
        return console.log('incorrect excl. vat value');
    }
};


const GetBearToken = async () => {
    const localStorageData = await page.evaluate(() => {
        let json = {};
        for (let i = 0; i < sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            json[key] = sessionStorage.getItem(key);
        };
        return json;
    });
    const userInfo = JSON.parse(localStorageData['oidc.user:https://account.okioki.app:OkiOkiEntrepreneur']);
    const idToken = userInfo.access_token;

    return idToken
};

const SetInvoiceInitialState = async (token) => {
    await user_document_VAT_PATCH(token);

};



export {
    GoToOki,
    AuthorizeWithCredentials,
    GoToTheDoc,
    EditExlVAT,
    ValidateCalculations,
    GetBearToken,
    SetInvoiceInitialState,

};