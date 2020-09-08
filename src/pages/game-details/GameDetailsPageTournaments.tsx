import React, { useEffect, useState } from 'react';
import { getTournaments } from '../../shared/api/tournaments';
import { Button, message } from 'antd';
import { GameModel } from '../../models/game.model';
import { Loading } from '../../components/Loading';
import { GameDetailsPageTournamentsItem } from './GameDetailsPageTournamentsItem';
import { arrayContains, isArrayWithElements } from '../../utils/type-checking';
import { TournamentModel } from '../../models/tournament.model';
import { GameDetailsPageHeaderCreateTournament } from '../../components/modals/GameDetailsPageHeaderCreateTournament';
import { TRANSACTION_TYPES } from '@arcado/arcado-transactions/dist-node/utils';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { TransactionModel } from '../../models/transaction.model';


interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageTournaments: React.FC<ContainerProps> = ({ game }) => {
  const [tournaments, setTournaments] = useState<TournamentModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isCreatingTournament, setIsCreatingTournament] = useState<boolean>(false);
  const newTransactions: TransactionModel[] = useSelector((state: iRootState) => state.network.newTransactions);

  function hasGameUpdated () {
    return arrayContains(newTransactions.map(item => item.type), TRANSACTION_TYPES.TOURNAMENTS)
      && newTransactions.map(item => (item.asset as TournamentModel).gameId === game.gameId);
  }

  useEffect( () => {
    async function fetchData() {
      try {
        const tournaments = await getTournaments(game.gameId);
        setTournaments(tournaments);
        setLoading(false);
      } catch (e) {
        message.error('can not load tournaments')
        setLoading(false);
      }
    }
    fetchData();
    return () => ''
  }, [hasGameUpdated()]);

  if(loading) {
    return <Loading />
  }

  return (
    <div className="mb200">
      <div className="w100 bgc-white">
        <div className="grid flex-c mt50 mb25 pb15 br-b">
          {/*<div className="br w-auto br-c-dgrey br50 p5-15 click br-c-lb__hover">
            Price
          </div>*/}
          <div className="ml-auto">
            <Button
              onClick={(ev) => setIsCreatingTournament(true)}
              type="primary"
              className="w100 h40--fixed"
            >Start a tournament</Button>
          </div>
        </div>
      </div>
      <div className="grid">
          {
            isArrayWithElements(tournaments)
              ? (
                <div className="w100 grid-col4 flex-jc-sb">
                  {
                    tournaments.map(
                      (tournament, index) =>
                        <GameDetailsPageTournamentsItem
                          key={tournament.tournamentId}
                          gameId={game.gameId}
                          tournament={tournament}
                          isLastChild={index === tournaments.length - 1}
                        />
                    )
                  }
                </div>
              )
              : (
                <div className="p15-25 flex-c br5 bgc-xxl-grey fs-s br">
                  This game did not organise tournaments yet
                </div>
              )
          }
      </div>
      <GameDetailsPageHeaderCreateTournament
        game={game}
        isCreatingTournament={isCreatingTournament}
        setIsCreatingTournament={(val: boolean) => setIsCreatingTournament(val)}
      />
    </div>
  )
}
