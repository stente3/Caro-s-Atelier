import useProductsStore from '../stores/productStore';
import { useDataFetch } from '../hooks/useDataFetch';
import { Nav } from '../components/Nav';

const ProductAdminPanel = () => {
	const url = import.meta.env.VITE_API_URL;
	// Utiliza el hook para obtener datos
	const { loading, error } = useDataFetch(url);

	// Obtenemos los productos del estado global de Zustand
	const { products } = useProductsStore();

	return (
		<>
			<Nav />
			{/* Mostrar mensaje de carga */}
			{loading && <p>Cargando...</p>}
			{/* Mostrar mensaje de error si hay */}
			{error && <p>Error: {error}</p>}
			{/* Mostrar detalles del producto si está disponible */}
			<table className='border-collapse w-full'>
				<thead>
					<tr>
						<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
							Nombre
						</th>
						<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
							Descripción
						</th>
						<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
							Precio
						</th>
						<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
							Color
						</th>
						<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
							Talla
						</th>
						<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
							Categoría
						</th>
						<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
							Imagen
						</th>
						<th className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'>
							Acciones
						</th>
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<tr
							className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'
							key={product.id}
						>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Nombre
								</span>
								{product.nombre}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Descripción
								</span>
								{product.descripcion}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Precio
								</span>
								${product.precio}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Color
								</span>
								{product.color}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Talla
								</span>
								{product.talla.join(', ')}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Categoría
								</span>
								{product.categoria}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static flex justify-center'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Imagen
								</span>
								<img
									src={product.imagen}
									alt={product.descripcion}
									className='h-16 w-16'
								/>
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b text-center block lg:table-cell relative lg:static'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Acciones
								</span>
								<button
									className='text-blue-400 hover:text-blue-600'
								>
									Editar
								</button>
								<button
									className='text-blue-400 hover:text-blue-600 pl-6'
								>
									Eliminar
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</>
	);
};

export { ProductAdminPanel };
