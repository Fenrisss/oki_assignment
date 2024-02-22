import puppeteer from "puppeteer/internal/puppeteer.js";
import('chai/register-should.js');
import {installMouseHelper} from './mouse_pointer.js';
import {KEEP_BROWSER_OPEN} from "./env_config.js";



const setLocalStorage = async (key, value) => {
    await page.evaluate((key, value) => {
        localStorage.setItem(key, value);
    }, key, value);
};

const clearLocalStorage = async () => {
    await page.evaluate(() => {
        localStorage.clear();
    });
};

const clearSessionStorage = async () => {
    await page.evaluate(() => {
        sessionStorage.clear();
    });
};

const MobileEmulation = async (width, length) => {
    const iPhoneXREmulation = puppeteer.devices['iPhone XR'];
    await page.emulate(iPhoneXREmulation);
    // Set viewport size to 414x896 with device scale factor set to 2.
    await page.setViewport({
        width: width,
        height: length,
        deviceScaleFactor: 2,
    });
};

const TimeZoneEmulation = async (location) => {
    await page.emulateTimezone(location);
};

const PageViewPort = async (width, height, deviceScaleFactor) => {
    await page.setViewport({
        width: width,
        height: height,
        deviceScaleFactor: deviceScaleFactor,
    });
};

const scrollUp = async (page, pixels) => {
    await page.evaluate((pixels) => {
        window.scrollBy(0, -pixels);
    }, pixels);
};


const scrollDown = async (page, pixels) => {
    await page.evaluate((pixels) => {
        window.scrollBy(0, pixels);
    }, pixels);
};

before(async () => {
    global.setLocalStorageData = setLocalStorage;
    global.clearLocalStorageData = clearLocalStorage;
    global.clearSessionStorageData = clearSessionStorage;
    global.MobileEmulation = MobileEmulation;
    global.TimeZoneEmulation = TimeZoneEmulation;
    global.SetPageView = PageViewPort;
    global.scrollUp = scrollUp;
    global.scrollDown = scrollDown;
    global.browser = await puppeteer.launch({headless: false, defaultViewport: null, args:['--window-size=1920,1080'], slowMo: 30});
    // const context = browser.defaultBrowserContext();
    global.page = await browser.newPage();

    await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.0 Safari/537.36');
    await page.setDefaultNavigationTimeout(120000);
    await installMouseHelper(page);
});

after(async () => {
    if (KEEP_BROWSER_OPEN !== 'true') {
        await browser.close();
    }
});