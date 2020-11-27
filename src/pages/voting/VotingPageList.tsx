import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { fetchDelegates } from '../../shared/api/delegates';
import { VotingPageListItem } from './VotingPageListItem';
import { ApiResponseModel } from '../../typings/api-response.model';
import { ForgerModel } from '../../typings/forger';

interface ContainerProps {
  isVoting: boolean
}

export const VotingPageList: React.FC<ContainerProps> = ({ isVoting }) => {

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [response, setResponse] = useState<ApiResponseModel<ForgerModel[]>>(undefined);

  async function getDelegates () {
    try {
      const response = await fetchDelegates();
      setResponse(response);
      setIsLoading(false);
    } catch (e) {
      setResponse({ data: [], meta: undefined });
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getDelegates();
    return () => setIsLoading(true);
  }, [])

  if (isLoading) {
    return (
      <div className="grid mt75 flex-c flex-jc-c">
        <Loading />
      </div>
    )
  }

  return (
    <div className="br5 br bgc-white">
      <div className="flex-c br5-top ffm-bold p15-25 fc-black br-b">
        <div className="w10">
          Rank
        </div>
        <div className="w40">
          Username
        </div>
      </div>
      {
        response.data.map((item: ForgerModel, idx: number) => (
          <VotingPageListItem
            account={item}
            isVoting={isVoting}
            index={idx}
            isLastChild={idx === response.data.length - 1}
          />
        ))
      }
    </div>
  )
}
