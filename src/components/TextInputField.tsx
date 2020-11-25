import React from 'react';
import { FieldElement, Message } from 'react-hook-form';
import { FormLabel } from './form/FormLabel';

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
      <FormLabel
        label={label}
        error={error}
      />
      <div className="mb10">
        <input
          className={`text-input ${error ? 'error-input' : ''}`}
          name={name}
          placeholder={placeholder}
          ref={reference}
        />
      </div>
    </>
  )
}
