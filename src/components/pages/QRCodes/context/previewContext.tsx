import { Dispatch, SetStateAction, createContext, useState } from "react"

interface PreviewContextType{
    url: string
    setUrl: Dispatch<SetStateAction<string>>
}

export const PreviewContext = createContext<PreviewContextType>({
    url: '',
    setUrl: () =>{}
})

export function PreviewContextProvider({children} : {children: React.ReactNode}){
    const [url, setUrl] = useState('')
    return(
        <PreviewContext.Provider value={{url, setUrl}}>
            {children}
        </PreviewContext.Provider>
    )
}