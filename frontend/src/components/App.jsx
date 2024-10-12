import { HeaderLayout } from '../Layout/HeaderLayout';
import { ProductList } from './ProductList';
import { useDataFetch } from '../hooks/useDataFetch.js';
import useProductsStore from '../stores/productStore';

function App() {
	const url = import.meta.env.VITE_API_URL;
	const { loading, error } = useDataFetch(url);
	// Obtiene la lista de productos del estado global
	const products = useProductsStore(state => state.products);

	return (
		<>
			<HeaderLayout />
			<ProductList products={products} loading={loading} error={error} />
		</>
	);
}

export default App;
