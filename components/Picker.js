import React, { Component, PropTypes } from 'react';

export default class Picker extends Component {
    render() {
      const { value, onChange, options } = this.props;

      return (
        <span>
          <h1>{value}</h1>
          <select onChange={event => onChange(event.target.value)}
                  value={value}>
              {options.map(option =>
                <option value={option} key={option}>
                  {option}
              </option>)
              }
          </select>
        </span>
      );
    }
};

Picker.propTypes = {
  options: ProptTypes.arrayOf(
    PropTypes.string.isRequired
  ).isRequired,
  value: PropTypes.string.isRequired
}
