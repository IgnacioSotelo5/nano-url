import { Link } from '@/api/links/link-interface'
import { Button } from '@/components/Button'
import { CloseIcon, EmailIcon, FacebookLogo, WhatsappLogo, XLogo } from '@/components/icons/Icons'
import { ReactNode, useState } from 'react'

export function ShareModal ({ link, children }: {link: Link, children?: ReactNode}) {
  const [open, setOpen] = useState<boolean>(false)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  const openModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const copyToClipboard = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const paragraph = event.currentTarget.previousElementSibling as HTMLParagraphElement
    const text = paragraph.innerText
    if (text) {
      try {
        await navigator.clipboard.writeText(text)
        setIsCopied(!isCopied)
      } finally {
        setTimeout(() => {
          setIsCopied(false)
        }, 2000)
      }
    }
  }

  return (
    <>
        <div onClick={openModal}>
          {children}
        </div>
        { open && (
            <div id='backdrop-modal' className='fixed top-0 left-0 w-full h-full flex justify-center items-center bg-zinc-500/50 dark:bg-zinc-900/80 z-10'>

            <div id='modalContainer' className='opacity-100 z-20 flex flex-col justify-between gap-6 items-end dark:bg-zinc-900 bg-zinc-50 border-none p-8 w-[30rem] h-auto ' aria-labelledby='modalTitle' aria-hidden={!open}>

            <div className='w-full text-left'>
                <h2 className='dark:text-white tracking-tight text-[1.75em]'>
                    Comparte tu enlace con todos
                </h2>
           </div>
            <button className='size-6 flex items-center justify-center bg-transparent border-none relative bottom-20 left-4 ' onClick={closeModal}><CloseIcon className='cursor-pointer size-6 dark:text-white' /></button>

           <div className='w-full flex justify-between gap-2'>
                <Button customClassName='size-12 cursor-pointer bg-white hover:bg-zinc-200/45 border-none outline-zinc-200/20 outline outline-1 rounded-sm active:outline-purple-300 active:outline-2 dark:bg-zinc-600/20 dark:hover:bg-zinc-600 dark:hover:outline-zinc-200 bg-zinc-100 hover:bg-zinc-300 outline-zinc-400'>
                    <WhatsappLogo className='size-6 dark:text-white text-black' />
                </Button>
                <Button customClassName='size-12 cursor-pointer bg-white hover:bg-zinc-200/45 border-none outline-zinc-200/20 outline outline-1 rounded-sm active:outline-purple-300 active:outline-2 dark:bg-zinc-600/20 dark:hover:bg-zinc-600 dark:hover:outline-zinc-200 bg-zinc-100 hover:bg-zinc-300 outline-zinc-400'>
                    <FacebookLogo className='size-6 dark:text-white text-black' />
                </Button>
                <Button customClassName='size-12 cursor-pointer bg-white hover:bg-zinc-200/45 border-none outline-zinc-200/20 outline outline-1 rounded-sm active:outline-purple-300 active:outline-2 dark:bg-zinc-600/20 dark:hover:bg-zinc-600 dark:hover:outline-zinc-200 bg-zinc-100 hover:bg-zinc-300 outline-zinc-400'>
                    <XLogo className='size-6 dark:text-white text-black' />
                </Button>
                <Button customClassName='size-12 cursor-pointer bg-white hover:bg-zinc-200/45 border-none outline-zinc-200/20 outline outline-1 rounded-sm active:outline-purple-300 active:outline-2 dark:bg-zinc-600/20 dark:hover:bg-zinc-600 dark:hover:outline-zinc-200 bg-zinc-100 hover:bg-zinc-300 outline-zinc-400'>
                    <EmailIcon className='size-6 dark:text-white text-black' />
                </Button>
           </div>

           <div className='w-full'>
                <div className='flex items-center justify-between w-full h-auto border-[1px] p-4 rounded-md border-solid'>
                    <p>{`${link.domain}${link.customShortUrl ? link.customShortUrl : link.shortUrl}`}</p>
                    <button onClick={copyToClipboard} className='w-auto cursor-pointer border-none rounded-sm px-4 py-2 font-semibold dark:bg-zinc-400/15 dark:text-white'>
                        {isCopied ? 'Copiado' : 'Copiar'}
                    </button>
                </div>
           </div>

        </div>
        </div>
        )
    }
    </>
  )
}
