/**
 * Copyright © 2018, JDA Software Group, Inc. ALL RIGHTS RESERVED.
 * <p>
 * This software is the confidential information of JDA Software, Inc., and is licensed
 * as restricted rights software. The use,reproduction, or disclosure of this software
 * is subject to restrictions set forth in your license agreement with JDA.
 */
import "whatwg-fetch";

/**
 * Parses the JSON returned by a network request
 *
 * @param  {object} response A response from a network request
 *
 * @return {object}          The parsed JSON from the request
 */
function parseJSON(response) {
  if (response.status === 204 || response.status === 205) {
    return null;
  }
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.indexOf("text/csv") !== -1) {
    const headers = response.headers.get("content-disposition");
    const name = headers.split("=")[1];
    response.blob().then(blob => {
      const url = window.URL.createObjectURL(
        new Blob([blob], { type: "text/csv" })
      );
      const link = document.createElement("a");
      link.style = "display: none";
      link.href = url;
      link.setAttribute("download", name);
      document.body.appendChild(link);
      link.click();
    });
  }
  return response.json();
}

/**
 * Checks if a network request came back fine, and throws an error if not
 *
 * @param  {object} response   A response from a network request
 *
 * @return {object|undefined} Returns either the response, or throws an error
 */
function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  // Redirect to login
  if (response.status === 401) {
    return window.location.assign("/login");
  }

  return response.json().then(json => {
    const error = {
      json,
      url: response.url,
      throwError: true
    };
    return error;
  });
}

function checkException(response) {
  if (response.throwError === true) {
    const error = new Error(response.errmsg);
    error.error = response.json;

    if (error.error && !error.error.message) {
      error.error.message = `Unexpected server error [${response.url
        .split("/")
        .pop()} ]`;
    }
    throw error;
  }
  return response;
}

/**
 * Requests a URL, returning a promise
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 *
 * @return {object}           The response data
 */
export default function request(url, options) {
  const newOptions = options;
  // Rewrite to GET for dev purposes
  // This supports POST to return some kind of data
  // if (process.env.NODE_ENV === 'development' && newOptions) {
  //   if (newOptions.method) {
  //     delete newOptions.method;
  //   }
  //
  //   if (newOptions.body) {
  //     delete newOptions.body;
  //   }
  // }

  //   console.log(newOptions);

  // Use credentials with same-origin to prevent new session every request
  // PUT condition added to skip parseJSON call, as response body doesn't contain anything, bcoz of which response.json() is returning error
  if (options && options.method === "POST") {
    return fetch(url, { ...newOptions, credentials: "same-origin" })
      .then(checkStatus)
      .then(checkException)
      .catch(error => {
        throw error;
      });
  }
  return fetch(url, { ...newOptions, credentials: "same-origin" })
    .then(checkStatus)
    .then(checkException)
    .then(parseJSON)
    .catch(error => {
      throw error;
    });
}
