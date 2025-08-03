import React from 'react';
import { z } from 'zod';
import { formatFileSize, getFileIcon } from '@/lib/validateFile';

// Zod схема для файла в превью
export const filePreviewSchema = z.object({
  name: z.string(),
  size: z.number(),
  type: z.string(),
  uploadedAt: z.date(),
  preview: z.string().optional(),
});

export type FilePreviewData = z.infer<typeof filePreviewSchema>;

interface FilePreviewProps {
  file: FilePreviewData;
  className?: string;
}

export default function FilePreview({ file, className = '' }: FilePreviewProps) {
  const isImage = file.type.startsWith('image/');
  const isPdf = file.type === 'application/pdf';
  
  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-3 ${className}`}>
      <div className="flex items-start gap-3">
        {/* Preview */}
        <div className="flex-shrink-0">
          {isImage && file.preview ? (
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
              <img
                src={file.preview}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : isPdf ? (
            <div className="w-16 h-16 rounded-lg bg-red-100 flex items-center justify-center">
              <span className="text-2xl">📄</span>
            </div>
          ) : (
            <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center">
              <span className="text-2xl">{getFileIcon(file.name)}</span>
            </div>
          )}
        </div>

        {/* File info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 truncate">
            {file.name}
          </h4>
          
          <div className="flex items-center gap-2 mt-1 text-xs text-gray-500">
            <span>{formatFileSize(file.size)}</span>
            <span>•</span>
            <span>{formatDate(file.uploadedAt)}</span>
          </div>
          
          {isPdf && (
            <p className="text-xs text-gray-400 mt-1">
              PDF документ • Первая страница
            </p>
          )}
          
          {!isImage && !isPdf && (
            <p className="text-xs text-gray-400 mt-1">
              {file.type || 'Неизвестный тип файла'}
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
} 