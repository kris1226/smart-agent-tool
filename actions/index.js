import fetch from 'isomorphic-fetch';
import { Call_API, Schemas } from '../middleware/api';

export const REQUEST_CLIENTS = 'REQUEST_CLIENTS';
export const RECEIVE_CLIENTS = 'RECEIVE_CLIENTS';
export const SELECT_CLIENT = 'SELECT_CLIENT';
export const INVALIDATE_CLIENT = 'INVALIDATE_CLIENT';


exports function selectClient(client) {
  return {
    type: SELECT_CLIENT,
    client
  };
};

function requestClients(client) {
  return {
    type: REQUEST_CLIENTS,
    client
  };
}

receiveClients(client, json) {
  return {
    type: RECEIVE_CLIENTS,
    client: client,
    clients: json.data.children.map(child => child.data),
    receivedAt: Date.now()
  };
}
