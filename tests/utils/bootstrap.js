import('chai/register-should.js');
const puppeteer = require('puppeteer');
const {installMouseHelper} = require('../utils/mouse_pointer');
let {HEADLESS, KEEP_BROWSER_OPEN, IS_MOBILE} = require('../utils/env_config');



if (HEADLESS === 'false') {
    HEADLESS = false;
};

if (IS_MOBILE === 'false') {
    IS_MOBILE = false;
};

const isMobile = IS_MOBILE;

const getOtps = (isMobile) => {
    const currentDivesConfig = {
        width: isMobile ? '400' : '1920' ,
        height: isMobile ? '800' : '1080',
    };
    return {
        headless: HEADLESS,
        defaultViewport: null,
        slowMo: 40,
        args: [
            '--disable-gpu', `--window-size=${currentDivesConfig.width},${currentDivesConfig.height}`, '--no-sandbox',
            '--disable-setuid-sandbox', '--disable-infobars',
            '--disable-save-password-bubble', '--disable-dev-shm-usage',
            '--disable-web-security', '--disable-features=IsolateOrigins,site-per-process',
            '--use-fake-device-for-media-stream', '--use-fake-ui-for-media-stream',
            '--use-file-for-fake-video-capture=./tests/utils/data/128.mjpeg'
        ]
    };
};

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
    global.browser = await puppeteer.launch(getOtps(isMobile));
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