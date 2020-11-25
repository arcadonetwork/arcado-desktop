import React, { useContext, useState } from 'react';

import { Button, message } from 'antd';
import { useForm } from 'react-hook-form';
import { Dispatch, iRootState } from '../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../../utils/uuid';
import { createGame } from '../../shared/api/games';
import { GameModel } from '../../typings/game.model';
import { TRANSACTION_TYPES } from '@arcado/arcado-transactions/dist-node/utils';
import { CreateGameForm } from './CreateGameForm';
import { CreateGameTxConfirmation } from './CreateGameTxConfirmation';
import { isArrayWithElements } from '../../utils/type-checking';
import { NodeInfoContext } from "../../context";

type GameData = {
  id: string;
  name: string;
  description: string;
  tags: string[];
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

  const nodeInfo = useContext(NodeInfoContext);
  const [image, setImage] = useState();

  const dispatch = useDispatch<Dispatch>();
  const account = useSelector((state: iRootState) => state.account.account);
  const actionBroadcast = useSelector((state: iRootState) => state.network.actionBroadcast);

  async function createOnClick (gameData: GameData) {

    try {

      const id = generateUUID();
      const data: GameModel = {
        ...gameData,
        id
      };

      await createGame(
        data,
        account.passphrase,
        nodeInfo.networkIdentifier
      );

      dispatch.network.setActionBroadcast(TRANSACTION_TYPES.GAMES)

    } catch (e) {
      console.error(e);
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
        image={image}
        setImage={setImage}
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
      <div className="w100 flex-c flex-jc-fe mt50 pt25 br-t">
        <Button className="w175--fixed h45--fixed mr25" onClick={handleSubmit(createOnClick)}>Cancel</Button>
        <Button className="w175--fixed h45--fixed" disabled={!!actionBroadcast} type="primary" onClick={handleSubmit(createOnClick)}>Create game</Button>
      </div>
    </div>
  )
}
