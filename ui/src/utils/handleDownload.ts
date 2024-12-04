import { getQrImage } from "@/api/qrCodes/qr-codes-api"
import { toast } from "react-toastify"

export const handleDownload = async (filename: string) => {
  try {
      	// Primero llamamos a getQrImage para obtener el Blob del archivo
		 const file = await getQrImage(filename) 
		 // Construimos un objeto URL a partir del Blob
		 const url = URL.createObjectURL(file) 
		 // Creamos un nuevo elemento anchord
		 const a = document.createElement('a')
		 // Seteamos el href del enlace al url del archivo
		 // y el attributo download al nombre del archivo 
		 a.href = url 
		 a.download = filename 
		 document.body.appendChild(a) 
		 // simulamos un click en el enlace para inicial la descarga
		 a.click() 
		 // Limpiamos el dom removiendo el enlace y revocando
		 // la URL construida para liberar espacio en memoria
		 document.body.removeChild(a) 
		 URL.revokeObjectURL(url) 
		 toast.success('Archivo descargado exitosamente') 
  } catch (error) {
    toast.error('Error al descargar el archivo')
    console.error('Error downloading file:', error) 
  }
}
