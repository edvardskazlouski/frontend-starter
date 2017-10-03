import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import TestForm from '../../components/TestForm';

export default class Test extends PureComponent {
  static propTypes = {
    groups: ImmutablePropTypes.list,
    isOk: PropTypes.bool.isRequired,
    submitValue: PropTypes.func.isRequired,
    submittedValue: PropTypes.string
  };

  render() {
    const {
      groups,
      isOk,
      submitValue,
      submittedValue,
    } = this.props;

    return (
      <div>
        <ReactHelmet
          title="Test screen"
        />
        <div>
          {groups.size}
        </div>
        {
          isOk && <TestForm onSubmit={submitValue} />
        }
        <div>
          {submittedValue}
        </div>
      </div>
    );
  }
}
