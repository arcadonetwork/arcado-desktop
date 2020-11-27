import React from 'react'
import { AppContainerSideBarNavigation } from './AppContainerSideBarNavigation'

export const AppContainerSideBar = () => (
  <div
    style={{ height: '100vh', top: '60px' }}
    className="w250--fixed pos-fixed flex-fs bgc-white flex-column overflow-hidden">
    <div className="mt25">
      <AppContainerSideBarNavigation />
    </div>
  </div>
)
