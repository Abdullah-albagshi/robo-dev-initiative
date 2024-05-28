import { DynamicFormProvider } from './context/DynamicFormContext';
import GeneratedSchema from './components/GeneratedSchema';
import ProjectList from './components/ProjectList';
import React from 'react';
import EntityList from './components/EntityList';
import ListOfAttributes from './components/ListOfAttributes';
import SchemaReader from './components/SchemaReader';

const App: React.FC = () => {
	return (
		<div className='container mx-auto'>
			<DynamicFormProvider>
				<div className='p-4 flex justify-between items-center'>
					<h1 className='mt-4 mb-8 text-4xl font-bold text-center'>
						Robo Dev Initiative - Dynamic Form
					</h1>
					<SchemaReader />
				</div>

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
