import { Link } from "@/api/links/link-interface"
import { EditIcon, RedirectIcon } from "@/components/icons/Icons"
import { InputField } from "@/pages/components/InputField"
import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { SelectComponent } from "./SelectOption"
import { useLocation, useNavigate } from "react-router-dom"

export interface formDataLink {
    title: string;
    customShortUrl: string | null;
    originalUrl: string;
    shortUrl: string;
    selectedTag: string;
}

export function EditForm ({ link, onSubmit }: { link: Link | null, onSubmit: (data: formDataLink) => void }) {
  const [formData, setFormData] = useState<formDataLink>({
    title: link?.title || '',
    customShortUrl: link?.customShortUrl || null, 
    originalUrl: link?.originalUrl || '',
    shortUrl: link?.shortUrl || '', 
    selectedTag: ''
  })

  const [isEditing, setIsEditing] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (link) {
      setFormData({
        title: link.title,
        customShortUrl: link.customShortUrl || null, 
        shortUrl: link.shortUrl,
        originalUrl: link.originalUrl,
        selectedTag: ''
      })
    }
  }, [link])

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleBlur = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault()
    const { name, value } = event.target
    if (name === 'customShortUrl' && value === '') {
      setFormData(prevState => ({
        ...prevState,
        customShortUrl: null
      }))
    }
  }
  
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handleTagChange = (tag: string) => {
    setFormData(prev => ({
      ...prev,
      selectedTag: tag
    }))
  }

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleCancel = () => {        
    navigate(location.state.from || -1)
  }

  return (
        <form onSubmit={handleSubmit} className="w-2/3 flex flex-col gap-6">
            <h2 className="text-4xl">
                Editar enlace
            </h2>
            <div className="flex flex-col gap-2">
                <p className="font-medium tracking-tight">
                    Enlace corto
                </p>
                <div className="flex items-center gap-4 ">

                    <span id="linkUrl">
                        {link?.domain}/{link?.customShortUrl || link?.shortUrl}
                    </span>

                    <button onClick={(event) => {
                      event.preventDefault()
                      handleEditClick()
                      event.currentTarget.classList.add('hidden')
                      const linkUrl = document.getElementById('linkUrl')
                      const label = event.currentTarget.nextElementSibling
                      const input = event.currentTarget.nextElementSibling?.lastChild as HTMLInputElement
                      const className = 'w-1/2 p-3 border-none rounded-md dark:text-white dark:bg-zinc-100/5 dark:hover:outline-1 dark:hover:outline dark:outline-purple-700'
                      label?.classList.add('w-1/2', 'h-full')
                      input.classList.remove('hidden')
                        linkUrl!.innerText = link?.domain || ''
                        linkUrl?.classList.add(...className.split(' '))
                        event.currentTarget.replaceWith(document.createElement('div').innerHTML = '/')
                    }} className="flex gap-2 p-2 dark:bg-transparent dark:hover:bg-purple-100/10 border-none rounded-sm cursor-pointer items-center text-blue-600 text-sm">
                        <EditIcon />
                        Editar enlace corto
                    </button>

                    <InputField
                        text={''}
                        htmlFor="customShortUrl"
                        className="placeholder:opacity-100 placeholder:text-white hidden w-full h-full p-3 border-none rounded-md dark:text-white dark:bg-zinc-100/5 dark:hover:outline-1 dark:hover:outline dark:outline-purple-700"
                        value={formData.customShortUrl !== null ? formData.customShortUrl : formData.shortUrl} onChange={handleChange}
                        onBlur={handleBlur}
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <p className="font-medium tracking-tight">
                    Enlace de destino
                </p>
                <div className="flex items-center gap-4">
                    <span className="line-clamp-1 w-1/2" id="originalUrl">
                        {link?.originalUrl}
                    </span>
                    <button onClick={(event) => {
                      event.preventDefault()
                      event.currentTarget.classList.add('hidden')
                      const originalUrl = document.getElementById('originalUrl')
                      const label = event.currentTarget.nextElementSibling
                      const input = event.currentTarget.nextElementSibling?.lastChild as HTMLInputElement
                      label?.classList.add('w-full', 'h-full')
                      input.classList.remove('hidden')
                      originalUrl?.classList.add('hidden')
                    }} className="flex gap-2 p-2 dark:bg-transparent dark:hover:bg-purple-100/10 border-none rounded-sm cursor-pointer items-center text-blue-600 text-sm">
                        <RedirectIcon className="size-4" />
                        Editar destino de redirección
                    </button>
                    <InputField
                        text={''}
                        htmlFor="originalUrl"
                        className="hidden w-full h-full p-3 border-none rounded-md dark:text-white dark:bg-zinc-100/5 dark:hover:outline-1 dark:hover:outline dark:outline-purple-700"
                        value={formData.originalUrl}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <hr className="w-full border-purple-100/25 mt-4" />
            <div className="flex flex-col gap-12">
                <div className="h-12">
                    <InputField
                        text="Titulo"
                        htmlFor="title"
                        className="w-full mt-2 p-3 border-none rounded-md dark:text-white dark:bg-zinc-100/5 dark:hover:outline-1 dark:hover:outline dark:outline-purple-700"
                        value={formData.title}
                        onChange={handleChange}
                    />
                </div>
                <SelectComponent selectedTag={formData.selectedTag} onTagChange={handleTagChange} />
            </div>
            <div className="self-end gap-3 flex">
                <button type="button" onClick={handleCancel} className="btn dark:bg-zinc-50/90 dark:hover:bg-zinc-50 dark:text-black">
                    Cancelar
                </button>
                <button type="submit" className="btn-primary">
                    Guardar cambios
                </button>
            </div>
        </form>
  )
}
