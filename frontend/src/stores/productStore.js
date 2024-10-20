import { create } from 'zustand';

const useProductsStore = create(set => ({
	products: [],
	hasFetched: false, // Inicialmente es false, ya que no se ha hecho el fetch
	updateAllProducts: newProducts => set({ products: newProducts }),
	setHasFetched: status => set(() => ({ hasFetched: status })), // Función para actualizar `hasFetched`

	// Función para eliminar producto por id
	removeProductById: (id) => set((state) => ({ products: state.products.filter(product => product.id !== id)})),

	// Función para actualizar producto por id
	updateProductById: (id, updatedInfo) => set((state) => ({
		products: state.products.map(product => 
			product.id === id ? { ...product, ...updatedInfo } : product
		)
	})),

	// Función para agregar un nuevo producto con id único
	addProduct: (newProduct) => set((state) => {
		const maxId = state.products.length > 0 
			? Math.max(...state.products.map(product => product.id)) 
			: 0; // Obtiene el máximo id existente, o 0 si no hay productos

		const productWithId = {
			...newProduct,
			id: maxId + 1 // Asigna un nuevo id
		};

		return {
			products: [...state.products, productWithId] // Agrega el nuevo producto con el id generado
		};
	})
}));

export default useProductsStore;

