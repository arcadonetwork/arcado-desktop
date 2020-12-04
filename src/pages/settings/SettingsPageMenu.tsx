import React, { lazy } from 'react';
import { UserOutlined, ExportOutlined, ClusterOutlined } from '@ant-design/icons';
import { LazyLoad } from '../../shared/lazy-load';
import { HallarLogo } from '../../components/hallar/HallarLogo';


const profile = {
  label: 'Profile',
  page: 'profile',
  icon: <UserOutlined />,
  Component: LazyLoad(lazy(() => import('./SettingsPageProfile')))
}

const dataExport = {
  label: 'Data export',
  page: 'data-export',
  icon: <ExportOutlined />,
  Component: LazyLoad(lazy(() => import('./SettingsPageDataExport')))
}

const divider = {
  divider: true
}

const network = {
  label: 'Network',
  page: 'network',
  icon: <ClusterOutlined />,
  Component: LazyLoad(lazy(() => import('./SettingsPageNetwork')))
}

const hallar = {
  label: 'Hallar',
  page: 'hallar',
  icon: <HallarLogo />,
  Component: LazyLoad(lazy(() => import('./SettingsPageHallar')))
}

export const SettingsPageMenu = [
  profile,
  dataExport,
  divider,
  network,
  hallar
]
