const Loader = () => {
	return (
		<div className='flex items-center justify-center h-screen bg-white'>
			<div className='flex space-x-1'>
				<div className='w-1 h-8 bg-black animate-pulse'></div>
				<div className='w-1 h-8 bg-black animate-pulse delay-75'></div>
				<div className='w-1 h-8 bg-black animate-pulse delay-75'></div>
			</div>
		</div>
	);
};
export { Loader };
