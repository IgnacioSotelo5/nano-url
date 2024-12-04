import { BASE_URL } from '@/constants'
import { ApiResponse, handleResponse } from '../utils'
import { UIMode, User } from './user-interface'

export async function getUser (): Promise<ApiResponse<User>> {
  const res = await fetch(`${BASE_URL}/users`, {
    credentials: 'include'
  })

  return handleResponse(res)
}
export async function getProfileImage (filename: string) {
  const res = await fetch(`${BASE_URL}/users/profile-img/${filename}`, {
    credentials: 'include'
  })

  return res
}
export async function updateUser (body: {name: string, filename?: string, themePreference: UIMode}) {
  const res = await fetch(`${BASE_URL}/users/update-user/`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })

  return handleResponse(res)
}
export async function updateProfileImage (formData: FormData) {
  const res = await fetch(`${BASE_URL}/users/profile-image/`, {
    method: 'PATCH',
    body: formData,
    credentials: 'include'
  })
  return handleResponse(res)
}

export async function removeUser (id: string) {
  const res = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })

  return handleResponse(res)
}

export async function getUserPreferences (): Promise<ApiResponse<User>> {
  const res = await fetch(`${BASE_URL}/users/`, {
    credentials: 'include'
  })
  return handleResponse(res)
}
