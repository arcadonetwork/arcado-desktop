import React from 'react'

import { HeaderDropDownItem } from './HeaderDropDownItem'
import { HeaderDropDownReactLink } from './HeaderDropDownReactLink'
import { getAccountDetailsRoute, ROUTES } from '../../utils/router/Router';
import AccountModel from '../../models/account.model';

export const renderMenuItem = (item: any, index: number, account: AccountModel) => {
  if (item.path && item.path.includes(ROUTES.ACCOUNT_DETAILS)) {
    item.url = getAccountDetailsRoute(account.address)
  } else {
    item.url = item.path
  }

  const clazz =
    'w250--fixed br2 click h40--fixed fs-s bgc-grey__hover lh-none fc-lb fc-lb__hover pl15 flex-c'
  let Component;
  if (item.url) {
    Component = <HeaderDropDownReactLink item={item} clazz={clazz} idx={index} />
  } else {
    Component = <HeaderDropDownItem item={item} clazz={clazz} idx={index} />
  }
  return <div key={index}>{Component}</div>
}
