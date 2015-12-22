import fetch from 'isomorphic-fetch';

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
    type: REQUEST_CLIENTS,
    clients
  };
}

function receiveClients(clients, json) {
  debugger;
  return {
    type: RECEIVE_CLIENTS,
    clients: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}

export function fetchClients(clients) {
  debugger;
  return dispatch => {
    dispatch(requestClients(clients));
    return fetch(`localhost:9000/api/clients`)
      .then(response => response.json())
      .then(json => dispatch(receiveClients(clients, json)));
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
  return (dispatch) => {
      return dispatch(fetchClients());
  }
}
