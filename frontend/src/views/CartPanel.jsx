import { Nav } from '../components/Nav';
import { CartProduct } from '../components/CartProduct';

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
						<CartProduct
							img={'https://i.imgur.com/Sx4H7PA.jpeg'}
							talla={'XS'}
							nombre={'hi'}
							precio={'19.900'}
							cantidad={'2'}
						/>
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

export { CartPanel };
