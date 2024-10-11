import { useState } from 'react';
import useProductStore from '../stores/productStore';
import useCartStore from '../stores/cartStore';
import { HeaderLayout } from '../Layout/HeaderLayout';
import { useParams, useNavigate } from 'react-router-dom';
import { useDataFetch } from '../hooks/useDataFetch';

const ProductDetails = () => {
	const [isHidden, setIsHidden] = useState(true);
	const [currentSize, setCurrentSize] = useState('Seleccione la talla');
	const [canAddToCart, setCanAddToCart] = useState(false);

	const { incrementItemCount } = useCartStore();

	const { productId } = useParams();
	const productIdNumber = Number(productId);
	const navigate = useNavigate();

	// Utiliza el hook para obtener datos
	const { loading, error } = useDataFetch(
		'https://raw.githubusercontent.com/CAFM3/Basic-Json/refs/heads/main/data.json',
	);

	// Obtenemos los productos del estado global de Zustand
	const products = useProductStore(state => state.products);
	const product = products.find(p => p.id === productIdNumber);

	// Función para manejar la visibilidad de detalles
	const handleToggleDropDown = () => {
		setIsHidden(!isHidden);
	};

	// Función para manejar la talla seleccionada por el usuario
	const handleCurrentSize = size => {
		setCurrentSize(size);

		// Verificar si la talla seleccionada es válida
		if (size !== 'Seleccione la talla') {
			setCanAddToCart(true);
		} else {
			setCanAddToCart(false);
		}
	};
	// Función para manejar el agregar productos al carrito
	const handleCart = () => {
		if (canAddToCart) {
			incrementItemCount();
			navigate('/');
		}
	};

	// Renderizado del componente
	return (
		<>
			<HeaderLayout />
			{/* Mostrar mensaje de carga */}
			{loading && <p>Cargando...</p>}
			{/* Mostrar mensaje de error si hay */}
			{error && <p>Error: {error}</p>}
			{/* Mostrar detalles del producto si está disponible */}
			{product && (
				<>
					<div className='min-w-screen flex items-center p-5 overflow-hidden relative'>
						<div className='w-full max-w-6xl rounded bg-white -10 lg:p-20 mx-auto text-gray-800 relative md:text-left'>
							<div className='md:flex items-center -mx-10'>
								<div className='w-full md:w-1/2 px-10 mb-10 md:mb-0'>
									<div className='relative'>
										<img
											src={product.imagen}
											className='w-full relative z-10'
											alt=''
										/>
										<div className='border-4 border-yellow-200 absolute top-10 bottom-10 left-10 right-10 z-0'></div>
									</div>
								</div>
								<div className='w-full md:w-1/2 px-10'>
									<div className='mb-10'>
										<h1 className='font-bold uppercase text-2xl mb-5'>
											{product.nombre}
										</h1>
										<button className='bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-2 py-1 font-medium'>
											{product.categoria}
										</button>
										<button className='bg-yellow-300 opacity-75 hover:opacity-100 text-yellow-900 hover:text-gray-900 rounded-full px-2 py-1 font-medium'>
											{product.color}
										</button>

										<p className='text-sm'>{product.descripcion}</p>
									</div>

									<div
										className='relative inline-block text-left w-full'
										onClick={handleToggleDropDown}
									>
										<button
											id='dropdown-button'
											className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-blue-500'
										>
											{currentSize}
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='w-5 h-5 ml-2 -mr-1'
												viewBox='0 0 20 20'
												fill='currentColor'
												aria-hidden='true'
											>
												<path
													fillRule='evenodd'
													d='M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
													clipRule='evenodd'
												/>
											</svg>
										</button>
										<div
											id='dropdown-menu'
											className={`w-full origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 ${isHidden ? 'hidden' : ''}`}
										>
											<div
												className='py-2 p-2'
												role='menu'
												aria-orientation='vertical'
												aria-labelledby='dropdown-button'
											>
												{product.talla.map((talla, index) => (
													<a
														onClick={() => handleCurrentSize(talla)}
														key={index}
														className='flex justify-center block rounded-md px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-blue-100 cursor-pointer'
														role='menuitem'
													>
														{talla}
													</a>
												))}
											</div>
										</div>
									</div>

									<div>
										<div className='inline-block align-bottom mr-5'>
											<span className='text-medium leading-none align-baseline font-bold'>
												$
											</span>
											<span className='font-medium text-2xl leading-none align-baseline'>
												{product.precio}
											</span>
											<span className='text-medium leading-none align-baseline font-bold'>
												COP
											</span>
										</div>
									</div>
									<button
										className={`inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white border rounded-md  ${canAddToCart ? 'bg-gray-950' : 'bg-gray-400 cursor-default'}`}
										onClick={handleCart}
									>
										Agregar al carrito
									</button>
								</div>
							</div>
						</div>
					</div>
				</>
			)}
			{/* Mensaje si el producto no se encuentra */}
			{!product && !loading && <p>Producto no encontrado.</p>}
		</>
	);
};

export { ProductDetails };
