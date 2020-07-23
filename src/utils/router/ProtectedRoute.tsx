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
  const isValidAndSynced = useSelector((state: iRootState) => state.accounts.isValidAndSynced);
  return (
    <Route {...rest} render={
      props => {
        if (isValidAndSynced) {
          return <Component {...rest} {...props} />
        } else {
          return <Redirect to={ROUTES.LOGIN} />
        }
      }
    } />
  )
}
