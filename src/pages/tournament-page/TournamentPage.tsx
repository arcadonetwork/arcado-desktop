import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../../components/Loading';
import { TournamentPageHeader } from './TournamentPageHeader';
import { TournamentModel } from '../../models/tournament.model';
import { getPlayers, getTournament } from '../../utils/api/tournaments';
import { message } from 'antd';
import { TournamentPageParticipants } from './TournamentPageParticipants';
import { PageNavigation } from '../../components/PageNavigation';
import { getGame } from '../../utils/api/games';
import { TournamentPagePrizeDistribution } from './TournamentPagePrizeDistribution';
import { ParticipantModel } from '../../models/participant.model';
//import { isArrayWithElements } from '../../utils/utils/type-checking';

const menu = [
  'Participants'
]

interface MatchParams {
  tournamentId: string;
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const TournamentPage: React.FC<ContainerProps> = ({ match }) => {
  const [tournament, setTournament] = useState<TournamentModel>(undefined);
  const [players, setPlayers] = useState<ParticipantModel[]>(undefined);
  const [page, setPage] = useState<string>(menu[0]);
  const [loading, setLoading] = useState<boolean>(true);
  const { gameId, tournamentId } = match.params;

  async function getTournamentDetails () {
    try {
      const [tournament, { game }, players] = await Promise.all([
        getTournament(tournamentId),
        getGame(gameId),
        getPlayers(tournamentId)
      ])
      tournament.game = game;
      setTournament(tournament || {});
      setPlayers(players || []);
      setLoading(false);
    }catch (e) {
      message.error('Can not fetch tournament');
      setLoading(false);
    }
  }

  useEffect( () => {
    window.scrollTo(0, 0)
    return () => ''
  }, []);

  useEffect( () => {
    getTournamentDetails();
    return () => ''
  }, [gameId, tournamentId]);

  async function refresh () {
    await setLoading(true);
    getTournamentDetails();
  }

  if(loading) {
    return <Loading />
  }
  console.log(tournament);
  return (
    <div className="grid-xl mt75">
      <TournamentPageHeader
        refresh={refresh}
        tournament={tournament}
        players={players}
      />
      <TournamentPagePrizeDistribution tournament={tournament} />
      <PageNavigation
        menu={menu}
        activePage={page}
        setPage={(page) => setPage(page)}
      />
      <TournamentPageParticipants
        players={players}
      />
    </div>
  )
}
