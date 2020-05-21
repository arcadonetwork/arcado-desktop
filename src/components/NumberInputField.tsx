import React from 'react';
import { FieldElement, Message } from 'react-hook-form';

interface ContainerProps {
  label: string,
  name: string,
  error?: Message,
  reference(ref: FieldElement<any>): void
}

export const NumberInputField: React.FC<ContainerProps> = ({ label, reference, name, error }) => {
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
          type="number"
        />
      </div>
    </div>
  )
}
