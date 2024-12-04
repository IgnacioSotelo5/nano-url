import { CloseIcon, DeleteIcon, LinkIcon } from '@/components/icons/Icons'
import { Modal } from '@/components/Modal'
import { ReactNode, useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export function MenuOptions ({ href, id, onDelete, children }: { href: string, id: string, onDelete?: (id: string) => void, children?: ReactNode }) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [modalStatus, setModalStatus] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleModal = () => {
    setModalStatus(!modalStatus)
  }

  const handleClickOutside = (event: MouseEvent) => {    
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {children && (
        <div onClick={() => setIsOpen(!isOpen)}>
          {children}
        </div>
      )}

      {isOpen && (
        <div ref={dropdownRef} className='absolute z-50 bottom-[calc(100%_-_1rem)] rounded-sm flex flex-col gap-1 py-1 w-48 h-auto dark:bg-zinc-900'>
          <div className='cursor-pointer w-full rounded-sm'>
            <button
              className='dark:text-purple-300 text-sm tracking-wide text-black dark:hover:bg-zinc-700/50 cursor-pointer flex justify-start items-center gap-2 w-full h-full bg-transparent border-none px-3 py-2.5'
              onClick={handleModal}
            >
              <DeleteIcon className='size-4' />
              Eliminar
            </button>
          </div>
          <div className='cursor-pointer w-full rounded-sm'>
            <Link
              className='dark:text-purple-300 text-sm tracking-wide text-black dark:hover:bg-zinc-700/50 cursor-pointer flex justify-start items-center gap-2 w-full h-full bg-transparent border-none px-3 py-2.5'
              to={`details/${href}`}
            >
              <LinkIcon className='size-4' />
              Ver detalles
            </Link>
          </div>
        </div>
      )}
      
      <Modal className='flex flex-col items-center justify-between p-4 bg-white dark:bg-zinc-800 dark:text-white mx-auto border-none rounded-md h-1/2 absolute w-fit' open={modalStatus}>
        <div className='flex items-center justify-between w-full h-fit dark:text-white'>
          <h3>¿Deseas eliminar este enlace?</h3>
          <button className='size-6 flex items-center justify-center bg-transparent border-none relative' onClick={handleModal}>
            <CloseIcon className='cursor-pointer size-6 dark:text-white' />
          </button>
        </div>
        <div className='flex flex-col gap-4'>
          <p className='line-clamp-1 text-nowrap'>
            Al eliminar este enlace, serás redirigido a la <a target='_blank' className='text-blue-600' href="/error-410">página de error de NanoUrl</a>.
          </p>
          <p>Esta acción no puede deshacerse.</p>
        </div>
        <div className='flex justify-end w-full gap-3'>
          <button className='btn bg-zinc-100 text-black dark:bg-zinc-500 dark:hover:bg-zinc-600 dark:text-white' onClick={handleModal}>Cancelar</button>
          <button className='btn-danger' onClick={() => {
            handleModal()
            if (onDelete) {
              onDelete(id)
            }
          }}>Eliminar</button>
        </div>
      </Modal>
    </>
  )
}
