import { Link } from "@/api/links/link-interface"
import { EditForm, formDataLink } from "./components/EditForm"
import { getLinkBySlug, updateLink } from "@/api/links/links-api"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { toast, ToastContainer, Zoom } from "react-toastify"
import { CheckIcon, InfoIcon } from "@/components/icons/Icons"
import { useTheme } from "@/hooks/useTheme"

export default function EditLinkPage () {
  const [link, setLink] = useState<Link | null>(null)
  const { shortUrl } = useParams()
  const { isDark } = useTheme()

  useEffect(() => {
    const getLinkToUpdate = async () => {
      if (shortUrl) {
        try {
          const res = await getLinkBySlug(shortUrl)
          if (res.ok) {
            setLink(res.data)
          }
        } catch (error) {
          toast.error('Error al obtener el enlace', {
            icon: <InfoIcon />
          })         
        }
      }
    }

    getLinkToUpdate()
  }, [])

  const handleUpdate = async (data: formDataLink) => {
    const { title, originalUrl, customShortUrl } = data
    const body = {
      title,
      customShortUrl,
      originalUrl
    }

    try {
      if (link?.id) {        
        const res = await updateLink(link.id, body)
        
        if (res.ok) {
          toast.success('Enlace actualizado con exito', {
            icon: <CheckIcon />
          })
        }
      }
    } catch (error) {
      toast.error('Error al actualizar el enlace', {
        icon: <InfoIcon />
      })
    }
  }
 
  return (
        <>
            <div className="w-full h-[100svh] flex flex-col items-center justify-start top-14 relative">
                <EditForm link={link} onSubmit={handleUpdate} />
            </div>
            <ToastContainer
            position="top-center"
            transition={Zoom}
            autoClose={false}
            theme={isDark}
            />
        </>
  )
}
