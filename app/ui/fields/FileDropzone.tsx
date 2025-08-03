import React, { useState, useRef, useCallback } from 'react';
import { Upload, X, CheckCircle, AlertCircle } from 'lucide-react';

interface FileDropzoneProps {
  onFileSelect?: (file: File) => void;
  onMultipleFileSelect?: (files: File[]) => void;
  accept: string;
  maxSize: number;
  maxFiles?: number;
  currentFileCount?: number;
  title: string;
  description: string;
  isUploaded?: boolean;
  onRemove?: () => void;
  onReplace?: () => void;
  error?: string;
  className?: string;
  isMultiFile?: boolean;
}

export default function FileDropzone({
  onFileSelect,
  onMultipleFileSelect,
  accept,
  maxSize,
  maxFiles,
  currentFileCount = 0,
  title,
  description,
  isUploaded = false,
  onRemove,
  onReplace,
  error,
  className = '',
  isMultiFile = false
}: FileDropzoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      if (isMultiFile && onMultipleFileSelect) {
        // Проверяем лимит файлов для multi-file
        if (maxFiles && currentFileCount + files.length > maxFiles) {
          // Показываем ошибку о превышении лимита
          return;
        }
        handleMultipleFiles(files);
      } else {
        handleFile(files[0]);
      }
    }
  }, [isMultiFile, onMultipleFileSelect, maxFiles, currentFileCount]);

  const handleFile = useCallback(async (file: File) => {
    if (!onFileSelect) return;
    
    setIsUploading(true);
    
    try {
      await onFileSelect(file);
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onFileSelect]);

  const handleMultipleFiles = useCallback(async (files: File[]) => {
    setIsUploading(true);
    
    try {
      if (onMultipleFileSelect) {
        await onMultipleFileSelect(files);
      }
    } catch (error) {
      console.error('Error uploading files:', error);
    } finally {
      setIsUploading(false);
    }
  }, [onMultipleFileSelect]);

  const handleClick = useCallback(() => {
    if (isUploaded && onReplace) {
      onReplace();
    } else {
      fileInputRef.current?.click();
    }
  }, [isUploaded, onReplace]);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (selectedFiles.length > 0) {
      if (isMultiFile && onMultipleFileSelect) {
        // Проверяем лимит файлов для multi-file
        if (maxFiles && currentFileCount + selectedFiles.length > maxFiles) {
          // Показываем ошибку о превышении лимита
          return;
        }
        handleMultipleFiles(selectedFiles);
      } else {
        handleFile(selectedFiles[0]);
      }
    }
  }, [isMultiFile, onMultipleFileSelect, maxFiles, currentFileCount, handleMultipleFiles, handleFile]);

  const formatMaxSize = (bytes: number): string => {
    const mb = bytes / (1024 * 1024);
    return `${mb} МБ`;
  };

  const getFileCounterText = () => {
    if (isMultiFile && maxFiles) {
      return `${currentFileCount} из ${maxFiles}`;
    }
    return '';
  };

  return (
    <div className={`relative ${className}`}>
      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        multiple={isMultiFile}
        onChange={handleFileInputChange}
        className="hidden"
        aria-label={`Выбрать файл для ${title}`}
      />
      
             <div
         className={`
           relative border-2 border-dashed rounded-lg p-4 transition-all duration-200
           ${isDragOver 
             ? 'border-sky-400 bg-sky-50 ring-2 ring-sky-400 ring-opacity-50' 
             : 'border-gray-300 hover:border-gray-400'
           }
           ${error ? 'border-red-300 bg-red-50' : ''}
           ${isUploaded ? 'border-green-300 bg-green-50' : ''}
           ${isUploading ? 'opacity-75' : ''}
         `}
         onDragOver={handleDragOver}
         onDragLeave={handleDragLeave}
         onDrop={handleDrop}
         aria-label={`Загрузить ${title}`}
       >
                 {/* Progress bar */}
         {isUploading && (
           <div className="absolute inset-0 bg-white bg-opacity-75 rounded-lg flex items-center justify-center">
             <div className="w-full max-w-xs">
               <div className="bg-gray-200 rounded-full h-2">
                 <div className="bg-blue-500 h-2 rounded-full animate-pulse w-[60%]"></div>
               </div>
               <p className="text-xs text-gray-600 mt-2 text-center">Загрузка...</p>
             </div>
           </div>
         )}

        {/* Success overlay */}
        {isUploaded && !isUploading && (
          <div className="absolute inset-0 bg-green-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-500" />
          </div>
        )}

        {/* Error overlay */}
        {error && (
          <div className="absolute inset-0 bg-red-500 bg-opacity-10 rounded-lg flex items-center justify-center">
            <AlertCircle className="h-8 w-8 text-red-500" />
          </div>
        )}

                 <button
           type="button"
           onClick={handleClick}
           className="w-full text-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded"
           aria-label={`Загрузить ${title}`}
         >
           <div className="flex justify-center mb-2">
             {isUploaded ? (
               <CheckCircle className="h-8 w-8 text-green-500" />
             ) : error ? (
               <AlertCircle className="h-8 w-8 text-red-500" />
             ) : (
               <Upload className="h-8 w-8 text-gray-400" />
             )}
           </div>
           
           <h3 className="text-sm font-medium text-gray-900 mb-1">
             {title}
           </h3>
           
           <p className="text-xs text-gray-500 mb-2">
             {description}
           </p>
           
           {isMultiFile && maxFiles && (
             <p className="text-xs text-blue-600 mb-2 font-medium">
               {getFileCounterText()}
             </p>
           )}
           
           {!isUploaded && !error && (
             <p className="text-xs text-gray-400">
               Поддерживаемые форматы: {accept.split(',').join(', ')} • Макс. размер: {formatMaxSize(maxSize)}
             </p>
           )}
           
           {error && (
             <p className="text-xs text-red-500 mt-2">
               {error}
             </p>
           )}
         </button>

        {/* Actions */}
        {isUploaded && (
          <div className="absolute top-2 right-2 flex gap-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onReplace?.();
              }}
              className="p-1 text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Заменить файл"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove?.();
              }}
              className="p-1 text-gray-500 hover:text-red-500 transition-colors"
              aria-label="Удалить файл"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 