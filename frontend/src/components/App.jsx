import { HeaderLayout } from '../Layout/HeaderLayout';
import { ProductList } from './ProductList';
import { useDataFetch } from '../hooks/useDataFetch.js';
import useProductStore from '../stores/productStore';

function App() {
	const { loading, error } = useDataFetch(
		'https://raw.githubusercontent.com/CAFM3/Basic-Json/refs/heads/main/data.json',
	);
	// Obtiene la lista de productos del estado global
	const products = useProductStore(state => state.products);

	return (
		<>
			<HeaderLayout />
			<ProductList products={products} loading={loading} error={error} />
		</>
	);
}

export default App;
