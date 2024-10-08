import { Link } from 'react-router-dom';

const Product = ({ product }) => {
	return (
		<>
			<Link
				to={`/product/${product.id}`}
				className='bg-white w-72 h-96 border-2 border-gray-100 rounded-lg m-3 cursor-pointer hover:border-gray-300'
			>
				<div className='h-3/4 w-full'>
					<img
						className='w-full h-full object-cover rounded-t pt-3 px-3'
						src={product.imagen}
						alt={product.descripcion}
					/>
				</div>
				<div className='w-full h-1/4 pt-4 px-3'>
					<p href='#' className='text-gray-700'>
						<span className='text-md'>{product.nombre}</span>
					</p>
					<p className='text-md font-semibold uppercase tracking-wide '>
						$ {product.precio}
					</p>
				</div>
			</Link>
		</>
	);
};
export { Product };
