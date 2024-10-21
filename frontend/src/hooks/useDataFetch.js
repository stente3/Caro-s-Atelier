import { useState, useEffect } from 'react';
import useStore from '../stores/productStore';
import axios from 'axios';

// Creamos un hook personalizado llamado `useDataFetch` que recibe como parámetro una URL.
const useDataFetch = url => {
	// Manejamos el estado de carga y error localmente
	const [loading, setLoading] = useState(true); // Inicialmente estamos cargando los datos.
	const [error, setError] = useState(null); // No hay error al principio.

	// Obtenemos funciones y valores del estado global de Zustand
	const hasFetched = useStore(state => state.hasFetched);
	const updateProducts = useStore(state => state.updateAllProducts);
	const setHasFetched = useStore(state => state.setHasFetched);

	useEffect(() => {
		// Solo ejecutamos la solicitud si `hasFetched` es false
		if (!hasFetched) {
			// Definimos una función asíncrona para obtener los productos desde la API.
			const fetchProducts = async () => {
				try {
					// Realizamos la solicitud HTTP GET a la URL proporcionada usando `axios`.
					const response = await axios.get(url);
					console.log(response.data.record.record);

					// Actualizamos el estado global de Zustand con los productos obtenidos.
					updateProducts(response.data.record.record);
					setHasFetched(true); // Actualizamos `hasFetched` a true para evitar futuros fetches.
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
		} else {
			// Si ya se hizo el fetch, no estamos cargando nada
			setLoading(false);
		}
	}, [url, hasFetched, updateProducts, setHasFetched]); // Dependencias

	// El hook retorna un objeto que contiene `loading` y `error`.
	return { loading, error };
};

// Exportamos el hook para que pueda ser utilizado en otros componentes.
export { useDataFetch };
