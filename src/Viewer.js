import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';

export default class Viewer extends PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    const { urls } = this.props.data;
    return (
      <div>
        <img src={urls.regular} alt="main view" className="main-photo" />
      </div>
    );
  }
}
