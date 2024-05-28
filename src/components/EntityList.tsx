import { useDynamicForm } from '../context/DynamicFormContext';

const EntityList = () => {
	const {
		newEntity,
		handleEntityChange,
		createNewEntity,
		entities,
		setSelectedEntity,
		selectedEntity,
		selectedProject,
	} = useDynamicForm();

	const listOfEntities = entities.filter(
		(entity) => entity.relatedToProject === selectedProject
	);

	return (
		<div className='flex-1 max-w-[400px]'>
			<h2 className='mb-4 text-2xl font-bold'>Add New Entity</h2>
			<div className='mb-4'>
				<label className='block mb-2'>
					Related to Entity:
					<input
						type='text'
						name='relatedToEntity'
						value={newEntity.relatedToEntity}
						onChange={handleEntityChange}
						className='block w-full p-2 mt-1 border rounded'
					/>
				</label>
				<button
					onClick={createNewEntity}
					disabled={!newEntity.relatedToEntity || !selectedProject}
					className='px-4 py-2 mb-4 text-white bg-green-500 rounded disabled:opacity-50'
				>
					Add Entity
				</button>
			</div>

			{/*  list of projects with entity name */}
			<h2 className='mb-2 text-2xl font-bold'>List of Entities</h2>
			<div className='flex flex-col gap-2 border rounded bg-gray-50 h-[300px] p-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
				{listOfEntities.map((entity, index) => (
					<div
						key={index}
						onClick={() => setSelectedEntity(entity.relatedToEntity)}
						className={`p-2 border rounded cursor-pointer 
            ${selectedEntity === entity.relatedToEntity ? 'bg-blue-100' : ''}`}
					>
						{entity.relatedToEntity}
					</div>
				))}
			</div>
		</div>
	);
};

export default EntityList;
