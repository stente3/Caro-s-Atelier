import { useState, useEffect } from 'react';

import axios from 'axios';

// Creamos un hook personalizado llamado `useDataFetch` que recibe como parámetro una URL.
const useDataFetch = url => {
	// Definimos tres estados: `products` para almacenar los datos obtenidos,
	// `loading` para indicar si la solicitud está en proceso,
	// y `error` para almacenar cualquier error que ocurra durante la solicitud.
	const [productsApi, setProductsApi] = useState([]);
	const [loading, setLoading] = useState(true); // Inicialmente estamos cargando los datos.
	const [error, setError] = useState(null); // No hay error al principio.

	useEffect(() => {
		// Definimos una función asíncrona para obtener los productos desde la API.
		const fetchProducts = async () => {
			try {
				// Realizamos la solicitud HTTP GET a la URL proporcionada usando `axios`.
				const response = await axios.get(url);

				// Actualizamos el estado `products` con los datos obtenidos de la respuesta
				setProductsApi(response.data.productos);
			} catch (err) {
				// Si hay un error en la solicitud, actualizamos el estado `error` con el mensaje del error.
				setError(err.message);
			} finally {
				// Sin importar el resultado, marcamos que la carga ha finalizado.
				setLoading(false);
			}
		};

		// Llamamos a la función `fetchProducts` para iniciar la solicitud de los productos.
		fetchProducts();
	}, []);

	// El hook retorna un objeto que contiene `products`, `loading` y `error`,
	// para que el componente que use este hook pueda acceder a estos valores.
	return { productsApi, loading, error };
};

// Exportamos el hook para que pueda ser utilizado en otros componentes.
export { useDataFetch };
