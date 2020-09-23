import React, { useEffect, useState } from 'react';
import { GameModel } from '../../models/game.model';
import { isArrayWithElements } from '../../utils/type-checking';
import { message } from 'antd';
import { Loading } from '../../components/Loading';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { utils } from '@arcado/arcado-transactions';
import { TransactionModel } from '../../models/transaction.model';
import { ApiResponseModel } from '../../models/api-response.model';
import { TournamentModel } from '../../models/tournament.model';
import { getTournamentsByParams } from '../../shared/api/tournaments';
import { GameDetailsPageTournamentsItem } from '../game-details/GameDetailsPageTournamentsItem';

const { TRANSACTION_TYPES } = utils;

interface ContainerProps {
}

export const HomeRecentTournaments: React.FC<ContainerProps> = () => {

  const [tournamentsResponse, setTournamentsResponse] = useState<ApiResponseModel<TournamentModel>>();
  const [loading, setLoading] = useState<boolean>(true);
  const newTransactions: TransactionModel<GameModel>[] = useSelector((state: iRootState) => state.network.newTransactions);

  async function fetchGames() {
    try {
      const response  = await getTournamentsByParams({ limit: 5, sort: "timestamp:asc" });
      setTournamentsResponse(response);
      setLoading(false);
    } catch (e) {
      message.error('can not load games')
      setLoading(false);
    }
  }

  function hasNewGameState () {
    const txs = newTransactions.filter(item => item.type === TRANSACTION_TYPES.GAMES)
    return isArrayWithElements(txs);
  }

  useEffect( () => {
    fetchGames();
  }, [hasNewGameState()]);

  if (loading) {
    return <Loading />
  }

  return (
    <div className="mb50">
      <div className="mb25 br-b pb15">
        <h1 className="fs-m p0 m0 fc-black ffm-bold">Recent Tournaments</h1>
      </div>
      {
        !isArrayWithElements(tournamentsResponse.data)
          ? (
            <div className="bgc-xl-grey fc-lb br5 p15-25">
              <span>We can't seem to find any tournament.</span>
            </div>
          )
          : (
            <div className="grid-col5">
              {
                tournamentsResponse
                .data.map((tx, index) =>
                    <GameDetailsPageTournamentsItem
                      key={index}
                      tournament={tx.asset}
                    />
                  )}
            </div>
          )
      }
    </div>
  )
}
