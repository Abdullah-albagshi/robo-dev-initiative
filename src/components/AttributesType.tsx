// import { useDynamicForm } from './context/DynamicFormContext';

import { useDynamicForm } from "../context/DynamicFormContext";
import Select from 'react-select';

const AttributesType = () => {
	const { entities, handleTypeChange,newAttribute } = useDynamicForm();

	const regularTypes = [
		{
			label: 'String',
			value: 'String',
		},
		{
			label: 'Float',
			value: 'Float',
		},
		{
			label: 'Integer',
			value: 'Integer',
		},
		{
			label: 'Double',
			value: 'Double',
		},
		{
			label: 'Boolean',
			value: 'Boolean',
		},
	];

	const typesFromEntities = entities.map((entity) => {
		return {
			label: `${entity.relatedToProject}.${entity.relatedToEntity}`,
			value: entity.relatedToEntity,
		};
	});

	const types = [...regularTypes, ...typesFromEntities];
  // const [selectedOption, setSelectedOption] = useState<any>();

  const selectedOption = newAttribute?.type as any;
  
	return (
      <Select
        defaultValue={selectedOption}
        onChange={(e) => handleTypeChange(e.value)}
        options={types}
      />
	);
};

export default AttributesType;
