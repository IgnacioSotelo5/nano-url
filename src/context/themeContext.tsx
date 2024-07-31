import { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react"

interface ThemeContextType{
    isDark: string
    setIsDark: Dispatch<SetStateAction<string>>
}

export const ThemeContext = createContext<ThemeContextType>({
    isDark: 'dark',
    setIsDark: () => {}
})

export const ThemeProvider = ({ children }: {children: ReactNode}) => {
    const [isDark, setIsDark] = useState('dark')

    return(
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}