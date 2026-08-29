import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { apiService } from '../services/api';
import {
  CommunityStats,
  FormValidationErrors,
  LegalDocument,
  ProfileType,
  RecentUserItem,
  RegistrationFormData,
  RegistrationResponse,
  RoleDetail,
} from '../types';

interface RegistrationContextType {
  formData: RegistrationFormData;
  errors: FormValidationErrors;
  touched: Record<string, boolean>;
  isSubmitting: boolean;
  isValidatingField: Record<string, boolean>;
  registeredResponse: RegistrationResponse | null;
  rolesData: Record<ProfileType, RoleDetail> | null;
  statsData: CommunityStats | null;
  recentUsers: RecentUserItem[];
  legalModalType: 'terms' | 'privacy' | null;
  legalDoc: LegalDocument | null;
  isLegalLoading: boolean;

  setProfileType: (type: ProfileType) => void;
  setFieldValue: (field: keyof RegistrationFormData, value: any) => void;
  handleBlur: (field: keyof RegistrationFormData) => Promise<void>;
  handleSubmit: (e?: React.FormEvent) => Promise<boolean>;
  resetForm: () => void;
  openLegalModal: (type: 'terms' | 'privacy') => void;
  closeLegalModal: () => void;
  refreshStats: () => Promise<void>;
}

const initialFormData: RegistrationFormData = {
  profileType: 'tenant',
  fullName: '',
  email: '',
  phoneNumber: '',
  termsAccepted: false,
};

