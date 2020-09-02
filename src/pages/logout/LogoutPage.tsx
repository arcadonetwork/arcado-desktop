import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../store/store';
import { Loading } from '../../components/Loading';
import { Redirect } from 'react-router';
import { ROUTES } from '../../utils/router/Router';

interface ContainerProps {
}

export const LogoutPage: React.FC<ContainerProps> = () => {
  const [loggedOut, setLoggedOut] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    async function logout() {
      await dispatch.account.logout();
      setLoggedOut(true);
      return () => ''
    }
    logout();
  }, [])

  if (!loggedOut) {
    return (
      <div className="w50 m-auto mt125">
        <Loading/>
      </div>
    )
  } else {
    return <Redirect to={ROUTES.LOGIN} />
  }


}
