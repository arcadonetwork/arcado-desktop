import React from 'react';

import { TextInputField } from 'src/components/TextInputField';
import { TextAreaInputField } from '../../TextAreaInputField';

interface ContainerProps {
  register: any,
  errors: any
}


export const CreateGameModalForm: React.FC<ContainerProps> = ({ register, errors }) => (
  <>
    <div className="mb25 br-b pb10">
      <h2 className="ffm-bold fs-m p0 m0">Create Game</h2>
    </div>
    <div className="mb15">
      <TextInputField
        label="Name"
        name="name"
        placeholder="Fortnite, Poker, League of Legends, etc."
        error={(errors.name || {}).message}
        reference={
          register({
            required: {
              value: true,
              message: "required"
            },
            minLength: {
              value: 3,
              message: "At least 3 chars."
            }
          })
        }
      />
    </div>
    <div className="mb15">
      <TextAreaInputField
        label="Description"
        name="description"
        placeholder="What is the game about?"
        error={(errors.name || {}).message}
        reference={
          register({
            required: {
              value: true,
              message: "required"
            },
            minLength: {
              value: 3,
              message: "At least 3 chars."
            }
          })
        }
      />
    </div>
  </>
)
