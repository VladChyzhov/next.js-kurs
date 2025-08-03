import { z } from "zod";

// Схема валидации для формы профиля
export const profileFormSchema = z.object({
  // Личные данные
  first_name: z.string().min(1, "Имя обязательно"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Фамилия обязательна"),
  first_name_latin: z.string().min(1, "Имя на латинице обязательно"),
  last_name_latin: z.string().min(1, "Фамилия на латинице обязательна"),
  email: z.string().email("Некорректный email"),
  phone: z.string().min(10, "Телефон должен содержать минимум 10 цифр"),
  citizenship: z.string().min(1, "Гражданство обязательно"),
  work_permit_until: z.string().optional(),
  location: z.string().min(1, "Город/регион обязателен"),
  
  // Онлайн-профили
  linkedin_profile: z.string().url("Некорректный URL LinkedIn").optional().or(z.literal("")),
  website_url: z.string().url("Некорректный URL сайта").optional().or(z.literal("")),
  profile_photo_url: z.string().url("Некорректный URL фотографии").optional().or(z.literal("")),
  
  // Заголовок и summary
  headline: z.string().min(10, "Заголовок должен содержать минимум 10 символов").max(200, "Заголовок не должен превышать 200 символов"),
  summary: z.string().min(50, "Описание должно содержать минимум 50 символов").max(2000, "Описание не должно превышать 2000 символов"),
  
  // Документы
  base_cv_name: z.string().optional(),
  base_cv_url: z.string().url("Некорректный URL CV").optional().or(z.literal("")),
  base_cv_uploaded_at: z.string().optional(),
  linkedin_pdf_name: z.string().optional(),
  linkedin_pdf_url: z.string().url("Некорректный URL PDF").optional().or(z.literal("")),
  linkedin_pdf_uploaded_at: z.string().optional(),
  linkedin_archive_name: z.string().optional(),
  linkedin_archive_url: z.string().url("Некорректный URL архива").optional().or(z.literal("")),
  linkedin_archive_uploaded_at: z.string().optional(),
  
  // Массивы
  socials: z.array(z.string().min(1, "Социальная сеть не может быть пустой")),
  work_experience: z.array(z.string().min(10, "Опыт работы должен содержать минимум 10 символов")),
  education: z.array(z.string().min(10, "Образование должно содержать минимум 10 символов")),
  education_docs: z.array(z.string().min(1, "Документ об образовании не может быть пустым")),
  skills: z.array(z.string().min(1, "Навык не может быть пустым")),
  soft_skills: z.array(z.string().min(1, "Гибкий навык не может быть пустым")),
  languages: z.array(z.string().min(1, "Язык не может быть пустым")),
  certifications: z.array(z.string().min(1, "Сертификат не может быть пустым")),
  achievements: z.array(z.string().min(10, "Достижение должно содержать минимум 10 символов")),
  recommendations: z.array(z.string().min(10, "Рекомендация должна содержать минимум 10 символов")),
  documents: z.array(z.string().min(1, "Документ не может быть пустым")),
  work_preferences: z.array(z.string().min(1, "Предпочтение не может быть пустым")),
});

export type ProfileFormData = z.infer<typeof profileFormSchema>;

// Функция для валидации отдельного поля
export function validateField(fieldName: keyof ProfileFormData, value: any) {
  try {
    const fieldSchema = profileFormSchema.shape[fieldName];
    fieldSchema.parse(value);
    return { isValid: true, error: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      return { isValid: false, error: error.errors[0].message };
    }
    return { isValid: false, error: "Неизвестная ошибка валидации" };
  }
}

// Функция для валидации всего объекта формы
export function validateForm(formData: any) {
  try {
    profileFormSchema.parse(formData);
    return { isValid: true, errors: null };
  } catch (error) {
    if (error instanceof z.ZodError) {
      const errors: Record<string, string> = {};
      error.errors.forEach((err) => {
        const fieldName = err.path.join('.');
        errors[fieldName] = err.message;
      });
      return { isValid: false, errors };
    }
    return { isValid: false, errors: { general: "Неизвестная ошибка валидации" } };
  }
} 