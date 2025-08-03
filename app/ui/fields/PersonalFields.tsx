import { Input } from "@/components/ui/input";
import { FormError } from "@/components/ui/form-error";
import { CheckCircle } from "lucide-react";

interface PersonalFieldsProps {
  form: any;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  autoFilledFields: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function PersonalFields({ form, errors, touched, autoFilledFields, handleChange, handleBlur }: PersonalFieldsProps) {
  return (
    <div className="space-y-1">
      {/* Имя, фамилия, отчество в одной строке */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
        <div>
          <div className="relative">
            <Input 
              name="first_name" 
              placeholder="Имя" 
              value={form.first_name} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.first_name && errors.first_name ? "border-red-500" : ""} ${autoFilledFields.first_name ? "border-green-500 bg-green-50" : ""}`}
              required 
            />
            {autoFilledFields.first_name && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.first_name ? errors.first_name : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="middle_name" 
              placeholder="Отчество" 
              value={form.middle_name} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.middle_name && errors.middle_name ? "border-red-500" : ""} ${autoFilledFields.middle_name ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.middle_name && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.middle_name ? errors.middle_name : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="last_name" 
              placeholder="Фамилия" 
              value={form.last_name} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.last_name && errors.last_name ? "border-red-500" : ""} ${autoFilledFields.last_name ? "border-green-500 bg-green-50" : ""}`}
              required 
            />
            {autoFilledFields.last_name && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.last_name ? errors.last_name : undefined} className="mt-0.5 text-xs" />
        </div>
      </div>
      
      {/* Имя и фамилия латиницей в одной строке */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <div className="relative">
            <Input 
              name="first_name_latin" 
              placeholder="Имя (латиницей)" 
              value={form.first_name_latin} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.first_name_latin && errors.first_name_latin ? "border-red-500" : ""} ${autoFilledFields.first_name_latin ? "border-green-500 bg-green-50" : ""}`}
              required 
            />
            {autoFilledFields.first_name_latin && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.first_name_latin ? errors.first_name_latin : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="last_name_latin" 
              placeholder="Фамилия (латиницей)" 
              value={form.last_name_latin} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.last_name_latin && errors.last_name_latin ? "border-red-500" : ""} ${autoFilledFields.last_name_latin ? "border-green-500 bg-green-50" : ""}`}
              required 
            />
            {autoFilledFields.last_name_latin && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.last_name_latin ? errors.last_name_latin : undefined} className="mt-0.5 text-xs" />
        </div>
      </div>
      
      {/* Email и телефон в одной строке */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <div className="relative">
            <Input 
              name="email" 
              type="email" 
              placeholder="Email" 
              value={form.email} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.email && errors.email ? "border-red-500" : ""} ${autoFilledFields.email ? "border-green-500 bg-green-50" : ""}`}
              required 
            />
            {autoFilledFields.email && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.email ? errors.email : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="phone" 
              placeholder="Телефон" 
              value={form.phone} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.phone && errors.phone ? "border-red-500" : ""} ${autoFilledFields.phone ? "border-green-500 bg-green-50" : ""}`}
              required 
            />
            {autoFilledFields.phone && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.phone ? errors.phone : undefined} className="mt-0.5 text-xs" />
        </div>
      </div>
      
      {/* Гражданство и разрешение на работу в одной строке */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <div className="relative">
            <Input 
              name="citizenship" 
              placeholder="Гражданство" 
              value={form.citizenship} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.citizenship && errors.citizenship ? "border-red-500" : ""} ${autoFilledFields.citizenship ? "border-green-500 bg-green-50" : ""}`}
              required 
            />
            {autoFilledFields.citizenship && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.citizenship ? errors.citizenship : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="work_permit_until" 
              type="date"
              placeholder="Разрешение до" 
              value={form.work_permit_until} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.work_permit_until && errors.work_permit_until ? "border-red-500" : ""} ${autoFilledFields.work_permit_until ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.work_permit_until && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.work_permit_until ? errors.work_permit_until : undefined} className="mt-0.5 text-xs" />
        </div>
      </div>
      
      {/* Город/регион */}
      <div>
        <div className="relative">
          <Input 
            name="location" 
            placeholder="Город/регион" 
            value={form.location} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`text-xs ${touched.location && errors.location ? "border-red-500" : ""} ${autoFilledFields.location ? "border-green-500 bg-green-50" : ""}`}
            required 
          />
          {autoFilledFields.location && (
            <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
          )}
        </div>
        <FormError error={touched.location ? errors.location : undefined} className="mt-0.5 text-xs" />
      </div>
    </div>
  );
} 