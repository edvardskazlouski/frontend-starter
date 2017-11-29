import React from 'react';

export default class Context extends React.Component {
  render () {
    return (<div>{this.props.children}</div>);
  }
}

