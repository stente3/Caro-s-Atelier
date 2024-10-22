import { useEffect } from 'react';
import { HeaderLayout } from '../Layout/HeaderLayout';
import { ProductList } from './ProductList';
import { useDataFetch } from '../hooks/useDataFetch.js';
import useProductsStore from '../stores/productStore';
import useCartStore from '../stores/cartStore';
import { Footer } from '../components/Footer';
import toast, { Toaster } from 'react-hot-toast';

function App() {
	const url = import.meta.env.VITE_API_URL;
	const { loading, error } = useDataFetch(url);
	// Obtiene la lista de productos del estado global
	const products = useProductsStore(state => state.products);
	const { showCartNotification, clearCartNotification } = useCartStore();

	useEffect(() => {
		if (showCartNotification) {
			toast.success('Producto agregado al carrito', {
				icon: '🛒',
				duration: 2000,
			});
			clearCartNotification();
		}
	}, [showCartNotification, clearCartNotification]);

	return (
		<>
			<HeaderLayout />
			<ProductList products={products} loading={loading} error={error} />
			<Footer />
			<Toaster />
		</>
	);
}

export default App;
