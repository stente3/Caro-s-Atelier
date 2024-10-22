import { create } from 'zustand';

const useCartStore = create((set) => ({
  // Variable que almacena el número de productos en el carrito
  itemCount: 0,

  // Función para sumar 1 al contador
  incrementItemCount: () => set((state) => ({
    itemCount: state.itemCount + 1,
    showCartNotification: true
  })),

  clearCartNotification: () => set({ showCartNotification: false }),
}));

export default useCartStore;
