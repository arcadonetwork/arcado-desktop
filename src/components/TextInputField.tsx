import React from 'react';
import { FieldElement, Message } from 'react-hook-form';
import { FormLabel } from './form/FormLabel';

interface ContainerProps {
  label: string,
  name: string,
  value?: string,
  placeholder?: string,
  error?: Message,
  reference(ref: FieldElement<any>): void
  onChange?(value: string): void
}

export const TextInputField: React.FC<ContainerProps> = ({ label, value, reference, name, error, placeholder, onChange }) => {
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
          value={value}
          placeholder={placeholder}
          ref={reference}
          onChange={(ev: any) => onChange ? onChange(ev.target.value) :''}
        />
      </div>
    </>
  )
}
