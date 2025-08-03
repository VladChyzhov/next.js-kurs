import React from 'react';
import { X } from 'lucide-react';
import { formatFileSize, getFileIcon } from '@/lib/validateFile';
import { type UploadedFile } from '@/lib/useFileUpload';

interface EducationDocsListProps {
  docs: UploadedFile[];
  onRemove: (docId: string) => void;
  className?: string;
}

export default function EducationDocsList({ docs, onRemove, className = '' }: EducationDocsListProps) {
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (docs.length === 0) {
    return null;
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {docs.map((doc) => {
          const isImage = doc.type.startsWith('image/');
          const isPdf = doc.type === 'application/pdf';
          
          return (
            <div key={doc.id} className="bg-white rounded-lg border border-gray-200 p-3 relative group">
              {/* Remove button */}
              <button
                onClick={() => onRemove(doc.id)}
                className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                aria-label={`Удалить ${doc.name}`}
              >
                <X className="h-4 w-4" />
              </button>

              <div className="flex items-start gap-3">
                {/* Preview */}
                <div className="flex-shrink-0">
                  {isImage && doc.preview ? (
                    <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                      <img
                        src={doc.preview}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : isPdf ? (
                    <div className="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center">
                      <span className="text-2xl">📄</span>
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
                      <span className="text-2xl">{getFileIcon(doc.name)}</span>
                    </div>
                  )}
                </div>

                {/* File info */}
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-medium text-gray-900 truncate">
                    {doc.name}
                  </h4>
                  
                  <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
                    <span>{formatFileSize(doc.size)}</span>
                    <span>•</span>
                    <span>{formatDate(doc.uploadedAt)}</span>
                  </div>
                  
                  {isPdf && (
                    <p className="text-xs text-gray-400 mt-1">
                      PDF документ • Первая страница
                    </p>
                  )}
                  
                  {!isImage && !isPdf && (
                    <p className="text-xs text-gray-400 mt-1">
                      {doc.type || 'Неизвестный тип файла'}
                    </p>
                  )}
                </div>

                {/* Status indicator */}
                <div className="flex-shrink-0">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
} 