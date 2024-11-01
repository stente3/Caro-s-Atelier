import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useCartStore from '../stores/cartStore';
import Logo from '../assets/Logo.jpg';

function Nav({ admin = false }) {
	let tempItemCount = 0;
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [animate, setAnimate] = useState(false);

	const { itemCount, cart } = useCartStore();

	const handleToggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	useEffect(() => {
		if (itemCount > 0) {
			setAnimate(true);
			const timer = setTimeout(() => setAnimate(false), 300);
			tempItemCount++;

			return () => clearTimeout(timer);
		}
	}, [tempItemCount]);

	return (
		<nav className='bg-white relative'>
			<div className='max-w-screen-xl flex flex-wrap items-center justify-between mx-auto py-4 px-7'>
				{admin ? (
					<>
						<div className='flex-1'>
							<Link
								to={'/'}
								href='#'
								className='flex items-center justify-start h-full'
							>
								<img src={Logo} className='h-8' alt='Logo' />
							</Link>
						</div>
						<div className='flex items-center justify-end flex-1'>
							<div className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'>
								<button
									data-collapse-toggle='navbar-cta'
									type='button'
									className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
									aria-controls='navbar-cta'
									aria-expanded='false'
									onClick={handleToggleMenu}
								>
									<span className='sr-only'>Open main menu</span>
									<svg
										className='w-5 h-5'
										aria-hidden='true'
										xmlns='http://www.w3.org/2000/svg'
										fill='none'
										viewBox='0 0 17 14'
									>
										<path
											stroke='currentColor'
											strokeLinecap='round'
											strokeLinejoin='round'
											strokeWidth='2'
											d='M1 1h15M1 7h15M1 13h15'
										/>
									</svg>
								</button>
							</div>
							<div
								className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 z-50 w-full md:w-auto bg-white md:bg-transparent`}
								id='navbar-cta'
							>
								<ul className='text-center flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:border-0 md:bg-white'>
									<li>
										<Link
											to={'/'}
											className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent'
											aria-current='page'
										>
											Productos
										</Link>
									</li>
									<li>
										<Link
											to={'/categories'}
											className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent'
										>
											Categorías
										</Link>
									</li>
								</ul>
							</div>
						</div>
					</>
				) : (
					<>
						<Link
							to={'/'}
							href='#'
							className='flex items-center justify-center h-full'
						>
							<img src={Logo} className='h-8' alt='Logo' />
						</Link>
						<Link
							to={'/cart'}
							onClick={() => console.log(cart)}
							className='flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse'
						>
							<button
								data-collapse-toggle='navbar-cta'
								type='button'
								className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
								aria-controls='navbar-cta'
								aria-expanded='false'
								onClick={handleToggleMenu}
							>
								<span className='sr-only'>Open main menu</span>
								<svg
									className='w-5 h-5'
									aria-hidden='true'
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 17 14'
								>
									<path
										stroke='currentColor'
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth='2'
										d='M1 1h15M1 7h15M1 13h15'
									/>
								</svg>
							</button>
							<button
								type='button'
								className='inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 relative'
								aria-label='Shopping Cart'
							>
								<div className='top-0 absolute left-6'>
									<p
										className={`h-0.5 w-0.5 flex items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white transition-transform duration-300 
										${animate ? 'scale-110' : 'scale-100'}`}
									>
										{itemCount}
									</p>
								</div>
								<svg
									version='1.1'
									id='Layer_1'
									xmlns='http://www.w3.org/2000/svg'
									xmlnsXlink='http://www.w3.org/1999/xlink'
									x='0px'
									y='0px'
									viewBox='0 0 122.9 107.5'
									style={{ enableBackground: 'new 0 0 122.9 107.5' }}
									xmlSpace='preserve'
									className='w-6 h-6'
								>
									<g>
										<path
											d='M3.9,7.9C1.8,7.9,0,6.1,0,3.9C0,1.8,1.8,0,3.9,0h10.2c0.1,0,0.3,0,0.4,0c3.6,0.1,6.8,0.8,9.5,2.5
											c3,1.9,5.2,4.8,6.4,9.1c0,0.1,0,0.2,0.1,0.3l1,4H119c2.2,0,3.9,1.8,3.9,3.9c0,0.4-0.1,0.8-0.2,1.2l-10.2,41.1
											c-0.4,1.8-2,3-3.8,3v0H44.7c1.4,5.2,2.8,8,4.7,9.3c2.3,1.5,6.3,1.6,13,1.5h0.1v0h45.2c2.2,0,3.9,1.8,3.9,3.9
											c0,2.2-1.8,3.9-3.9,3.9H62.5v0c-8.3,0.1-13.4-0.1-17.5-2.8c-4.2-2.8-6.4-7.6-8.6-16.3l0,0L23,13.9c0-0.1,0-0.1-0.1-0.2
											c-0.6-2.2-1.6-3.7-3-4.5c-1.4-0.9-3.3-1.3-5.5-1.3c-0.1,0-0.2,0-0.3,0H3.9L3.9,7.9z M96,88.3c5.3,0,9.6,4.3,9.6,9.6
											c0,5.3-4.3,9.6-9.6,9.6c-5.3,0-9.6-4.3-9.6-9.6C86.4,92.6,90.7,88.3,96,88.3L96,88.3z M53.9,88.3c5.3,0,9.6,4.3,9.6,9.6
											c0,5.3-4.3,9.6-9.6,9.6c-5.3,0-9.6-4.3-9.6-9.6C44.3,92.6,48.6,88.3,53.9,88.3L53.9,88.3z M33.7,23.7l8.9,33.5h63.1l8.3-33.5
											H33.7L33.7,23.7z'
										/>
									</g>
								</svg>
							</button>
						</Link>
						<div
							className={`md:flex ${isMenuOpen ? 'block' : 'hidden'} absolute md:static top-16 left-0 z-50 w-full md:w-auto bg-white md:bg-transparent`}
							id='navbar-cta'
						>
							<ul className='text-center flex flex-col md:flex-row font-medium p-4 md:p-0 mt-4 md:mt-0 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:border-0 md:bg-white'>
								<li>
									<Link
										to={'/'}
										className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent'
										aria-current='page'
									>
										Productos
									</Link>
								</li>
								<li>
									<a
										href='#'
										className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent'
									>
										Pijamas
									</a>
								</li>
								<li>
									<a
										href='#'
										className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent'
									>
										Faldas
									</a>
								</li>
								<li>
									<a
										href='#'
										className='block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent'
									>
										Camisas y Blusas
									</a>
								</li>
								<li>
									<a
										href='#'
										className='block py-2 px-3 md:p-0 text-white bg-slate-700 rounded md:bg-transparent md:text-gray-900'
									>
										Contacto
									</a>
								</li>
							</ul>
						</div>
					</>
				)}
			</div>
			<div className='w-full border border-gray-300'></div>
		</nav>
	);
}

export { Nav };
