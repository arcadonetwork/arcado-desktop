import React from 'react';
import { FieldElement, Message } from 'react-hook-form';

interface ContainerProps {
  label: string,
  name: string,
  error?: Message,
  defaultValue?: any,
  min?: number
  max?: number
  reference(ref: FieldElement<any>): void
}

export const NumberInputField: React.FC<ContainerProps> = ({ label, reference, name, error, defaultValue, min, max }) => {
  return (
    <div>
      <div className="mb10 flex-c flex-jc-sb">
        <span>{label}</span>
        {error ? <span className="fc-red fs-s">{error}</span> : ''}
      </div>
      <div className="mb10">
        <input
          className={error ? 'error-input' : ''}
          name={name}
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
