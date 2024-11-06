import { create } from 'zustand';
import useProductsStore from './productStore';

const useCartStore = create(set => ({
	// Variable que almacena el número de productos en el carrito
	itemCount: 0,

	// Carrito de compras (almacena productos completos con cantidad y talla)
	cart: [],

	// Precio total de los productos en el carrito (formateado como string con 3 decimales)
	totalPrice: '0.000',

	// Notificación para mostrar cuando se agrega un producto
	showCartNotification: false,

	// Notificación para redireccionar al inicio si el carrito está vacío
	showEmptyCartNotification: false,

	// Función para generar el mensaje personalizado con productos del carrito
	generateMessage: () => {
		const { cart } = useCartStore.getState();

		// Si el carrito está vacío, no hay mensaje para generar
		if (cart.length === 0) {
			return 'El carrito está vacío.';
		}
		const espacio = '%20';
		const renglon = '%0A';
		const comillaSimple = '%27';
		// Mensaje inicial
		let message = `%F0%9F%91%8B%20Hola%20Caro${comillaSimple}s${espacio}Atelier%F0%9F%8C%9F%0A%0AMe%20gustar%C3%ADa%20confirmar%20mi%20pedido%20con%20estos%20productos${espacio}%F0%9F%9B%92${renglon}${renglon}`;

		// Iterar sobre los productos del carrito para construir el mensaje
		cart.forEach((item, index) => {
			message += `${item.cantidad} "${item.nombre}" Talla: "${item.talla}"`;
			// Agregar un espacio si no es el último producto
			if (index < cart.length - 1) {
				message += renglon;
			}
			if (index == cart.length - 1) {
				message += `${renglon}${renglon}%21Espero%20su%20confirmaci%C3%B3n%20para%20continuar%21%20%F0%9F%93%B2`;
			}
		});

		return message;
	},

	// Función para sumar 1 al contador de productos
	incrementItemCount: () =>
		set(state => ({
			itemCount: state.itemCount + 1,
			showCartNotification: true,
		})),

	// Función para agregar o actualizar un producto en el carrito
	addToCart: (productId, quantity = 1, talla = 'default') =>
		set(state => {
			const { products } = useProductsStore.getState();

			const productToAdd = products.find(product => product.id === productId);
			if (!productToAdd) {
				console.error(
					`Producto con ID ${productId} no encontrado en la store de productos.`,
				);
				return state;
			}

			const existingProduct = state.cart.find(
				item => item.id === productId && item.talla === talla,
			);

			let updatedCart;
			if (existingProduct) {
				updatedCart = state.cart.map(item =>
					item.id === productId && item.talla === talla
						? { ...item, cantidad: item.cantidad + quantity }
						: item,
				);
			} else {
				updatedCart = [
					...state.cart,
					{ ...productToAdd, cantidad: quantity, talla },
				];
			}

			const newTotalPrice = updatedCart
				.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
				.toFixed(3);

			return {
				cart: updatedCart,
				itemCount: state.itemCount + quantity,
				totalPrice: newTotalPrice,
				showCartNotification: true,
			};
		}),

	// Función para incrementar la cantidad de un producto en el carrito
	increaseQuantity: (productId, talla = 'default') =>
		set(state => {
			const updatedCart = state.cart.map(item =>
				item.id === productId && item.talla === talla
					? { ...item, cantidad: item.cantidad + 1 }
					: item,
			);

			const newTotalPrice = updatedCart
				.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
				.toFixed(3);

			return {
				cart: updatedCart,
				itemCount: state.itemCount + 1,
				totalPrice: newTotalPrice,
			};
		}),

	// Función para disminuir la cantidad de un producto en el carrito
	decreaseQuantity: (productId, talla = 'default') =>
		set(state => {
			const productToUpdate = state.cart.find(
				item => item.id === productId && item.talla === talla,
			);

			// Si el producto no existe o la cantidad es 1, evitar reducir la cantidad a menos de 1
			if (!productToUpdate || productToUpdate.cantidad <= 1) return state;

			const updatedCart = state.cart.map(item =>
				item.id === productId && item.talla === talla
					? { ...item, cantidad: item.cantidad - 1 }
					: item,
			);

			const newTotalPrice = updatedCart
				.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
				.toFixed(3);

			return {
				cart: updatedCart,
				itemCount: state.itemCount - 1,
				totalPrice: newTotalPrice,
			};
		}),

	// Función para eliminar un producto del carrito
	removeFromCart: (productId, talla = 'default') =>
		set(state => {
			const productToRemove = state.cart.find(
				item => item.id === productId && item.talla === talla,
			);

			if (!productToRemove) return state;

			const updatedCart = state.cart.filter(
				item => !(item.id === productId && item.talla === talla),
			);
			const updatedItemCount = state.itemCount - productToRemove.cantidad;

			const newTotalPrice = updatedCart
				.reduce((acc, item) => acc + item.precio * item.cantidad, 0)
				.toFixed(3);

			// Notificación para carrito vacío
			if (updatedItemCount === 0) {
				// Mostrar notificación de carrito vacío
				set({ showEmptyCartNotification: true });
			}

			return {
				cart: updatedCart,
				itemCount: updatedItemCount,
				totalPrice: newTotalPrice,
				showEmptyCartNotification: updatedItemCount === 0,
			};
		}),

	// Función para limpiar la notificación del carrito
	clearCartNotification: () => set({ showCartNotification: false }),

	// Función para limpiar la notificación de carrito vacío
	clearEmptyCartNotification: () => set({ showEmptyCartNotification: false }),
}));

export default useCartStore;
