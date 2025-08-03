import React from 'react';
import FileCard from './FileCard';
import UploadPlaceholder from './UploadPlaceholder';
import { UploadedFile } from '@/lib/useFileUpload';

interface FileGridProps {
  files: UploadedFile[];
  onReplace: (fileId: string) => void;
  onDelete: (fileId: string) => void;
  onUpload: () => void;
  uploadTitle: string;
  uploadDescription: string;
  maxFiles?: number;
  className?: string;
  isProfilePhoto?: boolean;
}

export default function FileGrid({ 
  files, 
  onReplace, 
  onDelete, 
  onUpload, 
  uploadTitle, 
  uploadDescription, 
  maxFiles = 1,
  className = '',
  isProfilePhoto = false
}: FileGridProps) {
  const canUpload = files.length < maxFiles;

  return (
    <div className={`grid grid-cols-[repeat(auto-fill,minmax(140px,1fr))] gap-4 ${className}`}>
      {/* Existing files */}
      {files.map((file) => (
        <FileCard
          key={file.id}
          file={file}
          onReplace={() => onReplace(file.id)}
          onDelete={() => onDelete(file.id)}
          isMulti={maxFiles > 1}
          isProfilePhoto={isProfilePhoto}
        />
      ))}
      
      {/* Upload placeholder */}
      {canUpload && (
        <UploadPlaceholder
          title={uploadTitle}
          description={uploadDescription}
          onUpload={onUpload}
        />
      )}
    </div>
  );
} 