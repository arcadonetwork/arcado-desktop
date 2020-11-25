import React, { useEffect, useState } from 'react';
import { Loading } from '../../components/Loading';
import { RouteComponentProps } from 'react-router';
import { fetchDelegates } from '../../shared/api/delegates';
import { DelegatesOverviewItem } from './DelegatesOverviewItem';
import { ApiResponseModel } from '../../typings/api-response.model';
import { ForgerModel } from '../../typings/forger';

interface MatchParams {
  address: string;
}

interface ContainerProps extends RouteComponentProps<MatchParams> {

}

export const DelegatesOverview: React.FC<ContainerProps> = () => {

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
    window.scrollTo(0, 0)
    return () => ''
  }, [])

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
    <div className="grid mt50">

      <div className="br5 br bgc-white">
        <div className="flex-c bgc-xxl-grey p15-25 br5-top ffm-bold fc-black br-b">
          <div className="w10">
            Rank
          </div>
          <div className="w20">
            Username
          </div>
          <div className="w40">
            Address
          </div>
        </div>
        {
          response.data.map((item: ForgerModel, idx: number) => (
            <DelegatesOverviewItem
              account={item}
              index={idx}
              isLastChild={idx === response.data.length - 1}
            />
          ))
        }
      </div>
    </div>
  )
}
