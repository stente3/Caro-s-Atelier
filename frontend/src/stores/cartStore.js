import { create } from 'zustand';

const useCartStore = create(set => ({
	// Variable que almacena el número de productos en el carrito
	itemCount: 0,

	// Carrito de compras (almacena productos con id, talla y cantidad)
	cart: [],

	// Notificación para mostrar cuando se agrega un producto
	showCartNotification: false,

	// Función para sumar 1 al contador
	incrementItemCount: () =>
		set(state => ({
			itemCount: state.itemCount + 1,
			showCartNotification: true,
		})),

	// Función para agregar o actualizar un producto en el carrito
	addToCart: (productId, quantity = 1, talla = 'default') =>
		set(state => {
			// Busca el producto en el carrito con el mismo id y talla
			const existingProduct = state.cart.find(
				item => item.id === productId && item.talla === talla,
			);

			let updatedCart;
			if (existingProduct) {
				// Si el producto ya está en el carrito con la misma talla, actualiza su cantidad
				updatedCart = state.cart.map(item =>
					item.id === productId && item.talla === talla
						? { ...item, cantidad: item.cantidad + quantity }
						: item,
				);
			} else {
				// Si el producto no está en el carrito con esa talla, agrégalo
				updatedCart = [
					...state.cart,
					{ id: productId, cantidad: quantity, talla },
				];
			}

			return {
				cart: updatedCart,
				itemCount: state.itemCount + quantity,
				showCartNotification: true,
			};
		}),

	// Función para eliminar un producto del carrito
	removeFromCart: (productId, talla = 'default') =>
		set(state => {
			// Encuentra el producto específico a eliminar por id y talla
			const productToRemove = state.cart.find(
				item => item.id === productId && item.talla === talla,
			);

			if (!productToRemove) return state;

			// Filtra el producto específico y ajusta el contador de productos
			const updatedCart = state.cart.filter(
				item => !(item.id === productId && item.talla === talla),
			);
			const updatedItemCount = state.itemCount - productToRemove.cantidad;

			return {
				cart: updatedCart,
				itemCount: updatedItemCount,
			};
		}),

	// Función para limpiar la notificación del carrito
	clearCartNotification: () => set({ showCartNotification: false }),
}));

export default useCartStore;
