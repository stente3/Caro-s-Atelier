import { useEffect } from 'react';
import { HeaderLayout } from '../Layout/HeaderLayout';
import { ProductList } from './ProductList';
import { useDataFetch } from '../hooks/useDataFetch.js';
import useStore from '../stores/productStore';

function App() {
	const { productsApi, loading, error } = useDataFetch(
		'https://raw.githubusercontent.com/CAFM3/Basic-Json/refs/heads/main/data.json',
	);
	// Obtiene la función updateAllProducts del estado global
	const updateProducts = useStore(state => state.updateAllProducts);

	// Hook useEffect que se ejecuta cuando productsApi cambia
	useEffect(() => {
		// Verifica si productsApi contiene productos
		if (productsApi.length > 0) {
			// Actualiza el estado global con los productos obtenidos
			updateProducts(productsApi);
		}
	}, [productsApi, updateProducts]); // Dependencias del efecto: solo se ejecutará si productsApi o updateProducts cambian
	// Obtiene la lista de productos del estado global
	const products = useStore(state => state.products);

	return (
		<>
			<HeaderLayout />
			<ProductList products={products} loading={loading} error={error} />
		</>
	);
}

export default App;
