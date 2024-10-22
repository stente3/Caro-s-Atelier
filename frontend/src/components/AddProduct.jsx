import { useState } from 'react';
import useProductsStore from '../stores/productStore';
import { useImgurUpload } from '../hooks/useImgurUpload';
import toast, { Toaster } from 'react-hot-toast';

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
	const { uploadImage, loading: uploadingImage } = useImgurUpload();

	const handleOpenModal = () => {
		console.log(products);
		setIsModalOpen(true);
		setFormError(false);
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

		if (name === 'talla') {
			const cleanedValue = value.replace(/\s+/g, '');
			const tallaArray = cleanedValue.split(',');

			setFormData({
				...formData,
				[name]: tallaArray,
			});
		} else {
			setFormData({
				...formData,
				[name]: value,
			});
		}
	};

	const handleSave = async () => {
		if (uploadingImage) {
			console.log('Espera mientras se sube la imagen...');
			return;
		}

		const allFieldsFilled = Object.values(formData).every(
			field => field !== '' && (field !== formData.imagen || field !== null),
		);

		if (!allFieldsFilled) {
			setFormError(true);
			return;
		}

		// Mostrar el toast de carga
		const loadingToast = toast.loading('Agregando nuevo producto...');

		try {
			let updatedFormData = { ...formData };

			if (formData.imagen && formData.imagen.startsWith('data:image')) {
				const result = await uploadImage(formData.imagen);

				if (!result.success) {
					throw new Error('Error al subir la imagen');
				}

				updatedFormData = {
					...updatedFormData,
					imagen: result.imageLink,
				};
			}

			await addProduct(updatedFormData);

			// Cerrar el toast de carga y mostrar el toast de éxito
			toast.dismiss(loadingToast);
			toast.success("Producto agregado con éxito");
			handleCloseModal();
		} catch (error) {
			// Si ocurre un error, cerrar el toast de carga y mostrar un toast de error
			toast.dismiss(loadingToast);
			toast.error('Error al agregar el producto');
			console.error('Error al procesar la imagen o agregar el producto:', error);
		}
	};

	const handleImageChange = e => {
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.onloadend = () => {
				setFormData(prevState => ({
					...prevState,
					imagen: reader.result,
				}));
			};
			reader.readAsDataURL(file);
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
			<Toaster />
		</>
	);
};

export { AddProduct };
