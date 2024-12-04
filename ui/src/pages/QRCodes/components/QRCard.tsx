import { Button } from '@/components/Button'
import { CalendarIcon, CopyIcon, DotsIcon, DownloadIcon, EditIcon, GraphicIcon, LinkIcon, QRIcon, RedirectIcon } from '@/components/icons/Icons'
import { toast } from 'react-toastify'
import { MenuOptions } from '../../Links/components/MenuOptions'
import { QRCode } from '@/api/qrCodes/qr-code-interface'
import { handleDownload } from '@/utils/handleDownload'

interface QrCardProps{
	QrCode: QRCode
	onDelete: (id: string) => void
}

export function QRCard ({ QrCode, onDelete }: QrCardProps) {
  const { link } = QrCode
  const { qrImageFilename } = QrCode
  const path = window.location.pathname
  
  const handleCopy = async () => {
    const url = `${link.domain}/${link.customShortUrl ? link.customShortUrl : link.shortUrl}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      toast.error('Error al copiar el enlace')
    }
  }

  return (
        <li id={link.shortUrl} className='flex flex-col h-fit relative p-6 list-none dark:bg-zinc-600/25 bg-white rounded-md'>
			{
				path === '/qr-codes' 
				  ? (
					<div className='flex flex-row gap-4 h-auto justify-between'>
									<div>
										<img 
										src={`http://localhost:3000/qr-code/file/${qrImageFilename}`}
										alt="QR-Image"
										className='size-[120px]'
										/>
									</div>
									<div className="flex flex-row gap-3 grow overflow-auto">
										<div className='flex flex-col gap-2 w-11/12'>
											<div className='text-[1.5em] font-semibold'>
												<a className='dark:text-white text-zinc-800 hover:underline underline-offset-2' href={`qr-codes/${link.shortUrl}/details`}>
													{link.title ? link.title : `Sin título ${new Date().toLocaleDateString('es-ES')}`}
												</a>

											</div>
											<div className='flex items-center gap-1 dark:bg-zinc-600/60 w-fit pl-1 pr-2 rounded-xl text-sm'>
												<QRIcon className='w-5 h-4' />
												<span>
													QR Code
												</span>
											</div>
											<div className='flex flex-col  gap-2'>
													<a className='text-blue-700' target='_blank' href={`${link.domain}/${link.shortUrl}`}>
														{link.domain}/{link.customShortUrl ? link.customShortUrl : link.shortUrl}
													</a>
													<a className='dark:text-white text-black hover:underline line-clamp-1 overflow-ellipsis' href={link.originalUrl}>
														{link.originalUrl}
													</a>
													<div className='flex gap-4'>
														{
															path === '/qr-codes' &&
															<span className='flex items-center gap-2'>
																<GraphicIcon />
																{link.clicks || 'Scan data'}
															</span>
														}

															<span className='flex items-center gap-2'>
																<CalendarIcon />
																{new Date(link.created_at).toLocaleDateString('us-US', { dateStyle: 'medium' })}
															</span>

													</div>
											</div>
										</div>
									</div>
									<div className='flex items-start justify-end gap-3 flex-row shrink-0'>
										<Button onClick={handleCopy} customClassName='flex items-center gap-2 w-fit text-black bg-zinc-50 outline outline-1 outline-purple-300 font-semibold p-2 border-none rounded-sm hover:bg-zinc-100 cursor-pointer active:outline-purple-200 active:bg-purple-300 dark:outline-1 dark:outline-purple-800/40 dark:bg-transparent dark:hover:outline-purple-800/60 dark:hover:bg-purple-200/5 dark:focus:outline-purple-600/80 dark:focus:outline-2  dark:text-purple-300'>
											<CopyIcon className='size-4 p-0 m-0' />
										</Button>
										<Button
										onClick={() => handleDownload(qrImageFilename)}
									 	customClassName='flex items-center gap-2 w-fit text-black bg-zinc-50 outline outline-1 outline-purple-300 rounded-md font-semibold p-2 border-none rounded-sm hover:bg-zinc-100 cursor-pointer active:outline-purple-200 active:bg-purple-300 dark:outline-1 dark:outline-purple-800/40 dark:bg-transparent dark:hover:outline-purple-800/60 dark:hover:bg-purple-200/5 dark:focus:outline-purple-600/80 dark:focus:outline-2  dark:text-purple-300'
										>
											<DownloadIcon className='size-4' />
										</Button>
										<a href={`/qr-codes/${link.shortUrl}/edit`}>
											<Button customClassName='flex items-center w-fit text-black bg-zinc-50 outline outline-1 outline-purple-300 font-semibold p-2 border-none rounded-sm hover:bg-zinc-100 cursor-pointer active:outline-purple-200 active:bg-purple-300 dark:outline-1 dark:outline-purple-800/40 dark:bg-transparent dark:hover:outline-purple-800/60 dark:hover:bg-purple-200/5 dark:focus:outline-purple-600/80 dark:focus:outline-2  dark:text-purple-300' title='Editar'>
												<EditIcon className='size-4' />
											</Button>
										</a>
										<MenuOptions href={link.shortUrl} id={QrCode.id} onDelete={onDelete}>
											<button className='size-8 bg-zinc-50 outline outline-1 outline-purple-300 font-semibold p-2 border-none rounded-sm hover:bg-zinc-100 cursor-pointer active:outline-purple-200 active:bg-purple-300 dark:outline-1 dark:outline-purple-800/40 dark:bg-transparent dark:hover:outline-purple-800/60 dark:hover:bg-purple-200/5 dark:focus:outline-purple-600/80 dark:focus:outline-2  dark:text-purple-300'>
											<DotsIcon />
											</button>
										</MenuOptions>
									</div>
					</div>
				    )
				  : (
						<div className=' flex flex-row justify-end gap-4 h-auto'>
									<div className="flex flex-row gap-3 grow overflow-auto">
										<div className='flex flex-col  gap-3 w-11/12'>
											<div className='text-[1.5em] font-semibold'>
												<h3 className='dark:text-white text-zinc-800'>
													{link.title ? link.title : `Sin título ${new Date().toLocaleDateString('es-ES')}`}
												</h3>
											</div>
											<div className='opacity-70 flex items-center gap-1 dark:bg-zinc-600/60 w-fit pl-1 pr-2 rounded-xl text-xs text-purple-300 py-1'>
												<QRIcon className='text-white w-5 h-4' />
												<span>
													QR Code
												</span>
											</div>
											<div className='flex flex-col gap-4'>
													<div className='flex gap-3'>
														<RedirectIcon className='w-6' />
														<a className='dark:text-white text-black hover:underline line-clamp-1 overflow-ellipsis' href={link.originalUrl}>
															{link.originalUrl}
														</a>
													</div>
													<div className='flex gap-6 border-t border-t-zinc-500/50 border-solid border-x-0 border-b-0 pt-4'>
															<span className='flex items-center gap-2'>
																<CalendarIcon />
																{new Date(link.created_at).toLocaleDateString('us-US', { dateStyle: 'medium' })}
															</span>

															<div className='flex gap-2 items-center'>
																<LinkIcon />
																<a className='text-blue-700' target='_blank' href={`${link.domain}links/q?shortUrl=${link.shortUrl}`}>
																	{link.domain}/{link.customShortUrl ? link.customShortUrl : link.shortUrl}
																</a>
															</div>

													</div>
											</div>
										</div>
									</div>
								<div className='flex items-start justify-end gap-3 flex-row shrink-0'>
									<Button
									 onClick={handleCopy} 
									 customClassName='flex items-center gap-2 w-fit text-black bg-zinc-50 rounded-md font-semibold p-2 border-none rounded-sm hover:bg-zinc-100 cursor-pointer active:outline-purple-200 active:bg-purple-300 dark:outline-1 dark:outline-purple-800/40 dark:bg-transparent dark:hover:outline-purple-800/60 dark:hover:bg-purple-200/5 dark:focus:outline-purple-600/80 dark:focus:outline-2  dark:text-purple-300'
									 >
										<CopyIcon className='size-4 p-0 m-0' />
									</Button>
									<a href={`/qr-codes/${link.shortUrl}/edit`}>
										<Button 
									 customClassName='flex items-center gap-2 w-fit text-black bg-zinc-50 rounded-md font-semibold p-2 border-none rounded-sm hover:bg-zinc-100 cursor-pointer active:outline-purple-200 active:bg-purple-300 dark:outline-1 dark:outline-purple-800/40 dark:bg-transparent dark:hover:outline-purple-800/60 dark:hover:bg-purple-200/5 dark:focus:outline-purple-600/80 dark:focus:outline-2  dark:text-purple-300'
										 title='Editar'>
											<EditIcon className='size-4' />
										</Button>
									</a>
									<Button
									 customClassName='flex items-center gap-2 w-fit text-black bg-zinc-50 rounded-md font-semibold p-2 border-none rounded-sm hover:bg-zinc-100 cursor-pointer active:outline-purple-200 active:bg-purple-300 dark:outline-1 dark:outline-purple-800/40 dark:bg-transparent dark:hover:outline-purple-800/60 dark:hover:bg-purple-200/5 dark:focus:outline-purple-600/80 dark:focus:outline-2  dark:text-purple-300'
									>
										<DownloadIcon className='size-4' />
									</Button>
									<MenuOptions href={link.shortUrl} id={QrCode.id} onDelete={onDelete}>
										<button className='size-8 bg-zinc-50 font-semibold p-2 border-none rounded-sm hover:bg-zinc-100 cursor-pointer active:outline-purple-200 active:bg-purple-300 dark:outline-1 dark:outline-purple-800/40 dark:bg-transparent dark:hover:outline-purple-800/60 dark:hover:bg-purple-200/5 dark:focus:outline-purple-600/80 dark:focus:outline-2  dark:text-purple-300'>
										<DotsIcon />
										</button>
									</MenuOptions>
								</div>
								<div>
									<img 
									src={`http://localhost:3000/qr-code/file/${qrImageFilename}`}
									alt="QR-Image"
									className='size-[120px]'
									/>
								</div>
						</div>	
				    )
			}					
		</li>
  )
}
