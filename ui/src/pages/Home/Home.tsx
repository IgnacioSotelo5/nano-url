import classNames from 'classnames'
import { Link } from 'react-router-dom'

import { Card } from './components/Card'
import { Steps } from './components/StepsField'
import styles from './home.module.css'
import { LinkIcon, PageIcon, QRIcon } from '@/components/icons/Icons'
import { Button } from '@/components/Button'
import button from '@/components/button.module.css'
import { useTheme } from '@/hooks/useTheme'
import variables from '@/styles/variables.module.css'

export default function Home (): JSX.Element {
  const { isDark } = useTheme()
  return (
		<div className={styles.homeContainer}>
			<div className={styles.pageTitle}>
				<h1>NanoURL</h1>
				<span>Hola Usuario 👋</span>
			</div>
			<div className={styles.hero}>
				<section className={classNames(styles.featuresHero, {
				  [variables.dark]: isDark === 'dark',
				  [variables.light]: isDark === 'light'
				})}>
					<Card
						icon={<LinkIcon />}
						title="Hazlo corto"
						description={'Haz tu enlace mas corto y accesible.'}
						buttonText='Ir a Enlaces'
						href='/links'
					/>
					<hr />
					<Card
						icon={<QRIcon />}
						title="Hazlo escaneable"
						description='Llega a tu publico con tan solo un escaneo.'
						buttonText='Ir a Codigos QR'
						href='/qr-codes'
					/>
					<hr />
					<Card
						icon={<PageIcon />}
						title="Haz tu página"
						description='Agrupa hasta 10 links en tu página personalizada.'
						buttonText='Ir a Páginas'
						href='/link-in-bio'
					/>
				</section>
				<div className={styles.boxContainer}>
					<section className={classNames(styles.interactiveHero, {
					  [variables.dark]: isDark === 'dark',
					  [variables.light]: isDark === 'light'
					})}>
						<h3>Empezando con NanoURL</h3>
						<ul>
							<Steps title='Crea un link o codigo.' buttons={
								<>
									<Link to={'/links'}>
										<Button customClassName={classNames({ [button.darkButton]: isDark === 'dark', [button.homeButton]: isDark === 'light' })}>
											<LinkIcon />
                                            Ir a enlaces
										</Button>
									</Link>
									<Link to={'/qr-codes'}>
										<Button customClassName={classNames({ [button.darkButton]: isDark === 'dark', [button.homeButton]: isDark === 'light' })}>
											<QRIcon />
                                            Ir a Codigos QR
										</Button>
									</Link>
								</>
							} />
							<Steps title='Haz click en el, escanealo o compartelo.' buttons={
								<>
									<Link to={'/link'}>
										<Button customClassName={classNames({ [button.darkButton]: isDark === 'dark', [button.homeButton]: isDark === 'light' })}>
											<LinkIcon />
                                            Ver tus enlaces
										</Button>
									</Link>
									<Link to={'/qr-codes'}>
										<Button customClassName={classNames({ [button.darkButton]: isDark === 'dark', [button.homeButton]: isDark === 'light' })}>
											<QRIcon />
                                            Ver tus Codigos QR
										</Button>
									</Link>
								</>
							} />
							<Steps title='Crea tu página personalizada.' buttons={
								<>
									<Link to={'/link-in-bio'}>
										<Button customClassName={classNames({ [button.darkButton]: isDark === 'dark', [button.homeButton]: isDark === 'light' })}>
											<PageIcon />
                                            Ir a Páginas
										</Button>
									</Link>
								</>
							} />
						</ul>
					</section>
					<section className={classNames(styles.pricingHero, {
					  [variables.dark]: isDark === 'dark',
					  [variables.light]: isDark === 'light'
					})}>
						<article className={styles.pricingContainer}>
							<h3>Reemplace "nano.url" con su marca.</h3>
							<img className={styles.pricingImg} src='src/assets/react.svg' alt="Hero" />
							<p>
                            Mejore su marca con un dominio personalizado. Elevar el reconocimiento, la confianza y el profesionalismo en cada eslabón. Actualice ahora para una integración perfecta.
							</p>
							<Button customClassName={button.pricingButton}>
                            Ver nuestros planes
							</Button>
						</article>
					</section>
				</div>
			</div>
		</div>
  )
}
