import { Input } from "@/components/ui/input";
import { Button } from "@/app/ui/button";
import { FormError } from "@/components/ui/form-error";
import { X, Plus } from "lucide-react";

interface MultiFieldProps {
  label: string;
  name: string;
  values: string[];
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  onChange: (idx: number, value: string) => void;
  onAdd: () => void;
  onRemove?: (idx: number) => void;
  onBlur?: () => void;
  placeholder?: string;
}

export default function MultiField({
  label,
  name,
  values,
  errors,
  touched,
  onChange,
  onAdd,
  onRemove,
  onBlur,
  placeholder,
}: MultiFieldProps) {
  const fieldError = touched[name] ? errors[name] : undefined;

  return (
    <div className="space-y-1">
      <label className="block text-xs font-medium text-gray-700">{label}</label>
      <div className="space-y-0.5">
        {values.map((val, idx) => (
          <div key={idx} className="flex gap-1">
            <Input
              name={`${name}_${idx}`}
              placeholder={placeholder || `Элемент ${idx + 1}`}
              value={val}
              onChange={e => onChange(idx, e.target.value)}
              onBlur={onBlur}
              className={`flex-1 text-xs ${touched[name] && fieldError ? "border-red-500" : ""}`}
            />
            {onRemove && values.length > 1 && (
              <Button
                type="button"
                onClick={() => onRemove(idx)}
                className="px-1 py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700"
              >
                <X className="h-2 w-2" />
              </Button>
            )}
          </div>
        ))}
      </div>
      <FormError error={fieldError} className="mt-0.5 text-xs" />
      <Button 
        type="button" 
        onClick={onAdd} 
        className="w-full py-0.5 bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs"
      >
        <Plus className="h-2 w-2 mr-0.5" />
        Добавить
      </Button>
    </div>
  );
} 