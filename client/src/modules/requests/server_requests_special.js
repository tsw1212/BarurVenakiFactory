const request = async (url, method, body = null, token = null) => {

    let headers = {};

    if (token) {
        headers["XAuthentication-Token"] = token;
    }
    const config = {
        method,
        headers,
    };
    config.body = body;

    try {
        const response = await fetch(url, config);
        const responseBody = await response.json();

        if (!response.ok) {
            throw new Error(responseBody.message || response.statusText);
        }
        const newtoken = response.headers.get('XAuthentication-Token');


        return {
            ok: true,
            statusCode: response.status,
            body: responseBody,
            token: newtoken
        };
        
    } catch (error) {
        return {
            ok: false,
            statusCode: error.response ? error.response.status : 500,
            body: { message: error.message },
            token: token
        };
    }
};

export const postRequest = (url, body, token = null) => request(url, "POST", body, token);
export const putRequest = (url, body, token = null) => request(url, "PUT", body, token);
