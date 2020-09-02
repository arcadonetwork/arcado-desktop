import { TournamentModel } from '../../models/tournament.model';
import React, { useEffect, useState } from 'react';
import { message, Modal } from 'antd';
import { stopTournament } from '../../utils/api/tournaments';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { SelectInputField } from '../../components/SelectInputField';

interface ContainerProps {
  tournament: TournamentModel,
  refresh(): void,
  setIntendsToStop(value: boolean): void,
  intendsToStop: boolean
}

export const TournamentPageHeaderStopModal: React.FC<ContainerProps> = ({ tournament, refresh, intendsToStop, setIntendsToStop }) => {
  const account = useSelector((state: iRootState) => state.account.account);
  const [first, setFirstPlace] = useState<string>('');
  const [second, setSecondPlace] = useState<string>('');
  const [third, setThirdPlace] = useState<string>('');
  const [selectableAddresses, setSelectableAddresses] = useState<string[]>([]);

  useEffect(() => {
    const filteredAddresses = [].filter(address => address !== first && address !== second && address !== third)
    setSelectableAddresses(filteredAddresses);
    return () => ''
  }, [first, second, third])

  async function stop () {
    try {
      await stopTournament(tournament.gameId, tournament.tournamentId, {
        first,
        second,
        third
      }, account.passphrase);
      message.success('successfully joined the tournament')
      refresh();
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
