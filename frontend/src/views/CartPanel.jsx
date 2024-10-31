import { Nav } from '../components/Nav';

const CartPanel = () => {
	return (
		<>
			<Nav />
			<div className='bg-white pt-14'>
				<h1 className='mb-10 text-center text-2xl font-bold'>
					Carrito de compras
				</h1>
				<div className='m-3 max-w-5xl justify-center items-center x-6 md:flex md:space-x-6 md:mx-auto xl:px-0 '>
					<div className='rounded-lg md:w-2/3 md:max-h-96 md:overflow-y-auto'>
						<div className='justify-between mb-6 rounded-lg bg-white p-6 shadow-lg sm:flex sm:justify-start'>
							<img
								src='https://i.imgur.com/Sx4H7PA.jpeg'
								alt='product-image'
								className='w-full rounded-lg sm:w-40 sm:max-h-28'
							/>
							<div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
								<div className='mt-5 sm:mt-0'>
									<h2 className='text-lg font-bold text-gray-900'>
										Nike Air Max 2019
									</h2>
									<p className='mt-1 text-xs text-gray-700'>Talla</p>
								</div>
								<div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block'>
									<div className='flex items-center border-gray-100'>
										<span className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'>
											{' '}
											-{' '}
										</span>
										<input
											className='h-8 w-8 border bg-white text-center text-xs outline-none'
											type='number'
											min='1'
										/>
										<span className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'>
											{' '}
											+{' '}
										</span>
									</div>
									<div className='flex items-center'>
										<p className='text-sm'>
											259.000
											<span className='text-medium leading-none align-baseline ml-1 font-medium'>
												COP
											</span>
										</p>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
						<div className='justify-between mb-6 rounded-lg bg-white p-6 shadow-lg sm:flex sm:justify-start'>
							<img
								src='https://i.imgur.com/a2VhbLP.jpeg'
								alt='product-image'
								className='w-full rounded-lg sm:w-40 sm:max-h-28 bg-cover'
							/>
							<div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
								<div className='mt-5 sm:mt-0'>
									<h2 className='text-lg font-bold text-gray-900'>
										Nike Air Max 2019
									</h2>
									<p className='mt-1 text-xs text-gray-700'>Talla</p>
								</div>
								<div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block'>
									<div className='flex items-center border-gray-100'>
										<span className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'>
											{' '}
											-{' '}
										</span>
										<input
											className='h-8 w-8 border bg-white text-center text-xs outline-none'
											type='number'
											min='1'
										/>
										<span className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'>
											{' '}
											+{' '}
										</span>
									</div>
									<div className='flex items-center'>
										<p className='text-sm'>
											259.000
											<span className='text-medium leading-none align-baseline ml-1 font-medium'>
												COP
											</span>
										</p>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											fill='none'
											viewBox='0 0 24 24'
											strokeWidth='1.5'
											stroke='currentColor'
											className='h-5 w-5 cursor-pointer duration-150 hover:text-red-500'
										>
											<path
												strokeLinecap='round'
												strokeLinejoin='round'
												d='M6 18L18 6M6 6l12 12'
											/>
										</svg>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className='mt-6 h-full rounded-lg border bg-white p-6 shadow-sm md:mt-0 md:w-1/3'>
						<div className='flex justify-between'>
							<p className='text-lg font-bold'>Total</p>
							<div className=''>
								<p className='mb-1 text-lg font-bold'>
									$134.98 <span>COP</span>
								</p>
							</div>
						</div>
						<button className='mt-6 w-full rounded-md bg-[#25D366] py-1.5 font-medium text-blue-50 hover:bg-blue-600'>
							Enviar
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

//src='https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1131&q=80'
export { CartPanel };
