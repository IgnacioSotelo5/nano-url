// Función para derivar una clave a partir de una contraseña y sal
export async function deriveKey (password: string, salt: Uint8Array) {
  try {
    const encodedPassword = new TextEncoder().encode(password)
    const baseKey = await window.crypto.subtle.importKey(
      'raw',
      encodedPassword,
      { name: 'PBKDF2' },
      false,
      ['deriveKey']
    )

    const derivedKey = await window.crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt,
        iterations: 600000,
        hash: 'SHA-256'
      },
      baseKey,
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt', 'decrypt']
    )

    return derivedKey
  } catch (error) {
    console.error('Error deriving key:', error)
    throw error // Re-lanzar el error para manejarlo en el llamador
  }
}

// Función para encriptar datos usando una contraseña
export async function encryptData (data: string, password: string) {
  try {
    const salt = window.crypto.getRandomValues(new Uint8Array(16)) // 128-bit salt
    const iv = window.crypto.getRandomValues(new Uint8Array(12)) // 12 bytes for AES-GCM
    const key = await deriveKey(password, salt)
    const encodedData = new TextEncoder().encode(data)

    const encryptedContent = await window.crypto.subtle.encrypt(
      {
        name: 'AES-GCM',
        iv,
        tagLength: 128
      },
      key,
      encodedData
    )

    // Extraer el ciphertext y el auth tag
    const ciphertext = new Uint8Array(encryptedContent.slice(0, -16))
    const authTag = new Uint8Array(encryptedContent.slice(-16))

    // Devolver en un formato legible
    return {
      ciphertext: Array.from(ciphertext), // Convertir a Array para facilitar la serialización
      iv: Array.from(iv), // Convertir a Array
      authTag: Array.from(authTag), // Convertir a Array
      salt: Array.from(salt) // Convertir a Array
    }
  } catch (error) {
    console.error('Error during encryption:', error)
    throw error
  }
}
