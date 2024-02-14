import('chai/register-should.js');


const elements_handler = async (element, options = {}) => {
    const element_handler_error = (message) => {
        const error_text = {
            error_message: message,
            error_tips: 'Element is not visible within DOM'
        };

        return new Error(JSON.stringify(error_text, null, 4));
    };

    if (!element) {
        throw Error('Empty selector');
    } else if (element.startsWith('//') || element.startsWith('(//')) {
        return await page.waitForSelector(element, {
            visible: true,
            timeout: options.timeout,
            hidden: options.hidden
        }).catch(error => {
            throw element_handler_error(error.message);
        });
    } else {
        return await page.waitForSelector(element, {
            visible: true,
            timeout: options.timeout,
            hidden: options.hidden
        }).catch(error => {
            throw element_handler_error(error.message);
        });
    }
};

const ClickOnElement = async (element, delay = 0, count = 1) => {
    await elements_handler(element)
        .then(elementHandle => elementHandle.click({delay: delay, clickCount: count}));
};

const SendKeysToElement = async (element, text, timeout) => {
    await elements_handler(element, {timeout: timeout}).then(elementHandle => elementHandle.type(text.toString()));
};

const SelectValueOfDropdown = async (element, value) => {
    await elements_handler(element, {hidden: true}, {timeout: 50000}).then(elementHandle => elementHandle.select(value.toString()));
};

const WaitForElement = async (element, timeout, hidden) => {
    await elements_handler(element, {hidden, timeout: 50000});
};

const GetText = async (element) => {
    const text = await elements_handler(element).then(elementHandle => elementHandle.evaluate(el => el.innerText));
    return text.trim();
};

const GetElementAttributeValue = async (element, attribute, hidden) => {
    return await elements_handler(element, {hidden}).then(elementHandle => elementHandle.evaluate((el, atr) => {
        return el.getAttribute(atr);
    }, attribute));
};

const ElementShouldHaveTextAttribute = async (element, expectedText) => {
    const actual_text = await GetElementAttributeValue(element, "value");
    return actual_text.should.have.string(expectedText);
};

const ClearInputField = async (element) => {
    await elements_handler(element).then(elementHandle => elementHandle.evaluate(el => el.value = ''));
};

const HoverOverElement = async (element) => {
    await elements_handler(element).then(elementHandle => elementHandle.hover());
};

const ElementShouldHaveTextDiv = async (element, expectedText) => {
    const actual_text = await GetText(element);
    return actual_text.should.have.string(expectedText);
};

const ElementAbsence = async (element, timeout = 2000) => {
    await page.waitForTimeout(timeout);

    if (element.startsWith('//')) {
        const exists = await page.$x(element);

        return exists.should.be.empty;
    } else {
        const exists = await page.$(element);

        return should.equal(exists, null);
    }
};

const UploadFile = async (element, file) => {
    await elements_handler(element, {hidden: true}).then(elementHandle => elementHandle.uploadFile(file));
};

const GetIframe = async (idOrUrl) => {
    const iframe = idOrUrl.startsWith('/') ?
        page.frames().find(frames => frames.url().includes(idOrUrl)) :
        await elements_handler(idOrUrl).then(handler => handler.contentFrame());

    const ClickOnElement = async (element) => {
        await iframe.click(element);
    };

    const WaitForElement = async (element) => {
        await iframe.waitForSelector(element);
    };

    const SendKeysToElement = async (element, text) => {
        await iframe.type(element, text);
    };

    const GetText = async (element) => {
        return await iframe.$eval(element, el => el.innerText);
    };

    const SelectValueOfDropdown = async (element, value) => {
        await iframe.waitForSelector(element)
            .then(elementHandle => elementHandle.select(value.toString()));
    };

    return {ClickOnElement, WaitForElement, SendKeysToElement, GetText, SelectValueOfDropdown};
};



module.exports = {
    elements_handler,
    ClickOnElement,
    SendKeysToElement,
    SelectValueOfDropdown,
    WaitForElement,
    GetText,
    ElementShouldHaveTextAttribute,
    GetElementAttributeValue,
    ClearInputField,
    HoverOverElement,
    ElementShouldHaveTextDiv,
    ElementAbsence,
    UploadFile,
    GetIframe
}