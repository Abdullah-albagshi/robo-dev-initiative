import AttributesType from './AttributesType';
import React from 'react';
import {
  useDynamicForm,
} from '../context/DynamicFormContext';

const DynamicSchemaForm: React.FC = () => {
  const {
    handleAttributeChange,
    newAttribute,
    setNewAttribute,
    addAttributeToSelectedProject,
    selectedProject
  } = useDynamicForm();


  return (
    <div className='flex flex-[2] gap-4 p-4'>
      <div className="flex-1">
        <h3 className='mb-2 text-xl font-semibold'>Add New Attribute</h3>
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
            disabled={!selectedProject}
            className='px-4 py-2 text-white bg-blue-500 rounded disabled:opacity-50'
          >
            Add Attribute
          </button>
        </div>
      </div>
      <div className="flex flex-col flex-1 gap-4">
        <h1 className='mb-2 text-xl font-semibold'>
          New Attribute
        </h1>
        <pre className='p-2 mt-4 bg-gray-100 rounded'>
          {JSON.stringify(newAttribute, null, 2)}
        </pre>
      </div>
    </div>

  );
};

export default DynamicSchemaForm;
