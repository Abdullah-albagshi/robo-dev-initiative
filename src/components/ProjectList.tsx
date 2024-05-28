import AutoCompleteInput from './AutoSuggestComponent';
import { useDynamicForm } from '../context/DynamicFormContext';

const ProjectList = () => {
	const {
		newEntity,
		createNewProject,
		projects,
		setSelectedProject,
		selectedProject,
    setSelectedEntity,
	} = useDynamicForm();

	const projectExists = projects.includes(newEntity.relatedToProject || '');

	return (
		<div className='flex-1 max-w-[400px]'>
			<h2 className='mb-4 text-2xl font-bold'>Add New Project</h2>
			<div className='mb-4'>
				<label className='block mb-2'>
					Related to Project:
					<AutoCompleteInput />
				</label>
				<button
					onClick={createNewProject}
					disabled={!newEntity.relatedToProject || projectExists}
					className='px-4 py-2 mb-4 text-white bg-green-500 rounded disabled:opacity-50'
				>
					Create New Project
				</button>
				{projectExists && (
					<div className='text-red-500'>Project already exists</div>
				)}
			</div>
			{/*  list of projects with entity name */}
			<h2 className='mb-2 text-2xl font-bold'>List of Projects</h2>
			<div className='flex flex-col gap-2 border rounded bg-gray-50 h-[300px] p-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
				{projects.map((project, index) => (
					<div
						key={index}
						onClick={() => {
              setSelectedProject(project)
              setSelectedEntity('')
            }}
						className={`p-2 border rounded cursor-pointer 
            ${selectedProject === project ? 'bg-blue-100' : ''}`}
					>
						{project}
					</div>
				))}
			</div>
		</div>
	);
};

export default ProjectList;
