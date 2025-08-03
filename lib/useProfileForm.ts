"use client"

import { useState } from "react";
import { validateField, validateForm, type ProfileFormData } from "./validation";

export function useProfileForm(initial = {}) {
  const [form, setForm] = useState({
    // Личные данные
    first_name: "",
    middle_name: "",
    last_name: "",
    first_name_latin: "",
    last_name_latin: "",
    email: "",
    phone: "",
    citizenship: "",
    work_permit_until: "",
    location: "",
    
    // Онлайн-профили
    linkedin_profile: "",
    website_url: "",
    profile_photo_url: "",
    
    // Заголовок и summary
    headline: "",
    summary: "",
    
    // Документы
    base_cv_name: "",
    base_cv_url: "",
    base_cv_uploaded_at: "",
    linkedin_pdf_name: "",
    linkedin_pdf_url: "",
    linkedin_pdf_uploaded_at: "",
    linkedin_archive_name: "",
    linkedin_archive_url: "",
    linkedin_archive_uploaded_at: "",
    
    // Массивы
    socials: [""],
    work_experience: [""],
    education: [""],
    education_docs: [""],
    skills: [""],
    soft_skills: [""],
    languages: [""],
    certifications: [""],
    achievements: [""],
    recommendations: [""],
    documents: [""],
    work_preferences: [""],
    
    ...initial,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [autoFilledFields, setAutoFilledFields] = useState<Record<string, boolean>>({});

  // Обработка обычного поля с валидацией
  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    
    setForm({ ...form, [name]: value });
    
    // Если пользователь изменил автозаполненное поле, убираем индикатор автозаполнения
    if (autoFilledFields[name]) {
      setAutoFilledFields(prev => ({ ...prev, [name]: false }));
    }
    
    // Валидация в реальном времени
    if (touched[name]) {
      const validation = validateField(name as keyof ProfileFormData, value);
      if (validation.isValid) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      } else {
        setErrors(prev => ({ ...prev, [name]: validation.error || "" }));
      }
    }
  }

  // Обработка поля-массива с валидацией
  function handleArrayInput(
    name: keyof typeof form,
    idx: number,
    value: string
  ) {
    const arr = Array.isArray(form[name]) ? [...(form[name] as string[])] : [""];
    arr[idx] = value;
    setForm({ ...form, [name]: arr });
    
    // Если пользователь изменил автозаполненный массив, убираем индикатор автозаполнения
    if (autoFilledFields[name]) {
      setAutoFilledFields(prev => ({ ...prev, [name]: false }));
    }
    
    // Валидация массива
    if (touched[name]) {
      const validation = validateField(name as keyof ProfileFormData, arr);
      if (validation.isValid) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      } else {
        setErrors(prev => ({ ...prev, [name]: validation.error || "" }));
      }
    }
  }

  function addArrayInput(name: keyof typeof form) {
    const arr = Array.isArray(form[name]) ? [...(form[name] as string[])] : [""];
    arr.push("");
    setForm({ ...form, [name]: arr });
  }

  function removeArrayInput(name: keyof typeof form, idx: number) {
    const arr = Array.isArray(form[name]) ? [...(form[name] as string[])] : [""];
    arr.splice(idx, 1);
    // Убеждаемся, что всегда есть хотя бы один элемент
    if (arr.length === 0) {
      arr.push("");
    }
    setForm({ ...form, [name]: arr });
    
    // Валидация после удаления
    if (touched[name]) {
      const validation = validateField(name as keyof ProfileFormData, arr);
      if (validation.isValid) {
        setErrors(prev => ({ ...prev, [name]: "" }));
      } else {
        setErrors(prev => ({ ...prev, [name]: validation.error || "" }));
      }
    }
  }

  // Обработка blur события для валидации
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
    
    const validation = validateField(name as keyof ProfileFormData, value);
    if (validation.isValid) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    } else {
      setErrors(prev => ({ ...prev, [name]: validation.error || "" }));
    }
  }

  // Обработка blur для массивов
  function handleArrayBlur(name: keyof typeof form) {
    if (!touched[name]) {
      setTouched(prev => ({ ...prev, [name]: true }));
    }
    
    const arr = Array.isArray(form[name]) ? form[name] as string[] : [""];
    const validation = validateField(name as keyof ProfileFormData, arr);
    if (validation.isValid) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    } else {
      setErrors(prev => ({ ...prev, [name]: validation.error || "" }));
    }
  }

  // Функция для автозаполнения полей
  function autoFillFields(data: Record<string, any>) {
    const newForm = { ...form };
    const newAutoFilledFields = { ...autoFilledFields };
    
    Object.keys(data).forEach(key => {
      if (data[key] !== undefined && data[key] !== null && data[key] !== "") {
        (newForm as any)[key] = data[key];
        newAutoFilledFields[key] = true;
      }
    });
    
    setForm(newForm);
    setAutoFilledFields(newAutoFilledFields);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    
    // Помечаем все поля как touched для показа всех ошибок
    const allFields = Object.keys(form);
    const newTouched: Record<string, boolean> = {};
    allFields.forEach(field => {
      newTouched[field] = true;
    });
    setTouched(newTouched);
    
    // Валидация всей формы
    const validation = validateForm(form);
    if (validation.isValid) {
      console.log("Форма валидна:", form);
      // Здесь можно вызывать API/Supabase
    } else {
      console.log("Ошибки валидации:", validation.errors);
      setErrors(validation.errors || {});
    }
  }

  // Проверка, есть ли ошибки в форме
  const hasErrors = Object.values(errors).some(error => error !== "");

  return {
    form: form,
    setForm: setForm,
    errors: errors,
    touched: touched,
    autoFilledFields: autoFilledFields,
    hasErrors: hasErrors,
    handleChange: handleChange,
    handleBlur: handleBlur,
    handleArrayInput: handleArrayInput,
    handleArrayBlur: handleArrayBlur,
    addArrayInput: addArrayInput,
    removeArrayInput: removeArrayInput,
    autoFillFields: autoFillFields,
    handleSubmit: handleSubmit
  };
} 