import { useDynamicForm } from './context/DynamicFormContext';

const SelectedProjectSchema = () => {
	const { entities, selectedProject } = useDynamicForm();
	const selectedProjectSchema = entities.find(
		(entity) => entity.id === selectedProject
	);
	return (
		<div className=''>
			<h2 className='mb-2 text-2xl font-bold'>Selected Project Schema</h2>
			<pre className='p-4 bg-gray-100 rounded'>
				{JSON.stringify(selectedProjectSchema, null, 2)}
			</pre>
		</div>
	);
};

export default SelectedProjectSchema;
