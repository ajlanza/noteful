import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FormError extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError(error){
      return { hasError: true};
  }
    render() {
      if(this.state.hasError) {
        return <h3>Unable to display Form.</h3>;
      }
      return this.props.children;
  }
}

FormError.propTypes = {
  error: PropTypes.string
}