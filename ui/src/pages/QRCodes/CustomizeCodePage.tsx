import { colors } from "@/utils/qr-colors"
import { QRCodeSVG } from "qrcode.react"
import { ChangeEvent, useState } from "react"

export default function CustomizePage () {
  const [selectedColor, setSelectedColor] = useState('#000000')
  const colorClasses: Record<string, string> = { black: 'bg-black', red: 'bg-red-500', blue: 'bg-blue-500', orange: 'bg-orange-500', green: 'bg-green-500', pink: 'bg-pink-500', purple: 'bg-purple-500', lightBlue: 'bg-lightBlue-500' }
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value)
  }
  return (
      <div className="w-full px-6 h-[100svh] flex flex-col items-center justify-start top-14 relative">
        <div className="w-full h-full flex">
            <form className="w-1/2 p-4 max-w-2xl">
            <header>
                <h3 className="text-xl font-semibold mb-4">Personalizar diseño</h3>
            </header>
    
            <section className="mb-4">
                <h4 className="text-lg font-medium mb-2">Elige tus colores</h4>
                <p>Selecciona los colores que prefieras para tu diseño.</p>
                <div className="flex gap-3">
                    {
                        Object.entries(colors).map(([colorName, colorValue]) => (
                            <label
                            key={colorName}
                            htmlFor={`color-${colorName}`} 
                            className={`p-6 rounded-full cursor-pointer ${colorClasses[colorName]} `}>
                                <input 
                                type="checkbox" 
                                id={`color-${colorName}`} 
                                name='color'
                                checked={selectedColor === colorValue}
                                onChange={handleColorChange}
                                value={colorValue}
                                className='hidden'/>
                            </label>
                        ))
                    }
                </div>
            </section>
    
            <section className="mb-4">
                <h4 className="text-lg font-medium mb-2">Agregar un logotipo</h4>
                <p>Sube tu logotipo para personalizar la apariencia.</p>
            </section>
    
            <section className="mb-4">
                <h4 className="text-lg font-medium mb-2">Seleccione un marco</h4>
                <p>Escoge un marco para tu diseño.</p>
            </section>
            <div>
                <button>Cancelar</button>
                <button>Guardar cambios</button>
            </div>
            </form>
            <section className="w-1/2 bg-zinc-900/50 flex flex-col items-center">
                <div className="flex flex-col items-center p-8 gap-2">
                    <h4>Avance</h4>
                    <div>
                        <QRCodeSVG className="size-60" style={{ border: `6px solid` }} fgColor={selectedColor} value="http://localhost:3000/" />
                    </div>
                </div>
            </section>
        </div>
      </div>
  )
}
