import React from 'react';

import emptyImage from '../../assets/images/empty.svg'
import { Button } from 'antd';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../../store/store';

interface ContainerProps {
}

export const HomeGamesEmpty: React.FC<ContainerProps> = () => {
  const dispatch = useDispatch<Dispatch>();
  return (
    <div className="mt75 w100 flex-c flex-column flex-jc-c">
      <div className="mb25">
        <img className="img--150" src={emptyImage} />
      </div>
      <h1 className="ffm-bold fs-xm">Aww! There are no games available ..</h1>
      <p className="w40 txt-ac">If it is not the desired outcome, you might want to check if the connection with the blockchain is alive. If there is a connection, it might be a good moment to start creating games!</p>
      <div className="mt25">
        <Button
          className="w175--fixed h45--fixed"
          onClick={() => dispatch.games.setIsCreatingGame(true)}
          type="primary">Start the first game</Button>
      </div>
    </div>
  )
}
