import React, { useEffect, useState } from 'react';
import { GameModel } from '../../models/game.model';
import { arrayContains, isArrayWithElements } from '../../utils/type-checking';
import { HomeGamesItem } from './HomeGamesItem';
import { HomeGamesEmpty } from './HomeGamesEmpty';
import { getGames } from '../../shared/api/games';
import { message } from 'antd';
import { Loading } from '../../components/Loading';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { utils } from '@arcado/arcado-transactions';
import { TransactionModel } from '../../models/transaction.model';

const { TRANSACTION_TYPES } = utils;

interface ContainerProps {
}

export const HomeGames: React.FC<ContainerProps> = () => {

  const [games, setGames] = useState<GameModel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const newTransactions: TransactionModel[] = useSelector((state: iRootState) => state.network.newTransactions);

  async function fetchGames() {
    try {
      const games  = await getGames();
      setGames(games);
      setLoading(false);
    } catch (e) {
      message.error('can not load games')
      setLoading(false);
    }
  }

  useEffect( () => {
    fetchGames();
    return () => ''
  }, [arrayContains(newTransactions, TRANSACTION_TYPES.GAMES)]);

  return (
    <>
      <div className="mb25 br-b pb15">
        <div className="fs-l p0 m0 fc-black ffm-bold">Games</div>
      </div>
      {
        loading
          ? <Loading />
          : !isArrayWithElements(games)
          ? <HomeGamesEmpty />
          : (
            <div className="grid-col5">
              {games.map((game, index) => <HomeGamesItem key={index} game={game} index={index}/>)}
            </div>
          )
      }
    </>
  )
}
