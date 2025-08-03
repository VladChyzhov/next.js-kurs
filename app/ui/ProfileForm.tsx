"use client"

import { Button } from "@/app/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/ui/form-error";
import { useProfileForm } from "@/lib/useProfileForm";
import DataSourcesSection from "@/app/ui/fields/DataSourcesSection";
import AutoFillSection from "@/app/ui/fields/AutoFillSection";

export default function ProfileForm() {
  const {
    form, 
    errors,
    touched,
    hasErrors,
    autoFilledFields,
    handleChange, 
    handleBlur,
    handleArrayInput, 
    handleArrayBlur,
    addArrayInput, 
    removeArrayInput,
    handleSubmit,
  } = useProfileForm();

  return (
    <form onSubmit={handleSubmit} className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 p-4">
      <div className="max-w-7xl mx-auto">
        
        {/* Компактный заголовок */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Заполнение профиля</h1>
          <p className="text-sm text-gray-600">Загрузите данные и наблюдайте за автозаполнением формы</p>
        </div>

        {/* Основной контент - две карточки в одну строку с измененными пропорциями */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Карточка 1: Источники данных - уменьшенная ширина */}
          <div className="bg-white rounded-lg shadow-md border border-blue-100">
            <div className="p-4">
              <DataSourcesSection />
            </div>
          </div>
          
          {/* Карточка 2: Автозаполняемые поля - увеличенная ширина */}
          <div className="bg-white rounded-lg shadow-md border border-green-100 lg:col-span-2">
            <div className="p-4">
              <AutoFillSection 
                form={form}
                errors={errors}
                touched={touched}
                autoFilledFields={autoFilledFields}
                handleChange={handleChange}
                handleBlur={handleBlur}
                handleArrayInput={handleArrayInput}
                handleArrayBlur={handleArrayBlur}
                addArrayInput={addArrayInput}
                removeArrayInput={removeArrayInput}
              />
            </div>
          </div>
        </div>

        {/* Компактная кнопка отправки */}
        <div className="mt-6 text-center">
          <Button type="submit" className="px-6 py-2 text-base" disabled={hasErrors}>
            {hasErrors ? "Исправьте ошибки в форме" : "Сохранить профиль"}
          </Button>
        </div>
      </div>
    </form>
  );
} 