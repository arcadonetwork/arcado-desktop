import { TournamentModel } from '../../typings/tournament.model';
import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import { stopTournament } from '../../shared/api/tournaments';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { SelectInputField } from '../SelectInputField';
import { ParticipantModel } from '../../typings/participant.model';

interface ContainerProps {
  tournament: TournamentModel,
  setIntendsToStop(value: boolean): void,
  intendsToStop: boolean,
  players: ParticipantModel[]
}

export const TournamentPageHeaderStopModal: React.FC<ContainerProps> = ({ tournament, intendsToStop, setIntendsToStop, players }) => {
  const account = useSelector((state: iRootState) => state.account.account);
  const [first, setFirstPlace] = useState<string>('');
  const [second, setSecondPlace] = useState<string>('');
  const [third, setThirdPlace] = useState<string>('');
  const [selectableAddresses, setSelectableAddresses] = useState<string[]>([]);

  useEffect(() => {
    const filteredAddresses = players
      .filter((player) => player.address !== first && player.address !== second && player.address !== third)
      .map(item => item.address)
    setSelectableAddresses(filteredAddresses);
  }, [first, second, third])

  useEffect(() => {
    const addresses = players.map((item: ParticipantModel) => item.address);
    setSelectableAddresses(addresses);
  }, [players])

  async function stop () {
    try {
      await stopTournament(tournament.gameId, tournament.id, {
        first,
        second,
        third
      }, account.passphrase);
      message.success('Finish successful')
    } catch (e) {
      console.error(e);
      message.error('something went wrong')
    }
  }

  return (
    <Modal
      title="End Game"
      visible={intendsToStop}
      onOk={stop}
      okButtonProps={{ disabled: (!first || !second || !third) }}
      onCancel={() => setIntendsToStop(false)}
      okText="End"
    >
      <div className="flex-c flex-column flex-jc-c fs-m">
        <div className="mb25">You are about to stop the game for <span className="fc-black ffm-bold">{tournament.name}</span>.</div>
        <div className="w100 mb15">
          <SelectInputField
            label="First place"
            value={first}
            setValue={setFirstPlace}
            options={selectableAddresses}
          />
        </div>
        <div className="w100 mb15">
          <SelectInputField
            label="Second place"
            value={second}
            setValue={setSecondPlace}
            options={selectableAddresses}
          />
        </div>
        <div className="w100 mb15">
          <SelectInputField
            label="Third place"
            value={third}
            setValue={setThirdPlace}
            options={selectableAddresses}
          />
        </div>
      </div>
    </Modal>
  )
}
