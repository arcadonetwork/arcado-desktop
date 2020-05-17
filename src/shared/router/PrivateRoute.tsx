import React, { ElementType } from 'react';
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { ROUTES } from './Router'
import { iRootState } from '../../store';
import { isObjectWithFields } from '../utils/type-checking';

interface ContainerProps {
  component: ElementType,
  exact: boolean,
  path: string
}

export const PrivateRoute: React.FC<ContainerProps> = ({ component: Component, ...rest }) => {
  const user = useSelector((state: iRootState) => state.user)
  return (
    <Route
      {...rest}
      render={
        props =>
            !isObjectWithFields(user)
              ? <Redirect to={ROUTES.LOGIN} /> : user
              ? <Component {...props} user={user} />
              : ''
      }
    />
  )
}
