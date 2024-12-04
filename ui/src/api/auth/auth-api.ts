import { BASE_URL } from '@/constants'
import { ApiResponse, handleResponse } from '../utils'

type Auth = {
  email: string,
  password: string
}

export async function registerUser ({ email, password }: {email: string, password: string}): Promise<ApiResponse<Auth>> {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  })

  return handleResponse(res)
}

export async function loginUser (body: { email: string, password: string }): Promise<ApiResponse<Auth>> {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify(body)
  })

  return handleResponse(res)
}

export async function getIsAuth (): Promise<ApiResponse<{id: string, email: string}>> {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    credentials: 'include'
  })

  return handleResponse(res)
}
