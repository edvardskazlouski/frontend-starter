import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router';
import includes from 'lodash/includes';

const  RoleRoute = ({ component, roles, currentUserRole, redirectTo, ...rest }) =>
  includes(roles, currentUserRole) ? (
    <Route
      {...rest}
      component={component}
    />
  ) : (
    <Redirect to={redirectTo}/>
  );

RoleRoute.propTypes = {
  roles: PropTypes.array,
  currentUserRole: PropTypes.string,
  redirectTo: PropTypes.string.isRequired,
};

RoleRoute.defaultProps = {
  roles: [],
};

export default RoleRoute;
