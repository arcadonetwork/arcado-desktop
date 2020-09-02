import React, { useEffect, useState } from 'react';
import { getTournaments } from '../../utils/api/tournaments';
import { message } from 'antd';
import { GameModel } from '../../models/game.model';
import { Loading } from '../../components/Loading';
import { GameDetailsPageTournamentsItem } from './GameDetailsPageTournamentsItem';
import { isArrayWithElements } from '../../utils/type-checking';
import { TournamentModel } from '../../models/tournament.model';


interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageTournaments: React.FC<ContainerProps> = ({ game }) => {
  const [tournaments, setTournaments] = useState<TournamentModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect( () => {
    async function fetchData() {
      try {
        const tournaments = await getTournaments(game.id);
        setTournaments(tournaments);
        setLoading(false);
      } catch (e) {
        message.error('can not load tournaments')
        setLoading(false);
      }
    }
    fetchData();
    return () => ''
  }, []);

  if(loading) {
    return <Loading />
  }

  return (
    <div>
      <div className="flex-c p15 br5 ffm-bold fs-s">
        <span className="w40 fc-black">Name</span>
        <span className="w20">Buyin (LSK)</span>
        <span className="w20">Players</span>
      </div>
      <div className="bgc-white br br5">
        {
          isArrayWithElements(tournaments)
          ? tournaments.map(
            (tournament, index) =>
              <GameDetailsPageTournamentsItem
                key={tournament.tournamentId}
                gameId={game.id}
                tournament={tournament}
                isLastChild={index === tournaments.length - 1}
              />
          )
            : (
              <div className="p15-25 flex-c br5 bgc-xxl-grey fs-s">
                There are no tournaments created for this game
              </div>
            )
        }
      </div>
    </div>
  )
}
