
import React from 'react';

interface TextInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder: string;
  type?: 'text' | 'textarea';
  required?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ id, label, value, onChange, placeholder, type = 'text', required = false }) => {
  const commonClasses = "w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-200 text-gray-200 placeholder-gray-500";
  
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-300 mb-2">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={3}
          className={commonClasses}
        />
      ) : (
        <input
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className={commonClasses}
        />
      )}
    </div>
  );
};

export default TextInput;
