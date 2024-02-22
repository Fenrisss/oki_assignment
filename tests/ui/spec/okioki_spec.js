import {GoToOki, AuthorizeWithCredentials, GoToTheDoc, GetBearToken, SetInvoiceInitialState, EditExlVAT, ValidateCalculations} from '../methods/okioki_methods.js';


describe('OkiOki test', () => {

    before(async function () {
        await GoToOki();
        await AuthorizeWithCredentials('vincent.depoortere+demo4testers@gmail.com', 'Demo4Testers');
    });

    it("changes the Invoice VAT data", async () => {
        await GoToTheDoc();
        await EditExlVAT('1000');
        await ValidateCalculations('€ 943,40');
    });

    after(async function () {
        const user_token = await GetBearToken();
        await SetInvoiceInitialState(user_token);
    });

});