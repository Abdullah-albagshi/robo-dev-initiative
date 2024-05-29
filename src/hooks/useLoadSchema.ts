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

	  const isValidEntityArray = (json: Entity[]) => {
    return Array.isArray(json) && json.every(isValidEntity);
  };

  const isValidEntity = (json: Entity)=> {
    return (
      typeof json.relatedToProject === 'string' &&
      typeof json.relatedToEntity === 'string' &&
      Array.isArray(json.attributes) &&
      isValidAttributes(json.attributes, json?.type)
    );
  };

  const isValidAttributes = (attr: Attribute[], projectType?: string) => {
    if (projectType === 'ENUM') {
      return attr.every(isValidEnumAttribute);
    } else {
      return attr.every(isValidAttribute);
    }
  };

  const isValidAttribute = (attr: Attribute) => {
    return (
      typeof attr.name === 'string' &&
      typeof attr.type === 'string'
      // You can add more checks here if needed
    );
  };

  const isValidEnumAttribute = (attr: Attribute) => {
    return (typeof attr.name === 'string');
  };

  const updateStateAfterFileUpload = (data: Entity[] ) => {
    // check if data is empty or is an array
    if (Object.keys(data).length === 0) {
      return;
    }
    if (!Array.isArray(data)) return;
    // set projects and make it a unique array
    const projects = Array.from(new Set(data.map((entity) => entity.relatedToProject)));
    setProjects(projects);
    // set entities
    setEntities(data);
  }

	return { handleFileChange };
};

export default useLoadSchema;