import { create } from 'zustand';

const useStore = create(set => ({
	products: [],
	hasFetched: false, // Inicialmente es false, ya que no se ha hecho el fetch
	updateAllProducts: newProducts => set({ products: newProducts }),
	setHasFetched: status => set(() => ({ hasFetched: status })), // Función para actualizar `hasFetched`
}));

export default useStore;
