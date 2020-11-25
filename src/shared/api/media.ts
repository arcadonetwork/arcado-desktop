import { request, API_BASE_URI } from './request'

const URI = API_BASE_URI

export const getSignedUrl = async (body: any) => {
  return request({
    url: `${URI}/signed_url`,
    method: 'POST',
    body
  })
}

export const savePicture = async (url: string, file: any) => {
  const response = await fetch(url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type
    }
  })
  if (response.ok) {
    return response.text()
  }
  const error = await response.json()
  // eslint-disable-next-line
  throw { status: error.statusCode, message: error.message }
}

export const getAvatarMedia = async (media_id: string) => {
  return request({
    url: `${URI}/${media_id}`,
    method: 'GET'
  })
}
