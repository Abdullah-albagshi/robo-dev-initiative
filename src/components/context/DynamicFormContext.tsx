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
	createNewProject: () => void;
	addAttributeToSelectedProject: () => void;
  setNewEntity: React.Dispatch<React.SetStateAction<Partial<Entity>>>;
}

const DynamicFormContext = React.createContext<DynamicFormContextType | null>(
	null
);

export const DynamicFormProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [selectedProject, setSelectedProject] = React.useState<string>('');

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
		setEntities((prev) => [
			...prev,
			{
				...newEntity,
				id: `${newEntity?.relatedToProject}-${newEntity?.relatedToEntity}-${entities?.length}`,
			} as Entity,
		]);
    // reset newEntity
    setNewEntity({
      id: '',
      relatedToProject: '',
      relatedToEntity: '',
      attributes: [],
    });

    // if no project is selected, select the newly created project
    if (!selectedProject) {
      setSelectedProject(`${newEntity?.relatedToProject}-${newEntity?.relatedToEntity}-${entities?.length}`);
    }
	};

	const addAttributeToSelectedProject = () => {
		const selectedProjectEntity = entities.find(
			(entity) => entity.id === selectedProject
		);
		if (selectedProjectEntity) {
			const newAttributes = [
				...selectedProjectEntity.attributes,
				newAttribute as Attribute,
			];
			const updatedEntity = {
				...selectedProjectEntity,
				attributes: newAttributes,
			};
			setEntities((prev) => [
				...prev.filter((entity) => entity.id !== selectedProject),
				updatedEntity,
			]);
		}
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


	return (
		<DynamicFormContext.Provider
			value={{
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
        setNewEntity
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
