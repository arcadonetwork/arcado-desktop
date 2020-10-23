import React from 'react'
import { Link } from 'react-router-dom'

interface ContainerProps {
  item: any,
  clazz: string,
  idx?: number
}

export const HeaderDropDownItemIcon: React.FC<ContainerProps> = ({ item, clazz }) => (
  <Link className={clazz} to={item.url}>
    <div className="mr10">
      <div className="img--30 flex-c flex-jc-c circle bgc-grey">
        {item.icon}
      </div>
    </div>
    <span>{item.label}</span>
  </Link>
)
