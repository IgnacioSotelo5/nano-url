export interface ApiResponse<T>{
    statusCode: number
    message: string
    ok: boolean,
    timestamp: string
    path: string
    data: T | null
}
export async function handleResponse<T> (response: Response): Promise<ApiResponse<T>> {    
  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.message)
  }

  if (response.status === 204) {
    return {
      statusCode: 204,
      message: 'No content',
      timestamp: new Date().toISOString(),
      path: response.url,
      ok: response.ok,
      data: null
    }
  }
  
  return await response.json()
}

export async function handleReadableStream (response: Response): Promise<Blob> {
  const reader = response.body?.getReader()
  const chunks = []

  while (true) {
    const { done, value } = await reader!.read()
    if (done) break
    chunks.push(value)
  }

  return new Blob(chunks)
}
