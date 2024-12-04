import { useParams } from "react-router-dom"

export default function Error () {
  const params = useParams()
    
  return (
        <div className="size-full flex flex-col gap-1 items-center justify-center">
            <div className="flex flex-col gap-3">
                <h1>
                    Error page
                </h1>
                <p>
                    Este enlace o codigo QR fue desactivado.
                </p>
            </div>
        </div>
  )
}
