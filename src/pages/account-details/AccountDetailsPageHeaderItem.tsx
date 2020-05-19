import React from 'react';

interface ContainerProps {
  label: string,
  value: string
}

export const AccountDetailsPageHeaderItem: React.FC<ContainerProps> = ({ label, value }) => {
  return (
    <div className="mb25">
      <div className="fc-lgrey">{label}</div>
      <div className="ffm-bold fc-black">{value}</div>
    </div>
  )
}
