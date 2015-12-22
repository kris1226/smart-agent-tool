import { combineReducers } from 'redux';
import {
  SELECT_CLIENT, INVALIDATE_CLIENT,
  REQUEST_CLIENTS, RECEIVE_CLIENTS
} from '../actions';

function selectedClient(state = 'client', action) {
  switch (action.type) {
    case SELECT_CLIENT:
      return action.client;
    default:
      return state;
  }
}

function clients(state = {
  isfetching: false,
  didInvalidate: false,
  items: []
}, action) {
  switch (action.type) {
    case INVALIDATE_CLIENT:
      return Object.assign({}, state, {
        didInvalidate: true
      });
    case REQUEST_CLIENTS:
      return Object.assign({}, state, {
        isfetching: false,
        didInvalidate: false
      });
    case RECEIVE_CLIENTS:
      return Object.assign({}, state, {
        isfetching: false,
        didInvalidate: false,
        items: action.clients,
        lastUpdated: action.receivedAt
      });
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  selectedClient,
  clients
});

export default rootReducer;
