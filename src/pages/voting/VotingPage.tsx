import React, { useEffect, useState } from 'react';
import { RouteComponentProps } from 'react-router';
import { Button } from 'antd';
import { VotingPageList } from './VotingPageList';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const VotingPage: React.FC<ContainerProps> = () => {

  const [isVoting, setIsVoting] = useState<boolean>(false);

  useEffect(() => {
    window.scrollTo(0, 0)
    return () => ''
  }, [])

  return (
    <>
      <div className="grid mt50">

        <div className="w100 flex-c flex-jc-fe mb50">
          <Button
            onClick={() => setIsVoting(true)}
            type="primary"
            className="h45--fixed w175--fixed">Vote</Button>
        </div>

        <VotingPageList isVoting={isVoting} />
      </div>

    </>
  )
}
