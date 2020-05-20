import React from 'react';
import { InputNumber } from 'antd';

interface ContainerProps {
  label: string,
  value: number,
  onChange(value: number): any
}

export const NumberInputField: React.FC<ContainerProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <div className="mb10">
        <span>{label}</span>
      </div>
      <div className="mb10">
        <InputNumber
          className="w100"
          value={value}
          onChange={(value) => onChange(value)}
        />
      </div>
    </div>
  )
}
