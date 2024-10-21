import { create } from 'zustand';
import axios from 'axios';

const useProductsStore = create((set, get) => ({
	products: [],
	hasFetched: false, // Inicialmente es false, ya que no se ha hecho el fetch
	isFirstLoad: true, // Nuevo estado para controlar la primera carga

	updateAllProducts: newProducts => {
		set(state => {
			if (state.isFirstLoad) {
				// Si es la primera carga, solo actualizamos los productos y marcamos que ya no es la primera carga
				return {
					products: newProducts,
					isFirstLoad: false
				};
			} else {
				// Si no es la primera carga, actualizamos los productos y JSONBin
				get().updateJSONBin(newProducts);
				return { products: newProducts };
			}
		});
	},
	setHasFetched: status => set({ hasFetched: status }),

	// Función para eliminar producto por id
	removeProductById: (id) => {
		set(state => {
			const updatedProducts = state.products.filter(product => product.id !== id);
			get().updateJSONBin(updatedProducts);
			return { products: updatedProducts };
		});
	},

	// Función para actualizar producto por id
	updateProductById: (id, updatedInfo) => {
		set(state => {
			const updatedProducts = state.products.map(product =>
				product.id === id ? { ...product, ...updatedInfo } : product
			);
			get().updateJSONBin(updatedProducts);
			return { products: updatedProducts };
		});
	},

	// Función para agregar un nuevo producto con id único
	addProduct: (newProduct) => {
		set(state => {
			const maxId = state.products.length > 0
				? Math.max(...state.products.map(product => product.id))
				: 0; // Obtiene el máximo id existente, o 0 si no hay productos

			const productWithId = {
				...newProduct,
				id: maxId + 1 // Asigna un nuevo id
			};

			const updatedProducts = [...state.products, productWithId];
			get().updateJSONBin(updatedProducts);
			return { products: updatedProducts };
		});
	},

	updateJSONBin: async (updatedProducts) => {
		try {
			const response = await axios.put(
				'http://localhost:3000/update',
				{ record: updatedProducts },
				{
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);
			console.log('Datos enviados al backend para actualizar JSONBin:', response.data);
		} catch (error) {
			console.error('Error al enviar datos al backend:', error);
		}
	},
}));

export default useProductsStore;
