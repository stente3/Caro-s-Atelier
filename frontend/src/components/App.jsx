import { HeaderLayout } from '../Layout/HeaderLayout';
import { ProductList } from './ProductList';
import { useDataFetch } from '../hooks/useDataFetch';

function App() {
	const { products, loading, error } = useDataFetch(
		'https://raw.githubusercontent.com/CAFM3/Basic-Json/refs/heads/main/data.json',
	);
	return (
		<>
			<HeaderLayout />
			<ProductList products={products} loading={loading} error={error} />
		</>
	);
}

export default App;
