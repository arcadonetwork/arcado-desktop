import React from 'react';

import Modal from 'antd/es/modal';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Dispatch, iRootState } from '../../../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../../../utils/uuid';
import { createGame } from '../../../shared/api/games';
import { GameModel } from '../../../models/game.model';
import { TRANSACTION_TYPES } from '@arcado/arcado-transactions/dist-node/utils';
import { CreateGameModalForm } from './CreateGameModalForm';
import { CreateGameModalTxConfirmation } from './CreateGameModalTxConfirmation';

type GameData = {
  id: string;
  name: string;
}

interface ContainerProps {
  isCreatingGame: boolean
}


export const CreateGameModal: React.FC<ContainerProps> = ({ isCreatingGame }) => {
  const {
    register,
    handleSubmit,
    errors
  } = useForm<GameData>()

  const dispatch = useDispatch<Dispatch>();
  const account = useSelector((state: iRootState) => state.account.account);
  const actionBroadcast = useSelector((state: iRootState) => state.network.actionBroadcast);

  if (!isCreatingGame) {
    return <></>;
  }

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
      console.error(e);
      message.error('something went wrong');
      dispatch.network.setActionBroadcast(undefined);
      dispatch.games.setIsCreatingGame(false);
    }
  }

  let Component;

  if (actionBroadcast) {
    Component = (
      <CreateGameModalTxConfirmation />
    )
  } else {
    Component = (
      <CreateGameModalForm
        register={register}
        errors={errors}
      />
    )
  }

  let optionalModalProps: any = {
    onCancel : () => dispatch.games.setIsCreatingGame(false)
  }

  if (actionBroadcast) {
    optionalModalProps.footer = null;
    optionalModalProps.onCancel = () => ''
  }

  return (
    <Modal
      visible={isCreatingGame}
      onOk={handleSubmit(createOnClick)}
      closable={false}
      okButtonProps={{ disabled: !!actionBroadcast }}
      okText="Create Game"
      {...optionalModalProps}
    >
      {Component}
    </Modal>
  )
}
