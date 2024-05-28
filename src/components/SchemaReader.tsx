import useLoadSchema from '../hooks/useLoadSchema';

const SchemaReader = () => {
	const { handleFileChange } = useLoadSchema();

	return (
		<>
			<label htmlFor='file-input' className='sr-only'>
				Choose file
			</label>
			<input
				type='file'
				name='file-input'
				id='file-input'
				className='
        block border border-gray-200
        shadow-sm rounded-lg text-sm focus:z-10
        focus:border-blue-500 focus:ring-blue-500
        disabled:opacity-50 disabled:pointer-events-none 
        file:bg-gray-50 file:border-0
        file:me-4
        file:py-3 file:px-4
        dark:file:bg-green-500 dark:file:text-white'
        accept='.json'
        onChange={handleFileChange}
			/>
		</>
	);
};

export default SchemaReader;
