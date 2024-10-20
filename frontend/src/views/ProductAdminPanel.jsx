import { useState } from 'react';
import useProductsStore from '../stores/productStore';
import { useDataFetch } from '../hooks/useDataFetch';
import { Nav } from '../components/Nav';
import { ChangeProductModal } from '../components/ChangeProductModal';
import { DeleteProductModal } from '../components/DeleteProductModal';
import { AddProduct } from '../components/AddProduct';
import { Footer } from '../components/Footer';

const ProductAdminPanel = () => {
	// Estado para almacenar el ID del producto que se está editando actualmente
	const [editingProductId, setEditingProductId] = useState(null);

	// Estado para almacenar el producto actualizado cuando se edita
	const [updatedProduct, setUpdatedProduct] = useState({});

	// Estado para controlar la apertura del modal de cambios (para confirmar edición)
	const [isChangeModalOpen, setIsChangeModalOpen] = useState(false);

	// Estado para controlar la apertura del modal de eliminación (para confirmar eliminación)
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	// Estado para almacenar el ID del producto seleccionado, ya sea para edición o eliminación
	const [selectedProductId, setSelectedProductId] = useState(null);

	// URL de la API que se obtiene de las variables de entorno (configurada en el proyecto)
	const url = import.meta.env.VITE_API_URL;

	// Hook personalizado para obtener datos de la API (por ejemplo, productos) y manejar el estado de carga y errores
	const { loading, error } = useDataFetch(url);

	// Obtenemos los productos y las funciones para eliminar y actualizar productos desde el estado global gestionado por Zustand
	const { products, removeProductById, updateProductById } = useProductsStore();

	// Función para eliminar un producto por su ID
	const handleRemove = id => {
		// Llama a la función de Zustand para eliminar el producto del estado global
		removeProductById(id);
		// Cierra el modal de confirmación de eliminación
		setIsDeleteModalOpen(false);
	};

	// Función para iniciar la edición de un producto
	const handleEdit = product => {
		// Establece el ID del producto en modo edición
		setEditingProductId(product.id);
		// Establece una copia del producto actual para editar sus valores
		setUpdatedProduct(product);
	};

	// Función para manejar los cambios en los campos del formulario (input)
	const handleInputChange = e => {
		const { name, value } = e.target; // Obtiene el nombre y el valor del campo que cambia

		// Si el campo que se está cambiando es 'talla', convertimos el valor en un arreglo
		if (name === 'talla') {
			const sizesArray = value.split(',').map(size => size.trim()); // Convertimos las tallas separadas por comas en un array
			setUpdatedProduct(prevState => ({
				...prevState, // Mantenemos los valores previos
				[name]: sizesArray, // Asignamos el arreglo de tallas
			}));
		} else {
			// Para otros campos simplemente actualizamos el valor en el estado
			setUpdatedProduct(prevState => ({
				...prevState, // Mantenemos los valores previos
				[name]: value, // Asignamos el nuevo valor del campo editado
			}));
		}
	};

	// Función para manejar el cambio de imagen de producto
	const handleImageChange = e => {
		const file = e.target.files[0]; // Obtenemos el primer archivo seleccionado
		if (file) {
			const reader = new FileReader(); // Usamos FileReader para leer el contenido del archivo
			reader.onloadend = () => {
				// Cuando la lectura termine, actualizamos el producto con la nueva imagen
				setUpdatedProduct(prevState => ({
					...prevState, // Mantenemos los valores previos
					imagen: reader.result, // Guardamos la imagen como una cadena en base64
				}));
			};
			reader.readAsDataURL(file); // Leemos el archivo como una URL en base64
		}
	};

	// Función para guardar el producto actualizado
	const handleSave = (id, product) => {
		// Llamamos a la función de Zustand para actualizar el producto en la store
		updateProductById(id, product);
		// Salimos del modo de edición
		setEditingProductId(null);
		// Cerramos el modal de confirmación de cambios
		setIsChangeModalOpen(false);
	};

	// Función para confirmar la edición y guardarla
	const handleConfirmSave = () => {
		// Guardamos el producto seleccionado con los cambios actualizados
		handleSave(selectedProductId, updatedProduct);
	};

	// Función para abrir el modal de confirmación de edición
	const handleOpenChangeModal = productId => {
		// Establecemos el ID del producto que se va a editar
		setSelectedProductId(productId);
		// Mostramos el modal de confirmación de edición
		setIsChangeModalOpen(true);
	};

	// Función para abrir el modal de confirmación de eliminación
	const handleOpenDeleteModal = productId => {
		// Establecemos el ID del producto que se va a eliminar
		setSelectedProductId(productId);
		// Mostramos el modal de confirmación de eliminación
		setIsDeleteModalOpen(true);
	};

	// Función para confirmar la eliminación del producto seleccionado
	const handleConfirmDelete = () => {
		// Eliminamos el producto utilizando su ID
		handleRemove(selectedProductId);
	};

	return (
		<>
			<Nav />
			{/* Modal de confirmación */}
			<ChangeProductModal
				isOpen={isChangeModalOpen}
				onClose={() => setIsChangeModalOpen(false)}
				onConfirm={handleConfirmSave}
			/>
			{/* Modal de confirmación de eliminación */}
			<DeleteProductModal
				isOpen={isDeleteModalOpen}
				onClose={() => setIsDeleteModalOpen(false)}
				onConfirm={handleConfirmDelete}
			/>
			{/* Mostrar mensaje de carga */}
			{loading && <p>Cargando...</p>}
			{/* Mostrar mensaje de error si hay */}
			{error && <p>Error: {error}</p>}
			{/* Mostrar detalles del producto si está disponible */}
			<AddProduct />
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
						].map((header, index) => (
							<th
								key={index}
								className='p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell'
							>
								{header}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{products.map(product => (
						<tr
							key={product.id}
							className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'
						>
							<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Nombre
								</span>
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
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Descripción
								</span>
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
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Precio
								</span>
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
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Color
								</span>
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
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Talla
								</span>
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
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Categoría
								</span>
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
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Imagen
								</span>
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
								<span className='lg:hidden absolute top-0 left-0 bg-blue-200 px-2 py-1 text-xs font-bold uppercase'>
									Acciones
								</span>
								{editingProductId === product.id ? (
									<>
										<button
											className='text-green-400 hover:text-green-600'
											onClick={() => handleOpenChangeModal(product.id)}
										>
											Guardar
										</button>
										<button
											className='text-red-400 hover:text-red-600 pl-6'
											onClick={() => setEditingProductId(null)}
										>
											Cancelar
										</button>
									</>
								) : (
									<>
										<button
											className='text-blue-400 hover:text-blue-600'
											onClick={() => handleEdit(product)}
										>
											Editar
										</button>
										<button
											className='text-red-400 hover:text-red-600 pl-6'
											onClick={() => handleOpenDeleteModal(product.id)}
										>
											Eliminar
										</button>
									</>
								)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
			<Footer />
		</>
	);
};

export { ProductAdminPanel };
