import { ACCESS_TOKEN, UID, CLIENT, EXPIRY } from '../constants';

function csrfToken(document) {
  return document.querySelector('[name="csrf-token"]').content;
}

export function passCsrfToken(document, axios) {
  axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken(document);
}

export const axiosDefaultHeaders = (axios) => {

  //   axios.interceptors.request.use(function (config) {
  //     const token = store.getState().session.token;
  //     config.headers.Authorization =  token;

  //     return config;
  // });

  // instance.interceptors.request.use((request) => {
  //   request.requestStartedAt = Date.now();
  //   return request;
  // });

  axios.interceptors.request.use((request) => {
    request.headers['X-CSRF-TOKEN'] = csrfToken(document);
    request.headers['access-token'] = localStorage.getItem(ACCESS_TOKEN);
    request.headers['uid'] = localStorage.getItem(UID);
    request.headers['client'] = localStorage.getItem(CLIENT);
    request.headers['token-type'] = 'Bearer';
    request.headers['csrf-token'] = csrfToken(document);
    request.headers['expiry'] = localStorage.getItem(EXPIRY);
    return request;
  });


  axios.interceptors.response.use((response) => {
    if (response.headers['access-token']) {
      console.log(response.headers);
      localStorage.setItem(ACCESS_TOKEN, response.headers["access-token"]);
      localStorage.setItem(CLIENT, response.headers["client"]);
      localStorage.setItem(UID, response.headers["uid"]);
      localStorage.setItem(EXPIRY, response.headers["expiry"]);
    }
    return response;
  });
};