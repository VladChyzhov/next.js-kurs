import { useState, useCallback } from 'react';
import { z } from 'zod';
import { validateFile, validateLinkedInUrl, formatFileSize, getFileIcon, type FileValidationResult } from './validateFile';

// Zod схемы для типов файлов
export const uploadedFileSchema = z.object({
  id: z.string(),
  file: z.instanceof(File).optional(),
  url: z.string().optional(),
  name: z.string(),
  size: z.number(),
  type: z.string(),
  uploadedAt: z.date(),
  preview: z.string().optional(),
  status: z.enum(['uploading', 'success', 'error']),
  error: z.string().optional(),
});

export const fileUploadStateSchema = z.object({
  resume: uploadedFileSchema.nullable(),
  coverLetter: uploadedFileSchema.nullable(),
  linkedinArchive: uploadedFileSchema.nullable(),
  linkedinUrl: z.string(),
  educationDocs: z.array(uploadedFileSchema),
  profilePhoto: uploadedFileSchema.nullable(),
});

// Типы, выведенные из Zod схем
export type UploadedFile = z.infer<typeof uploadedFileSchema>;
export type FileUploadState = z.infer<typeof fileUploadStateSchema>;

export function useFileUpload() {
  const [files, setFiles] = useState<FileUploadState>({
    resume: null,
    coverLetter: null,
    linkedinArchive: null,
    linkedinUrl: '',
    educationDocs: [],
    profilePhoto: null
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [toasts, setToasts] = useState<Array<{id: string; message: string; type: 'success' | 'error' | 'warning'}>>([]);

  const uploadFile = useCallback(async (file: File, type: 'resume' | 'coverLetter' | 'linkedinArchive' | 'profilePhoto') => {
    const validation = validateFile(file, type);
    
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, [type]: validation.error || 'Ошибка валидации' }));
      // Добавляем toast для ошибки
      const toastId = `error-${Date.now()}`;
      setToasts(prev => [...prev, { id: toastId, message: validation.error || 'Ошибка валидации', type: 'error' }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 5000);
      return;
    }

    // Проверяем, был ли уже файл (для показа toast о замене)
    const hadFile = files[type] !== null;
    const fileTypeNames = {
      resume: 'резюме',
      coverLetter: 'персональное письмо',
      linkedinArchive: 'архив LinkedIn',
      profilePhoto: 'фото профиля'
    };

    const uploadedFile: UploadedFile = {
      id: `${type}-${Date.now()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      status: 'uploading'
    };

    // Создаем превью для изображений
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles(prev => ({
          ...prev,
          [type]: {
            ...uploadedFile,
            preview: e.target?.result as string,
            status: 'success'
          }
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // Для остальных файлов просто устанавливаем статус успеха
      setFiles(prev => ({
        ...prev,
        [type]: {
          ...uploadedFile,
          status: 'success'
        }
      }));
    }

    // Показываем toast о замене файла
    if (hadFile) {
      const toastId = `replace-${Date.now()}`;
      setToasts(prev => [...prev, { 
        id: toastId, 
        message: `Файл ${fileTypeNames[type]} заменён`, 
        type: 'success' 
      }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3000);
    }

    // Очищаем ошибку
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[type];
      return newErrors;
    });
  }, [files]);

  // Функция для загрузки документов об образовании (multi-file)
  const uploadEducationDoc = useCallback(async (file: File) => {
    const validation = validateFile(file, 'education');
    
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, educationDocs: validation.error || 'Ошибка валидации' }));
      // Добавляем toast для ошибки
      const toastId = `error-${Date.now()}`;
      setToasts(prev => [...prev, { id: toastId, message: validation.error || 'Ошибка валидации', type: 'error' }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 5000);
      return;
    }

    // Проверяем лимит файлов
    if (files.educationDocs.length >= 15) {
      setErrors(prev => ({ ...prev, educationDocs: 'Достигнут лимит 15 файлов' }));
      // Добавляем toast о достижении лимита
      const toastId = `limit-${Date.now()}`;
      setToasts(prev => [...prev, { id: toastId, message: 'Достигнут лимит 15 файлов', type: 'warning' }]);
      setTimeout(() => setToasts(prev => prev.filter(t => t.id !== toastId)), 3000);
      return;
    }

    const uploadedFile: UploadedFile = {
      id: `education-${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      uploadedAt: new Date(),
      status: 'uploading'
    };

    // Создаем превью для изображений
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFiles(prev => ({
          ...prev,
          educationDocs: [...prev.educationDocs, {
            ...uploadedFile,
            preview: e.target?.result as string,
            status: 'success'
          }]
        }));
      };
      reader.readAsDataURL(file);
    } else {
      // Для остальных файлов просто устанавливаем статус успеха
      setFiles(prev => ({
        ...prev,
        educationDocs: [...prev.educationDocs, {
          ...uploadedFile,
          status: 'success'
        }]
      }));
    }

    // Очищаем ошибку
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors.educationDocs;
      return newErrors;
    });
  }, [files.educationDocs.length]);

  // Функция для удаления документа об образовании
  const removeEducationDoc = useCallback((docId: string) => {
    setFiles(prev => ({
      ...prev,
      educationDocs: prev.educationDocs.filter(doc => doc.id !== docId)
    }));
  }, []);

  const updateLinkedInUrl = useCallback((url: string) => {
    const validation = validateLinkedInUrl(url);
    
    if (!validation.isValid) {
      setErrors(prev => ({ ...prev, linkedinUrl: validation.error || 'Ошибка валидации' }));
    } else {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors.linkedinUrl;
        return newErrors;
      });
    }

    setFiles(prev => ({ ...prev, linkedinUrl: url }));
  }, []);

  const removeFile = useCallback((type: keyof FileUploadState) => {
    if (type === 'linkedinUrl') {
      setFiles(prev => ({ ...prev, linkedinUrl: '' }));
    } else if (type === 'educationDocs') {
      setFiles(prev => ({ ...prev, educationDocs: [] }));
    } else {
      setFiles(prev => ({ ...prev, [type]: null }));
    }
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[type];
      return newErrors;
    });
  }, []);

  const replaceFile = useCallback((type: 'resume' | 'coverLetter' | 'linkedinArchive' | 'profilePhoto') => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = getAcceptString(type);
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        uploadFile(file, type);
      }
    };
    input.click();
  }, [uploadFile]);

  const getAcceptString = (type: 'resume' | 'coverLetter' | 'education' | 'linkedinArchive' | 'profilePhoto'): string => {
    switch (type) {
      case 'resume':
        return '.pdf,.doc,.docx,.txt';
      case 'coverLetter':
        return '.pdf,.doc,.docx,.txt';
      case 'education':
        return '.pdf,.jpg,.jpeg,.png';
      case 'linkedinArchive':
        return '.zip,.pdf';
      case 'profilePhoto':
        return '.jpg,.jpeg,.png,.gif';
      default:
        return '';
    }
  };

  const hasAnyFiles = Object.values(files).some(file => 
    file !== null && typeof file === 'object' && 'status' in file
  ) || files.educationDocs.length > 0;

  const hasLinkedInUrl = files.linkedinUrl.trim() !== '';

  const removeToast = useCallback((toastId: string) => {
    setToasts(prev => prev.filter(t => t.id !== toastId));
  }, []);

  return {
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
    hasLinkedInUrl,
    formatFileSize,
    getFileIcon
  };
} 