import React from 'react';
import { Message } from 'react-hook-form';

interface ContainerProps {
  label: string
  error?: Message
}

export const FormLabel: React.FC<ContainerProps> = ({ label, error }) => (
  <div className="mb5 flex-c flex-jc-sb">
    <span>{label}</span>
    {error ? <span className="fc-red fs-s">{error}</span> : ''}
  </div>
)
