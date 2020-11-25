import React, { useState } from 'react';
import Upload from 'antd/es/upload'
import message from 'antd/es/message'

import { getSignedUrl, savePicture } from '../../shared/api/media'
import { RcFile } from 'antd/es/upload/interface';

interface ContainerProps {
  children?: any
  disabled: boolean,
  setIsUploading?: any
  upload?: any
}

export const UploadImage: React.FC<ContainerProps> = ({ children, disabled, setIsUploading, upload }) => {

  const [uploadedFile, setUploadedFile] = useState<any>();

  async function setSignedUrl(file: any) {
    try {
      if (setIsUploading) {
        setIsUploading(true)
      }
      const { result } = await getSignedUrl({
        name: file.name,
        type: file.type
      })
      setUploadedFile({ ...result })
    } catch (e) {}
  }

  async function beforeUpload (file: RcFile) : Promise<any> {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!')
    }
    if (isJpgOrPng && isLt2M) {
      return setSignedUrl(file).then(() => {
        return isJpgOrPng && isLt2M
      })
    } else {
      return isJpgOrPng && isLt2M
    }

  }

  async function customRequest({ file }: { file: any }) {
    if (upload && uploadedFile) {
      await savePicture(uploadedFile.signed_URL, file)
      await upload(uploadedFile.file_name)
    } else {
      message.error('no upload endpoint')
    }
  }

  return (
    <Upload
      showUploadList={false}
      accept="image/png,image/jpeg"
      beforeUpload={beforeUpload}
      customRequest={customRequest}
      disabled={disabled}>
      {children}
    </Upload>
  )
}
