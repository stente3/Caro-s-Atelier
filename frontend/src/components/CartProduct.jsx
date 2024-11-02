import useCartStore from '../stores/cartStore';
import { toast } from 'sonner';
import { Toaster } from 'sonner';

const CartProduct = ({ img, talla, nombre, precio, cantidad, id }) => {
	const { increaseQuantity, decreaseQuantity, removeFromCart } = useCartStore();

	const handleIncrease = () => {
		toast.success('Cantidad aumentada');
		increaseQuantity(id, talla);
	};

	const handleDecrease = () => {
		toast.success('Cantidad reducida');
		decreaseQuantity(id, talla);
	};

	const handleRemove = () => {
		toast.custom((t) => (
			<div className="px-6 py-4 rounded-lg bg-white shadow-lg">
				<h3 className="font-medium">¿Estás seguro de eliminar este producto?</h3>
				<div className="mt-4 flex gap-2 justify-end">
					<button
						onClick={() => {
							toast.dismiss(t);
						}}
						className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 text-sm"
					>
						Cancelar
					</button>
					<button
						onClick={() => {
							removeFromCart(id, talla);
							toast.dismiss(t);
							toast.error('Producto eliminado del carrito');
						}}
						className="px-3 py-1 rounded bg-red-500 hover:bg-red-600 text-white text-sm"
					>
						Eliminar
					</button>
				</div>
			</div>
		), {
			duration: Infinity,
			position: 'top-center'
		});
	};

	return (
		<>
			<div className='justify-between mb-6 rounded-lg bg-white p-6 shadow-lg sm:flex sm:justify-start'>
				<img
					src={img}
					alt='product-image'
					className='w-full rounded-lg sm:w-40 sm:max-h-28'
				/>
				<div className='sm:ml-4 sm:flex sm:w-full sm:justify-between'>
					<div className='mt-5 sm:mt-0'>
						<h2 className='text-lg font-bold text-gray-900'>{nombre}</h2>
						<p className='mt-1 text-xs text-gray-700'>{talla}</p>
					</div>
					<div className='mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block'>
						<div className='flex items-center border-gray-100'>
							<span
								onClick={handleDecrease}
								className='cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50'
							>
								{' '}
								-{' '}
							</span>
							<input
								className='h-8 w-8 border bg-white text-center text-xs outline-none'
								type='number'
								value={cantidad}
								min='1'
								readOnly
							/>
							<span
								onClick={handleIncrease}
								className='cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50'
							>
								{' '}
								+{' '}
							</span>
						</div>
						<div className='flex items-center'>
							<p className='text-sm'>
								{precio}
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
								onClick={handleRemove}
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
			<Toaster richColors position="bottom-right" />
		</>
	);
};

export { CartProduct };
