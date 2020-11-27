import React, { ReactElement } from 'react';
import { Link } from 'react-router-dom'

interface Props {
  label: string
  icon: ReactElement
  page: string
  isActive: boolean
  route: string
}

export const GridSubRoutesMenuItem: React.FC<Props> = ({ label, icon, page, isActive, route }) => {
  const clazz = isActive ? 'fc-blue bgc-lblue br50' : ' fc-grey'
  return (
    <Link to={route} className={`flex-c p15-25 c_dblue__hover ${clazz}`}>
      {
        icon ? (
        <span className=" p0 m0 mr10 lh-none fs-m">
          {icon}
        </span>
          ) : ''
      }
      <span className="fs-n lh-none p0 m0">{label}</span>
    </Link>
  )
}
