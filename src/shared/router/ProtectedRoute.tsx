import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROUTES } from './Router'
import { iRootState } from '../../store/store';

interface ContainerProps {
  isAuthenticated: boolean,
  component: any,
  exact: boolean,
  path: String
}

const mapStateToProps = (state: iRootState) => {
  return {
    account: state.session.account,
    isAuthenticated: state.session.isAuthenticated
  }
}

const mapDispatch = () => ({})

const ProtectedRouteComponent = ({ component: Component, isAuthenticated, exact, path,  ...rest } : ContainerProps) => {
  return (
    <Route {...rest} render={
      props => {
        if (isAuthenticated) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={ROUTES.LOGIN} />
        }
      }
    } />
  )
}

export const ProtectedRoute = connect(
  mapStateToProps,
  mapDispatch
)(ProtectedRouteComponent)
