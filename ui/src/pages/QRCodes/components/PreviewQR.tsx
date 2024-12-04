import { useTheme } from '@/hooks/useTheme'
import { QRCodeSVG } from 'qrcode.react'
import { ChangeEvent, useState } from 'react'
import { colors } from '@/utils/qr-colors'

export function QRPreview ({ url }: {url: string}) {
  const [selectedColor, setSelectedColor] = useState('#000000')
  const { isDark } = useTheme()
  
  const colorClasses: Record<string, string> = { black: 'bg-black', red: 'bg-red-500', blue: 'bg-blue-500', orange: 'bg-orange-500', green: 'bg-green-500', pink: 'bg-pink-500', purple: 'bg-purple-500', lightBlue: 'bg-lightBlue-500' }
  
  const handleColorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedColor(event.target.value)
  }
  
  return (
		<div className='flex w-full p-4 justify-between bg-zinc-500/50'>
      <div className='flex gap-3 items-start'>
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
      <div className='flex flex-col items-center justify-start w-1/3 px-2 py-4 bg-zinc-400/50'>
        <div>
          <h4>Preview</h4>
        </div>
        <div className='p-2'>
          <QRCodeSVG style={{ border: `6px solid ${isDark === 'dark' ? '#FFF' : '#000'}` }} value={url} fgColor={selectedColor} />
        </div>
      </div>
		</div>
  )
}
