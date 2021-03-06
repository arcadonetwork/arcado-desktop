import React from 'react'

import { HeaderDropDownItem } from './HeaderDropDownItem'
import { HeaderDropDownReactLink } from './HeaderDropDownReactLink'
import { getAccountDetailsRoute, ROUTES } from '../../shared/router/Router';
import { AccountModel } from '../../models/account.model';
import { HeaderDropDownItemIcon } from './HeaderDropDownItemIcon';

export const renderMenuItem = (item: any, index: number, account: AccountModel) => {
  if (item.path && item.path.includes(ROUTES.ACCOUNT_DETAILS)) {
    item.url = getAccountDetailsRoute(account.address)
  } else {
    item.url = item.path
  }

  const clazz =
    'w350--fixed br2 click fs-m bgc-xl-grey__hover lh-none fc-lb fc-lb__hover flex-c'
  let Component;
  if (item.icon) {
    Component = <HeaderDropDownItemIcon item={item} clazz={clazz} idx={index} />
  } else if (item.url) {
    Component = <HeaderDropDownReactLink item={item} clazz={clazz} idx={index} />
  } else {
    Component = <HeaderDropDownItem item={item} clazz={clazz} idx={index} />
  }
  return <div key={index}>{Component}</div>
}
