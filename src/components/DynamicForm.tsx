import React, { useState } from 'react';
import AttributesType from './context/AttributesType';
import {
	DynamicFormProvider,
	useDynamicForm,
} from './context/DynamicFormContext';


const DynamicSchemaForm: React.FC = () => {
	const {
		entities,
		handleAttributeChange,
		newAttribute,
		addAttribute,
		addEntity,
		handleEntityChange,
		newEntity,
    setNewAttribute,
	} = useDynamicForm();

	return (
			<div className='max-w-4xl mx-auto p-4'>
				<h2 className='text-2xl font-bold mb-4'>Add New Entity</h2>
				<div className='mb-4'>
					<label className='block mb-2'>
						Related to Project:
						<input
							type='text'
							name='relatedToProject'
							value={newEntity.relatedToProject}
							onChange={handleEntityChange}
							className='block w-full mt-1 p-2 border rounded'
						/>
					</label>
					<label className='block mb-2'>
						Related to Entity:
						<input
							type='text'
							name='relatedToEntity'
							value={newEntity.relatedToEntity}
							onChange={handleEntityChange}
							className='block w-full mt-1 p-2 border rounded'
						/>
					</label>
				</div>

				<h3 className='text-xl font-semibold mb-2'>Add New Attribute</h3>
				<div className='mb-4'>
					{/* add label  */}
					<label htmlFor='name'>Name</label>
					<input
						type='text'
						name='name'
						placeholder='Attribute Name'
						value={newAttribute.name}
						onChange={handleAttributeChange}
						className='block w-full mb-2 p-2 border rounded'
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
						className='block w-full mb-2 p-2 border rounded'
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
							className='block w-full mb-2 p-2 border rounded'
						></textarea>
					)}
					<button
						onClick={addAttribute}
						className='bg-blue-500 text-white px-4 py-2 rounded'
					>
						Add Attribute
					</button>
					<pre className='bg-gray-100 p-2 mt-4 rounded'>
						{JSON.stringify(newAttribute, null, 2)}
					</pre>
				</div>

				<button
					onClick={addEntity}
					className='bg-green-500 text-white px-4 py-2 rounded mb-4'
				>
					Add Entity
				</button>

				<h2 className='text-2xl font-bold mb-2'>Generated Schema</h2>
				<pre className='bg-gray-100 p-4 rounded'>
					{JSON.stringify(entities, null, 2)}
				</pre>
			</div>
	);
};

export default DynamicSchemaForm;
