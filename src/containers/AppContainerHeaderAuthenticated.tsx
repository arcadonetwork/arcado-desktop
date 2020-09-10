import { Dispatch, iRootState } from '../store/store';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContainerHeaderAuthenticatedAccount } from './AppContainerHeaderAuthenticatedAccount';
import { Loading } from '../components/Loading';
import { CreateGameModal } from '../components/modals/create-game/CreateGameModal';

interface ContainerProps {
}

export const AppContainerHeaderAuthenticated: React.FC<ContainerProps> = () => {

  const account = useSelector((state: iRootState) => state.account.account);
  const isFundingAccount = useSelector((state: iRootState) => state.account.isFundingAccount);
  const isCreatingGame = useSelector((state: iRootState) => state.games.isCreatingGame);
  const dispatch = useDispatch<Dispatch>();

  return (
    <div className="ml-auto flex-c">
      {
        isFundingAccount
        ? (
            <div className="flex-c">
              <Loading />
              <span className="ml15 mr25 fs-s">sending fund transaction</span>
            </div>
          )
        : (
          <>
            <div onClick={() => dispatch.account.addFunds(account.address)} className="click fc-blue fs-s mr25 ffm-bold">
              Add funds
            </div>
          </>
          )
      }
      <div onClick={() => dispatch.games.setIsCreatingGame(true)} className="click fc-blue fs-s mr25 ffm-bold">
        Create Game
      </div>
      <AppContainerHeaderAuthenticatedAccount
        account={account}
      />
      {
        isCreatingGame
        ? (
            <CreateGameModal
              isCreatingGame={isCreatingGame}
            />
          )
        : <></>
      }

    </div>
  )
}

