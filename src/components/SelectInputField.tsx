import React from 'react';
import { Select } from 'antd';
const { Option } = Select;

interface ContainerProps {
  label: string,
  placeholder?: string,
  value: string,
  options: string[]
  setValue(value: string): void
}

export const SelectInputField: React.FC<ContainerProps> = ({ label, placeholder, setValue, options }) => {
  return (
    <>
      <div className="w100">
        <div className="w100 mb10 flex-c flex-jc-sb">
          <span>{label}</span>
        </div>
        <Select
          className="w100"
          onChange={setValue}
          placeholder={placeholder}

        >
          {
            options.map(item => <Option value={item}>{item}</Option>)
          }
        </Select>
      </div>
    </>
  )
}
