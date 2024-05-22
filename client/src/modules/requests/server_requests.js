const request = async (url, method, body = null, token) => {
    const headers = {
      "Content-Type": "application/json",
      "XAuthentication-Token": token,
    };
  
    const config = {
      method,
      headers,
    };
  
    if (body) {
      config.body = JSON.stringify(body);
    }
  
    try {
      const response = await fetch(url, config);
  
      const responseBody = await response.json();
  
      if (!response.ok) {
        throw new Error(responseBody.message || response.statusText);
      }
  
      return {
        ok: true,
        statusCode: response.status,
        body: responseBody,
      };
    } catch (error) {
      return {
        ok: false,
        statusCode: error.response ? error.response.status : 500,
        body: { message: error.message },
      };
    }
  };
  
  export const getRequest = (url, token) => request(url, "GET", null, token);
  export const postRequest = (url, body, token) => request(url, "POST", body, token);
  export const putRequest = (url, body, token) => request(url, "PUT", body, token);
  export const deleteRequest = (url, body, token) => request(url, "DELETE", body, token);
  