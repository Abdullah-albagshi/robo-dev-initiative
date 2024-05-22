import React from 'react';
import DynamicForm from './components/DynamicForm';
import { DynamicFormProvider } from './components/context/DynamicFormContext';


const App: React.FC = () => {
	return (
		<div>
			<DynamicFormProvider>
				<DynamicForm />
			</DynamicFormProvider>
		</div>
	);
};

export default App;
