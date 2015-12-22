import React, { Component, PropTypes } from 'react';
import { selectClient, invalidateClient, fetchClientsIfNeeded } from '../actions';
import { connect } from 'react-redux';
import Picker from '../components/Picker';

class App extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedClient } = this.props;
    debugger;
    dispatch(fetchClientsIfNeeded());
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedClient !== this.props.selectedClient) {
      const { dispatch, selectedClient, clients } = nextProps;
      dispatch(fetchClientsIfNeeded());
    }
   }

   handleChange(nextClient) {
     this.props.dispatch(selectClient(nextClient));
   }

   handleRefreshClick(e) {
     e.preventDefault();
     const { dispatch, selectedClient } = this.props;
     dispatch(invalidateClient(selectedClient));
     dispatch(fetchClientsIfNeeded());
   }

  render() {
    debugger;
    const { selectedClient, clients, isFetching, lastUpdated } = this.props;
    console.log(clients);
    return(
      <div>
        <Picker value={selectedClient}
                onChange={this.handleChange}
                options={clients}
        />
      </div>
    );
  }
}

App.propTypes = {
  selectedClient: PropTypes.string.isRequired,
  clients: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  debugger;
  const { selectedClient } = state
  const {
    isFetching,
    lastUpdated,
    items: clients
  } = {
    isFetching: true,
    items: []
  }

  return {
    selectedClient,
    clients,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App)
