import { QRCode } from "@/api/qrCodes/qr-code-interface"
import { deleteQr, getAllQrs } from "@/api/qrCodes/qr-codes-api"
import { Button } from "@/components/Button"
import { useTheme } from "@/hooks/useTheme"
import { useUser } from "@/hooks/useUser"
import { useCallback, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast, ToastContainer, Zoom } from "react-toastify"
import { QRCard } from "./components/QRCard"

export default function QrCodeContainer () {
  const [qrs, setQrs] = useState<QRCode[]>([])
  const [loading, setLoading] = useState(true)
  const { isDark } = useTheme()
  const navigate = useNavigate()
  const { user } = useUser()
  const isFirstRender = useRef(true)

  const getQrs = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAllQrs()
      if (res.ok) {
        setQrs(prevState => {
          const newQr = res.data?.filter(qr => {
            return !prevState.some(existingQr => existingQr.id === qr.id)
          })
          return [...prevState, ...newQr!]
        })
      }
    } catch (error) {
      throw new Error('Hubo un problema con la solicitud: ' + error.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    getQrs()
  }, [getQrs])

  useEffect(() => {
    if (!isFirstRender.current) {
      if (!loading && qrs.length === 0) {
        navigate('/qr-code/create')
      }
    }
  }, [loading, qrs, navigate])

  const createQR = () => {
    navigate('/qr-codes/create')
  }

  const handleDelete = async (id: string) => {
    const res = await deleteQr(id)
    if (res.ok) {
      setQrs(prevQrs => prevQrs.filter(qr => qr.id !== id))
      toast.success('QR eliminado correctamente')
    }
  }
  return (

        <>
            <div className='w-full h-[100svh] flex flex-col items-center justify-start top-14 relative'>
            <ToastContainer
            closeButton={false}
            position='top-center'
            autoClose={false}
            hideProgressBar={true}
            rtl={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            theme={isDark}
            transition={Zoom}
            style={{ lineClamp: 2, textWrap: 'wrap', width: 420 }}
            />
            <div className='w-5/6 flex flex-col gap-4'>
            <div className='self-start flex items-center justify-between w-full'>
                <h2 className='text-[2em]'>Codigos QR de <span className='underline-offset-2 underline'>{user?.name}</span></h2>
                <Button onClick={createQR} customClassName='btn-primary'>
                    Crear código
                </Button>
            </div>
            <ul className='dark:bg-transparent bg-zinc-200 h-auto py-8 flex flex-col gap-6 justify-center'>
                {
                qrs.length !== 0
                  ? (qrs.map(qr => (
                    <QRCard onDelete={handleDelete} key={qr.id} QrCode={qr} />
                    )))
                  : (
                        <p className='bg-zinc-600/50 rounded-sm p-4'>Aún no has creado codigos QR</p>
                    )
                }
            </ul>
            </div>
        </div>
    </>
  )
}
