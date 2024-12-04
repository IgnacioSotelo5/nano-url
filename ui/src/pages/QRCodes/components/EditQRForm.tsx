import { Link } from "@/api/links/link-interface"
import { QRCode } from "@/api/qrCodes/qr-code-interface"
import { CopyIcon, RedirectIcon } from "@/components/icons/Icons"
import { InputField } from "@/pages/components/InputField"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"

export interface formDataQR {
    qrImageFilename: string;
    link: Partial<Link>
}

export function EditQRForm ({ qr, onSubmit }: { qr: QRCode | null, onSubmit: (data: formDataQR) => void }) {
  const [formData, setFormData] = useState<formDataQR>({
    qrImageFilename: qr?.qrImageFilename || '',
    link: {
      title: qr?.link.title || '',
      customShortUrl: qr?.link.customShortUrl || '', 
      originalUrl: qr?.link.originalUrl || '',
      shortUrl: qr?.link.shortUrl || '' 
    }
  })

  const { shortUrl, customShortUrl } = formData?.link
  const domain = qr?.link.domain
  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()
  useEffect(() => {
    if (qr) {
      setFormData({
        qrImageFilename: qr.qrImageFilename,
        link: {
          title: qr.link.title,
          customShortUrl: qr.link.customShortUrl || '', 
          shortUrl: qr.link.shortUrl,
          originalUrl: qr.link.originalUrl
        }
      })
    }
  }, [qr])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    
    setFormData(prev => ({
      ...prev,
      link: {
        ...prev.link,
        [name]: value
      }
      
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {    
    navigate(-1)
  }

  const handleCopy = async () => {
    const url = `${domain}/${customShortUrl || shortUrl}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      toast.error('Error al copiar el enlace')
    }
  }

  return (
        <div className="flex items-center justify-between gap-8 w-11/12 h-3/4">
          <form onSubmit={handleSubmit} className="w-2/3 h-full flex flex-col justify-between gap-6">
              <h2 className="text-4xl">
                  Editar Codigo QR
              </h2>
              <div className="flex flex-col gap-2">
                  <p className="font-medium tracking-tight">
                      Enlace corto
                  </p>
                  <div className="flex items-center gap-4 ">

                      <span id="linkUrl">
                          {domain}/{customShortUrl || shortUrl}
                      </span>
                      <button onClick={handleCopy} className="command-btn">
                        <CopyIcon className="size-4" />
                      </button>
                  </div>
              </div>

              <div className="flex flex-col gap-2">
                  <p className="font-medium tracking-tight">
                      Enlace de destino
                  </p>
                  <div className="flex items-center gap-4">
                      {
                        isEditing
                          ? (
                            
                            <InputField
                            text={''}
                            htmlFor="originalUrl"
                            labelStyle="h-full w-full"
                            className="w-full h-full p-3 border-none rounded-md dark:text-white dark:bg-zinc-100/5 dark:hover:outline-1 dark:hover:outline dark:outline-purple-700"
                            value={formData.link.originalUrl}
                            onChange={handleChange}
                            />
                            )
                          : (
                            <>
                            <span className="line-clamp-1 w-1/2" id="originalUrl">
                            {qr?.link?.originalUrl}
                            </span>
                            <button onClick={handleEditClick} className="flex gap-2 p-2 dark:bg-transparent dark:hover:bg-purple-100/10 border-none rounded-sm cursor-pointer items-center text-blue-600 text-sm">
                              <RedirectIcon className="size-4" />
                              Editar destino de redirección
                            </button> 
                            </>
                            )
                        }
                  </div>
              </div>
              <hr className="w-full border-purple-100/25" />
              <div className="flex flex-col gap-12">
                  <div className="h-12">
                      <InputField
                          text="Titulo"
                          htmlFor="title"
                          className="w-full mt-2 p-3 border-none rounded-md dark:text-white dark:bg-zinc-100/5 dark:hover:outline-1 dark:hover:outline dark:outline-purple-700"
                          value={formData.link.title}
                          onChange={handleChange}
                      />
                  </div>
              </div>
              <div className="self-end gap-3 mt-4 flex">
                  <button onClick={handleCancel} className="btn dark:bg-zinc-50/90 dark:hover:bg-zinc-50 dark:text-black">
                      Cancelar
                  </button>
                  <button className="btn-primary">
                      Guardar cambios
                  </button>
              </div>
          </form>
          <section className="w-2/4 h-full bg-zinc-600/20 flex justify-center items-center">
            <div className="flex flex-col gap-3 justify-stretch items-center relative bottom-10">
              <h3>Preview</h3>
              <img className="size-[200px]" src={`http://localhost:3000/qr-code/file/${qr?.qrImageFilename}`} alt="" />
            </div>
          </section>
        </div>
  )
}
