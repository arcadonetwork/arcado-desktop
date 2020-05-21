import React, { useState } from 'react';
import { History } from 'history';
import { PageNavigation } from '../../components/PageNavigation';
import { WelcomePageLogin } from './WelcomePageLogin';
import { WelcomePageRegister } from './WelcomePageRegister';

interface ContainerProps {
  isAuthenticated: boolean,
  history : History
}

const menu = ['login', 'register']

export const WelcomePage: React.FC<ContainerProps> = ({ history }: ContainerProps) => {
  const [page, setPage] = useState(menu[0]);

  return (
    <>
      <div className="mb50 mt50">
        <h1 className="fs-xl">Welcome to <span className="fc-primary ffm-bold">Arcado</span></h1>
        <p>We gamify your gaming experience</p>
      </div>

      <PageNavigation
        menu={menu}
        activePage={page}
        setPage={setPage}
      />

      {
        page === 'login'
        ? <WelcomePageLogin history={history} />
        : <WelcomePageRegister />
      }

    </>
  )
}
