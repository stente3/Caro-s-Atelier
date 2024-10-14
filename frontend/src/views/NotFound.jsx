import { useRouteError, Link } from 'react-router-dom';
import NotFoundImage from '../assets/404.png';

export function NotFound() {
	const error = useRouteError();
	console.error(error);

	return (
		<div
			id='error-page'
			className='bg-[#D9D9D9] flex w-screen justify-center items-center h-screen flex-col pb-20'
		>
			<img src={NotFoundImage} alt='Not Found Image' />
			<p>Lo sentimos, la página que buscas no se encuentra disponible.</p>
			<Link to={'/'}>
				<button className='text-white bg-black px-4 py-2 border rounded-md mt-4'>Volver al inicio</button>
			</Link>
		</div>
	);
}
