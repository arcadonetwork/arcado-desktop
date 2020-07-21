import React from 'react'
import { Link } from 'react-router-dom'

interface ContainerProps {
  item: any,
  clazz: string,
  idx: number
}

export const HeaderDropDownReactLink: React.FC<ContainerProps> = ({ item, clazz }) => (
  <Link className={clazz} to={item.url}>
    {item.label}
  </Link>
)
