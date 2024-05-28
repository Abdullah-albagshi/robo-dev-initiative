import 'tailwindcss/tailwind.css';

import Autosuggest from 'react-autosuggest';
import { useDynamicForm } from '../context/DynamicFormContext';
import { useState } from 'react';

const AutoCompleteInput = () => {
  const { projects, setNewEntity, newEntity } = useDynamicForm();

  const value = newEntity.relatedToProject || '';

  const setValue = (value: string) => {
    setNewEntity((prev) => ({ ...prev, relatedToProject: value }));
  }

  const suggestions = projects.map(item => ({
    name: item,
  }));

  // Function to calculate suggestions for any given input value.
  const getSuggestions = (value: string) => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0 ? [] : suggestions.filter(suggestion =>
      suggestion.name.toLowerCase().slice(0, inputLength) === inputValue
    );
  };

  // Function to get the suggestion value for a given suggestion.
  const getSuggestionValue = (suggestion: { name: string }) => suggestion.name;

  // Function to render suggestions.
  const renderSuggestion = (suggestion: { name: string }) => (
    <div className="px-4 py-2 hover:bg-gray-200">
      {suggestion.name}
    </div>
  );

  const [filteredSuggestions, setFilteredSuggestions] = useState<any[]>([]);


  const onSuggestionsFetchRequested = ({ value }: { value: string }) => {
    const filteredSuggestions = getSuggestions(value);
    setFilteredSuggestions(filteredSuggestions);
  };

  const onSuggestionsClearRequested = () => {
    setFilteredSuggestions([]);
  };

  const inputProps = {
    placeholder: 'Type a project name',
    value,
    className: 'w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
  };

  return (
    <Autosuggest
      suggestions={filteredSuggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={{
        ...inputProps,
        onChange(event, params) {
          setValue(params.newValue);
        },
      }}
    />
  );
};

export default AutoCompleteInput;
