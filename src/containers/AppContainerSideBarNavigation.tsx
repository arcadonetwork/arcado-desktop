import React from 'react'
import { withRouter } from 'react-router-dom'
import { AppContainerSideBarNavigationItem } from './AppContainerSideBarNavigationItem'
import {
  ROUTES
} from '../shared/router/Router'
import { AimOutlined } from '@ant-design/icons';

export const AppContainerSideBarNavigation = withRouter(({ location }) => {
  return (
    <>
      <div className="w100 mb25">
        <AppContainerSideBarNavigationItem
          label="Games"
          uri={ROUTES.GAMES}
          location={location}
          icon={<AimOutlined />}
        />
      </div>
    </>
  )
})
