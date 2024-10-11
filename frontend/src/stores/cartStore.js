import { create } from 'zustand';

export const useCartStore = create((set) => ({
  // Variable que almacena el número de productos en el carrito
  itemCount: 0,

  // Función para sumar 1 al contador
  incrementItemCount: () => set((state) => ({ itemCount: state.itemCount + 1 })),
}));

export default useCartStore;
