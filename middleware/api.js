import { Schema, arrayOf, normalize } from 'normalizr';
import { camelizeKeys } from 'humps';
import 'isomorphic-fetch';

const API_ROOT = 'https://api.github.com/'

function callApi(endpoint, schema) {
  const fullUrl = (endpoint.indexOf(API_ROOT) === -1) ? API_ROOT + endpoint: endpoint;

  return fetch(fullUrl)
    .then(response =>
      response.json().then(json => ({ json, response }))
    ).then(({ json, response }) => {
      if( !response.ok) {
        return Promise.reject(json);
      }

      const camelizedJson = camelizeKeys(json);

      return Object.assign({},
        normalize(camelizedJson, schema)
      );
    });
}

const userSchema = new Schema('users', {
  idAttribute: 'login'
});

export const Schemas = {
  USER: userSchema
}

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callApi = action[CALL_API];

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!schema) {
    throw new Error('Expected an array of three action types');
  }
  if (!Array.isArray(types) || types.length !== 1) {
    throw new Error('Expected an array of three action types');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  function actionWith(data) {
    const finalAction = Object.assign({}, action, data);
    delete finalAction[CALL_API];
    return finalAction;
  }

  const [ requesType, successType, failureType ] = types;
  next(actionWith({ type: requesType}));

  return callApi(endpoint, schema).then(
    response => next(actionWith({
      response,
      type: successType
    })),
    error => next(actionWith({
      type: failureType,
      error: error.message || 'Somthing bad happened'
    }))
  );
}
