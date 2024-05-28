// import { useDynamicForm } from './context/DynamicFormContext';

import { useDynamicForm } from "../context/DynamicFormContext";

const AttributesType = () => {
	const { entities, handleAttributeChange, newAttribute } = useDynamicForm();

	const regularTypes = [
		{
			name: 'String',
			value: 'String',
		},
		{
			name: 'Float',
			value: 'Float',
		},
		{
			name: 'Integer',
			value: 'Integer',
		},
		{
			name: 'Double',
			value: 'Double',
		},
		{
			name: 'Boolean',
			value: 'Boolean',
		},
	];

	const typesFromEntities = entities.map((entity) => {
		return {
			name: `${entity.relatedToProject}.${entity.relatedToEntity}`,
			value: entity.relatedToEntity,
		};
	});

	const types = [...regularTypes, ...typesFromEntities];

	return (
		<select
			name='type'
			value={newAttribute.type}
			onChange={handleAttributeChange}
			className='block w-full p-2 mb-2 border rounded'
		>
			<option value=''>Select Type</option>
			{types.map((type) => (
				<option key={type.value} value={type.value}>
					{type.name}
				</option>
			))}
		</select>
	);
};

export default AttributesType;
