import React, { useState } from 'react';
import GameModel from '../../models/game.model';
import Modal from 'antd/es/modal';
import { TextInputField } from 'src/components/TextInputField';
import { NumberInputField } from 'src/components/NumberInputField';
import { message } from 'antd';
import { RouteComponentProps, withRouter } from 'react-router';
import { useForm } from 'react-hook-form';
import { roomsApi } from '../../shared/services/rooms';
import { iRootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { getGameRoomItemRoute } from '../../shared/router/Router';
import { toRawLsk } from '../../shared/utils/lsk';

type DistributionData = {
  first: number;
  second: number;
  third: number;
}

type RoomData = {
  id: string;
  name: string;
  maxPlayers: number;
  entryFee?: number;
  distribution: DistributionData
}

interface ContainerProps extends RouteComponentProps {
  game: GameModel,
  setIsCreatingRoom(val: boolean): any,
  isCreatingRoom: boolean
}

const GameDetailsPageHeaderCreateRoomComponent: React.FC<ContainerProps> = ({ game, isCreatingRoom, setIsCreatingRoom, history }) => {
  const {
    register,
    handleSubmit,
    errors
  } = useForm<RoomData>()
  const [distributionError, setDistributionError] = useState(undefined);
  const account = useSelector((state: iRootState) => state.session.account);

  if (!isCreatingRoom) {
    return <></>;
  }

  async function createRoom (roomData: RoomData) {
    let { first, second, third } = roomData.distribution;
    [first, second, third] = [first, second, third].map(Number);
    if ((first + second + third) !== 100) {
      setDistributionError('Prize Distribution is not equal to 100')
      return;
    } else {
      setDistributionError(undefined)
    }
    try {
      roomData.entryFee = toRawLsk(roomData.entryFee);
      const body = {
        ...roomData,
        address: account.address,
        passphrase: account.passphrase
      }
      const { room } = await roomsApi.createRoom(game.id, body);
      const uri = getGameRoomItemRoute(game.id, room.id);
      message.success('new room created');
      history.push(uri);
    } catch (e) {
      console.error(e);
      message.error('something went wrong');
      setIsCreatingRoom(false)
    }
  }

  return (
    <Modal
      visible={isCreatingRoom}
      onCancel={() => setIsCreatingRoom(false)}
      title={`${game.name} - Create room`}
      onOk={handleSubmit(createRoom)}
    >
      <div className="mb15">
        <TextInputField
          label="Name"
          name="name"
          placeholder="Noobs only!"
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
      <div className="grid-col2 mb25">
        <NumberInputField
          label="Entry Fee"
          name="entryFee"
          error={(errors.entryFee || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              min : {
                value: 1,
                message: "Min. of 1 LSK"
              }
            })
          }
        />
        <NumberInputField
          label="Players"
          name="maxPlayers"
          error={(errors.maxPlayers || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              min : {
                value: 3,
                message: "Min. 3 players"
              }
            })
          }
          defaultValue={3}
          min={3}
        />
      </div>
      <div className="w100">
        <div className="w100 pb10 mb10 br-b flex-c flex-jc-sb">
          <span className="fc-black">Price Distribution</span>
          <span className="fc-red">
            {distributionError
            ? distributionError
            : ''}
          </span>
        </div>
        <p className="mb25 w70 fs-s">The distribution is calculated on percentages. Make sure that the the distribution equals 100% when saving.</p>
        <div className="grid-col3">
          <NumberInputField
            label="#1"
            name="distribution.first"
            placeholder="50"
            error={((errors.distribution || {}).first || {}).message}
            reference={
              register({
                required: {
                  value: true,
                  message: "required"
                },
                min : {
                  value: 0,
                  message: "At least 0"
                }
              })
            }
          />
          <NumberInputField
            label="#2"
            name="distribution.second"
            error={((errors.distribution || {}).second || {}).message}
            placeholder="30"
            reference={
              register({
                required: {
                  value: true,
                  message: "required"
                },
                min : {
                  value: 0,
                  message: "At least 0"
                }
              })
            }
          />
          <NumberInputField
            label="#3"
            name="distribution.third"
            placeholder="20"
            error={((errors.distribution || {}).third || {}).message}
            reference={
              register({
                required: {
                  value: true,
                  message: "required"
                },
                min : {
                  value: 0,
                  message: "At least 0"
                }
              })
            }
          />
        </div>
      </div>
    </Modal>
  )
}

export const GameDetailsPageHeaderCreateRoom = withRouter(GameDetailsPageHeaderCreateRoomComponent);
