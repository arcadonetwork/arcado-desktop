import React from 'react';
import { FieldElement, Message } from 'react-hook-form';

interface ContainerProps {
  label: string,
  name: string,
  error?: Message,
  defaultValue?: any,
  placeholder?: string,
  min?: number
  max?: number
  reference(ref: FieldElement<any>): void
}

export const NumberInputField: React.FC<ContainerProps> = ({ label, placeholder, reference, name, error, defaultValue, min, max }) => {
  return (
    <div>
      <div className="mb5 flex-c flex-jc-sb">
        <span>{label}</span>
        {error ? <span className="fc-red fs-s">{error}</span> : ''}
      </div>
      <div className="mb10">
        <input
          className={`text-input ${error ? 'error-input' : ''}`}
          name={name}
          placeholder={placeholder}
          ref={reference}
          defaultValue={defaultValue}
          type="number"
          min={min}
          max={max}
        />
      </div>
    </div>
  )
}
