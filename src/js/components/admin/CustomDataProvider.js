import {
    CREATE,
    DELETE,
    DELETE_MANY,
    fetchUtils,
    GET_LIST,
    GET_MANY,
    GET_MANY_REFERENCE,
    GET_ONE,
    UPDATE,
    UPDATE_MANY
} from "react-admin";


/**
 * Maps react-admin queries to a REST API implemented using Java Spring Boot and Swagger
 *
 * @example
 * GET_LIST     => GET http://my.api.url/posts?page=0&pageSize=10
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts?id=1234&id=5678
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchUtils.fetchJson) => {
    console.log("test")
    /**
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} { url, options } The HTTP request parameters
     */
    const convertDataRequestToHTTP = async (type, resource, params) => {
        console.log("resource: " + resource)
        console.log("type: " + type)
        console.log(params)
        let url = "";
        const options = {};
        switch (type) {
            case GET_LIST: {
                const {page, perPage} = params.pagination;
                url = `${apiUrl}/${resource}/getAll?page=${page}&pageSize=${perPage}`;
                // url = `${apiUrl}/${resource}/getAll`;
                break;
            }
            case GET_ONE: {
                url = `${apiUrl}/${resource}/${params.id}`;
                break;
            }
            case GET_MANY: {
                const query = {
                    filter: JSON.stringify({id: params.ids})
                };
                let idStr = "";
                const queryString = params.ids.map(id => idStr + `id=${id}`);
                url = `${apiUrl}/${resource}?${idStr}}`;
                break;
            }
            case GET_MANY_REFERENCE: {
                const {page, perPage} = params.pagination;
                url = `${apiUrl}/${resource}?page=${page}&pageSize=${perPage}`;
                break;
            }
            case UPDATE: {
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "PUT";
                // options.method = "POST";
                console.log("UPDATE")
                let data = await createDataWithImages(params);
                console.log(data)
                options.body = JSON.stringify(data);

                break;
            }
            case CREATE: {
                url = `${apiUrl}/${resource}/create`;
                options.method = "POST";
                console.log(params.data)
                console.log(url)
                // let blob = await fetch(params.data.headPhoto.src).then(r => r.blob());
                // const result = await toBase64(blob).catch(e => Error(e));

                let headPhotoBlob;
                let slider1BlobList;
                let slider2BlobList;
                let brokerPhotoBlob;
                let shareImageBlob;
                if (params.data.headPhoto) {
                    headPhotoBlob = await urlSrcToBase64(params.data.headPhoto.src)
                }
                if (params.data.slider1) {
                    slider1BlobList = await Promise.all(urlListToBase64List(params.data.slider1))
                }
                if (params.data.slider2) {
                    slider2BlobList = await Promise.all(urlListToBase64List(params.data.slider2))
                }
                if (params.data.brokerPhoto) {
                    brokerPhotoBlob = await urlSrcToBase64(params.data.brokerPhoto.src)
                }
                if (params.data.shareImage) {
                    shareImageBlob = await urlSrcToBase64(params.data.shareImage.src)
                }

                let data = {
                    url: params.data.url,
                    headPhoto: headPhotoBlob,
                    slider1: slider1BlobList,
                    slider2: slider2BlobList,
                    brokerPhoto: brokerPhotoBlob,
                    shareImage: shareImageBlob,
                    advContent: params.data.advContent
                }
                console.log(data)

                options.body = JSON.stringify(data);
                break;
            }
            case DELETE: {
                url = `${apiUrl}/${resource}/${params.id}`;
                options.method = "DELETE";
                break;
            }

            default:
                throw new Error(`Unsupported fetch action type ${type}`);
        }
        return {url, options};
    };

    const urlListToBase64List = urlList => {
        if (urlList)
            return urlList.map(async function (url, index) {
                return {index: index, content: await urlSrcToBase64(url.src)}
                // return urlSrcToBase64(url.src)
            })
    }

    const createDataWithImages = async (params) => {
        console.log("qwe")
        let headPhotoBlob;
        let slider1BlobList;
        let slider2BlobList;
        let brokerPhotoBlob;
        let shareImageBlob;
        if (params.data.headPhoto) {
            headPhotoBlob = await urlSrcToBase64(params.data.headPhoto.src)
        }
        if (params.data.slider1) {
            slider1BlobList = await Promise.all(urlListToBase64List(params.data.slider1))
        }
        if (params.data.slider2) {
            slider2BlobList = await Promise.all(urlListToBase64List(params.data.slider2))
        }
        if (params.data.brokerPhoto) {
            brokerPhotoBlob = await urlSrcToBase64(params.data.brokerPhoto.src)
        }
        if (params.data.shareImage) {
            shareImageBlob = await urlSrcToBase64(params.data.shareImage.src)
        }

        let data = {
            url: params.data.url,
            headPhoto: headPhotoBlob,
            slider1: slider1BlobList,
            slider2: slider2BlobList,
            brokerPhoto: brokerPhotoBlob,
            shareImage: shareImageBlob,
            advContent: params.data.advContent
        }
        return data;
    }


    const urlSrcToBase64 = async src => {
        console.log("src")
        console.log(src)
        let blob = await fetch(src).then(r => r.blob());
        return await toBase64(blob).catch(e => Error(e))
    };

    const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });


    /**
     * @param {Object} response HTTP response from fetch()
     * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
     * @param {String} resource Name of the resource to fetch, e.g. 'posts'
     * @param {Object} params The data request params, depending on the type
     * @returns {Object} Data response
     */
    const convertHTTPResponse = (response, type, resource, params) => {
        const {headers, json} = response;
        switch (type) {
            case GET_LIST:
            case GET_MANY_REFERENCE:
                if (!json.hasOwnProperty("totalElements")) {
                    throw new Error(
                        "The numberOfElements property must be must be present in the Json response"
                    );
                }
                return {
                    data: json.content,
                    total: parseInt(json.totalElements, 10)
                };
            case CREATE:
                return {data: {...params.data, id: json.id}};
            default:
                return {data: json};
        }
    };

    /**
     * @param {string} type Request type, e.g GET_LIST
     * @param {string} resource Resource name, e.g. "posts"
     * @param {Object} payload Request parameters. Depends on the request type
     * @returns {Promise} the Promise for a data response
     */
    return async (type, resource, params) => {
        // simple-rest doesn't handle filters on UPDATE route, so we fallback to calling UPDATE n times instead
        if (type === UPDATE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: "PUT",
                        body: JSON.stringify(params.data)
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json)
            }));
        }
        // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
        if (type === DELETE_MANY) {
            return Promise.all(
                params.ids.map(id =>
                    httpClient(`${apiUrl}/${resource}/${id}`, {
                        method: "DELETE"
                    })
                )
            ).then(responses => ({
                data: responses.map(response => response.json)
            }));
        }

        const {url, options} = await convertDataRequestToHTTP(type, resource, params);
        return httpClient(url, options).then(response =>
            convertHTTPResponse(response, type, resource, params)
        );
    };
};