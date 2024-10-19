import { Link } from 'react-router-dom';

function Footer() {
	return (
		<footer className='bg-white py-4 border-t border-gray-300'>
			<div className='max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center px-7 space-y-4 md:space-y-0'>
				{/* Sección izquierda - Texto de contacto */}
				<div className='w-full md:w-1/3 flex flex-col text-center md:text-left footer-contact'>
					<p className='text-gray-800 font-semibold'>¡Conéctate con Nosotros!</p>
					<p className='text-gray-500 w-full md:w-4/5'>
						Síguenos en las redes sociales para descubrir contenido exclusivo.
					</p>
				</div>

				{/* Sección de íconos en el centro */}
				<div className='flex justify-center md:justify-center space-x-6 w-full md:w-1/3 footer-icons'>
					<Link to='/instagram' aria-label='Instagram'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M7.5 2.25h9a5.25 5.25 0 015.25 5.25v9a5.25 5.25 0 01-5.25 5.25h-9A5.25 5.25 0 012.25 16.5v-9A5.25 5.25 0 017.5 2.25zM16.125 7.875h.008v.008h-.008v-.008zM12 8.625a3.375 3.375 0 100 6.75 3.375 3.375 0 000-6.75z'
							/>
						</svg>
					</Link>

					<Link to='/whatsapp' aria-label='WhatsApp'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							fill='none'
							viewBox='0 0 24 24'
							strokeWidth={1.5}
							stroke='currentColor'
							className='w-6 h-6 text-gray-600 hover:text-gray-900 transition-colors'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								d='M12 3.75c-4.556 0-8.25 3.694-8.25 8.25 0 1.455.38 2.82 1.038 4.016L3.75 20.25l4.35-1.038A8.226 8.226 0 0012 20.25c4.556 0 8.25-3.694 8.25-8.25s-3.694-8.25-8.25-8.25z'
							/>
						</svg>
					</Link>
				</div>

				{/* Sección derecha - Moda de calidad */}
				<div className='text-center md:text-right w-full md:w-1/3 footer-right'>
					<p className='text-gray-800'>Moda de calidad a precios accesibles</p>
				</div>
			</div>

			{/* Mantener el responsive para pantallas pequeñas */}
			<style jsx>{`
				@media (max-width: 768px) {
					.footer-icons {
						order: 1;
					}
					.footer-contact {
						order: 2;
					}
					.footer-right {
						order: 3;
					}
				}
			`}</style>
		</footer>
	);
}

export { Footer };
