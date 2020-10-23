import React from 'react';

import { Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { Dispatch, iRootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../../utils/uuid';
import { createGame } from '../../shared/api/games';
import { GameModel } from '../../models/game.model';
import { TRANSACTION_TYPES } from '@arcado/arcado-transactions/dist-node/utils';
import { CreateGameForm } from './CreateGameForm';
import { CreateGameTxConfirmation } from './CreateGameTxConfirmation';
import { isArrayWithElements } from '../../utils/type-checking';

type GameData = {
  id: string;
  name: string;
}

interface ContainerProps {
  isCreatingGame: boolean
}


export const CreateGame: React.FC<ContainerProps> = ({ isCreatingGame }) => {
  const {
    register,
    handleSubmit,
    errors
  } = useForm<GameData>()

  const dispatch = useDispatch<Dispatch>();
  const account = useSelector((state: iRootState) => state.account.account);
  const actionBroadcast = useSelector((state: iRootState) => state.network.actionBroadcast);

  async function createOnClick (gameData: GameData) {
    try {
      const gameId = generateUUID();
      const body: GameModel = {
        ...gameData,
        gameId
      };
      await createGame(body, account.passphrase);
      dispatch.network.setActionBroadcast(TRANSACTION_TYPES.GAMES)
    } catch (e) {
      if (isArrayWithElements(e.errors)) {
        e.errors.map((item: any) => message.error(item.message))
      }
      dispatch.network.setActionBroadcast(undefined);
    }
  }

  let Component;

  if (actionBroadcast) {
    Component = (
      <CreateGameTxConfirmation />
    )
  } else {
    Component = (
      <CreateGameForm
        register={register}
        errors={errors}
      />
    )
  }

  return (
    <div
      className="grid mt50"
    >
      {Component}
      <div className="flex-c">
        <div className="ml-auto">
          <Button className="w175--fixed h45--fixed mr25" onClick={handleSubmit(createOnClick)}>Cancel</Button>
          <Button className="w175--fixed h45--fixed" disabled={!!actionBroadcast} type="primary" onClick={handleSubmit(createOnClick)}>Create game</Button>
        </div>
      </div>
    </div>
  )
}
