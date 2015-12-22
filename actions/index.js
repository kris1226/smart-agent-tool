import fetch from 'isomorphic-fetch';
import { Call_API, Schemas } from '../middleware/api';

export const REQUEST_CLIENTS = 'REQUEST_CLIENTS';
export const REQUEST_DATA = 'REQUEST_CLIENTS';
export const RECEIVE_CLIENTS = 'RECEIVE_CLIENTS';
export const RECEIVE_DATA = 'RECEIVE_DATA';
export const SELECT_CLIENT = 'SELECT_CLIENT';
export const INVALIDATE_CLIENT = 'INVALIDATE_CLIENT';


export function selectClient(client) {
  return {
    type: SELECT_CLIENT,
    client
  };
};

export function invalidateClient(reddit) {
  return {
    type: INVALIDATE_CLIENT,
    client
  }
}

function requestClients(clients) {
  return {
    type: REQUEST_CLIENTS
  };
}

function receiveClients(json) {
  return {
    type: RECEIVE_CLIENTS,
    clients: json.map(user => user.login),
    receivedAt: Date.now()
  };
}

export function fetchClients() {
  return dispatch => {
    dispatch(requestClients());
    return fetch(`https://api.github.com/users`)
      .then(response => response.json())
      .then(json => dispatch(receiveClients(json)));
  }
}

function shouldFetchClients(state) {
  const clients = state.clients;
  if (!clients) {
    return true
  }
  if (clients.isFetching) {
    return false
  }
  return clients.didInvalidate
}

export function fetchClientsIfNeeded() {
  debugger;
  return (dispatch, getState) => {
      if(shouldFetchClients(getState())){
        return dispatch(fetchClients());
      }      
  }
}
