import { useDynamicForm } from './DynamicFormContext';

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
			name: 'Long',
			value: 'Long',
		},
		{
			name: 'Boolean',
			value: 'Boolean',
		},
	];

	const typesFromEntities = entities.map((entity) => {
		return {
			name: `${entity.relatedToEntity} / ${entity.relatedToProject}`,
			value: entity.relatedToEntity,
		};
	});

	const types = [...regularTypes, ...typesFromEntities];

	return (
		<select
			name='type'
			value={newAttribute.type}
			onChange={handleAttributeChange}
			className='block w-full mb-2 p-2 border rounded'
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
