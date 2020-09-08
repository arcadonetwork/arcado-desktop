import { TournamentModel } from '../../models/tournament.model';
import React from 'react';
import { message, Modal } from 'antd';
import { joinTournament } from '../../shared/api/tournaments';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { fromRawLsk } from '../../utils/lsk';

interface ContainerProps {
  tournament: TournamentModel,
  setIntendsToParticipate(value: boolean): void,
  intendsToParticipate: boolean
}

export const TournamentPageHeaderParticipateModal: React.FC<ContainerProps> = ({ tournament, intendsToParticipate, setIntendsToParticipate }) => {
  const account = useSelector((state: iRootState) => state.account.account);

  async function participate () {
    try {
      const isPresent = [].find(address => address === account.address)
      if (isPresent) {
        message.error('You are already participating')
        return;
      }
      await joinTournament(tournament.gameId, tournament.tournamentId, account.passphrase);
      message.success('successfully joined the tournament')
    } catch (e) {
      console.error(e);
      message.error('something went wrong')
    }
  }


  return (
    <Modal
      title="Accept Transaction"
      visible={intendsToParticipate}
      onOk={participate}
      onCancel={() => setIntendsToParticipate(false)}
      okText="Participate"
    >
      <div className="flex-c flex-column flex-jc-c fs-m">
        <div className="">You are about to participate in the <span className="fc-black ffm-bold">{tournament.name}</span> tournament.</div>
        <div>Do you agree on adding <span className="fc-black ffm-bold">{fromRawLsk(tournament.entryFee)} LSK</span> from your balance to the prize pool?</div>
      </div>
    </Modal>
  )
}
