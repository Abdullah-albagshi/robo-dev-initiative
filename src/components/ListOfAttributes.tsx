import AttributesType from './AttributesType';
import React from 'react';
import { useDynamicForm } from '../context/DynamicFormContext';

const ListOfAttributes: React.FC = () => {
	const {
		handleAttributeChange,
		newAttribute,
		setNewAttribute,
		addAttributeToSelectedProject,
		selectedProject,
		selectedEntity,
		entities,
		deleteAttribute,
	} = useDynamicForm();

	const selectedEntityAttributes = entities.find(
		(entity) =>
			entity.relatedToProject === selectedProject &&
			entity.relatedToEntity === selectedEntity
	)?.attributes;

	return (
		<div className='flex flex-[2] gap-4 '>
			<div className='flex-1'>
        <h2 className='mb-4 text-2xl font-bold'>Add New Attribute</h2>
				<div className='mb-4'>
					{/* add label  */}
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						placeholder='Attribute Name'
						value={newAttribute.name}
						onChange={handleAttributeChange}
						className='block w-full p-2 mb-2 border rounded'
					/>
					<label htmlFor='type'>Type</label>
					<AttributesType />
					<label className='block mb-2'>
						<input
							type='checkbox'
							name='array'
							checked={newAttribute.array}
							onChange={handleAttributeChange}
							className='mr-2'
						/>
						Array
					</label>
					<label className='block mb-2'>
						<input
							type='checkbox'
							name='skipInDomain'
							checked={newAttribute.skipInDomain}
							onChange={handleAttributeChange}
							className='mr-2'
						/>
						Skip in Domain
					</label>
					<input
						type='text'
						name='serializeAs'
						placeholder='Serialize As'
						value={newAttribute.serializeAs || ''}
						onChange={handleAttributeChange}
						className='block w-full p-2 mb-2 border rounded'
					/>
					{newAttribute.array && newAttribute.partialReference && (
						<textarea
							name='partialReference'
							placeholder='Partial Reference (comma separated)'
							value={newAttribute.partialReference?.join(',') || ''}
							onChange={(e) =>
								setNewAttribute((prev) => ({
									...prev,
									partialReference: e.target.value
										.split(',')
										.map((item) => item.trim()),
								}))
							}
							className='block w-full p-2 mb-2 border rounded'
						></textarea>
					)}
					<button
						onClick={addAttributeToSelectedProject}
						disabled={!selectedProject || !selectedEntity}
						className='px-4 py-2 text-white bg-green-500 rounded disabled:opacity-50'
					>
						Add Attribute
					</button>
				</div>
			</div>
			<div className='flex-1'>
				<h2 className='mb-2 text-2xl font-bold'>List of Attributes</h2>
				<div className='flex flex-col gap-2 border rounded bg-gray-50 h-[300px] p-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100'>
					{selectedEntityAttributes?.map((attr, index) => (
						<div className='flex' key={index}>
							<div key={index} className={`p-2 border rounded flex-1`}>
								{attr.name}:{attr.type}
							</div>
              <button
                onClick={() => deleteAttribute(index)}
                className='px-4 py-2 text-white bg-red-500 rounded'
              >
                Delete
              </button>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default ListOfAttributes;
