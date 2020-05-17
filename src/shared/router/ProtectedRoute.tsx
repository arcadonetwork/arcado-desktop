import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { ROUTES } from './Router'
import { iRootState } from '../../store/store';
import { isObjectWithFields } from '../utils/type-checking';
import UserModel from '../../models/user.model';

interface ContainerProps {
  user: UserModel,
  component: any,
  exact: boolean,
  path: String
}

const mapStateToProps = (state: iRootState) => {
  return {
    user: state.session.user
  }
}

const mapDispatch = () => ({})

const ProtectedRouteComponent = ({ component: Component, user, exact, path, ...rest } : ContainerProps) => {
  return (
    <Route {...rest} render={
      props => {
        if (isObjectWithFields(user)  && user.userId) {
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
