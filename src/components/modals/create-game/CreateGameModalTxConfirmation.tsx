import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../../store/store';
import { TransactionModel } from '../../../models/transaction.model';
import { isArrayWithElements } from '../../../utils/type-checking';
import useUpdateEffect from '../../../shared/hooks/UseUpdateEffect';
import { CheckOutlined, LoadingOutlined } from '@ant-design/icons';

interface ContainerProps {
}


export const CreateGameModalTxConfirmation: React.FC<ContainerProps> = () => {
  const [isFound, setIsFound] = useState<boolean>(false);
  const dispatch = useDispatch<Dispatch>();
  const newTransactions: TransactionModel[] = useSelector((state: iRootState) => state.network.newTransactions);
  const account = useSelector((state: iRootState) => state.account.account);
  const actionBroadcast = useSelector((state: iRootState) => state.network.actionBroadcast);

  function hasFoundBroadcastedGame () {
    const txs = newTransactions.filter(item => item.type === actionBroadcast && item.senderId === account.address);
    return isArrayWithElements(txs);
  }

  function setTxFound () {
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
              <>
                <CheckOutlined />
                <span className="ml10">Transaction processed. Your game is now available.</span>
              </>
            )
        }
      </div>
      <p className="w70 txt-ac p0 m0">We are creating your game. We are waiting for confirmation that the game has been
        created.</p>
    </div>
  )

}
