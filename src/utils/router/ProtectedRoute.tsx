import React  from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ROUTES } from './Router'
import { iRootState } from '../../store/store';

interface ContainerProps {
  component: any,
  exact: boolean,
  path: String
}

export const ProtectedRoute = ({ component: Component, exact, path,  ...rest } : ContainerProps) => {
  const isAuthenticated = useSelector((state: iRootState) => state.session.isAuthenticated);
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
