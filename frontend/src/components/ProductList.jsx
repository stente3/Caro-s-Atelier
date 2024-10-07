import { Product } from '../components/Product';
const ProductList = ({ products, loading, error }) => {
	return (
		<div className='w-screen py-6 flex items-center justify-center flex-wrap'>
			{loading && <p>Cargando productos...</p>}
			{error && <p>Error al cargar productos: {error}</p>}
			{products &&
				products.map(product => <Product key={product.id} product={product} />)}
		</div>
	);
};

export { ProductList };
