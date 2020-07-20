import React from 'react';

interface ContainerProps {
  item: any,
  isLastChild: boolean
}

export const AccountDetailsPageHeaderItem: React.FC<ContainerProps> = ({ item, isLastChild }) => {
  const clazz = isLastChild ? '' : 'mr15';
  return (
    <div className={`flex-column flex-fs br50 fc-primary p5-15 br primary-tag ${clazz}`}>
      <div className="ffm-bold fs-n lh-normal p0 m0">{item.value}</div>
      <div className="fs-s lh-normal fc-grey p0 m0">{item.label}</div>
    </div>
  )
}
