import { deriveKey } from './encrypt'

export async function decryptData (encryptedData: {
    ciphertext: number[];
    iv: number[];
    authTag: number[];
    salt: number[];
  }, password: string) {
  try {
    const { ciphertext, iv, authTag, salt } = encryptedData

    // Convertir de vuelta a Uint8Array
    const cipherBytes = new Uint8Array(ciphertext)
    const ivBytes = new Uint8Array(iv)
    const authTagBytes = new Uint8Array(authTag)

    const key = await deriveKey(password, new Uint8Array(salt))

    // Combinar el ciphertext y el auth tag
    const dataWithAuthTag = new Uint8Array(cipherBytes.length + authTagBytes.length)
    dataWithAuthTag.set(cipherBytes, 0)
    dataWithAuthTag.set(authTagBytes, ciphertext.length)

    const decryptedContent = await window.crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: ivBytes, tagLength: 128 },
      key,
      dataWithAuthTag
    )

    return new TextDecoder().decode(decryptedContent)
  } catch (error) {
    console.error('Error during decryption:', error)
    throw error
  }
}
