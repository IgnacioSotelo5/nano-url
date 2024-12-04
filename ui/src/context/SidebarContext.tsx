import React, { type Dispatch, type SetStateAction, createContext, useState } from 'react'

export interface SidebarContextType {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  dropdownState: boolean
  setDropdownState: Dispatch<SetStateAction<boolean>>
}

export const SidebarContext = createContext<SidebarContextType>({
  open: true,
  setOpen: () => {},
  dropdownState: false,
  setDropdownState: () => {}
})

export function SidebarProvider ({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(true)
  const [dropdownState, setDropdownState] = useState(false)
  return (
		<SidebarContext.Provider value={{ open, setOpen, dropdownState, setDropdownState }}>
			{children}
		</SidebarContext.Provider>
  )
}
