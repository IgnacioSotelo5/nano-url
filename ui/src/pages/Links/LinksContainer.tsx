import { useCallback, useEffect, useRef, useState } from 'react'
import { deleteLink, getAllLinks } from '@/api/links/links-api'
import { useNavigate } from 'react-router-dom'
import { Link } from '@/api/links/link-interface'
import { useUser } from '@/hooks/useUser'
import { LinkCard } from './components/LinkCard'
import { Button } from '@/components/Button'
import { toast, ToastContainer, Zoom } from 'react-toastify'
import { CheckIcon } from '@/components/icons/Icons'
import { useTheme } from '@/hooks/useTheme'

export default function Links (): JSX.Element {
  const [links, setLinks] = useState<Link[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const { user } = useUser()
  const navigate = useNavigate()
  const isFirstRender = useRef(true)
  const { isDark } = useTheme()
  
  const getLinks = useCallback(async () => {
    setLoading(true)
    try {
      const res = await getAllLinks()
      
      if (res.ok) {
        setLinks(prevState => {
          const newLink = res.data?.filter(link => {
            return !prevState.some(existingLink => existingLink.id === link.id)
          })
          return [...prevState, ...newLink!]
        })
      }
    } catch (error) {
      throw new Error('Hubo un problema con la solicitud:', error.message)
    } finally {
      setLoading(false)
    }
  }, [])
  
  useEffect(() => {
    getLinks()
  }, [getLinks])
  
  useEffect(() => {
    if (!isFirstRender.current) {
      if (!loading && links.length === 0) {
        navigate('/links/create')
      }
    }
  }, [loading, links, navigate])
  
  const createLink = async () => {
    navigate('/links/create')
  }
  
  const handleDelete = async (id: string) => {
    const res = await deleteLink(id)
    
    if (res.ok) {
      setLinks(prevState => prevState.filter(link => link.id !== id))
      toast.success('Enlace eliminado correctamente', {
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
    }
  }

  if (loading) {
    return <div>Cargando...</div>
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
            <h2 className='text-[2em]'>Enlaces de <span className='underline-offset-2 underline'>{user?.name}</span></h2>
            <Button onClick={createLink} customClassName='btn-primary'>
              Crear enlace
            </Button>
          </div>
          <ul className='dark:bg-transparent bg-zinc-200 h-auto py-8 flex flex-col gap-6 justify-center'>
            {
              links.length !== 0
                ? (links.map(link => (
                    <LinkCard onDelete={handleDelete} key={link.id} link={link} />
                  )))
                : (
                    <p className='p-4 rounded-sm bg-zinc-600/50'>Aún no has creado links</p>
                  )
            }
          </ul>
        </div>
      </div>
    </>
  )
}
