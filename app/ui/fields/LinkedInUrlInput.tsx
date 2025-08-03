import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { CheckCircle, AlertCircle, Link } from 'lucide-react';

interface LinkedInUrlInputProps {
  value: string;
  onChange: (url: string) => void;
  error?: string;
  className?: string;
}

export default function LinkedInUrlInput({ value, onChange, error, className = '' }: LinkedInUrlInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isValid = value.trim() !== '' && !error;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Input
          type="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="https://linkedin.com/in/username"
          className={`
            pr-10
            ${error ? 'border-red-500 focus:border-red-500' : ''}
            ${isValid ? 'border-green-500 focus:border-green-500' : ''}
            ${isFocused ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}
          `}
          aria-label="URL профиля LinkedIn"
        />
        
        {/* Icon */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3">
          {isValid ? (
            <CheckCircle className="h-5 w-5 text-green-500" />
          ) : error ? (
            <AlertCircle className="h-5 w-5 text-red-500" />
          ) : (
            <Link className="h-5 w-5 text-gray-400" />
          )}
        </div>
      </div>

      {/* Error message */}
      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}

      {/* Help text */}
      {!error && value.trim() === '' && (
        <p className="text-xs text-gray-400 mt-1">
          Введите URL вашего профиля LinkedIn
        </p>
      )}

      {/* Success message */}
      {isValid && (
        <p className="text-xs text-green-600 mt-1">
          ✓ Корректный URL профиля LinkedIn
        </p>
      )}
    </div>
  );
} 