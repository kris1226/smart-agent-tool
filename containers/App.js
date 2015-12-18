import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Picker from '../components/Picker';

class App extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    return(
      <div>
        <Picker />
      </div>
    );

  }

}
