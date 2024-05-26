import { useDynamicForm } from './context/DynamicFormContext'

const GeneratedSchema = () => {
  const { entities } = useDynamicForm()
  return (
    <div className="">
      <h2 className='mb-2 text-2xl font-bold'>Generated Schema</h2>
      <pre className='p-4 bg-gray-100 rounded'>
        {JSON.stringify(entities, null, 2)}
      </pre>
    </div>
  )
}

export default GeneratedSchema