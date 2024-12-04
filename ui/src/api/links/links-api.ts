import { BASE_URL } from '@/constants'
import { ApiResponse, handleResponse } from '../utils'
import { Link } from './link-interface'

export async function createLink (body: {originalUrl: string, title?: string, shortUrl?: string}): Promise<ApiResponse<Link>> {
  const res = await fetch(`${BASE_URL}/links`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  })

  return await handleResponse(res)
}

export async function getAllLinks (): Promise<ApiResponse<Link[]>> {
  const res = await fetch(`${BASE_URL}/links`, {
    credentials: 'include'
  })
  return await handleResponse(res)
}

export async function getLinkById (id: string): Promise<ApiResponse<Link>> {
  const res = await fetch(`${BASE_URL}/links/${id}`,
    {
      credentials: 'include'
    }
  )
  return await handleResponse(res)
}

export async function getLinkBySlug (shortUrl: string): Promise<ApiResponse<Link>> {
  const res = await fetch(`${BASE_URL}/links/q?shortUrl=${shortUrl}`,
    {
      credentials: 'include'
    }
  )
  
  return await handleResponse(res)
}

export async function deleteLink (id: string) {
  const res = await fetch(`${BASE_URL}/links/${id}`, {
    method: 'DELETE',
    credentials: 'include'
  })
  
  return await handleResponse(res)
}

export async function updateLink (id: string, body: Partial<{title: string, originalUrl: string, customShortUrl: string | null, customDomain: string}>): Promise<ApiResponse<Link>> {
  const res = await fetch(`${BASE_URL}/links/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  })

  return await handleResponse(res)
}
