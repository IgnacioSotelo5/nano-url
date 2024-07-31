import { useContext } from "react"

import { PreviewContext } from "@/components/pages/QRCodes/context/previewContext"

export function usePreview(){
  return useContext(PreviewContext)
}