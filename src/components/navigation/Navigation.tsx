import React from 'react'
import { RouteComponentProps, withRouter } from 'react-router';
import { NavigationItem } from './NavigationItem'

interface Props extends RouteComponentProps {
  setPage(value: string): void
  page: string
  menu: any[]
  url: string
}

export const NavigationComponent: React.FC<Props> = ({ setPage, page, menu }) => {
    return (
      <div className="br-b w100 flex-fs">
        {menu.map(item => (
          <NavigationItem
            key={item.page}
            setPage={setPage}
            is_active={page === item.page}
            item={item}
            label={item.label}
          />
        ))}
      </div>
    )
}

export const Navigation = withRouter(NavigationComponent);
