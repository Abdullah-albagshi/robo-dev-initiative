import { useDynamicForm } from '../context/DynamicFormContext'

const GeneratedSchema = () => {
  const { entities } = useDynamicForm()
  return (
    <div className="p-4">
      <h2 className='mb-2 text-2xl font-bold'>Generated Schema</h2>
      {/* export as zip */}
      <button className='px-4 py-2 mb-4 text-white bg-green-500 rounded'>
        Export as Zip
      </button>
      {/* copy to clipboard */}
      <button className='px-4 py-2 mb-4 text-white bg-blue-500 rounded mx-2'
      onClick={() => {navigator.clipboard.writeText(JSON.stringify(entities, null, 2))}}>
        Copy to Clipboard
      </button>
      <pre className='p-4 bg-gray-100 rounded'>
        {JSON.stringify(entities, null, 2)}
      </pre>
    </div>
  )
}

export default GeneratedSchema