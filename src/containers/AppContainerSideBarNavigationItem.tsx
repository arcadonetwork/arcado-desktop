import React from 'react'
import { Link, matchPath } from 'react-router-dom'
import { ROUTES } from '../shared/router/Router'

const active_class = 'bg-c-lb color-w ffm-bold '
const inactive_class = 'color-lg '

const isActiveItem = (pathname: string, uri: string) => {
  let match: any = 'something-went-wrong'
  if (!match) {
    match = matchPath(pathname, ROUTES.GAMES)
  }
  return match && pathname.includes(uri) ? active_class : inactive_class
}

interface ContainerProps {
  uri: string
  label: string
  location: any
  icon?: any
}

export const AppContainerSideBarNavigationItem: React.FC<ContainerProps> = ({
  uri,
  label,
  location,
  icon
}) => {
  const isActiveClazz = isActiveItem(location.pathname, uri)
  return (
    <Link
      to={uri}
      className={`p0 m0 pl25 clickable pt10 pb10 flex-c bg-lb__hover white__hover ${isActiveClazz}`}>
      {
        icon
          ? <div className="mr15 circle img--30 flex-c flex-jc-c fc-lgrey bgc-grey">{icon}</div>
          : ''
      }
      <span className="fs-m fc-black">{label}</span>
    </Link>
  )
}
