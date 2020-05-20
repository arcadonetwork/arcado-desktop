import React from 'react';

interface ContainerProps {
  label: string,
  value: string
}

export const AccountDetailsPageHeaderItem: React.FC<ContainerProps> = ({ label, value }) => {
  return (
    <div className="mb10 fs-s">
      <div className="fc-lgrey ">{label}</div>
      <div className="ffm-bold fc-black">{value}</div>
    </div>
  )
}
