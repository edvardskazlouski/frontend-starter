import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import classnames from 'classnames';
// import { keyboardArrowDown } from 'material-ui-icons/';

import styles from './styles';

@injectSheet(styles)
export default class Select extends Component {
  static propTypes = {
    className: PropTypes.string,
    classes: PropTypes.object,
    onChange: PropTypes.func,
    defaultIndex: PropTypes.number,
    items: PropTypes.array,
  };

  constructor(props) {
    super();

    this.state = {
      expanded: false,
      activeIndex: props.defaultIndex || 0,
    };
  }

  handleChange = (index) => {
    const { onChange } = this.props;
    onChange && onChange(index);
    this.setState(() => ({ activeIndex: index, expanded: false }));
  };

  toggle = () => {
    const expanded = !this.props.expanded;
    this.setState(() => ({ expanded }));
  };

  render(){
    const { className, classes, items } = this.props;
    const { activeIndex, expanded } = this.state;
    const { root, pickerRoot, header } = classes;

    return (
      <div className={classnames(root, className)}>
        <div
          className={header}
          onClick={this.toggle}
        >
          {items[activeIndex]}
        </div>
        {expanded && (
          <ul className={pickerRoot}>
            {items.map((item, index) => (
              <li
                key={index}
                onClick={() => this.handleChange(index)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
}

Select.defaultProps = {

};
