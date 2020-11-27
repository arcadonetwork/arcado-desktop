import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router';
import { GridSubRoutesMenuItem } from './GridSubRoutesMenuItem'

interface Props extends RouteComponentProps {
  menu: any
  url: string
}

export const GridSubRoutesMenuComponent: React.FC<Props> = ({ menu, url, location }) => {
    return menu.map((item: any) => {
      if (item.divider) {
        return <div className="w100 pb10 mb10 br-b br-c-grey" />
      }
      const route = `${url}/${item.page}`
      return (
        <GridSubRoutesMenuItem
          key={item.label}
          label={item.label}
          isActive={route === location.pathname}
          page={item.page}
          icon={item.icon}
          route={route}
        />
      )
    })
}

export const GridSubRoutesMenu = withRouter(GridSubRoutesMenuComponent);
