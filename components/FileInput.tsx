
import React, { useState, useRef } from 'react';

interface FileInputProps {
  id: string;
  label: string;
  onFileChange: (file: File | null) => void;
}

const FileInput: React.FC<FileInputProps> = ({ id, label, onFileChange }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
    if (file) {
      setFileName(file.name);
      setPreview(URL.createObjectURL(file));
    } else {
      setFileName(null);
      setPreview(null);
    }
  };

  const handleClear = () => {
    onFileChange(null);
    setFileName(null);
    setPreview(null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  }

  return (
    <div>
      <label className="block text-sm font-medium text-gray-300 mb-2">{label}</label>
      <div className="flex items-center space-x-4">
        <label
          htmlFor={id}
          className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Choose File
        </label>
        <input
          id={id}
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          className="hidden"
          accept="image/png, image/jpeg, image/webp"
        />
        {fileName && (
          <div className="flex items-center space-x-2 text-sm text-gray-400">
            {preview && <img src={preview} alt="logo preview" className="w-8 h-8 rounded-full object-cover"/>}
            <span>{fileName}</span>
            <button onClick={handleClear} className="text-red-500 hover:text-red-400 text-xl">&times;</button>
          </div>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1">Optional. PNG, JPG, or WEBP.</p>
    </div>
  );
};

export default FileInput;
