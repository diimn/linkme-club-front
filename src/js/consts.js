//dev configuration
// export const WEB_URL_API = "localhost:5000";
// export const WEB_URL = "linkme.clud";
// export const PROTOCOL = "https://";
// export const API_PROTOCOL = "http://";

//prod configuration
export const WEB_URL_API = "linkme.club";
export const WEB_URL = "linkme.club";
export const PROTOCOL = "https://";
export const API_PROTOCOL = "https://";


export const HOST_BASE = PROTOCOL + WEB_URL;
//API
export const HOST = API_PROTOCOL + WEB_URL_API + "/api/v1";
export const host_user = HOST + "/user-profile";
export const host_adv = HOST + "/adv";
export const host_repost = HOST + "/repost";
export const host_images = host_adv + "/image";
export const host_manager = HOST + "/manager";
export const host_clientResponse = HOST + "/clientResponse";
export const state_param = "test";

export const FACEBOOK_APP_ID = "1528995760605364"
export const APP_SECRET = "68972d771304db75934cf0a052e74712"
export const FACEBOOK_AUTH_URL = "https://www.facebook.com/v8.0/dialog/oauth?" +
    `client_id=${FACEBOOK_APP_ID}` +
    `&redirect_uri=https://${WEB_URL}/fbredirect` +
    `&state=${state_param}`

export const VK_AUTH_URL = "https://oauth.vk.com/authorize" +
    "?client_id=7505819&" +
    "display=page&" +
    `redirect_uri=http://${WEB_URL}/vkredirect` +
    "&scope=wall" +
    "&response_type=code&v=5.110"

export const FB_API = "https://graph.facebook.com/"

