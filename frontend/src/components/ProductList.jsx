import { Product } from '../components/Product';
import { Loader } from './Loader';
const ProductList = ({ products, loading, error }) => {
	return (
		<div className='max-w-screen py-6 flex items-center justify-center flex-wrap'>
			{loading && <Loader/>}
			{error && <p>Error al cargar productos: {error}</p>}
			{products &&
				products.map(product => <Product key={product.id} product={product} />)}
		</div>
	);
};

export { ProductList };
