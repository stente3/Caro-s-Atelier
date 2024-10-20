import { useState } from 'react';
import useProductsStore from '../stores/productStore';

const AddProduct = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [formData, setFormData] = useState({
		nombre: '',
		descripcion: '',
		precio: '',
		color: '',
		talla: '',
		categoria: '',
		imagen: '',
	});
	const [formError, setFormError] = useState(false);

	const { addProduct, products } = useProductsStore();

	const handleOpenModal = () => {
		console.log(products);
		setIsModalOpen(true);
		setFormError(false); // Limpiamos cualquier error anterior al abrir el modal
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		setFormData({
			nombre: '',
			descripcion: '',
			precio: '',
			color: '',
			talla: '',
			categoria: '',
			imagen: '',
		});
	};

	const handleInputChange = e => {
		const { name, value } = e.target;

		// Si el campo es "talla", eliminamos espacios y lo convertimos a un arreglo
		if (name === 'talla') {
			const cleanedValue = value.replace(/\s+/g, ''); // Eliminamos todos los espacios
			const tallaArray = cleanedValue.split(','); // Convertimos la cadena en un arreglo por comas

			setFormData({
				...formData,
				[name]: tallaArray, // Almacenamos el arreglo en lugar de la cadena
			});
		} else {
			// Para otros campos, simplemente actualizamos el valor como una cadena normal
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	// En la función handleSave
	const handleSave = () => {
		// Verificamos si todos los campos están llenos
		const allFieldsFilled = Object.values(formData).every(
			field => field !== '' && (field !== formData.imagen || field !== null), // Aseguramos que la imagen no sea null
		);

		if (!allFieldsFilled) {
			setFormError(true);
			return;
		}

		// Si todos los campos están llenos, agregamos el producto a la lista
		addProduct(formData);

		// Cerramos el modal después de guardar
		handleCloseModal();
	};

	// Función para manejar el cambio de imagen de producto
	const handleImageChange = e => {
		const file = e.target.files[0]; // Obtenemos el primer archivo seleccionado
		if (file) {
			const reader = new FileReader(); // Usamos FileReader para leer el contenido del archivo
			reader.onloadend = () => {
				// Cuando la lectura termine, actualizamos el formData con la nueva imagen
				setFormData(prevState => ({
					...prevState, // Mantenemos los valores previos
					imagen: reader.result, // Guardamos la imagen como una cadena en base64
				}));
			};
			reader.readAsDataURL(file); // Leemos el archivo como una URL en base64
		}
	};

	return (
		<>
			{/* Botón para abrir el modal */}
			<div className='flex justify-end'>
				<button
					className='bg-blue-500 text-white font-bold py-2 px-4 rounded'
					onClick={handleOpenModal}
				>
					Agregar
				</button>
			</div>
			{/* Modal */}
			{isModalOpen && (
				<div className='fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50'>
					<div className='bg-white p-6 rounded-lg shadow-lg z-60'>
						{/* Tabla con inputs */}
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
								<tr className='bg-white lg:hover:bg-gray-100 flex lg:table-row flex-row lg:flex-row flex-wrap lg:flex-no-wrap mb-10 lg:mb-0'>
									{/* Campos del formulario */}
									<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
										<input
											type='text'
											name='nombre'
											className='border p-1 w-full'
											placeholder='Pijama de Algodón'
											value={formData.nombre}
											onChange={handleInputChange}
										/>
									</td>
									<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
										<textarea
											name='descripcion'
											className='border p-1 w-full'
											placeholder='Pijama suave y cómoda, perfecta para el descanso.'
											value={formData.descripcion}
											onChange={handleInputChange}
										/>
									</td>
									<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
										<input
											type='number'
											name='precio'
											className='border p-1 w-full'
											placeholder='79.900'
											value={formData.precio}
											onChange={handleInputChange}
										/>
									</td>
									<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
										<input
											type='text'
											name='color'
											className='border p-1 w-full'
											placeholder='Rosa'
											value={formData.color}
											onChange={handleInputChange}
										/>
									</td>
									<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
										<input
											type='text'
											name='talla'
											className='border p-1 w-full'
											placeholder='S,M,L'
											value={formData.talla}
											onChange={handleInputChange}
										/>
									</td>
									<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
										<input
											type='text'
											name='categoria'
											className='border p-1 w-full'
											placeholder='Pijama'
											value={formData.categoria}
											onChange={handleInputChange}
										/>
									</td>
									<td className='w-full lg:w-auto p-3 text-gray-800 text-center border border-b block lg:table-cell relative lg:static'>
										<input
											type='file'
											className='border p-1 w-full'
											placeholder='Imagen'
											onChange={handleImageChange}
										/>
									</td>
								</tr>
							</tbody>
						</table>

						{/* Mostrar error si hay campos vacíos */}
						{formError && (
							<div className='text-red-500 text-center mt-2'>
								Por favor, completa todos los campos antes de guardar.
							</div>
						)}

						<div className='flex justify-end mt-4'>
							<button
								className='bg-green-500 text-white font-bold py-2 px-4 rounded mr-2'
								onClick={handleSave}
							>
								Guardar
							</button>
							<button
								className='bg-red-500 text-white font-bold py-2 px-4 rounded'
								onClick={handleCloseModal}
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export { AddProduct };
