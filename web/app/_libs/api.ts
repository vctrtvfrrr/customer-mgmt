/* eslint-disable @typescript-eslint/no-explicit-any */
import config from '@/config'
import qs from 'qs'

const API_URL = config.apiUrl.replace(/\/$/g, '')

async function get(endpoint: string, query?: any, extraOptions?: RequestInit): Promise<any> {
  const queryString = qs.stringify(query)
  const requestOptions = {
    ...extraOptions,
    method: 'GET',
  }

  const response = await fetch(
    `${API_URL}/${endpoint.replace(/^\//, '')}?${queryString}`,
    requestOptions
  )

  return handleResponse(response)
}

async function post(endpoint: string, body: any, extraOptions?: RequestInit): Promise<any> {
  const requestOptions = {
    ...extraOptions,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }

  const response = await fetch(`${API_URL}/${endpoint.replace(/^\//, '')}`, requestOptions)

  return handleResponse(response)
}

async function patch(endpoint: string, body: any, extraOptions?: RequestInit): Promise<any> {
  const requestOptions = {
    ...extraOptions,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  }

  const response = await fetch(`${API_URL}/${endpoint.replace(/^\//, '')}`, requestOptions)

  return handleResponse(response)
}

// prefixed with underscored because delete is a reserved word in javascript
async function _delete(endpoint: string, extraOptions?: RequestInit): Promise<void> {
  const requestOptions = {
    ...extraOptions,
    method: 'DELETE',
  }

  await fetch(`${API_URL}/${endpoint.replace(/^\//, '')}`, requestOptions)
}

async function handleResponse(response: Response) {
  if (!response.ok) {
    const text = await response.text()
    const data = text && JSON.parse(text)
    const error = (data && data.message) || response.statusText
    return Promise.reject(error)
  }

  const contentType = response.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json'))
    throw new TypeError("Oops, we haven't got JSON!")

  return await response.json()
}

const API = {
  get,
  post,
  patch,
  delete: _delete,
}

export default API
