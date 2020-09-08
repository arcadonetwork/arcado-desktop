import React from 'react';

import Modal from 'antd/es/modal';
import { TextInputField } from 'src/components/TextInputField';
import { message } from 'antd';
import { useForm } from 'react-hook-form';
import { Dispatch, iRootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { generateUUID } from '../utils/uuid';
import { createGame } from '../shared/api/games';
import { GameModel } from '../models/game.model';
import { TextAreaInputField } from './TextAreaInputField';

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
      message.success('new tournament created');
      dispatch.games.setIsCreatingGame(false);
    } catch (e) {
      console.error(e);
      message.error('something went wrong');
      dispatch.games.setIsCreatingGame(false);
    }
  }

  return (
    <Modal
      visible={isCreatingGame}
      onCancel={() => dispatch.games.setIsCreatingGame(false)}
      onOk={handleSubmit(createOnClick)}
      closable={false}

    >
      <div className="mb25 br-b pb10">
        <h2 className="ffm-bold fs-m p0 m0">Create Game</h2>
      </div>
      <div className="mb15">
        <TextInputField
          label="Name"
          name="name"
          placeholder="Fortnite, Poker, League of Legends, etc."
          error={(errors.name || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              minLength: {
                value: 3,
                message: "At least 3 chars."
              }
            })
          }
        />
      </div>
      <div className="mb15">
        <TextAreaInputField
          label="Description"
          name="description"
          placeholder="What is the game about?"
          error={(errors.name || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              minLength: {
                value: 3,
                message: "At least 3 chars."
              }
            })
          }
        />
      </div>
    </Modal>
  )
}
