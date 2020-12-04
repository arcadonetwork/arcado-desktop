import React, { useEffect, useState } from 'react';
import { ProfileSettingsPageHeader } from './SettingsPageHeader';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, iRootState } from '../../store/store';
import { GridSubRoutesMenu } from '../../components/grid/GridSubRoutesMenu';
import { SettingsPageMenu } from './SettingsPageMenu';
import { RouteComponentProps } from 'react-router';
import { GridSubRoutesPage } from '../../components/grid/GridSubRoutesPage';
import { Loading } from '../../components/Loading';

interface MatchParams {
  url: string;
}

interface Props extends RouteComponentProps<MatchParams> {

}

export const SettingsPage: React.FC<Props> = ({ match }) => {

  const { url } = match;
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<Dispatch>();
  const account = useSelector((state: iRootState) => state.account.account);

  useEffect(() => {
    refresh();
  }, [url])

  async function refresh () {
    await dispatch.account.syncAccount(account);
    setLoading(false)
  }

  if (loading) {
    return <Loading />
  }

  return (
    <div className="grid mt50">
      <ProfileSettingsPageHeader account={account} />
      <div className="w100 flex-fs flex-jc-sb">
        <div className="grid-c2">
          <GridSubRoutesMenu
            url={url}
            menu={SettingsPageMenu}
          />
        </div>

        <div className="grid-c8">
          <GridSubRoutesPage
            menu={SettingsPageMenu}
            url={url}
            account={account}
            refresh={refresh}
          />
        </div>
      </div>
    </div>
  )
}
