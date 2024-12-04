import { ReactNode, useEffect, useRef, useState } from "react"

type Options = {
    name: string
    fn: (param?: any) => (void | Promise<void>)
    icon?: ReactNode
}
interface CardOptionProps {
    id: string
    options: Options[]
    children: ReactNode
}
export function CardOptions ({ id, options, children }: CardOptionProps) {
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)

    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  
  return (
        <>
            {
                children &&
                <div onClick={() => setIsOpen(!isOpen)}>
                    {children}
                </div>
            }
                {
                    isOpen &&
                    <div className={`absolute flex flex-col gap-2 py-1 transition-all duration-300 ease-in-out ${isOpen ? '-translate-y-[calc(-50px)] -translate-x-12' : ' translate-y-8'} bg-zinc-900 w-fit`} ref={containerRef}>
                        {
                            options.map((opt, index) => (
                                <div className="flex items-center gap-2 pl-4 pr-6 py-2 cursor-pointer text-base font-medium dark:hover:bg-zinc-800 dark:bg-zinc-900" onClick={() => opt.fn()} key={`${id}-${index}`}>
                                    {opt.icon}
                                    <span>
                                        { opt.name }
                                    </span>
                                </div>
                            ))
                        }
                    </div>
                }
        </>
  )
}
