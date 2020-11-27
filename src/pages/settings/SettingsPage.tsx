import React from 'react';
import { ProfileSettingsPageHeader } from './SettingsPageHeader';
import { useSelector } from 'react-redux';
import { iRootState } from '../../store/store';
import { GridSubRoutesMenu } from '../../components/grid/GridSubRoutesMenu';
import { SettingsPageMenu } from './SettingsPageMenu';
import { RouteComponentProps } from 'react-router';
import { GridSubRoutesPage } from '../../components/grid/GridSubRoutesPage';

interface MatchParams {
  url: string;
}

interface Props extends RouteComponentProps<MatchParams> {

}

export const SettingsPage: React.FC<Props> = ({ match }) => {

  const { url } = match;
  const account = useSelector((state: iRootState) => state.account.account);

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
          />
        </div>
      </div>
    </div>
  )
}