const RegistrationContext = createContext<RegistrationContextType | undefined>(undefined);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<RegistrationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isValidatingField, setIsValidatingField] = useState<Record<string, boolean>>({});
  const [registeredResponse, setRegisteredResponse] = useState<RegistrationResponse | null>(null);

  const [rolesData, setRolesData] = useState<Record<ProfileType, RoleDetail> | null>(null);
  const [statsData, setStatsData] = useState<CommunityStats | null>(null);
  const [recentUsers, setRecentUsers] = useState<RecentUserItem[]>([]);

  const [legalModalType, setLegalModalType] = useState<'terms' | 'privacy' | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDocument | null>(null);
  const [isLegalLoading, setIsLegalLoading] = useState<boolean>(false);

  // Fetch initial REST data
  useEffect(() => {
    let isMounted = true;

    async function loadInitialData() {
      try {
        const [stats, roles, recent] = await Promise.all([
          apiService.fetchStats(),
          apiService.fetchRoles(),
          apiService.fetchRecentUsers(),
        ]);
        if (isMounted) {
          setStatsData(stats);
          setRolesData(roles);
          setRecentUsers(recent);
        }
      } catch (err) {
        console.error('Failed to load initial registration data:', err);
      }
    }

    loadInitialData();
    return () => {
      isMounted = false;
    };
  }, []);

  const refreshStats = useCallback(async () => {
    try {
      const stats = await apiService.fetchStats();
      const recent = await apiService.fetchRecentUsers();
      setStatsData(stats);
      setRecentUsers(recent);
    } catch (err) {
      console.error('Failed to refresh stats:', err);
    }
  }, []);

  const setProfileType = useCallback((type: ProfileType) => {
    setFormData((prev) => ({ ...prev, profileType: type }));
  }, []);

  const setFieldValue = useCallback((field: keyof RegistrationFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error on edit
    setErrors((prev) => {
      if (!prev[field as keyof FormValidationErrors]) return prev;
      const newErrors = { ...prev };
      delete newErrors[field as keyof FormValidationErrors];
      delete newErrors.general;
      return newErrors;
    });
  }, []);

  const validateFieldLocally = (field: keyof RegistrationFormData, val: any): string | undefined => {
    if (field === 'fullName') {
      if (!val || typeof val !== 'string' || val.trim().length < 2) {
        return 'Please enter your full name.';
      }
    }
    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!val || !emailRegex.test(val.trim())) {
        return 'Please enter a valid email address.';
      }
    }
    if (field === 'phoneNumber') {
      const digits = (val || '').replace(/\D/g, '');
      if (digits.length < 10) {
        return 'Please enter a valid 10-digit phone number.';
      }
    }
    if (field === 'termsAccepted') {
      if (!val) {
        return 'You must accept the terms to proceed.';
      }
    }
    return undefined;
  };

  const handleBlur = useCallback(async (field: keyof RegistrationFormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const val = formData[field];
    const localErr = validateFieldLocally(field, val);

    if (localErr) {
      setErrors((prev) => ({ ...prev, [field]: localErr }));
      return;
    }

    // Call REST validator for remote check
    if (field === 'email' || field === 'phoneNumber') {
      setIsValidatingField((prev) => ({ ...prev, [field]: true }));
      try {
        const check = await apiService.validateField(field, String(val));
        if (!check.valid && check.message) {
          setErrors((prev) => ({ ...prev, [field]: check.message }));
        } else {
          setErrors((prev) => {
            const next = { ...prev };
            delete next[field as keyof FormValidationErrors];
            return next;
          });
        }
      } finally {
        setIsValidatingField((prev) => ({ ...prev, [field]: false }));
      }
    } else {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field as keyof FormValidationErrors];
        return next;
      });
    }
  }, [formData]);

  const validateAll = (): boolean => {
    const newErrors: FormValidationErrors = {};
    const nameErr = validateFieldLocally('fullName', formData.fullName);
    if (nameErr) newErrors.fullName = nameErr;

    const emailErr = validateFieldLocally('email', formData.email);
    if (emailErr) newErrors.email = emailErr;

    const phoneErr = validateFieldLocally('phoneNumber', formData.phoneNumber);
    if (phoneErr) newErrors.phoneNumber = phoneErr;

    const termsErr = validateFieldLocally('termsAccepted', formData.termsAccepted);
    if (termsErr) newErrors.termsAccepted = termsErr;

    setErrors(newErrors);
    setTouched({
      fullName: true,
      email: true,
      phoneNumber: true,
      termsAccepted: true,
    });

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e?: React.FormEvent): Promise<boolean> => {
    if (e) e.preventDefault();

    if (!validateAll()) {
      return false;
    }

    setIsSubmitting(true);
    setErrors((prev) => {
      const next = { ...prev };
      delete next.general;
      return next;
    });

    try {
      const res = await apiService.registerUser(formData);
      setRegisteredResponse(res);
      await refreshStats();

      // Trigger celebratory confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#10b981'],
        });
      } catch {
        // Confetti optional
      }

      return true;
    } catch (err: any) {
      setErrors((prev) => ({
        ...prev,
        general: err.message || 'An unexpected error occurred. Please try again.',
      }));
      return false;
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setTouched({});
    setRegisteredResponse(null);
  }, []);

  const openLegalModal = useCallback(async (type: 'terms' | 'privacy') => {
    setLegalModalType(type);
    setIsLegalLoading(true);
    try {
      const doc = await apiService.fetchLegalDoc(type);
      setLegalDoc(doc);
    } catch {
      setLegalDoc(null);
    } finally {
      setIsLegalLoading(false);
    }
  }, []);

  const closeLegalModal = useCallback(() => {
    setLegalModalType(null);
    setLegalDoc(null);
  }, []);

  return (
    <RegistrationContext.Provider
      value={{
        formData,
        errors,
        touched,
        isSubmitting,
        isValidatingField,
        registeredResponse,
        rolesData,
        statsData,
        recentUsers,
        legalModalType,
        legalDoc,
        isLegalLoading,
        setProfileType,
        setFieldValue,
        handleBlur,
        handleSubmit,
        resetForm,
        openLegalModal,
        closeLegalModal,
        refreshStats,
      }}
    >
      {children}
    </RegistrationContext.Provider>
  );
};

export const useRegistration = (): RegistrationContextType => {
  const context = useContext(RegistrationContext);
  if (!context) {
    throw new Error('useRegistration must be used within a RegistrationProvider');
  }
  return context;
};
