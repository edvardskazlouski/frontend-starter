import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';
import LoadingHOC from 'components/Loading/Loading';

import TestForm from './TestForm';
import styles from './styles';


@injectSheet(styles)
export default class Test extends PureComponent {
  static propTypes = {
    groups: ImmutablePropTypes.list,
    isOk: PropTypes.bool.isRequired,
    submitValue: PropTypes.func.isRequired,
    submittedValue: PropTypes.string,
    openTestModal: PropTypes.func.isRequired,
    initiateRequest: PropTypes.func,
    cancelRequest: PropTypes.func
  };

  state = {
    name: '',
    age: '',
    loading: false
  };

  onRequestClick = () => {
    this.props.initiateRequest('Post message');
  }

  onCancelClick = () => {
    this.props.cancelRequest();
  }

  openModal = () => this.props.openTestModal();

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state);
  };

  onLoadingClick = () => {
    this.setState({
      loading: !this.state.loading
    });
  };

  render() {
    const {
      groups,
      isOk,
      submitValue,
      submittedValue,
      classes
    } = this.props;

    return (
      <div className={classes.container}>
        <ReactHelmet
          title="Test screen"
        />
        <div className={classes.groupsSize}>
          {groups.size}
        </div>
        {
          isOk && <TestForm onSubmit={submitValue} />
        }
        <div>
        </div>
        <div>
          {submittedValue}
        </div>
        <button onClick={this.onRequestClick}>Request</button>
        <button onClick={this.onCancelClick}>Cancel request</button>
        <button onClick={this.openModal}>Open modal</button>
        <LoadingHOC classes={classes} blocking={this.state.loading}>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input type="text" id="name" onChange={this.handleChange} />
              <label htmlFor="name">Name</label>
            </div>
            <div>
              <input type="text" id="age" onChange={this.handleChange} />
              <label htmlFor="age">Age</label>
            </div>
            <button className="btn pink lighten-1">Create</button>
          </form>
        </LoadingHOC>
        <button onClick={this.onLoadingClick}>Imitate loading</button>
      </div>
    );
  }
}
