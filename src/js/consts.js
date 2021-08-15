
export const PROTOCOL = "https://";

//dev configuration
export const WEB_URL_API = "localhost:5000";
export const API_PROTOCOL = "http://";
export const WEB_URL = "linkme.clud";

//prod configuration
// export const WEB_URL_API = "linkme.club";
// export const API_PROTOCOL = "https://";
// export const WEB_URL = "linkme.club";
//todo убрать
export const WEB_URL1 = "linkme.club";
export const YA_METRICS_ACC= "75104974"
export const GOOGLE_ANALYTIC_ACC= "UA-192905453-1"
export const FACEBOOK_PIXEL_ACC= "3857929924334795"

// export const YA_METRICS_ACC= "73359949"

export const HOST_BASE = PROTOCOL + WEB_URL;
//API
export const HOST = API_PROTOCOL + WEB_URL_API + "/api/v1";
export const host_user = HOST + "/user-profile";
export const host_adv = HOST + "/adv";
export const host_repost = HOST + "/repost";
export const host_images = HOST + "/image";
export const host_manager = HOST + "/manager";
export const host_clientResponse = HOST + "/clientResponse";
export const host_counter = HOST + "/counter";

export const state_param = "test";

export const FACEBOOK_APP_ID = "1528995760605364"
export const APP_SECRET = "68972d771304db75934cf0a052e74712"
// export const FACEBOOK_APP_ID = "603055209739468"
// export const APP_SECRET = "c753b787bd499f4740d435b2906fb97e"

export const FACEBOOK_AUTH_URL = "https://www.facebook.com/v8.0/dialog/oauth?" +
    `client_id=${FACEBOOK_APP_ID}` +
    `&redirect_uri=https://${WEB_URL1}/fbredirect` +
    `&state=${state_param}`

export const VK_AUTH_URL = "https://oauth.vk.com/authorize" +
    "?client_id=7505819&" +
    "display=page&" +
    `redirect_uri=http://${WEB_URL}/vkredirect` +
    "&scope=wall" +
    "&response_type=code&v=5.110"

export const FB_API = "https://graph.facebook.com/"

