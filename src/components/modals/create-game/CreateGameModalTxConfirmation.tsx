import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../../store/store';
import { TransactionModel } from '../../../models/transaction.model';
import { isArrayWithElements } from '../../../utils/type-checking';
import useUpdateEffect from '../../../shared/hooks/UseUpdateEffect';
import { CheckCircleOutlined, LoadingOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { GameModel } from '../../../models/game.model';
import { getGamesItemRoute } from '../../../shared/router/Router';
import { History } from 'history';
import { withRouter } from 'react-router';

interface ContainerProps {
  history : History
}


const CreateGameModalTxConfirmationComponent: React.FC<ContainerProps> = ({ history }) => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();
  const newTransactions: TransactionModel<GameModel>[] = useSelector((state: iRootState) => state.network.newTransactions);
  const account = useSelector((state: iRootState) => state.account.account);
  const actionBroadcast = useSelector((state: iRootState) => state.network.actionBroadcast);

  function hasFoundBroadcastedGame () {
    const txs = newTransactions.filter(item => item.type === actionBroadcast && item.senderId === account.address);
    return isArrayWithElements(txs);
  }

  function setTxFound () {
    const tx = newTransactions.filter(item => item.type === actionBroadcast && item.senderId === account.address);
    if (isArrayWithElements(tx)) {
      const gameId = tx[0].asset.gameId;
      history.push(getGamesItemRoute(gameId));
    }
    dispatch.network.setActionBroadcast(undefined);
    dispatch.games.setIsCreatingGame(false)
  }

  useUpdateEffect(() => {
    setIsFound(true);
  }, [hasFoundBroadcastedGame()])

  useUpdateEffect(() => {
    setTimeout(() => {
      setTxFound();
    }, 3000)
  }, [isFound])

  return (
    <div className="flex-c flex-jc-c flex-column pt50 pb50">
      <div className="flex-c flex-jc-c fc-grey fs-s mt50 mb50">
        {
          !isFound
          ? (
              <>
                <LoadingOutlined />
                <span className="ml10">Searching</span>
              </>
            )
          : (
              <div className='flex-c flex-column'>
                <div className="fs-xm">
                  <CheckCircleOutlined />
                </div>
                <div className="flex-c flex-column mt15">
                  <span className="ml10">Transaction processed.</span>
                  <span className="ml10">Your game is now available.</span>
                </div>
              </div>
            )
        }
      </div>
      <div className="flex-c flex-column">
        <div className="mb10">
          <InfoCircleOutlined />
        </div>
        <p className="w70 txt-ac p0 m0 fc-grey">Blockchains broadcast actions in a format called transactions. Your transaction is now processed but we'll need to wait for confirmation.</p>
      </div>
    </div>
  )

}

export const CreateGameModalTxConfirmation = withRouter(CreateGameModalTxConfirmationComponent);
