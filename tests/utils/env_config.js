import 'dotenv/config';

const env = process.env.PRODUCT
const getProductURL = (env) => {
    if(env === 'okioki') {
        const URL = `okioki.app`
        return URL
    };
};

const SHOP_URL = getProductURL(env);
const HEADLESS = process.env.HEADLESS;
const KEEP_BROWSER_OPEN = process.env.KEEP_BROWSER_OPEN;
const VIDEO_RECORDING = process.env.VIDEO_RECORDING;
const IS_MOBILE = process.env.IS_MOBILE;


export {
    SHOP_URL,
    HEADLESS,
    KEEP_BROWSER_OPEN,
    VIDEO_RECORDING,
    IS_MOBILE,
};
