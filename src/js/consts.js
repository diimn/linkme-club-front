//dev configuration
export const WEB_URL_API = "localhost:5000";
export const WEB_URL = "linkme.clud";

//prod configuration
// export const WEB_URL_API = "linkme.club";
// export const WEB_URL = "linkme.club";


export const PROTOCOL = "http://";
export const HOST_BASE = PROTOCOL + WEB_URL;
//API
export const HOST = PROTOCOL + WEB_URL_API + "/api/v1";
export const host_user = HOST + "/user-profile";
export const host_adv = HOST + "/adv";
export const host_repost = HOST + "/repost";
export const host_images = host_adv + "/image";
export const host_manager = HOST + "/manager";
export const host_clientResponse = HOST + "/clientResponse";

