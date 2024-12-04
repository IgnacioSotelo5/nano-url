import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { QRCard } from './QRCard'
import { useToast } from '@/context/ToastContext'
import { useTheme } from '@/hooks/useTheme'
import { CheckIcon } from '@/components/icons/Icons'
import { QRCode } from '@/api/qrCodes/qr-code-interface'
import { Zoom } from 'react-toastify'
import { deleteQr, getQrBySlug } from '@/api/qrCodes/qr-codes-api'

export default function QRCodeDetail () {
  const [qr, setQr] = useState<QRCode | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const { showSuccessMessage } = useToast()
  const { isDark } = useTheme()

  const handleDelete = async (id: string) => {
    const res = await deleteQr(id)
    if (res.ok) {
      showSuccessMessage('Enlace eliminado correctamente', {
        position: 'top-center',
        closeOnClick: true,
        autoClose: 4000,
        draggable: true,
        progress: undefined,
        theme: isDark,
        transition: Zoom,
        progressStyle: {
          backgroundColor: 'green'
        },
        style: {
          transition: 'all 2s ease-in-out'
        },
        type: 'success',
        icon: <CheckIcon />
      })
      navigate('/links')
    }
  }

  useEffect(() => {
    const getLink = async () => {        
      const slug = params.shortUrl
      
      if (slug) {
        const res = await getQrBySlug(slug)
        
        if (res.ok) {
          setQr(res.data!)
        }
      }
    }

    getLink()
  }, [params.shortUrl])

  return (
    <div id="qrDetail" className='w-full h-[100svh] flex justify-center top-14 relative'>
      <div className='w-5/6'>
        {qr && <QRCard QrCode={qr} onDelete={handleDelete} />}
      </div>
    </div>
  )
}
