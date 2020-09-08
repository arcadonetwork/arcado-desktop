import React, { useState } from 'react';
import { TournamentModel } from '../../models/tournament.model';
import { Button, message } from 'antd';
import { startTournament } from '../../shared/api/tournaments';
import { TournamentPageHeaderParticipateModal } from '../../components/modals/TournamentPageHeaderParticipateModal';
import { TournamentPageHeaderStopModal } from '../../components/modals/TournamentPageHeaderStopModal';
import { ParticipantModel } from '../../models/participant.model';
import { CustomIcon } from '../../components/custom-icon/CustomIcon';
import { AccountModel } from '../../models/account.model';
import { TournamentStateModel } from '../../models/tournament-state.model';

interface ContainerProps {
  tournament: TournamentModel,
  players: ParticipantModel[],
  account: AccountModel,
  tournamentState: TournamentStateModel
}

/**
* ------ LOBBY STATES ------
* 0 - Not Started + Joinable
* 1 - Not Started + Already Joined
* 2 - Not Started + Not Joinable
* 3 - Started
* 4 - Finished
* */

export const TournamentPageHeaderActions: React.FC<ContainerProps> = ({ players, tournament, account, tournamentState }) => {

  const [intendsToParticipate, setIntendsToParticipate] = useState<boolean>(false);
  const [intendsToStop, setIntendsToStop] = useState<boolean>(false);

  async function start () {
    try {
      await startTournament(tournament.gameId, tournament.tournamentId, account.passphrase);
      message.success('successfully started the tournament')
    } catch (e) {
      console.error(e);
      message.error('something went wrong')
    }
  }

  const isOwner = tournament.createdBy === account.address;
  let Component;

  if (tournamentState.type === 4) {
    Component = (
      <div className="w100 flex-c flex-jc-c fc-lb">
          <div className="mr15">
            <CustomIcon type="finish" className="" />
          </div>
          <span className="">Finished</span>
      </div>
    )
  } else if (tournamentState.type === 3) {
    if (isOwner) {
      Component = (
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
      Component = <div>
        Game is ongoing
      </div>
    }
  } else if (tournamentState.type === 2) {
    if (isOwner) {
      Component = (
        <div className="flex-fs">
          <Button
            className="w175--fixed h40--fixed"
            type="primary"
            onClick={start}
          >
            Start Game
          </Button>
        </div>
      )
    } else {
      Component = (
        <div className="flex-c flex-column p15-25 br5 bgc-xl-grey">
          <span className="fs-s">Maximum amount of players reached.</span>
          <span className="fs-s">Game is about to start</span>
        </div>
      )
    }
  } else if (tournamentState.type === 1) {
    Component = (
      <div className="flex-c flex-column p15-25 br5 bgc-xl-grey">
        <span className="fs-s">Waiting on other players</span>
      </div>
    )
  } else {
    Component = (
      <div className="w100 mb5 flex-c flex-jc-c fc-lb">
        <Button
          onClick={() => setIntendsToParticipate(true)}
          className=""
          type="primary"
        >
          Participate
        </Button>
      </div>
    )
  }

  return (
    <>
      {Component}
      {
        intendsToParticipate
        ? (
            <TournamentPageHeaderParticipateModal
              tournament={tournament}
              intendsToParticipate={intendsToParticipate}
              setIntendsToParticipate={setIntendsToParticipate}
            />
          )
        : <></>
      }
      {
        intendsToStop
        ? (
            <TournamentPageHeaderStopModal
              players={players}
              tournament={tournament}
              intendsToStop={intendsToStop}
              setIntendsToStop={setIntendsToStop}
            />
          )
        : <></>
      }
    </>
  )
}
