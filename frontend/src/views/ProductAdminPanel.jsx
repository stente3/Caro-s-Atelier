import { useState } from 'react';
import useProductsStore from '../stores/productStore';
import { useDataFetch } from '../hooks/useDataFetch';
import { Nav } from '../components/Nav';

const ProductAdminPanel = () => {
	const [editingProductId, setEditingProductId] = useState(null);
	const [updatedProduct, setUpdatedProduct] = useState({});

	const url = import.meta.env.VITE_API_URL;
	// Utiliza el hook para obtener datos
	const { loading, error } = useDataFetch(url);

	// Obtenemos los productos del estado global de Zustand
	const { products, removeProductById, updateProductById } = useProductsStore();

	const handleRemove = id => {
		removeProductById(id);
	};

	const handleEdit = product => {
		setEditingProductId(product.id);
		setUpdatedProduct(product); // Copia los valores del producto actual para editarlos
	};

	const handleInputChange = e => {
		const { name, value } = e.target;
		// Verificamos si el name es 'talla'
		if (name === 'talla') {
			// Convertimos el value en un arreglo si contiene tallas
			const sizesArray = value.split(',').map(size => size.trim());
			setUpdatedProduct(prevState => ({
				...prevState,
				[name]: sizesArray, // Asignamos el array de tallas
			}));
		} else {
			setUpdatedProduct(prevState => ({
				...prevState,
				[name]: value,
			}));
		}
	};

	const handleImageChange = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setUpdatedProduct(prevState => ({
					...prevState,
					imagen: reader.result,
				}));
			};
			reader.readAsDataURL(file);
		}
	};

	const handleSave = (id, product) => {
		// Aquí actualizarías el producto en la store y lo guardas.
		updateProductById(id, product);
		setEditingProductId(null); // Salir del modo de edición
	};

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
						{[
							'Nombre',
							'Descripción',
							'Precio',
							'Color',
							'Talla',
							'Categoría',
							'Imagen',
							'Acciones',
						].map(header => (
							<th
								key={header}
								className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{products.map((product, index) => (
						<tr
							key={product.id}
							className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'
						>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								{editingProductId === product.id ? (
									<input
										type='text'
										name='nombre'
										value={updatedProduct.nombre}
										onChange={handleInputChange}
										className='border p-1 w-full'
									/>
								) : (
									product.nombre
								)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								{editingProductId === product.id ? (
									<textarea
										name='descripcion'
										value={updatedProduct.descripcion}
										onChange={handleInputChange}
										className='border p-1 w-full'
									/>
								) : (
									product.descripcion
								)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								{editingProductId === product.id ? (
									<input
										type='number'
										name='precio'
										value={updatedProduct.precio}
										onChange={handleInputChange}
										className='border p-1 w-full'
									/>
								) : (
									`$${product.precio}`
								)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								{editingProductId === product.id ? (
									<input
										type='text'
										name='color'
										value={updatedProduct.color}
										onChange={handleInputChange}
										className='border p-1 w-full'
									/>
								) : (
									product.color
								)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								{editingProductId === product.id ? (
									<input
										type='text'
										name='talla'
										value={updatedProduct.talla}
										onChange={handleInputChange}
										className='border p-1 w-full'
									/>
								) : (
									product.talla.join(', ')
								)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								{editingProductId === product.id ? (
									<input
										type='text'
										name='categoria'
										value={updatedProduct.categoria}
										onChange={handleInputChange}
										className='border p-1 w-full'
									/>
								) : (
									product.categoria
								)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static flex justify-center'>
								{editingProductId === product.id ? (
									<input
										type='file'
										onChange={handleImageChange}
										className='border p-1 w-full'
									/>
								) : (
									<img
										src={product.imagen}
										alt={product.descripcion}
										className='h-16 w-16'
									/>
								)}
							</td>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								{editingProductId === product.id ? (
									<button
										className='text-green-400 hover:text-green-600'
										onClick={() => handleSave(product.id, updatedProduct)}
									>
										Guardar
									</button>
								) : (
									<button
										className='text-blue-400 hover:text-blue-600'
										onClick={() => handleEdit(product)}
									>
										Editar
									</button>
								)}
								<button
									className='text-red-400 hover:text-red-600 pl-6'
									onClick={() => handleRemove(product.id)}
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
