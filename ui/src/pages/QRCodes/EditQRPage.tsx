import { useNavigate, useParams } from "react-router-dom"
import { EditQRForm, formDataQR } from "./components/EditQRForm"
import { useEffect, useState } from "react"
import { editQR, getQrBySlug } from "@/api/qrCodes/qr-codes-api"
import { QRCode } from "@/api/qrCodes/qr-code-interface"
import { useToast } from "@/context/ToastContext"

export default function EditQRPage () {
  const { shortUrl } = useParams()
  const [qr, setQr] = useState<QRCode | null>(null)
  const { showSuccessMessage } = useToast()
  const navigate = useNavigate()

  useEffect(() => {
    const getLinkToUpdate = async () => {
      if (shortUrl) {
        try {
          const res = await getQrBySlug(shortUrl)
          if (res.ok) {
            setQr(res.data)
          }
        } catch (error) {
          throw new Error('Error al obtener los datos', error.message)
        }
      }
    }

    getLinkToUpdate()
  }, [])

  const handleUpdate = async (data: formDataQR) => {
    try {
      const res = await editQR(data, qr!.id)
      if (res.ok) {
        showSuccessMessage('Codigo QR actualizado exitosamente.', {
          type: 'success'
        })
      }
      navigate(-1)
    } catch (error) {
      throw new Error('Error al actualizar los datos')
    }
  } 

  return (
        <>
            <div className="w-full h-[100svh] flex flex-col items-center justify-start top-14 relative">
                <EditQRForm qr={qr} onSubmit={handleUpdate} />
            </div>
        </>
  )
}
