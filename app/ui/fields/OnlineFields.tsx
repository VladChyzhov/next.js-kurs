import { Input } from "@/components/ui/input";
import { FormError } from "@/components/ui/form-error";
import { CheckCircle } from "lucide-react";

interface OnlineFieldsProps {
  form: any;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  autoFilledFields: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function OnlineFields({ form, errors, touched, autoFilledFields, handleChange, handleBlur }: OnlineFieldsProps) {
  return (
    <div className="space-y-1">
      {/* LinkedIn и Website в одной строке */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <div className="relative">
            <Input 
              name="linkedin_profile" 
              placeholder="Профиль LinkedIn" 
              value={form.linkedin_profile} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.linkedin_profile && errors.linkedin_profile ? "border-red-500" : ""} ${autoFilledFields.linkedin_profile ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.linkedin_profile && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.linkedin_profile ? errors.linkedin_profile : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="website_url" 
              placeholder="Сайт/портфолио" 
              value={form.website_url} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.website_url && errors.website_url ? "border-red-500" : ""} ${autoFilledFields.website_url ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.website_url && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.website_url ? errors.website_url : undefined} className="mt-0.5 text-xs" />
        </div>
      </div>
      
      {/* URL фотографии профиля */}
      <div>
        <div className="relative">
          <Input 
            name="profile_photo_url" 
            placeholder="URL фотографии профиля" 
            value={form.profile_photo_url} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`text-xs ${touched.profile_photo_url && errors.profile_photo_url ? "border-red-500" : ""} ${autoFilledFields.profile_photo_url ? "border-green-500 bg-green-50" : ""}`}
          />
          {autoFilledFields.profile_photo_url && (
            <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
          )}
        </div>
        <FormError error={touched.profile_photo_url ? errors.profile_photo_url : undefined} className="mt-0.5 text-xs" />
      </div>
    </div>
  );
} 