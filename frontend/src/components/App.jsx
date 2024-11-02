import { useEffect } from 'react';
import { HeaderLayout } from '../Layout/HeaderLayout';
import { ProductList } from './ProductList';
import { useDataFetch } from '../hooks/useDataFetch.js';
import useProductsStore from '../stores/productStore';
import useCartStore from '../stores/cartStore';
import { Footer } from '../components/Footer';
import { Toaster, toast } from 'sonner';

function App() {
	const url = import.meta.env.VITE_API_URL;
	const { loading, error } = useDataFetch(url);
	const products = useProductsStore(state => state.products);
	const { showCartNotification, clearCartNotification, showEmptyCartNotification, clearEmptyCartNotification } = useCartStore();

	useEffect(() => {
		if (showCartNotification) {
			toast.success('Producto agregado al carrito', {
				icon: '🛒',
				duration: 2000,
			});
			clearCartNotification();
		}
	}, [showCartNotification, clearCartNotification]);

	useEffect(() => {
		if (showEmptyCartNotification) {
			toast.info('Redirigido al menú principal porque no hay productos en el carrito.', {
				icon: '🚫',
				duration: 2000,
			});
			clearEmptyCartNotification();
		}
	}, [showEmptyCartNotification, clearEmptyCartNotification]);

	return (
		<>
			<HeaderLayout />
			<ProductList products={products} loading={loading} error={error} />
			<Footer />
			<Toaster richColors position="top-center" />
		</>
	);
}

export default App;
