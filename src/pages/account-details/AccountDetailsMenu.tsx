import { lazy } from 'react'
import { LazyLoad } from '../../shared/lazy-load';

const hallar = {
  page: 'hallar',
  label: 'Hallar',
  Component: LazyLoad(lazy(() => import('./AccountDetailsHallar')))
}

const transactions = {
  page: 'transactions',
  label: 'Transactions',
  Component: LazyLoad(lazy(() => import('./AccountDetailsTransactions')))
}

const base_menu = [transactions]

export const getAccountDetailsMenu = (isDelegate: boolean) => {
  const menu = base_menu
  if (isDelegate) {
    return [hallar, ...menu]
  }
  return menu
}
