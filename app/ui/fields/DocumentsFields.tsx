import { Input } from "@/components/ui/input";
import { FormError } from "@/components/ui/form-error";
import { CheckCircle } from "lucide-react";

interface DocumentsFieldsProps {
  form: any;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  autoFilledFields: Record<string, boolean>;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function DocumentsFields({ form, errors, touched, autoFilledFields, handleChange, handleBlur }: DocumentsFieldsProps) {
  return (
    <div className="space-y-1">
      {/* CV - название и URL в одной строке */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <div className="relative">
            <Input 
              name="base_cv_name" 
              placeholder="Название CV" 
              value={form.base_cv_name} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.base_cv_name && errors.base_cv_name ? "border-red-500" : ""} ${autoFilledFields.base_cv_name ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.base_cv_name && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.base_cv_name ? errors.base_cv_name : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="base_cv_url" 
              placeholder="URL CV" 
              value={form.base_cv_url} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.base_cv_url && errors.base_cv_url ? "border-red-500" : ""} ${autoFilledFields.base_cv_url ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.base_cv_url && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.base_cv_url ? errors.base_cv_url : undefined} className="mt-0.5 text-xs" />
        </div>
      </div>
      
      {/* Дата загрузки CV */}
      <div>
        <div className="relative">
          <Input 
            name="base_cv_uploaded_at" 
            type="date"
            placeholder="Дата загрузки CV" 
            value={form.base_cv_uploaded_at} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`text-xs max-w-[150px] ${touched.base_cv_uploaded_at && errors.base_cv_uploaded_at ? "border-red-500" : ""} ${autoFilledFields.base_cv_uploaded_at ? "border-green-500 bg-green-50" : ""}`}
          />
          {autoFilledFields.base_cv_uploaded_at && (
            <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
          )}
        </div>
        <FormError error={touched.base_cv_uploaded_at ? errors.base_cv_uploaded_at : undefined} className="mt-0.5 text-xs" />
      </div>
      
      {/* LinkedIn PDF - название и URL в одной строке */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <div className="relative">
            <Input 
              name="linkedin_pdf_name" 
              placeholder="Название PDF LinkedIn" 
              value={form.linkedin_pdf_name} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.linkedin_pdf_name && errors.linkedin_pdf_name ? "border-red-500" : ""} ${autoFilledFields.linkedin_pdf_name ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.linkedin_pdf_name && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.linkedin_pdf_name ? errors.linkedin_pdf_name : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="linkedin_pdf_url" 
              placeholder="URL PDF LinkedIn" 
              value={form.linkedin_pdf_url} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.linkedin_pdf_url && errors.linkedin_pdf_url ? "border-red-500" : ""} ${autoFilledFields.linkedin_pdf_url ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.linkedin_pdf_url && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.linkedin_pdf_url ? errors.linkedin_pdf_url : undefined} className="mt-0.5 text-xs" />
        </div>
      </div>
      
      {/* Дата загрузки PDF LinkedIn */}
      <div>
        <div className="relative">
          <Input 
            name="linkedin_pdf_uploaded_at" 
            type="date"
            placeholder="Дата загрузки PDF" 
            value={form.linkedin_pdf_uploaded_at} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`text-xs max-w-[150px] ${touched.linkedin_pdf_uploaded_at && errors.linkedin_pdf_uploaded_at ? "border-red-500" : ""} ${autoFilledFields.linkedin_pdf_uploaded_at ? "border-green-500 bg-green-50" : ""}`}
          />
          {autoFilledFields.linkedin_pdf_uploaded_at && (
            <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
          )}
        </div>
        <FormError error={touched.linkedin_pdf_uploaded_at ? errors.linkedin_pdf_uploaded_at : undefined} className="mt-0.5 text-xs" />
      </div>
      
      {/* LinkedIn Archive - название и URL в одной строке */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-1">
        <div>
          <div className="relative">
            <Input 
              name="linkedin_archive_name" 
              placeholder="Название архива LinkedIn" 
              value={form.linkedin_archive_name} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.linkedin_archive_name && errors.linkedin_archive_name ? "border-red-500" : ""} ${autoFilledFields.linkedin_archive_name ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.linkedin_archive_name && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.linkedin_archive_name ? errors.linkedin_archive_name : undefined} className="mt-0.5 text-xs" />
        </div>
        
        <div>
          <div className="relative">
            <Input 
              name="linkedin_archive_url" 
              placeholder="URL архива LinkedIn" 
              value={form.linkedin_archive_url} 
              onChange={handleChange}
              onBlur={handleBlur}
              className={`text-xs ${touched.linkedin_archive_url && errors.linkedin_archive_url ? "border-red-500" : ""} ${autoFilledFields.linkedin_archive_url ? "border-green-500 bg-green-50" : ""}`}
            />
            {autoFilledFields.linkedin_archive_url && (
              <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
            )}
          </div>
          <FormError error={touched.linkedin_archive_url ? errors.linkedin_archive_url : undefined} className="mt-0.5 text-xs" />
        </div>
      </div>
      
      {/* Дата загрузки архива LinkedIn */}
      <div>
        <div className="relative">
          <Input 
            name="linkedin_archive_uploaded_at" 
            type="date"
            placeholder="Дата загрузки архива" 
            value={form.linkedin_archive_uploaded_at} 
            onChange={handleChange}
            onBlur={handleBlur}
            className={`text-xs max-w-[150px] ${touched.linkedin_archive_uploaded_at && errors.linkedin_archive_uploaded_at ? "border-red-500" : ""} ${autoFilledFields.linkedin_archive_uploaded_at ? "border-green-500 bg-green-50" : ""}`}
          />
          {autoFilledFields.linkedin_archive_uploaded_at && (
            <CheckCircle className="absolute right-1 top-1/2 transform -translate-y-1/2 h-2 w-2 text-green-500" />
          )}
        </div>
        <FormError error={touched.linkedin_archive_uploaded_at ? errors.linkedin_archive_uploaded_at : undefined} className="mt-0.5 text-xs" />
      </div>
    </div>
  );
} 