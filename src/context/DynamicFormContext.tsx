// DynamicFormContext.tsx

import React from 'react';

interface Attribute {
	name: string;
	type: string;
	array: boolean;
	skipInDomain: boolean;
	serializeAs: string | null;
	partialReference?: string[];
}

interface Entity {
	id: string;
	relatedToProject: string;
	relatedToEntity: string;
	attributes: Attribute[];
}

interface DynamicFormContextType {
	entities: Entity[];
	newEntity: Partial<Entity>;
	newAttribute: Partial<Attribute>;
	handleEntityChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleAttributeChange: (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => void;
	setNewAttribute: React.Dispatch<React.SetStateAction<Partial<Attribute>>>;
	selectedProject: string;
	setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
  selectedEntity: string
  setSelectedEntity: React.Dispatch<React.SetStateAction<string>>;
	createNewProject: () => void;
  createNewEntity: () => void;
	addAttributeToSelectedProject: () => void;
  setNewEntity: React.Dispatch<React.SetStateAction<Partial<Entity>>>;
  projects: string[];
  deleteAttribute: (index: number) => void;
  handleTypeChange: (value: string) => void;
}

const DynamicFormContext = React.createContext<DynamicFormContextType | null>(
	null
);

export const DynamicFormProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [selectedProject, setSelectedProject] = React.useState<string>('');
  const [selectedEntity, setSelectedEntity] = React.useState<string>('');

  const [projects, setProjects] = React.useState<string[]>([]);
	const [entities, setEntities] = React.useState<Entity[]>([]);
	const [newEntity, setNewEntity] = React.useState<Partial<Entity>>({
		id: '',
		relatedToProject: '',
		relatedToEntity: '',
		attributes: [],
	});
	const [newAttribute, setNewAttribute] = React.useState<Partial<Attribute>>({
		name: '',
		type: '',
		array: false,
		skipInDomain: false,
		serializeAs: null,
		partialReference: [],
	});

	const createNewProject = () => {
    const newProject = newEntity.relatedToProject;
    // check if project already exists
    if (projects.includes(newProject || '')) {
      return;
    }
    // add new project to projects
    setProjects((prev) => [...prev, newProject || '']);
    // reset newEntity
    setNewEntity((prev) => ({ ...prev, relatedToProject: '' }));
    // set selected project if no project is selected
    if (!selectedProject) {
      setSelectedProject(newProject || '');
    }
	};

  const createNewEntity = () => {
    // check if project is selected
    if (!selectedProject) {
      return;
    }
    // create new entity with selected project
    const newEntityWithProject = {
      ...newEntity,
      relatedToProject: selectedProject,
    };
    setEntities((prev) => [...prev, newEntityWithProject as Entity]);

    // reset newEntity
    setNewEntity((prev) => ({ ...prev, relatedToEntity: '' }));
    // set selected entity if no entity is selected
    if (!selectedEntity) {
      setSelectedEntity(newEntity.relatedToEntity || '');
    }
  }

	const addAttributeToSelectedProject = () => {
    const selectedEntityAndProject = entities.find(
      (entity) => entity.relatedToProject === selectedProject && entity.relatedToEntity === selectedEntity
    );
    if (!selectedEntityAndProject) {
      return;
    }
    const attr = selectedEntityAndProject.attributes;
    const newAttr = [...attr, newAttribute] as Attribute[];

    const updatedEntity = {
      ...selectedEntityAndProject,
      attributes: newAttr,
    };

    const updatedEntities = entities.map((entity) =>
      entity.relatedToProject === selectedProject && entity.relatedToEntity === selectedEntity
        ? updatedEntity
        : entity
    );

    setEntities(updatedEntities);

    // reset newAttribute
    setNewAttribute({
      name: '',
      type: '',
      array: false,
      skipInDomain: false,
      serializeAs: null,
      partialReference: [],
    });
	};

  const deleteAttribute = (index: number) => {
    const selectedEntityAttributes = entities.find(
      (entity) =>
        entity.relatedToProject === selectedProject &&
        entity.relatedToEntity === selectedEntity
    )?.attributes;
  
    const updatedAttributes = selectedEntityAttributes?.filter((_, i) => i !== index);
    const updatedEntity = {
      ...entities.find(
        (entity) =>
          entity.relatedToProject === selectedProject &&
          entity.relatedToEntity === selectedEntity
      ),
      attributes: updatedAttributes,
    };

    const updatedEntities = entities.map((entity) =>
      entity.relatedToProject === selectedProject &&
      entity.relatedToEntity === selectedEntity
        ? updatedEntity
        : entity
    ) as Entity[];

    setEntities(updatedEntities);
  }

	const handleEntityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewEntity((prev) => ({ ...prev, [name]: value }));
	};

	const handleAttributeChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
		>
	) => {
		const { name, value, type, checked } = e.target as HTMLInputElement;
		setNewAttribute((prev) => ({
			...prev,
			[name]: type === 'checkbox' ? checked : value,
		}));
	};

  const handleTypeChange = (value: string) => {
    setNewAttribute((prev) => ({
      ...prev,
      type: value,
    }));
  }


	return (
		<DynamicFormContext.Provider
			value={{
        projects,
				createNewProject,
				addAttributeToSelectedProject,
				entities,
				newEntity,
				newAttribute,
				handleEntityChange,
				handleAttributeChange,
				setNewAttribute,
				selectedProject,
				setSelectedProject,
        selectedEntity,
        setSelectedEntity,
        createNewEntity,
        setNewEntity,
        deleteAttribute,
        handleTypeChange
			}}
		>
			{children}
		</DynamicFormContext.Provider>
	);
};

export const useDynamicForm = () => {
	const context = React.useContext(DynamicFormContext);
	if (!context) {
		throw new Error('useDynamicForm must be used within a DynamicFormProvider');
	}
	return context;
};
