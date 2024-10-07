import { Nav } from './Nav';
import { SearchBar } from './SearchBar';
import { ProductList } from '../views/ProductList';
import { useDataFetch } from '../hooks/useDataFetch';

function App() {
	const { products, loading, error } = useDataFetch(
		'https://raw.githubusercontent.com/CAFM3/Basic-Json/refs/heads/main/data.json',
	);
	return (
		<>
			<Nav />
			<SearchBar />
			<ProductList products={products} loading={loading} error={error} />
		</>
	);
}

export default App;
