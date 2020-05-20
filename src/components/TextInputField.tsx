import React from 'react';
import { Input } from 'antd';

interface ContainerProps {
  label: string,
  value: string,
  onChange(value: string): any
}

export const TextInputField: React.FC<ContainerProps> = ({ label, value, onChange }) => {
  return (
    <div>
      <div className="mb10">
        <span>{label}</span>
      </div>
      <div className="mb10">
        <Input
          value={value}
          onChange={(ev) => onChange(ev.target.value)}
        />
      </div>
    </div>
  )
}
