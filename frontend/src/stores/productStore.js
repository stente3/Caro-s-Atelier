import { create } from 'zustand';

const useProductsStore = create(set => ({
	products: [],
	hasFetched: false, // Inicialmente es false, ya que no se ha hecho el fetch
	updateAllProducts: newProducts => set({ products: newProducts }),
	setHasFetched: status => set(() => ({ hasFetched: status })), // Función para actualizar `hasFetched`

	// función para eliminar producto por id
	removeProductById: (id) => set((state) => ({ products: state.products.filter(product => product.id !== id)})),

	// Función para actualizar producto por id
	updateProductById: (id, updatedInfo) => set((state) => ({
		products: state.products.map(product => 
			product.id === id ? { ...product, ...updatedInfo } : product
		)
	}))
}));

export default useProductsStore;
