import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import ImmutablePropTypes from 'react-immutable-proptypes';

import FileUploader from 'components/FileUploader';

import TestForm from './TestForm';
import styles from './styles';


const TestChild = (props) => console.log(props) || (
  <div style={{ backgroundColor: 'green', height: 50, width: 50}}>
  </div>
);

const TestPreloader = () => (
  <div style={{ backgroundColor: 'red', height: '50px' }}/>
);

@withStyles(styles)
export default class Test extends PureComponent {
  static propTypes = {
    groups: ImmutablePropTypes.list,
    isOk: PropTypes.bool.isRequired,
    submitValue: PropTypes.func.isRequired,
    submittedValue: PropTypes.string,
    openTestModal: PropTypes.func.isRequired,
  };

  render() {
    const {
      groups,
      isOk,
      submitValue,
      submittedValue,
      openTestModal,

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
          <FileUploader
            preloader={<TestPreloader/>}
            component={<TestChild/>}
            multiple
          />
        </div>
        <div>
          {submittedValue}
        </div>
        <button onClick={openTestModal}>Open modal</button>
      </div>
    );
  }
}
