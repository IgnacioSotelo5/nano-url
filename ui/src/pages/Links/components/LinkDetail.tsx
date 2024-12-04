import { Link as ILink } from '@/api/links/link-interface'
import { deleteLink, getLinkBySlug } from '@/api/links/links-api'
import { useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { LinkCard } from './LinkCard'
import { useToast } from '@/context/ToastContext'
import { useTheme } from '@/hooks/useTheme'
import { CheckIcon, DotsIcon, DownloadIcon, InfoIcon, PageIcon, PaletteIcon } from '@/components/icons/Icons'
import { Zoom } from 'react-toastify'
import { Tooltip } from '@/components/Tooltip'
import { CardOptions } from '@/components/CardOptions'
import { handleDownload } from '@/utils/handleDownload'
import { AnalyticsContainer } from '@/components/Analytics/Analytics'
import { ClicksMetrics } from '@/components/Analytics/ClicksMetrics'
import { ChartData, ChartOptions } from 'chart.js'

export default function LinkDetail () {
  const [link, setLink] = useState<ILink | null>(null)
  const params = useParams()
  const navigate = useNavigate()
  const { showSuccessMessage } = useToast()
  const { isDark } = useTheme()
  
  const handleDelete = async (id: string) => {
    const res = await deleteLink(id)
    if (res.ok) {
      showSuccessMessage('Enlace eliminado correctamente', {
        position: 'top-center',
        closeOnClick: true,
        autoClose: 4000,
        draggable: true,
        progress: undefined,
        theme: isDark,
        transition: Zoom,
        progressStyle: {
          backgroundColor: 'green'
        },
        style: {
          transition: 'all 2s ease-in-out'
        },
        type: 'success',
        icon: <CheckIcon />
      })
      navigate('/links')
    }
  }

  useEffect(() => {
    const getLink = async () => {
      const slug = params.shortUrl
      
      if (slug) {
        const res = await getLinkBySlug(slug)
        
        if (res.ok) {
          setLink(res.data!)
        }
      }
    }
    
    getLink()
  }, [params.shortUrl])
  
  const filename = link?.qrCode?.qrImageFilename || ''

  const options = [
    {
      name: 'Descargar archivo',
      fn: () => handleDownload(filename),
      icon: <DownloadIcon />
    },
    {
      name: 'Personalizar',
      fn: () => {}, 
      icon: <PaletteIcon />
    }
  ]

  const data: ChartData<'bar'> = {
    labels: ['a', 'b', 'c', 'd', 'h'],
    datasets: [
      {
        data: [5, 10, 20, 15, 8],
        barPercentage: 1,
        backgroundColor: '#10F',
        label: 'Clicks',
        type: 'bar'
      }
    ]
  }

  const chartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    layout: {
      autoPadding: true
    }
    
  }

  const metrics = [
    <ClicksMetrics options={chartOptions} data={data} />
  ]

  return (
    <div id="linkDetails" className='w-full h-[100svh] flex flex-col items-center top-14 relative'>
      <div className='flex flex-col gap-4 w-5/6 h-full'>
        {link && <LinkCard link={link} onDelete={handleDelete} />}
        <section className='w-full h-auto flex justify-between bg-zinc-600/25 p-4'>
          <div className='w-1/2 p-2'>
            <h4 className='text-[1.25em] mb-1'>
              QR Code
            </h4>
            <div className='flex items-start w-fit gap-3'>
              <img className='size-36 object-cover' src={`http://localhost:3000/qr-code/file/${link?.qrCode?.qrImageFilename}`} alt="QR Code" />
              <div className='flex gap-3'>
                <Link to={`/qr-codes/${params.shortUrl}/details`} className='menu-btn font-semibold text-sm rounded-sm px-3'>
                   Ver detalles
                </Link>
                <CardOptions id={link?.id || ''} options={options}>
                  <button className='menu-btn h-full w-full px-3'>
                    <DotsIcon />
                  </button>
                </CardOptions>
              </div>
            </div>
          </div>
          <div className='w-1/2 p-2'>
            <div className='flex items-center gap-2'> 
              <h4 className='text-[1.25em] mb-1'>
                Página NanoURL
              </h4>
              <Tooltip children={<InfoIcon className='p-0' />} text='Muestra tus enlaces mas importantes en una pagina. Luego comparte un solo enlace para la gente.' />
            </div>
            <div className='flex items-start gap-3'>
              <div className='size-36 flex items-center justify-center rounded-full dark:bg-zinc-600/40'>
                  <PageIcon className='size-8 text-zinc-300' />
              </div>
              <div className='flex'>
                <Link to={'/pages'} className='menu-btn text-sm font-semibold rounded-sm px-3'>
                  Agregar a una página
                </Link>
              </div>
            </div>
          </div>

        </section>
        <AnalyticsContainer charts={metrics} />
      </div>
    </div>
  )
}
