import { CheckCircle, Edit3, Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { FormError } from "@/components/ui/form-error";
import { useState } from "react";
import PersonalFields from "./PersonalFields";
import OnlineFields from "./OnlineFields";
import DocumentsFields from "./DocumentsFields";
import MultiField from "./MultiField";

interface AutoFillSectionProps {
  form: any;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  autoFilledFields: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleArrayInput: (name: "socials" | "work_experience" | "education" | "education_docs" | "skills" | "soft_skills" | "languages" | "certifications" | "achievements" | "recommendations" | "documents" | "work_preferences", idx: number, value: string) => void;
  handleArrayBlur: (name: "socials" | "work_experience" | "education" | "education_docs" | "skills" | "soft_skills" | "languages" | "certifications" | "achievements" | "recommendations" | "documents" | "work_preferences") => void;
  addArrayInput: (name: "socials" | "work_experience" | "education" | "education_docs" | "skills" | "soft_skills" | "languages" | "certifications" | "achievements" | "recommendations" | "documents" | "work_preferences") => void;
  removeArrayInput: (name: "socials" | "work_experience" | "education" | "education_docs" | "skills" | "soft_skills" | "languages" | "certifications" | "achievements" | "recommendations" | "documents" | "work_preferences", idx: number) => void;
}

export default function AutoFillSection({
  form,
  errors,
  touched,
  autoFilledFields,
  handleChange,
  handleBlur,
  handleArrayInput,
  handleArrayBlur,
  addArrayInput,
  removeArrayInput,
}: AutoFillSectionProps) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    documents: false,
    additional: false,
  });

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="space-y-2">
      <div className="text-center mb-3">
        <div className="inline-flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mb-1">
          <Sparkles className="h-4 w-4 text-green-600" />
        </div>
        <h2 className="text-base font-bold text-gray-900 mb-1">Автозаполняемые поля</h2>
        <p className="text-xs text-gray-600">
          Эти поля заполняются автоматически. Вы можете их редактировать.
        </p>
      </div>

      {/* Личные данные */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-2">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xs font-semibold text-gray-900">Личные данные</h3>
          {Object.keys(autoFilledFields).some(key => key.startsWith('first_name') || key.startsWith('last_name') || key.startsWith('email')) && (
            <div className="flex items-center gap-1 text-green-600 text-xs bg-green-100 px-1 py-0.5 rounded-full">
              <CheckCircle className="h-2 w-2" />
              <span>Автозаполнено</span>
            </div>
          )}
        </div>
        <PersonalFields 
          form={form} 
          errors={errors}
          touched={touched}
          handleChange={handleChange} 
          handleBlur={handleBlur}
          autoFilledFields={autoFilledFields}
        />
      </div>
      
      {/* Онлайн-профили */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-2">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xs font-semibold text-gray-900">Онлайн-профили</h3>
          {Object.keys(autoFilledFields).some(key => key.startsWith('linkedin') || key.startsWith('website')) && (
            <div className="flex items-center gap-1 text-green-600 text-xs bg-green-100 px-1 py-0.5 rounded-full">
              <CheckCircle className="h-2 w-2" />
              <span>Автозаполнено</span>
            </div>
          )}
        </div>
        <OnlineFields 
          form={form} 
          errors={errors}
          touched={touched}
          handleChange={handleChange} 
          handleBlur={handleBlur}
          autoFilledFields={autoFilledFields}
        />
      </div>
      
      {/* Заголовок и summary */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-2">
        <div className="flex items-center gap-2 mb-2">
          <h3 className="text-xs font-semibold text-gray-900">Заголовок и summary</h3>
          {(autoFilledFields.headline || autoFilledFields.summary) && (
            <div className="flex items-center gap-1 text-green-600 text-xs bg-green-100 px-1 py-0.5 rounded-full">
              <CheckCircle className="h-2 w-2" />
              <span>Автозаполнено</span>
            </div>
          )}
        </div>
        <div className="space-y-1">
          <div>
            <div className="relative">
              <Textarea 
                name="headline" 
                placeholder="Заголовок профиля" 
                value={form.headline} 
                onChange={handleChange}
                onBlur={handleBlur}
                className={`min-h-[40px] text-xs ${touched.headline && errors.headline ? "border-red-500" : ""} ${autoFilledFields.headline ? "border-green-500 bg-green-50" : ""}`}
              />
              {autoFilledFields.headline && (
                <CheckCircle className="absolute right-1 top-1 h-2 w-2 text-green-500" />
              )}
            </div>
            <FormError error={touched.headline ? errors.headline : undefined} className="mt-1" />
          </div>
          <div>
            <div className="relative">
              <Textarea 
                name="summary" 
                placeholder="Краткое описание о себе" 
                value={form.summary} 
                onChange={handleChange}
                onBlur={handleBlur}
                className={`min-h-[50px] text-xs ${touched.summary && errors.summary ? "border-red-500" : ""} ${autoFilledFields.summary ? "border-green-500 bg-green-50" : ""}`}
              />
              {autoFilledFields.summary && (
                <CheckCircle className="absolute right-1 top-1 h-2 w-2 text-green-500" />
              )}
            </div>
            <FormError error={touched.summary ? errors.summary : undefined} className="mt-1" />
          </div>
        </div>
      </div>
      
      {/* Документы - сворачиваемая секция */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold text-gray-900">Документы</h3>
            {Object.keys(autoFilledFields).some(key => key.startsWith('base_cv') || key.startsWith('linkedin_pdf')) && (
              <div className="flex items-center gap-1 text-green-600 text-xs bg-green-100 px-1 py-0.5 rounded-full">
                <CheckCircle className="h-2 w-2" />
                <span>Автозаполнено</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => toggleSection('documents')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.documents ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
        </div>
        {expandedSections.documents && (
          <DocumentsFields 
            form={form} 
            errors={errors}
            touched={touched}
            handleChange={handleChange} 
            handleBlur={handleBlur}
            autoFilledFields={autoFilledFields}
          />
        )}
      </div>

      {/* Массивы - сворачиваемая секция */}
      <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-lg p-2">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-xs font-semibold text-gray-900">Дополнительная информация</h3>
            {Object.keys(autoFilledFields).some(key => ['socials', 'work_experience', 'education', 'skills', 'soft_skills', 'languages'].includes(key)) && (
              <div className="flex items-center gap-1 text-green-600 text-xs bg-green-100 px-1 py-0.5 rounded-full">
                <CheckCircle className="h-2 w-2" />
                <span>Автозаполнено</span>
              </div>
            )}
          </div>
          <button
            type="button"
            onClick={() => toggleSection('additional')}
            className="text-gray-500 hover:text-gray-700"
          >
            {expandedSections.additional ? (
              <ChevronUp className="h-3 w-3" />
            ) : (
              <ChevronDown className="h-3 w-3" />
            )}
          </button>
        </div>
        
        {expandedSections.additional && (
          <div className="space-y-2">
            <MultiField 
              label="Социальные сети" 
              name="socials" 
              values={form.socials} 
              errors={errors}
              touched={touched}
              onChange={(i, v) => handleArrayInput("socials", i, v)} 
              onAdd={() => addArrayInput("socials")} 
              onRemove={(i) => removeArrayInput("socials", i)}
              onBlur={() => handleArrayBlur("socials")}
              placeholder="type, url" 
            />
            <MultiField 
              label="Опыт работы" 
              name="work_experience" 
              values={form.work_experience} 
              errors={errors}
              touched={touched}
              onChange={(i, v) => handleArrayInput("work_experience", i, v)} 
              onAdd={() => addArrayInput("work_experience")} 
              onRemove={(i) => removeArrayInput("work_experience", i)}
              onBlur={() => handleArrayBlur("work_experience")}
            />
            <MultiField 
              label="Образование" 
              name="education" 
              values={form.education} 
              errors={errors}
              touched={touched}
              onChange={(i, v) => handleArrayInput("education", i, v)} 
              onAdd={() => addArrayInput("education")} 
              onRemove={(i) => removeArrayInput("education", i)}
              onBlur={() => handleArrayBlur("education")}
            />
            <MultiField 
              label="Языки" 
              name="languages" 
              values={form.languages} 
              errors={errors}
              touched={touched}
              onChange={(i, v) => handleArrayInput("languages", i, v)} 
              onAdd={() => addArrayInput("languages")} 
              onRemove={(i) => removeArrayInput("languages", i)}
              onBlur={() => handleArrayBlur("languages")}
              placeholder="язык, уровень" 
            />
            <MultiField 
              label="Hard Skills (технические навыки)" 
              name="skills" 
              values={form.skills} 
              errors={errors}
              touched={touched}
              onChange={(i, v) => handleArrayInput("skills", i, v)} 
              onAdd={() => addArrayInput("skills")} 
              onRemove={(i) => removeArrayInput("skills", i)}
              onBlur={() => handleArrayBlur("skills")}
            />
            <MultiField 
              label="Soft Skills (мягкие навыки)" 
              name="soft_skills" 
              values={form.soft_skills} 
              errors={errors}
              touched={touched}
              onChange={(i, v) => handleArrayInput("soft_skills", i, v)} 
              onAdd={() => addArrayInput("soft_skills")} 
              onRemove={(i) => removeArrayInput("soft_skills", i)}
              onBlur={() => handleArrayBlur("soft_skills")}
            />
          </div>
        )}
      </div>
    </div>
  );
} 