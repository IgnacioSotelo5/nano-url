import { BASE_URL } from "@/constants"
import { ApiResponse, handleResponse } from "../utils"
import { QRCode } from "./qr-code-interface"

export async function createQrCode (body: {originalUrl: string, title: string, customShortUrl?: string | null, color?: {dark: string, light: string}, qrType?: 'svg' | 'png' }) {
  const res = await fetch(`${BASE_URL}/qr-code`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body),
    credentials: 'include'
  })

  return await handleResponse(res)
}

export async function getAllQrs (): Promise<ApiResponse<QRCode[]>> {
  const res = await fetch(`${BASE_URL}/qr-code`, {
    credentials: 'include'
  })

  return await handleResponse(res)
}

export async function getQrById (id: string): Promise<ApiResponse<QRCode>> {
  const res = await fetch(`${BASE_URL}/qr-code/${id}`, {
    credentials: 'include'
  })

  return await handleResponse(res)
}

export async function getQrBySlug (slug: string): Promise<ApiResponse<QRCode>> {
  const res = await fetch(`${BASE_URL}/qr-code/q?shortUrl=${slug}`, {
    credentials: 'include'
  })

  return await handleResponse(res)
}

export async function deleteQr (id: string) {
  const res = await fetch(`${BASE_URL}/qr-code/${id}`, {
    method: 'DELETE',
    credentials: 'include'    
  })

  return await handleResponse(res)
}

export async function editQR (body: {qrImageFilename: string, link: Partial<{originalUrl: string, title: string, customShortUrl: string}>}, id:string) {
  const res = await fetch(`${BASE_URL}/qr-code/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include'
  })

  return await handleResponse(res)
}

export async function getQrImage (filename: string): Promise<Blob> {
  // Solicitud a la api usando fetch y
  // obtenemos el readable stream
  const res = await fetch(`${BASE_URL}/qr-code/file/${filename}`, 
    { credentials: 'include' })

  // si la respuesta no es satisfactoria
  // lanzamos un error con el mensaje de error que nos de la api
  if (!res.ok) {
    const errorData = await res.json()
    throw new Error(errorData.message) 
  } 
  
  // Creamos un reader a partir del body
  const reader = res.body?.getReader() 
  // inicializamos chunk para pushear aqui los datos
  const chunks = []
  
  // Leemos los datos en chunks (pedazos) y pusheamos al array antes inicializado
  while (true) {
    if (reader) {
      const { done, value } = await reader.read() 
      if (done) break 
      chunks.push(value) 
    }
  } 

  // Creamos y retornamos un Blob a partir de los chunks
  return new Blob(chunks) 
}
