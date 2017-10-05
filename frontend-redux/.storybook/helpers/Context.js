import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

class Context extends React.Component {
  getChildContext() {
    return { t: this.props.t};
  }

  render () {
    return (<div>{this.props.children}</div>);
  }
}

Context.childContextTypes = {
  t: PropTypes.func.isRequired
};

export default translate()(Context);