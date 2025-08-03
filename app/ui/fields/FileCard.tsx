import React, { useState } from 'react';
import { FileText, ArrowUpCircle, Trash2, MoreVertical } from 'lucide-react';
import { formatFileSize } from '@/lib/validateFile';

interface FileCardProps {
  file: {
    id: string;
    name: string;
    size: number;
    type: string;
    preview?: string;
    status: 'uploading' | 'success' | 'error';
    file?: File;
  };
  onReplace: () => void;
  onDelete: () => void;
  isMulti?: boolean;
  className?: string;
  isProfilePhoto?: boolean;
}

export default function FileCard({ file, onReplace, onDelete, isMulti = false, className = '', isProfilePhoto = false }: FileCardProps) {
  const [showMenu, setShowMenu] = useState(false);

  const getFileIcon = () => {
    if (file.type === 'application/pdf') return '📄';
    if (file.type.startsWith('image/')) return '🖼️';
    if (file.type.includes('word') || file.type.includes('document')) return '📝';
    if (file.type.includes('zip') || file.type.includes('archive')) return '📦';
    return '📄';
  };

  return (
    <div className={`relative bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 p-3 ${className}`}>
      {/* Status dot */}
      <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></div>
      
      {/* File info - упрощенная версия */}
      <div className="flex items-center gap-3">
        {/* Превью только для фото профиля */}
        {isProfilePhoto && file.preview ? (
          <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
            <img 
              src={file.preview} 
              alt={file.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <span className="text-2xl flex-shrink-0">{getFileIcon()}</span>
        )}
        
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 truncate" title={file.name}>
            {file.name}
          </p>
          <p className="text-xs text-gray-500">
            {formatFileSize(file.size)}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute bottom-2 right-2 flex gap-1">
        <button
          onClick={onReplace}
          className="w-6 h-6 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          title="Заменить"
          aria-label="Заменить файл"
        >
          <ArrowUpCircle className="w-4 h-4 text-gray-600" />
        </button>
        <button
          onClick={onDelete}
          className="w-6 h-6 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          title="Удалить"
          aria-label="Удалить файл"
        >
          <Trash2 className="w-4 h-4 text-red-500" />
        </button>
      </div>

      {/* Mobile menu (hidden on desktop) */}
      <div className="sm:hidden absolute top-2 right-2">
        <button
          onClick={() => setShowMenu(!showMenu)}
          className="w-6 h-6 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-white transition-colors shadow-sm"
          title="Действия"
          aria-label="Показать действия"
        >
          <MoreVertical className="w-4 h-4 text-gray-600" />
        </button>
        
        {showMenu && (
          <div className="absolute top-6 right-0 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-10">
            <button
              onClick={() => {
                setShowMenu(false);
                onReplace();
              }}
              className="w-full px-3 py-1 text-xs text-gray-700 hover:bg-gray-100 flex items-center gap-2"
            >
              <ArrowUpCircle className="w-3 h-3" />
              Заменить
            </button>
            <button
              onClick={() => {
                setShowMenu(false);
                onDelete();
              }}
              className="w-full px-3 py-1 text-xs text-red-600 hover:bg-red-50 flex items-center gap-2"
            >
              <Trash2 className="w-3 h-3" />
              Удалить
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 