// DynamicFormContext.tsx

import React from 'react'

interface Attribute {
  name: string
  type: string
  array: boolean
  skipInDomain: boolean
  serializeAs: string | null
  partialReference?: string[]
}

interface Entity {
  relatedToProject: string
  relatedToEntity: string
  attributes: Attribute[]
}

interface DynamicFormContextType {
  entities: Entity[]
  newEntity: Partial<Entity>
  newAttribute: Partial<Attribute>
  handleEntityChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  handleAttributeChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void
  addAttribute: () => void
  addEntity: () => void
  setNewAttribute: React.Dispatch<React.SetStateAction<Partial<Attribute>>>
}

const DynamicFormContext = React.createContext<DynamicFormContextType | null>(null)



export const DynamicFormProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [entities, setEntities] = React.useState<Entity[]>([])
  const [newEntity, setNewEntity] = React.useState<Partial<Entity>>({
    relatedToProject: '',
    relatedToEntity: '',
    attributes: []
  })
  const [newAttribute, setNewAttribute] = React.useState<Partial<Attribute>>({
    name: '',
    type: '',
    array: false,
    skipInDomain: false,
    serializeAs: null,
    partialReference: []
  })

  const handleEntityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewEntity((prev) => ({ ...prev, [name]: value }))
  }

  const handleAttributeChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setNewAttribute((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const addAttribute = () => {
    setNewEntity((prev) => ({
      ...prev,
      attributes: [...(prev.attributes || []), newAttribute as Attribute]
    }))
    setNewAttribute({
      name: '',
      type: '',
      array: false,
      skipInDomain: false,
      serializeAs: null,
      partialReference: []
    })
  }

  const addEntity = () => {
    setEntities((prev) => [...prev, newEntity as Entity])
  }

  return (
    <DynamicFormContext.Provider value={{ entities, newEntity, newAttribute, handleEntityChange, handleAttributeChange, addAttribute, addEntity,setNewAttribute }}>
      {children}
    </DynamicFormContext.Provider>
  )
}

export const useDynamicForm = () => {
  const context = React.useContext(DynamicFormContext)
  if (!context) {
    throw new Error('useDynamicForm must be used within a DynamicFormProvider')
  }
  return context
}