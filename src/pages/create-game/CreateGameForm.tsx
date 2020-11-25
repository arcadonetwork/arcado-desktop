import React from 'react';

import { TextInputField } from 'src/components/TextInputField';
import { TextAreaInputField } from '../../components/TextAreaInputField';
import { UploadImage } from '../../components/upload-image/UploadImage';
import { FormLabel } from '../../components/form/FormLabel';
import { CameraOutlined } from '@ant-design/icons';

interface ContainerProps {
  register: any,
  errors: any
  image: any
  setImage(image: any) : void
}


export const CreateGameForm: React.FC<ContainerProps> = ({ register, errors, image = {} }) => (
  <>
    <div className="mb50">
      <h2 className="ffm-bold fs-x p0 m0 mb10">Create Game</h2>
      <p className="fc-grey w40">Your new game can become biggest worlds in the Arcado universe but let us first define some basic information.</p>
    </div>
    <div className="mb25">
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
    <div className="mb25">
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
    <div className="mb25">
      <div className="mb25">
        <FormLabel label="Game Avatar" />
        <p className="fc-grey">Your avatar will be used as a small thumbnail</p>
      </div>
      <UploadImage  disabled={false} >
        <div className="avatar-upload img--100 click flex-c flex-jc-c fs-xxl fc-lgrey br5 bgc-white">
          <CameraOutlined />
        </div>
      </UploadImage>
    </div>
    <div className="mb25">
      <TextInputField
        label="Tags"
        name="tags"
        placeholder=""
        error={(errors.tags || {}).message}
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
