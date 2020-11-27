import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../../store/store';
import { TransactionModel } from '../../../typings/transaction.model';
import { isArrayWithElements } from '../../../utils/type-checking';
import useUpdateEffect from '../../../shared/hooks/UseUpdateEffect';
import { getGameTournamentItemRoute } from '../../../shared/router/routes';
import { History } from 'history';
import { withRouter } from 'react-router';
import { TournamentModel } from '../../../typings/tournament.model';
import { TransactionBroadcasted } from '../helpers/TransactionBroadcasted';
import { TransactionFound } from '../helpers/TransactionFound';

interface ContainerProps {
  history : History
}


const CreateGameModalTxConfirmationComponent: React.FC<ContainerProps> = ({ history }) => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();
  const newTransactions: TransactionModel<TournamentModel>[] = useSelector((state: iRootState) => state.network.newTransactions);
  const account = useSelector((state: iRootState) => state.account.account);
  const actionBroadcast = useSelector((state: iRootState) => state.network.actionBroadcast);

  function hasFoundBroadcastedTournament () {
    const txs = newTransactions.filter(item => item.type === actionBroadcast && item.senderId === account.address);
    return isArrayWithElements(txs);
  }

  function setTxFound () {
    const tx = newTransactions.filter(item => item.type === actionBroadcast && item.senderId === account.address);
    if (isArrayWithElements(tx)) {
      const { gameId, id } = tx[0].asset;
      history.push(getGameTournamentItemRoute(gameId, id));
    }
    dispatch.network.setActionBroadcast(undefined);
    dispatch.tournaments.setIsCreatingTournament(false)
  }

  useUpdateEffect(() => {
    setIsFound(true);
  }, [hasFoundBroadcastedTournament()])

  useUpdateEffect(() => {
    setTimeout(() => {
      setTxFound();
    }, 3000)
  }, [isFound])

  return (
    <div className="flex-c flex-jc-c flex-column pt50 pb50">
      <div className="flex-c flex-jc-c fc-grey mt50 mb50">
        {
          !isFound
          ? <TransactionBroadcasted />
          : <TransactionFound />
        }
      </div>
    </div>
  )

}

export const CreateTournamentModalTxConfirmation = withRouter(CreateGameModalTxConfirmationComponent);
