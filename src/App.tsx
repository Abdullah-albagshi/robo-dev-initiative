import { DynamicFormProvider } from './context/DynamicFormContext';
import GeneratedSchema from './components/GeneratedSchema';
import ProjectList from './components/ProjectList';
import React from 'react';
import EntityList from './components/EntityList';
import ListOfAttributes from './components/ListOfAttributes';

const App: React.FC = () => {
	return (
		<div className='container mx-auto'>
			<div className='p-4 flex justify-between items-center'>
				<h1 className='mt-4 mb-8 text-4xl font-bold text-center'>
					Robo Dev Initiative - Dynamic Form
				</h1>
				<button className='px-4 py-2 mb-4 text-white bg-green-500 rounded h-10'>
					Load Schema
				</button>
			</div>
			<DynamicFormProvider>
				<div className='flex gap-4'>
					<div className='flex-[2]'>
						<div className='flex justify-start gap-2 p-4'>
							<ProjectList />
							<EntityList />
							<ListOfAttributes />
						</div>
						<GeneratedSchema />
					</div>
				</div>
			</DynamicFormProvider>
		</div>
	);
};

export default App;
