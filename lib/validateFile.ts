import { z } from "zod";

// Zod схемы для валидации файлов
export const fileValidationSchema = z.object({
  isValid: z.boolean(),
  error: z.string().optional(),
  file: z.instanceof(File).optional(),
});

export const fileTypeConfigSchema = z.object({
  accept: z.string(),
  maxSize: z.number(), // в байтах
  extensions: z.array(z.string()),
  maxFiles: z.number().optional(), // для multi-file источников
});

export const fileTypesSchema = z.object({
  resume: fileTypeConfigSchema,
  coverLetter: fileTypeConfigSchema,
  education: fileTypeConfigSchema,
  linkedinArchive: fileTypeConfigSchema,
  profilePhoto: fileTypeConfigSchema,
});

// Конфигурация типов файлов согласно новым требованиям
export const FILE_TYPES: Record<string, FileTypeConfig> = {
  resume: {
    accept: '.pdf,.doc,.docx,.txt',
    maxSize: 5 * 1024 * 1024, // 5 МБ
    extensions: ['.pdf', '.doc', '.docx', '.txt'],
    maxFiles: 1
  },
  coverLetter: {
    accept: '.pdf,.doc,.docx,.txt',
    maxSize: 5 * 1024 * 1024, // 5 МБ
    extensions: ['.pdf', '.doc', '.docx', '.txt'],
    maxFiles: 1
  },
  education: {
    accept: '.pdf,.jpg,.jpeg,.png',
    maxSize: 10 * 1024 * 1024, // 10 МБ за файл
    extensions: ['.pdf', '.jpg', '.jpeg', '.png'],
    maxFiles: 15
  },
  linkedinArchive: {
    accept: '.zip,.pdf',
    maxSize: 20 * 1024 * 1024, // 20 МБ
    extensions: ['.zip', '.pdf'],
    maxFiles: 1
  },
  profilePhoto: {
    accept: '.jpg,.jpeg,.png,.gif',
    maxSize: 5 * 1024 * 1024, // 5 МБ
    extensions: ['.jpg', '.jpeg', '.png', '.gif'],
    maxFiles: 1
  }
};

// Типы, выведенные из Zod схем
export type FileValidationResult = z.infer<typeof fileValidationSchema>;
export type FileTypeConfig = z.infer<typeof fileTypeConfigSchema>;
export type FileTypes = z.infer<typeof fileTypesSchema>;

// Схема для валидации LinkedIn URL
export const linkedInUrlSchema = z.string()
  .min(1, "URL не может быть пустым")
  .regex(/^https:\/\/linkedin\.com\/in\/[a-zA-Z0-9-]+\/?$/, 
    "URL должен начинаться с https://linkedin.com/in/ и содержать корректный профиль");

export function validateFile(file: File, type: keyof typeof FILE_TYPES): FileValidationResult {
  const config = FILE_TYPES[type];
  
  // Проверка размера
  if (file.size > config.maxSize) {
    return {
      isValid: false,
      error: `Файл слишком большой. Максимальный размер: ${config.maxSize / (1024 * 1024)} МБ`
    };
  }
  
  // Проверка расширения
  const fileExtension = '.' + file.name.split('.').pop()?.toLowerCase();
  if (fileExtension && !config.extensions.includes(fileExtension)) {
    return {
      isValid: false,
      error: `Неподдерживаемый формат файла. Допустимые форматы: ${config.extensions.join(', ')}`
    };
  }
  
  return {
    isValid: true,
    file
  };
}

export function validateLinkedInUrl(url: string): FileValidationResult {
  try {
    linkedInUrlSchema.parse(url);
    return {
      isValid: true
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        isValid: false,
        error: error.errors[0].message
      };
    }
    return {
      isValid: false,
      error: "Неизвестная ошибка валидации"
    };
  }
}

export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Б';
  
  const k = 1024;
  const sizes = ['Б', 'КБ', 'МБ', 'ГБ'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

export function getFileIcon(fileName: string): string {
  const extension = fileName.split('.').pop()?.toLowerCase();
  
  switch (extension) {
    case 'pdf':
      return '📄';
    case 'doc':
    case 'docx':
      return '📝';
    case 'txt':
      return '📄';
    case 'zip':
      return '📦';
    case 'jpg':
    case 'jpeg':
    case 'png':
    case 'gif':
      return '🖼️';
    default:
      return '📁';
  }
} 