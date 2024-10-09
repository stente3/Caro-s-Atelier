import { create } from 'zustand';

const useStore = create(set => ({
	products: [],

	// Función para modificar todos los productos
	updateAllProducts: newProducts => set({ products: newProducts }),
}));

export default useStore;
