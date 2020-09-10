import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Loading } from '../../components/Loading';
import { TournamentPageHeader } from './TournamentPageHeader';
import { TournamentModel } from '../../models/tournament.model';
import { getParticipants, getTournament, getTournamentState } from '../../shared/api/tournaments';
import { message } from 'antd';
import { TournamentPagePlayers } from './TournamentPagePlayers';
import { PageNavigation } from '../../components/PageNavigation';
import { getGame } from '../../shared/api/games';
import { GameModel } from '../../models/game.model';
import { TransactionModel } from '../../models/transaction.model';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { TRANSACTION_TYPES } from '@arcado/arcado-transactions/dist-node/utils';
import { isArrayWithElements } from '../../utils/type-checking';
import { ParticipantModel } from '../../models/participant.model';
import { TournamentPageDetails } from './TournamentPageDetails';
import { AccountModel } from '../../models/account.model';
import { TournamentStateModel } from '../../models/tournament-state.model';

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
  const { gameId, tournamentId } = match.params;

  const [game, setGame] = useState<GameModel>(undefined);
  const [tournament, setTournament] = useState<TournamentModel>(undefined);
  const [participants, setParticipants] = useState<ParticipantModel[]>(undefined);
  const [tournamentState, setTournamentState] = useState<TournamentStateModel>(undefined);

  const [page, setPage] = useState<string>(menu[0]);
  const [loading, setLoading] = useState<boolean>(true);

  const newTransactions: TransactionModel[] = useSelector((state: iRootState) => state.network.newTransactions);
  const account: AccountModel = useSelector((state: iRootState) => state.account.account);

  async function fetchTournament () {

    try {
      const [tournamentResponse, gameResponse, playersResponse] = await Promise.all([
        getTournament(tournamentId),
        getGame(gameId),
        getParticipants(tournamentId)
      ])

      setTournament(tournamentResponse);
      setGame(gameResponse);
      setParticipants(playersResponse);

      const tournamentStateResponse = await getTournamentState(tournamentResponse, account.address)
      setTournamentState(tournamentStateResponse);

      setLoading(false);
    }catch (e) {
      console.error(e);
      message.error('Can not fetch tournament');
      setLoading(false);
    }
  }

  useEffect( () => {
    window.scrollTo(0, 0)
  }, []);

  useEffect( () => {
    fetchTournament();
  }, [gameId, tournamentId]);

  useEffect( () => {
    const hasNewPlayers = getHasNewPlayers();
    if (!hasNewPlayers) return;
    fetchPlayers();
  }, [newTransactions]);

  useEffect( () => {
    const hasNewState = getHasNewTournamentState();
    if (!hasNewState) return;
    console.log('hasNewState', hasNewState);
    fetchTournamentState();
  }, [newTransactions]);

  if(loading) {
    return <Loading />
  }

  async function fetchPlayers () {
    try {
      const players = await getParticipants(tournamentId);
      setParticipants(players || []);
      setLoading(false);
    }catch (e) {
      message.error('Can not fetch tournament');
      setLoading(false);
    }
  }

  function getHasNewPlayers () {
    const txs = newTransactions.filter(item => (
      item.type === TRANSACTION_TYPES.JOIN_TOURNAMENT
      && (item.asset as TournamentModel).tournamentId === tournamentId
    ))
    return isArrayWithElements(txs);
  }

  async function fetchTournamentState () {
    try {
      const response = await getTournamentState(tournament, account.address);
      setTournamentState(response);
      setLoading(false);
    } catch (error) {}
    setLoading(false);
  }

  function getHasNewTournamentState () {
    const txs = newTransactions.filter(item =>
      (item.type === TRANSACTION_TYPES.START_TOURNAMENT
        || item.type === TRANSACTION_TYPES.STOP_TOURNAMENT
        || item.type === TRANSACTION_TYPES.JOIN_TOURNAMENT
      )
      && (item.asset as TournamentModel).tournamentId === tournamentId
    )
    return isArrayWithElements(txs);
  }

  return (
    <div className="grid-xl mt50">
      <TournamentPageHeader
        game={game}
        tournament={tournament}
        players={participants}
        account={account}
        tournamentState={tournamentState}
      />
      <div className="grid-col2">
        <div className="">
          <TournamentPageDetails
            game={game}
            tournament={tournament}
          />
        </div>
        <div>
          <PageNavigation
            menu={menu}
            activePage={page}
            setPage={(page) => setPage(page)}
          />
          <TournamentPagePlayers
            tournamentId={tournamentId}
            players={participants}
          />
        </div>
      </div>

    </div>
  )
}
