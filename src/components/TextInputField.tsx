import React from 'react';
import { FieldElement, Message } from 'react-hook-form';

interface ContainerProps {
  label: string,
  name: string,
  placeholder?: string,
  error?: Message,
  reference(ref: FieldElement<any>): void
}

export const TextInputField: React.FC<ContainerProps> = ({ label, reference, name, error, placeholder }) => {
  return (
    <>
      <div className="mb10 flex-c flex-jc-sb">
        <span>{label}</span>
        {error ? <span className="fc-red fs-s">{error}</span> : ''}
      </div>
      <div className="mb10">
        <input
          className={error ? 'error-input' : ''}
          name={name}
          placeholder={placeholder}
          ref={reference}
        />
      </div>
    </>
  )
}
