import axios from 'axios';

const responseModel = Object.freeze({
    STATUS: 'status',
    ERROR_MESSAGE: 'errorMessage',
    DATA: 'data'
})

const parseRESTURL = relativeUrl => {
    // eslint-disable-next-line no-restricted-globals
    const url = new URL(location.href);

    // if (url.hostname ===  'localhost'){
    //     return `${url.origin.replace("9003","9999")}${relativeUrl}`;
    // }
    return relativeUrl;

}

const getErrorResponse = (error, errorResponseMapper) => {
    const customData = errorResponseMapper
        ? errorResponseMapper(error.response.data)
        : {};
    return {
        [responseModel.STATUS]: error.response ? error.response.status : 500,
        [responseModel.ERROR_MESSAGE]: getErrorMessage(error),
        ...customData
    };
}

const getErrorMessage =  ({response, message}) =>
    (response && response.data && (response.data.message || response.data.error)) ||
    message || '';

const parseResponse = ({ status, data, errorMessage, ...rest}) => ({
    [responseModel.STATUS]: status,
    [responseModel.ERROR_MESSAGE]: errorMessage,
    [responseModel.DATA]: data,
    ...rest
});

const get = (url, otherOptions = {}) => {
    const options = {
        method: 'get',
        baseURL: parseRESTURL(url),
        ...otherOptions
    };
    const response = axios(options)
        .catch(error => getErrorResponse(error, otherOptions.errorResponseMapper))
        .then(response => parseResponse(response));
    return response;
}

const put = (url, payload, otherOptions = {}) => {
    const options = {
        method: 'put',
        baseURL: parseRESTURL(url),
        data: payload,
        ...otherOptions
    };
    return axios(options)
        .catch(error => getErrorResponse(error, otherOptions.errorResponseMapper))
        .then(response => parseResponse(response));
}

const post = (url, payload, otherOptions = {}) => {
    const options = {
        method: 'post',
        baseURL: parseRESTURL(url),
        data: payload,
        ...otherOptions
    };
    return axios(options)
        .catch(error => getErrorResponse(error, otherOptions.errorResponseMapper))
        .then(response => parseResponse(response));
}

const deleteCall = (url, otherOptions = {}) => {
    const options = {
        method: 'delete',
        baseURL: parseRESTURL(url),
        ...otherOptions
    };
    return axios(options)
        .catch(error => getErrorResponse(error, otherOptions.errorResponseMapper))
        .then(response => parseResponse(response));
}

const postFile = (url, file, otherOptions = {}) => {
    const data = new FormData();
    data.append('file', file);
    return post(url, data, {
        timeout: 30000,
        ...otherOptions
    });
};

const apiUtils = {responseModel, get, put, post, deleteCall, postFile};

export default apiUtils;
