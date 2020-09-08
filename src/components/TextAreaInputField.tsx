import React, { ChangeEvent, useState } from 'react';
import { FieldElement, Message } from 'react-hook-form';

interface ContainerProps {
  label: string,
  name: string,
  placeholder?: string,
  error?: Message,
  reference(ref: FieldElement<any>): void
}

const minRows: number = 3;
const maxRows: number = 10;

export const TextAreaInputField: React.FC<ContainerProps> = ({ label, reference, name, error, placeholder }) => {
  const [rows, setRows] = useState<number>(3);

  function handleChange (event: ChangeEvent<HTMLTextAreaElement>) {
    const textareaLineHeight = 24;

    const previousRows = event.target.rows;
    event.target.rows = minRows; // reset number of rows in textarea

    const currentRows = ~~(event.target.scrollHeight / textareaLineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows(currentRows < maxRows ? currentRows : maxRows);
  }

  return (
    <>
      <div className="mb5 flex-c flex-jc-sb">
        <span>{label}</span>
        {error ? <span className="fc-red fs-s">{error}</span> : ''}
      </div>
      <div className="mb10">
        <textarea
          rows={rows}
          className={`textarea-input ${error ? 'error-input' : ''}`}
          name={name}
          placeholder={placeholder}
          ref={reference}
          onChange={handleChange}
        />
      </div>
    </>
  )
}
