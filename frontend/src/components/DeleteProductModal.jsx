const DeleteProductModal = ({ isOpen, onClose, onConfirm }) => {
	// Si el modal no está abierto, no lo renderiza.
	if (!isOpen) return null;

	return (
		<>
			<div
				id='popup-modal'
				tabIndex='-1'
				className='overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex pb-20'
			>
				<div className='relative p-4 w-full max-w-md max-h-full'>
					<div className='relative bg-white rounded-lg shadow px-3 py-6'>
						<svg
							width='63'
							height='63'
							viewBox='0 0 63 63'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
							className='flex items-center w-full'
						>
							<path
								d='M55.2567 49.1055L34.2858 10.1612C32.7994 7.40004 28.8397 7.40004 27.3521 10.1612L6.38243 49.1055C6.0597 49.705 5.89789 50.3778 5.91281 51.0585C5.92773 51.7391 6.11887 52.4042 6.46756 52.9889C6.81625 53.5736 7.31059 54.0579 7.90232 54.3946C8.49405 54.7312 9.16296 54.9087 9.84374 54.9097H51.7892C52.4705 54.9098 53.1402 54.7331 53.7328 54.3969C54.3253 54.0607 54.8205 53.5764 55.17 52.9916C55.5194 52.4067 55.711 51.7411 55.7262 51.06C55.7414 50.3789 55.5796 49.7054 55.2567 49.1055ZM30.8195 48.8804C30.3328 48.8804 29.857 48.736 29.4523 48.4656C29.0476 48.1952 28.7322 47.8109 28.5459 47.3612C28.3597 46.9115 28.3109 46.4167 28.4059 45.9393C28.5008 45.462 28.7352 45.0235 29.0794 44.6793C29.4236 44.3351 29.8621 44.1007 30.3394 44.0058C30.8168 43.9108 31.3116 43.9596 31.7613 44.1458C32.211 44.3321 32.5953 44.6475 32.8657 45.0522C33.1362 45.4569 33.2805 45.9327 33.2805 46.4194C33.2805 47.0721 33.0212 47.6981 32.5597 48.1596C32.0982 48.6211 31.4722 48.8804 30.8195 48.8804ZM33.4921 24.1295L32.7858 39.1412C32.7858 39.6634 32.5784 40.1641 32.2092 40.5333C31.84 40.9025 31.3392 41.11 30.8171 41.11C30.2949 41.11 29.7942 40.9025 29.425 40.5333C29.0558 40.1641 28.8483 39.6634 28.8483 39.1412L28.142 24.1356C28.1262 23.7771 28.1827 23.419 28.3081 23.0827C28.4336 22.7464 28.6255 22.4388 28.8724 22.1783C29.1192 21.9178 29.416 21.7096 29.7451 21.5662C30.0741 21.4228 30.4286 21.3472 30.7876 21.3437H30.8134C31.1747 21.3435 31.5324 21.4166 31.8647 21.5584C32.1971 21.7002 32.4973 21.9079 32.7471 22.1689C32.997 22.43 33.1914 22.7389 33.3186 23.0772C33.4458 23.4154 33.5032 23.7759 33.4872 24.1369L33.4921 24.1295Z'
								fill='black'
							/>
						</svg>

						<div className='md:p-2 text-center'>
							{/* Aquí puedes pasar imágenes o cualquier contenido adicional */}
							<h3 className='mb-5 text-lg font-normal text-black'>
								¿Estás seguro de que deseas eliminar este elemento? Esta acción
								no se puede deshacer.
							</h3>
							<button
								id='accept'
								type='button'
								className='text-white bg-black hover:bg-slate-800 focus:ring-4 focus:outline-none focus:ring-slate-300 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center'
								onClick={onConfirm}
							>
								Eliminar
							</button>
							<button
								type='button'
								className='py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-zinc-800 focus:z-10 focus:ring-4 focus:ring-gray-100'
								onClick={onClose}
							>
								Cancelar
							</button>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export { DeleteProductModal };
