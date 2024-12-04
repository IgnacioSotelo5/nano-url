import { HTMLProps, ReactNode } from "react"

interface ModalProps extends HTMLProps<HTMLDialogElement> {
    children: ReactNode
    open: boolean
}

export function Modal ({ children, open, ...props }: ModalProps) {
  return (
    <>
        {
            open &&
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center backdrop-blur-sm z-50">
              <dialog open={open} {...props}>
                  {children}
              </dialog>
            </div>
        }
    </>
  )
}
