import React, { useEffect, useState } from 'react';
import { GameModel } from '../../typings/game.model';
import { getGame } from '../../shared/api/games';
import { message } from 'antd';
import { Loading } from '../../components/Loading';
import { RouteComponentProps } from 'react-router';
import { GameDetailsPageHeader } from './GameDetailsPageHeader';
import { GameDetailsPageTournaments } from './GameDetailsPageTournaments';

interface MatchParams {
  gameId: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

const menu = ['Tournaments'];

export const GameDetailsPage: React.FC<ContainerProps> = ({ match }) => {
  const [page, setPage] = useState<string>(menu[0])
  const [game, setGame] = useState<GameModel>(undefined)
  const [loading, setLoading] = useState<boolean>(true)
  const { gameId } = match.params

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => ''
  }, [])

  useEffect( () => {
    async function fetchData() {
      try {
        const game = await getGame(gameId)
        setGame(game)
        setLoading(false)
      } catch (e) {
        message.error('can not load games')
        setLoading(false)
      }
    }
    fetchData();
    return () => ''
  }, [gameId])

  if(loading) {
    return <Loading />
  }


  return (
    <div className="">
      <GameDetailsPageHeader
        game={game}
        page={page}
        setPage={setPage}
        menu={menu}
      />
      <GameDetailsPageTournaments
        game={game}
      />
    </div>
  )
}
