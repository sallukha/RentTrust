import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Phone, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useRegistration } from '../context/RegistrationContext';
import { RegistrationFormData } from '../types';

interface FormInputProps {
  name: keyof RegistrationFormData;
  label: string;
  placeholder: string;
  type?: string;
  autoComplete?: string;
  icon: 'user' | 'mail' | 'phone';
}

export const FormInput: React.FC<FormInputProps> = ({
  name,
  label,
  placeholder,
  type = 'text',
  autoComplete,
  icon,
}) => {
  const {
    formData,
    errors,
    touched,
    isValidatingField,
    setFieldValue,
    handleBlur,
  } = useRegistration();

  const [isFocused, setIsFocused] = useState(false);

  const value = String(formData[name] ?? '');
  const error = errors[name as keyof typeof errors];
  const isTouched = !!touched[name];
  const isValidating = !!isValidatingField[name];
  const isSuccess = isTouched && !error && !isValidating && value.trim().length > 0;

  // Icon mapping
  const renderIcon = () => {
    const iconClass = `w-5 h-5 transition-colors ${
      error && isTouched
        ? 'text-rose-500'
        : isFocused
        ? 'text-blue-600 dark:text-blue-400'
        : 'text-slate-600 dark:text-slate-400'
    }`;

    switch (icon) {
      case 'user':
        return <User className={iconClass} />;
      case 'mail':
        return <Mail className={iconClass} />;
      case 'phone':
        return <Phone className={iconClass} />;
      default:
        return null;
    }
  };

  const formatPhoneNumber = (input: string) => {
    // Keep numbers and +
    const clean = input.replace(/[^\d+]/g, '');
    if (!clean.startsWith('+')) {
      const digits = input.replace(/\D/g, '');
      if (digits.length <= 3) return digits.length ? `(${digits}` : '';
      if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
      return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    }
    return input;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newVal = e.target.value;
    if (name === 'phoneNumber') {
      newVal = formatPhoneNumber(newVal);
    }
    setFieldValue(name, newVal);
  };

  return (
    <div className="relative space-y-1">
      {/* Floating Tag Label matching the screenshot's floating pill label style */}
      <div className="flex items-center justify-between pl-1">
        <label
          htmlFor={`input-${name}`}
          className="inline-block px-1.5 py-0.5 rounded-md text-[13px] font-semibold text-slate-800 dark:text-slate-200"
        >
          {label}
        </label>

        {/* Validation status badge */}
        <div className="pr-2 text-xs flex items-center gap-1">
          {isValidating && (
            <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1 text-[11px]">
              <Loader2 className="w-3 h-3 animate-spin" />
              Validating...
            </span>
          )}
          {isSuccess && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 text-[11px] font-medium"
            >
              <Check className="w-3.5 h-3.5" />
            </motion.span>
          )}
        </div>
      </div>

      {/* Input container box matching screenshot's soft light blue rounded fill */}
      <div
        className={`relative flex items-center px-4 py-3.5 rounded-2xl transition-all duration-200 ${
          error && isTouched
            ? 'bg-rose-50/70 dark:bg-rose-950/20 ring-1.5 ring-rose-500/50'
            : isFocused
            ? 'bg-white dark:bg-slate-900 ring-2 ring-blue-500/40 shadow-sm border-blue-200 dark:border-blue-900'
            : 'bg-[#f0f5ff] dark:bg-slate-800/80 hover:bg-[#e9f0fc] dark:hover:bg-slate-800 border border-transparent'
        }`}
      >
        {/* Leading Icon */}
        <div className="flex-shrink-0 mr-3.5">{renderIcon()}</div>

        {/* Input */}
        <input
          id={`input-${name}`}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          autoComplete={autoComplete}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setIsFocused(false);
            handleBlur(name);
          }}
          onChange={handleChange}
          aria-invalid={!!(error && isTouched)}
          aria-describedby={error && isTouched ? `error-${name}` : undefined}
          className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-[15px] font-medium outline-none"
        />
      </div>

      {/* Error Message with smooth animation */}
      <AnimatePresence>
        {error && isTouched && (
          <motion.div
            id={`error-${name}`}
            initial={{ opacity: 0, height: 0, y: -4 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0, y: -4 }}
            className="flex items-center gap-1.5 pl-2 pt-0.5 text-xs font-medium text-rose-600 dark:text-rose-400"
          >
            <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
            <span>{error}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
