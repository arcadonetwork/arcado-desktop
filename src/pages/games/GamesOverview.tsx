import React, { useEffect, useState } from 'react';
import { GameModel } from '../../models/game.model';
import { isArrayWithElements } from '../../utils/type-checking';
import { GamesOverviewItem } from './GamesOverviewItem';
import { GamesOverviewEmpty } from './GamesOverviewEmpty';
import { getGames } from '../../shared/api/games';
import { message } from 'antd';
import { Loading } from '../../components/Loading';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { utils } from '@arcado/arcado-transactions';
import { TransactionModel } from '../../models/transaction.model';
import { ApiResponseModel } from '../../models/api-response.model';

const { TRANSACTION_TYPES } = utils;

interface ContainerProps {
}

export const GamesOverview: React.FC<ContainerProps> = () => {

  const [gamesResponse, setGamesResponse] = useState<ApiResponseModel<GameModel>>();
  const [loading, setLoading] = useState<boolean>(true);
  const newTransactions: TransactionModel<GameModel>[] = useSelector((state: iRootState) => state.network.newTransactions);

  async function fetchGames() {
    try {
      const response  = await getGames({ limit: 10 });
      setGamesResponse(response);
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
    <>
      <div className="mb25 br-b pb15">
        <h1 className="fs-xm p0 m0 fc-black ffm-bold">{gamesResponse.meta.count} Games</h1>
      </div>
      {
        !isArrayWithElements(gamesResponse.data)
          ? <GamesOverviewEmpty />
          : (
            <div className="grid-col4">
              {gamesResponse.data.map((game, index) => <GamesOverviewItem key={index} game={game.asset} index={index}/>)}
            </div>
          )
      }
    </>
  )
}
