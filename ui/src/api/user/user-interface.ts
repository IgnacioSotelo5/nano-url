export enum UIMode{
    dark = 'dark',
    light = 'light'
}
export interface User{
    id: string
    email: string
    password?: string
    name?: string | null
    themePreference: UIMode
    language?: string | null
    filename?: string | null 
}