import React, { useState } from 'react';
import { TournamentModel } from '../../models/tournament.model';
import { Button, message } from 'antd';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { startTournament } from '../../utils/api/tournaments';
import { TournamentPageHeaderParticipateModal } from './TournamentPageHeaderParticipateModal';
import { TournamentPageHeaderStopModal } from './TournamentPageHeaderStopModal';
import { ParticipantModel } from '../../models/participant.model';

interface ContainerProps {
  tournament: TournamentModel,
  refresh(): void,
  players: ParticipantModel[]
}

export const TournamentPageHeaderActions: React.FC<ContainerProps> = ({ tournament, refresh, players }) => {

  const account = useSelector((state: iRootState) => state.account.account);
  const [intendsToParticipate, setIntendsToParticipate] = useState<boolean>(false);
  const [intendsToStop, setIntendsToStop] = useState<boolean>(false);

  async function start () {
    if (players.length !== Number(tournament.maxPlayers)) {
      message.error('The tournament isn\'t full');
      return;
    }
    try {
      await startTournament(tournament.gameId, tournament.tournamentId, account.passphrase);
      message.success('successfully started the tournament')
      refresh();
    } catch (e) {
      console.error(e);
      message.error('something went wrong')
    }
  }

  let actions = [];

  if (tournament.status === 2) {
    actions.push(<div>
      game is finished
    </div>)
  } else if (tournament.createdBy === account.address) {
    if (tournament.status === 1) {
      actions.push(
        <div className="flex-fs">
          <Button
            className="w175--fixed h45--fixed"
            type="primary"
            onClick={() => setIntendsToStop(true)}
          >
            End Game
          </Button>
        </div>
      )
    } else {
      actions.push(
        <div className="flex-fs">
          <Button
            className="w175--fixed h45--fixed"
            type="primary"
            onClick={start}
          >
            Start Game
          </Button>
        </div>
      )
    }
  } else {
    const hasJoined = !!(players.find(item => item.address === account.address))
    if (hasJoined || Number(tournament.maxPlayers) === players.length) {
      actions.push(
        <Button
          disabled
          className="h45--fixed"
          type="primary"
        >
          The tournament owner will start very soon
        </Button>
      )
    } else if (tournament.status === 1) {
      actions.push(
        <Button
          disabled
          className="w175--fixed h45--fixed"
          type="primary"
        >
          The game is about to start
        </Button>
      )
    } else {
      actions.push(
        <Button
          onClick={() => setIntendsToParticipate(true)}
          className="w175--fixed h45--fixed"
          type="primary"
        >
          Join Game
        </Button>
      )
    }
  }

  return (
    <>
      <div className="flex-c">
        {
          actions
        }
      </div>
      <TournamentPageHeaderParticipateModal
        tournament={tournament}
        refresh={refresh}
        intendsToParticipate={intendsToParticipate}
        setIntendsToParticipate={setIntendsToParticipate}
      />
      <TournamentPageHeaderStopModal
        tournament={tournament}
        refresh={refresh}
        intendsToStop={intendsToStop}
        setIntendsToStop={setIntendsToStop}
      />
    </>
  )
}
