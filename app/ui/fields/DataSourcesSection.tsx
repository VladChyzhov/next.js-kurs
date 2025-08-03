import React from 'react';
import { Upload, FileText, Link, Archive, Camera } from 'lucide-react';
import { useFileUpload } from '@/lib/useFileUpload';
import FileGrid from './FileGrid';
import LinkedInUrlInput from './LinkedInUrlInput';
import Toast from './Toast';
import ShakeAnimation from './ShakeAnimation';
import { InfoTooltip } from './Tooltip';
import { FILE_TYPES } from '@/lib/validateFile';

export default function DataSourcesSection() {
  const {
    files,
    errors,
    toasts,
    uploadFile,
    uploadEducationDoc,
    removeEducationDoc,
    updateLinkedInUrl,
    removeFile,
    replaceFile,
    removeToast,
    hasAnyFiles,
    hasLinkedInUrl
  } = useFileUpload();

  // Функции для работы с файлами
  const handleReplaceFile = (fileId: string) => {
    const fileType = fileId.split('-')[0] as 'resume' | 'coverLetter' | 'linkedinArchive' | 'profilePhoto';
    replaceFile(fileType);
  };

  const handleDeleteFile = (fileId: string) => {
    const fileType = fileId.split('-')[0] as keyof typeof files;
    removeFile(fileType);
  };

  const handleReplaceEducationDoc = (fileId: string) => {
    // Для education docs просто удаляем и позволяем загрузить новый
    removeEducationDoc(fileId);
  };

  const handleUploadResume = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = FILE_TYPES.resume.accept;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadFile(file, 'resume');
      }
    };
    input.click();
  };

  const handleUploadCoverLetter = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = FILE_TYPES.coverLetter.accept;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadFile(file, 'coverLetter');
      }
    };
    input.click();
  };

  const handleUploadLinkedInArchive = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = FILE_TYPES.linkedinArchive.accept;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadFile(file, 'linkedinArchive');
      }
    };
    input.click();
  };

  const handleUploadProfilePhoto = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = FILE_TYPES.profilePhoto.accept;
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadFile(file, 'profilePhoto');
      }
    };
    input.click();
  };

  const handleUploadEducationDoc = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.multiple = true;
    input.accept = FILE_TYPES.education.accept;
    input.onchange = (e) => {
      const files = Array.from((e.target as HTMLInputElement).files || []);
      files.forEach(file => uploadEducationDoc(file));
    };
    input.click();
  };

  return (
    <div className="space-y-6">
      {/* Заголовок */}
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-3">
          <Upload className="h-6 w-6 text-blue-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mb-2">Источники данных</h2>
        <p className="text-sm text-gray-600">
          Загрузите файлы или введите данные для автозаполнения профиля
        </p>
      </div>

      {/* Резюме */}
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-900">Резюме</h3>
          <InfoTooltip 
            formats="PDF, DOC, DOCX, TXT" 
            maxSize="5 МБ" 
            className="ml-1"
          />
        </div>
        
        <ShakeAnimation shouldShake={!!errors.resume}>
          <FileGrid
            files={files.resume ? [files.resume] : []}
            onReplace={handleReplaceFile}
            onDelete={handleDeleteFile}
            onUpload={handleUploadResume}
            uploadTitle="Загрузить резюме"
            uploadDescription="PDF, DOC, DOCX, TXT"
            maxFiles={1}
          />
        </ShakeAnimation>
      </div>

      {/* Персональное письмо */}
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-900">Персональное письмо</h3>
          <InfoTooltip 
            formats="PDF, DOC, DOCX, TXT" 
            maxSize="5 МБ" 
            className="ml-1"
          />
        </div>
        
        <ShakeAnimation shouldShake={!!errors.coverLetter}>
          <FileGrid
            files={files.coverLetter ? [files.coverLetter] : []}
            onReplace={handleReplaceFile}
            onDelete={handleDeleteFile}
            onUpload={handleUploadCoverLetter}
            uploadTitle="Загрузить письмо"
            uploadDescription="PDF, DOC, DOCX, TXT"
            maxFiles={1}
          />
        </ShakeAnimation>
      </div>

      {/* Профиль LinkedIn */}
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <Link className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-900">Профиль LinkedIn</h3>
        </div>
        
        <LinkedInUrlInput
          value={files.linkedinUrl}
          onChange={updateLinkedInUrl}
          error={errors.linkedinUrl}
        />
      </div>

      {/* Документы об образовании */}
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <FileText className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-900">
            Документы об образовании
            {files.educationDocs.length > 0 && (
              <span className="text-xs text-gray-500 ml-auto">
                {files.educationDocs.length}/15
              </span>
            )}
          </h3>
          <InfoTooltip 
            formats="PDF, JPG, PNG" 
            maxSize="10 МБ за файл" 
            className="ml-1"
          />
        </div>
        
        <ShakeAnimation shouldShake={!!errors.educationDocs}>
          <FileGrid
            files={files.educationDocs}
            onReplace={handleReplaceEducationDoc}
            onDelete={removeEducationDoc}
            onUpload={handleUploadEducationDoc}
            uploadTitle="Добавить документ"
            uploadDescription="PDF, JPG, PNG"
            maxFiles={15}
          />
        </ShakeAnimation>
      </div>

      {/* Архив LinkedIn */}
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <Archive className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-900">Архив LinkedIn</h3>
          <InfoTooltip 
            formats="ZIP, PDF" 
            maxSize="20 МБ" 
            className="ml-1"
          />
        </div>
        
        <ShakeAnimation shouldShake={!!errors.linkedinArchive}>
          <FileGrid
            files={files.linkedinArchive ? [files.linkedinArchive] : []}
            onReplace={handleReplaceFile}
            onDelete={handleDeleteFile}
            onUpload={handleUploadLinkedInArchive}
            uploadTitle="Загрузить архив"
            uploadDescription="ZIP, PDF"
            maxFiles={1}
          />
        </ShakeAnimation>
      </div>

      {/* Фотография профиля */}
      <div className="space-y-3">
        <div className="flex items-center gap-1">
          <Camera className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-medium text-gray-900">Фотография профиля</h3>
          <InfoTooltip 
            formats="JPG, PNG, GIF" 
            maxSize="5 МБ" 
            className="ml-1"
          />
        </div>
        
        <ShakeAnimation shouldShake={!!errors.profilePhoto}>
          <FileGrid
            files={files.profilePhoto ? [files.profilePhoto] : []}
            onReplace={handleReplaceFile}
            onDelete={handleDeleteFile}
            onUpload={handleUploadProfilePhoto}
            uploadTitle="Загрузить фото"
            uploadDescription="JPG, PNG, GIF"
            maxFiles={1}
            isProfilePhoto={true}
          />
        </ShakeAnimation>
      </div>

      {/* Кнопка заполнения профиля */}
      {(hasAnyFiles || hasLinkedInUrl) && (
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="text-center">
            <button
              type="button"
              disabled
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              📥 Заполнить профиль на основании загруженных файлов
            </button>
            <p className="text-xs text-blue-600 mt-2">
              Функция парсинга файлов будет доступна в ближайшее время
            </p>
          </div>
        </div>
      )}

      {/* Toast уведомления */}
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
} 