// useLoadSchema.ts

import { Attribute, Entity, useDynamicForm } from '../context/DynamicFormContext';

const useLoadSchema = () => {
	const { setProjects, setEntities } = useDynamicForm();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				try {
					const json = JSON.parse(e.target?.result as string);
					if (isValidEntityArray(json)) {
						updateStateAfterFileUpload(json);
					} else {
						alert('JSON structure is not valid.');
					}
				} catch (error) {
					alert('Invalid JSON file.');
				}
			};
			reader.readAsText(file);
		}
	};

	const isValidEntityArray = (json: any): json is Entity[] => {
		return Array.isArray(json) && json.every(isValidEntity);
	};

	const isValidEntity = (json: any): json is Entity => {
		return (
			typeof json.relatedToProject === 'string' &&
			typeof json.relatedToEntity === 'string' &&
			Array.isArray(json.attributes) &&
			json.attributes.every(isValidAttribute)
		);
	};

	const isValidAttribute = (attr: any): attr is Attribute => {
		return (
			typeof attr.name === 'string' &&
			typeof attr.type === 'string' 
      
			// && typeof attr.array === 'boolean' &&
			// typeof attr.skipInDomain === 'boolean' &&
			// (typeof attr.serializeAs === 'string' || attr.serializeAs === null) &&
			// (attr.partialReference === undefined ||
			// 	(Array.isArray(attr.partialReference) &&
			// 		attr.partialReference.every((ref: any) => typeof ref === 'string')))
		);
	};
  const updateStateAfterFileUpload = (data: Entity[] ) => {
    // check if data is empty or is an array
    if (Object.keys(data).length === 0) {
      return;
    }
    if (!Array.isArray(data)) return;
    // set projects
    const projects = data.map((entity) => entity.relatedToProject);
    setProjects(projects);
    // set entities
    setEntities(data);
  }

	return { handleFileChange };
};

export default useLoadSchema;