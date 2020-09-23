import React from 'react';

import { TextInputField } from 'src/components/TextInputField';
import { NumberInputField } from '../../NumberInputField';

interface ContainerProps {
  register: any,
  errors: any,
  distributionError: any
}


export const CreateTournamentModalForm: React.FC<ContainerProps> = ({ register, errors, distributionError }) => (
  <>
    <div className="mb15">
      <TextInputField
        label="Name"
        name="name"
        placeholder="Noobs only!"
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
    <div className="grid-col2 mb25">
      <NumberInputField
        label="Entry Fee"
        name="entryFee"
        error={(errors.entryFee || {}).message}
        reference={
          register({
            required: {
              value: true,
              message: "required"
            },
            min : {
              value: 1,
              message: "Min. of 1 LSK"
            }
          })
        }
      />
      <NumberInputField
        label="Players"
        name="maxPlayers"
        error={(errors.maxPlayers || {}).message}
        reference={
          register({
            required: {
              value: true,
              message: "required"
            },
            min : {
              value: 3,
              message: "Min. 3 players"
            }
          })
        }
        defaultValue={3}
        min={3}
      />
    </div>
    <div className="w100">
      <div className="w100 pb10 mb10 br-b flex-c flex-jc-sb">
        <span className="fc-black">Price Distribution</span>
        <span className="fc-red">
            {distributionError
              ? distributionError
              : ''}
          </span>
      </div>
      <p className="mb25 w70 fs-s">The distribution is calculated on percentages. Make sure that the the distribution equals 100% when saving.</p>
      <div className="grid-col3">
        <NumberInputField
          label="#1"
          name="distribution.first"
          placeholder="50"
          error={((errors.distribution || {}).first || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              min : {
                value: 0,
                message: "At least 0"
              }
            })
          }
        />
        <NumberInputField
          label="#2"
          name="distribution.second"
          error={((errors.distribution || {}).second || {}).message}
          placeholder="30"
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              min : {
                value: 0,
                message: "At least 0"
              }
            })
          }
        />
        <NumberInputField
          label="#3"
          name="distribution.third"
          placeholder="20"
          error={((errors.distribution || {}).third || {}).message}
          reference={
            register({
              required: {
                value: true,
                message: "required"
              },
              min : {
                value: 0,
                message: "At least 0"
              }
            })
          }
        />
      </div>
    </div>
  </>
)
