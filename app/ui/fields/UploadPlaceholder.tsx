import React from 'react';
import { Upload } from 'lucide-react';

interface UploadPlaceholderProps {
  title: string;
  description: string;
  onUpload: () => void;
  className?: string;
}

export default function UploadPlaceholder({ title, description, onUpload, className = '' }: UploadPlaceholderProps) {
  return (
    <div 
      className={`relative bg-white border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors cursor-pointer ${className}`}
      onClick={onUpload}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onUpload();
        }
      }}
      aria-label={`Загрузить ${title}`}
    >
      <div className="h-32 flex flex-col items-center justify-center p-4">
        <Upload className="h-8 w-8 text-gray-400 mb-2" />
        <p className="text-xs font-medium text-gray-600 text-center mb-1">
          {title}
        </p>
        <p className="text-xs text-gray-500 text-center">
          {description}
        </p>
      </div>
    </div>
  );
} 