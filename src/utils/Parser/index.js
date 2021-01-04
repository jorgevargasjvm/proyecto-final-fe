export function parseError(error) {
    console.error("ERROR:")
    if (error.response) {
        console.error("RESPONSE DATA",error.response.data);
        console.error("RESPONSE STATUS",error.response.status);
        console.error("RESPONSE HEADERS",error.response.headers);
        return error?.response?.data?.error;
    } else if (error.request) {
        console.error("REQUEST",error.request);
        return "Error with request";
    } else {
        console.error('MESSAGE', error.message);
        return error?.message;
    }

}