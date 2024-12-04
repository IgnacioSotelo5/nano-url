import { Link } from '@/api/links/link-interface'
import { Button } from '@/components/Button'
import { CalendarIcon, CopyIcon, DotsIcon, EditIcon, GraphicIcon, ShareIcon } from '@/components/icons/Icons'
import { ShareModal } from './ShareModal'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { MenuOptions } from './MenuOptions'
import { useLocation, useNavigate } from 'react-router-dom'

interface LinkCardProps{
	link: Link
	onDelete?: (id: string) => void
}

export function LinkCard ({ link, onDelete }: LinkCardProps) {
  const { shortUrl } = link
  const [isCopied, setIsCopied] = useState(false)
  const path = window.location.pathname
  const listItem = document.getElementById(shortUrl)
  const listItemClassname = 'border border-1 border-solid border-purple-900'
  const location = useLocation()
  const navigate = useNavigate()

  const handleCopy = async () => {
    const url = `${link.domain}/${link.customShortUrl ? link.customShortUrl : link.shortUrl}`
    try {
      await navigator.clipboard.writeText(url)
    } catch {
      toast.error('Error al copiar el enlace')
    } finally {
      setIsCopied(false)
    }

    setIsCopied(true)
  }

  return (
        <li id={link.shortUrl} className='flex flex-col h-fit relative p-6 list-none dark:bg-zinc-600/25 bg-white rounded-md'>
							<div className='flex flex-row justify-between h-auto'>
									<div className="flex flex-row gap-3 overflow-auto">
											{
												path === '/links' &&
												<label className='w-min pt-2' htmlFor={link.shortUrl}>
													<input onClick={(event) => event.currentTarget.checked
													  ? (listItem?.classList.add(...listItemClassname.split(' ')), listItem?.setAttribute('aria-selected', 'true'))
														 : (listItem?.classList.remove(...listItemClassname.split(' ')), listItem?.setAttribute('aria-selected', 'false')) }
														  type="checkbox" 
														  name={link.shortUrl} 
														  id={link.shortUrl} />
												</label>
											}
										<div className='flex flex-col gap-2 w-11/12'>
											<div className='text-[1.5em] font-semibold'>
												{
													path === '/links'
													  ? (
														<a className='dark:text-white text-zinc-800 hover:underline underline-offset-2' href={`links/details/${link.shortUrl}`}>
															{link.title}
														</a>
													    )
													  : (
														<h3 className='dark:text-white text-zinc-800'>
															{link.title}
														</h3>
													    )
												}

											</div>
											<div className='flex flex-col grow gap-2'>
													<a className='text-blue-700' target='_blank' href={`${link.domain}/${link.shortUrl}`}>
														{link.domain}/{link.customShortUrl ? link.customShortUrl : link.shortUrl}
													</a>
													<a className='dark:text-white text-black hover:underline line-clamp-1 overflow-ellipsis' href={link.originalUrl}>
														{link.originalUrl}
													</a>
													<div className='flex gap-4'>
														{
															path === '/links' &&
															<span className='flex items-center gap-2'>
                                                            	<GraphicIcon />
																{link.clicks}
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
										<Button onClick={handleCopy} customClassName='menu-btn'>
                                            <CopyIcon className='size-4 p-0 m-0' />
                                            {isCopied ? 'Copiado' : 'Copiar'}
                                        </Button>
											<ShareModal link={link}>
											<Button 
											customClassName='menu-btn'
											>
												<ShareIcon className='size-4' />
												Compartir
											</Button>
										</ShareModal>
											<Button onClick={() => navigate(`/links/${link.shortUrl}/edit`, { state: { from: location.pathname } })} customClassName='menu-btn' title='Editar'>
                                            	<EditIcon className='size-4' />
                                        	</Button>
										<MenuOptions href={link.shortUrl} id={link.id} onDelete={onDelete}>
											<button className='menu-btn size-8'>
											<DotsIcon />
											</button>
										</MenuOptions>
									</div>
							</div>
						</li>
  )
}
