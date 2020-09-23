import React, { useEffect, useState } from 'react';
import { getTournaments } from '../../shared/api/tournaments';
import { Button, message } from 'antd';
import { GameModel } from '../../models/game.model';
import { Loading } from '../../components/Loading';
import { GameDetailsPageTournamentsItem } from './GameDetailsPageTournamentsItem';
import { arrayContains, isArrayWithElements } from '../../utils/type-checking';
import { TournamentModel } from '../../models/tournament.model';
import { CreateTournamentModal } from '../../components/modals/create-tournament/CreateTournamentModal';
import { TRANSACTION_TYPES } from '@arcado/arcado-transactions/dist-node/utils';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store';
import { TransactionModel } from '../../models/transaction.model';
import { ApiResponseModel } from '../../models/api-response.model';


interface ContainerProps {
  game: GameModel
}

export const GameDetailsPageTournaments: React.FC<ContainerProps> = ({ game }) => {
  const [tournamentsResponse, setTournamentsResponse] = useState<ApiResponseModel<TournamentModel>>();
  const [loading, setLoading] = useState<boolean>(true);
  const newTransactions: TransactionModel<TournamentModel>[] = useSelector((state: iRootState) => state.network.newTransactions);
  const isCreatingTournament: boolean = useSelector((state: iRootState) => state.tournaments.isCreatingTournament);
  const dispatch = useDispatch<Dispatch>();

  function hasGameUpdated () {
    return arrayContains(newTransactions.map(item => item.type), TRANSACTION_TYPES.TOURNAMENTS)
      && newTransactions.map(item => item.asset.gameId === game.gameId);
  }

  useEffect( () => {
    async function fetchData() {
      try {
        const response = await getTournaments(game.gameId);
        setTournamentsResponse(response);
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
              onClick={(ev) => dispatch.tournaments.setIsCreatingTournament(true)}
              type="primary"
              className="w100 h40--fixed"
            >Start a tournament</Button>
          </div>
        </div>
      </div>
      <div className="grid">
          {
            isArrayWithElements(tournamentsResponse.data)
              ? (
                <div className="w100 grid-col4 flex-jc-sb">
                  {
                    tournamentsResponse.data.map(
                      (tx: TransactionModel<TournamentModel>, index: any) =>
                        <GameDetailsPageTournamentsItem
                          key={tx.asset.tournamentId}
                          tournament={tx.asset}
                        />
                    )
                  }
                </div>
              )
              : (
                <div className="bgc-xl-grey fc-lb br5 p15-25">
                  There were no tournaments yet
                </div>
              )
          }
      </div>
      <CreateTournamentModal
        game={game}
        isCreatingTournament={isCreatingTournament}
      />
    </div>
  )
}
