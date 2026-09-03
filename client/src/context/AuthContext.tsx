import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { apiService } from '../services/api';
import {
  AppScreen,
  GuestBottomTab,
  LoginFormData,
  LoginFormErrors,
  LoginResponse,
  PortfolioSummary,
  PropertyListing,
  UserProfile,
} from '../types';
import {
  ActiveUserRole,
  RentalApplicationData,
  ChatMessage,
  ConversationItem,
  ApplicationStatus,
} from '../types/workflow';

interface AuthContextType {
  currentScreen: AppScreen;
  setCurrentScreen: (screen: AppScreen) => void;
  
  // Role switcher & Workflow state
  activeRole: ActiveUserRole;
  setActiveRole: (role: ActiveUserRole) => void;
  switchRole: (role: ActiveUserRole) => void;

  // Guest & Property State
  guestTab: GuestBottomTab;
  setGuestTab: (tab: GuestBottomTab) => void;
  guestHomeVariant: 'rental' | 'stays';
  setGuestHomeVariant: (v: 'rental' | 'stays') => void;
  selectedProperty: PropertyListing | null;
  setSelectedProperty: (prop: PropertyListing | null) => void;
  openPropertyDetail: (prop: PropertyListing) => void;
  properties: PropertyListing[];
  isPropertiesLoading: boolean;
  propertiesError: string | null;
  refreshProperties: () => Promise<void>;
  savedPropertyIds: string[];
  toggleSaveProperty: (id: string, e?: React.MouseEvent) => void;
  searchFilterText: string;
  setSearchFilterText: (text: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  isFilterModalOpen: boolean;
  setIsFilterModalOpen: (open: boolean) => void;
  returnToScreenAfterAuth: AppScreen | null;
  setReturnToScreenAfterAuth: (screen: AppScreen | null) => void;

  // Rental Application Workflow
  rentalApplication: RentalApplicationData;
  tenantAppStep: number;
  setTenantAppStep: (step: number) => void;
  updateRentalApplication: (data: Partial<RentalApplicationData>) => void;
  submitRentalApplication: () => void;
  resetRentalApplication: () => void;
  startApplicationForProperty: (prop?: PropertyListing) => void;

  // Chat & Messaging Workflow
  chatMessages: ChatMessage[];
  sendChatMessage: (text: string, attachment?: any) => void;
  conversations: ConversationItem[];
  activeConversationId: string;
  setActiveConversationId: (id: string) => void;
  signRentalAgreement: () => void;

  // Landlord Workflow Actions
  selectedRentRequest: BackendRentRequest | null;
  setSelectedRentRequest: (req: BackendRentRequest | null) => void;
  approveLandlordApplication: (id: string) => void;
  declineLandlordApplication: (id: string) => void;

  // Login State
  loginData: LoginFormData;
  loginErrors: LoginFormErrors;
  isLoggingIn: boolean;
  isSocialLoading: 'google' | 'apple' | null;
  isGuestLoading: boolean;
  showPassword: boolean;
  toggleShowPassword: () => void;
  setLoginFieldValue: (field: keyof LoginFormData, value: any) => void;
  handleLoginSubmit: (e?: React.FormEvent) => Promise<boolean>;
  verifyPendingLoginOtp: (otp: string) => Promise<boolean>;
  pendingLoginOtp: string | null;
  handleSocialLogin: (provider: 'google' | 'apple') => Promise<boolean>;
  handleGuestLogin: () => Promise<boolean>;
  
  // Forgot Password State
  isForgotPasswordOpen: boolean;
  forgotIdentifier: string;
  forgotSuccessMessage: string | null;
  forgotError: string | null;
  isForgotSubmitting: boolean;
  openForgotPassword: () => void;
  closeForgotPassword: () => void;
  setForgotIdentifier: (val: string) => void;
  handleForgotPasswordSubmit: (e?: React.FormEvent) => Promise<void>;

  // Authenticated State
  currentUser: UserProfile | null;
  authToken: string | null;
  portfolioSummary: PortfolioSummary | null;
  isGuestSession: boolean;
  logout: () => void;
}

const initialLoginData: LoginFormData = {
  identifier: '',
  role: 'tenant',
  rememberDevice: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_current_screen') as AppScreen;
      if (saved) return saved;

      // If we have a token but no saved screen, go to dashboard/home
      const token = localStorage.getItem('rental_token');
      if (token) {
        const role = localStorage.getItem('rental_active_role');
        return (role === 'landlord' || role === 'admin') ? 'dashboard' : 'tenant-home';
      }
    }
    return 'logo-splash';
  });

  // Helper to update screen and persist it
  const updateCurrentScreen = useCallback((screen: AppScreen) => {
    setCurrentScreen(screen);
    localStorage.setItem('rental_current_screen', screen);
  }, []);
  
  // Guest Experience State
  const [guestTab, setGuestTab] = useState<GuestBottomTab>('home');
  const [guestHomeVariant, setGuestHomeVariant] = useState<'rental' | 'stays'>('rental');
  const [properties, setProperties] = useState<PropertyListing[]>([]);
  const [isPropertiesLoading, setIsPropertiesLoading] = useState<boolean>(false);
  const [propertiesError, setPropertiesError] = useState<string | null>(null);
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(null);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_saved_props');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      }
    }
    return [];
  });
  const [searchFilterText, setSearchFilterText] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isFilterModalOpen, setIsFilterModalOpen] = useState<boolean>(false);
  const [returnToScreenAfterAuth, setReturnToScreenAfterAuth] = useState<AppScreen | null>(null);

  // Authenticated User State
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_user');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return null;
  });
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('rental_token');
    }
    return null;
  });
  const [portfolioSummary, setPortfolioSummary] = useState<PortfolioSummary | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_portfolio');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return null;
  });
  const [isGuestSession, setIsGuestSession] = useState<boolean>(() => {
    if (typeof window === 'undefined') return true;
    return !localStorage.getItem('rental_token');
  });

  const [loginData, setLoginData] = useState<LoginFormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_saved_identifier');
      if (saved) {
        const savedRole = localStorage.getItem('rental_active_role') === 'landlord' ? 'landlord' : 'tenant';
        return { identifier: saved, role: savedRole, rememberDevice: true };
      }
    }
    return initialLoginData;
  });

  const [loginErrors, setLoginErrors] = useState<LoginFormErrors>({});
  const [pendingLoginOtp, setPendingLoginOtp] = useState<string | null>(() => {
    if (typeof window === 'undefined') return null;
    return sessionStorage.getItem('rental_pending_login_otp');
  });
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isSocialLoading, setIsSocialLoading] = useState<'google' | 'apple' | null>(null);
  const [isGuestLoading, setIsGuestLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active Role ('tenant' | 'landlord')
  const [activeRole, setActiveRole] = useState<ActiveUserRole>(() => {
    if (typeof window === 'undefined') return 'tenant';
    const saved = localStorage.getItem('rental_active_role');
    if (saved === 'landlord' || saved === 'admin') return saved;
    return 'tenant';
  });

  const refreshProperties = useCallback(async () => {
    setIsPropertiesLoading(true);
    setPropertiesError(null);

    try {
      const result = await apiService.fetchProperties({ limit: 50 });
      setProperties(result.properties);
      setSelectedProperty((current) => current || result.properties[0] || null);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to load properties';
      setPropertiesError(message);
      setProperties([]);
      setSelectedProperty(null);
    } finally {
      setIsPropertiesLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshProperties();
  }, [refreshProperties]);

  // Tenant Rental Application State
  const [rentalApplication, setRentalApplication] = useState<RentalApplicationData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_application');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore
        }
      }
    }
    return {
      id: '',
      propertyId: '',
      propertyTitle: '',
      unit: '',
      address: '',
      monthlyRent: '',
      rentNumeric: 0,
      applicantName: '',
      applicantAvatar: '',
      applicantOccupation: '',
      applicantLocation: '',
      reputationScore: 0,
      reputationBadge: '',
      moveInDate: '',
      leaseDurationMonths: 12,
      occupantsCount: 1,
      purpose: 'residential',
      documentType: 'drivers_license',
      frontDocumentName: '',
      backDocumentName: '',
      faceMatchCompleted: false,
      employmentType: 'full_time',
      companyName: '',
      jobTitle: '',
      annualIncome: '',
      paystubUploaded: false,
      linkedinUrl: '',
      portfolioUrl: '',
      agreedToTerms: false,
      status: 'draft',
      submittedAt: '',
      viewedAt: '',
      shortlistedAt: '',
      isLeaseSigned: false,
      digitalKeyCode: '4492',
      lockboxCode: '8842',
    };
  });

  const [tenantAppStep, setTenantAppStep] = useState<number>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_tenant_app_step');
      if (saved) return parseInt(saved, 10);
    }
    return 0;
  });

  // Selected Rent Request State for Landlord Dossier
  const [selectedRentRequest, setSelectedRentRequest] = useState<BackendRentRequest | null>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_selected_rent_request');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return null;
        }
      }
    }
    return null;
  });

  const updateSelectedRentRequest = useCallback((req: BackendRentRequest | null) => {
    setSelectedRentRequest(req);
    if (req) {
      localStorage.setItem('rental_selected_rent_request', JSON.stringify(req));
    } else {
      localStorage.removeItem('rental_selected_rent_request');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rental_application', JSON.stringify(rentalApplication));
  }, [rentalApplication]);

  useEffect(() => {
    localStorage.setItem('rental_tenant_app_step', tenantAppStep.toString());
  }, [tenantAppStep]);

  // Chat & Messaging State
  const [conversations, setConversations] = useState<ConversationItem[]>([
    {
      id: 'conv_marcus',
      participantName: 'Marcus Sterling',
      participantAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      participantScore: 942,
      participantBadge: 'Verified Landlord',
      propertyTitle: 'The Skylark Loft',
      lastMessage: "I've sent the agreement for your review & signature.",
      timeAgo: '2m ago',
      unread: true,
      category: 'All',
    },
    {
      id: 'conv_sarah',
      participantName: 'Sarah Jenkins',
      participantAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
      participantScore: 98,
      participantBadge: 'Elite 98',
      propertyTitle: 'Park Avenue Residence',
      lastMessage: 'Maintenance request #242 resolved.',
      timeAgo: '2h ago',
      unread: false,
      category: 'Properties',
    },
    {
      id: 'conv_alex_f',
      participantName: 'Alex Fischer',
      participantAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      participantScore: 942,
      participantBadge: 'Verified Host',
      propertyTitle: 'Modernist Townhouse',
      lastMessage: 'Looking forward to the viewing tomorrow at 2:30 PM!',
      timeAgo: '1d ago',
      unread: false,
      category: 'All',
    },
  ]);

  const [activeConversationId, setActiveConversationId] = useState<string>('conv_marcus');

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: 'msg_1',
      sender: 'landlord',
      senderName: 'Marcus Sterling',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: "Hi Alex! I've reviewed your application and I'm happy to move forward.",
      timestamp: '10:24 AM',
    },
    {
      id: 'msg_2',
      sender: 'tenant',
      senderName: 'You',
      text: "That's great news! Thank you, Marcus.",
      timestamp: '10:26 AM',
    },
    {
      id: 'msg_3',
      sender: 'landlord',
      senderName: 'Marcus Sterling',
      senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      text: "I've attached the draft agreement. Please take a look and let me know if you have any questions.",
      timestamp: '10:28 AM',
      attachment: {
        type: 'pdf_agreement',
        title: 'Rental_Agreement_v1.pdf',
        size: '2.4 MB',
      },
    },
  ]);

  const switchRole = useCallback((newRole: ActiveUserRole) => {
    setActiveRole(newRole);
    localStorage.setItem('rental_active_role', newRole);
    if (newRole === 'landlord' || newRole === 'admin') {
      updateCurrentScreen('dashboard');
    } else {
      updateCurrentScreen('tenant-home');
    }
  }, [updateCurrentScreen]);

  const updateRentalApplication = useCallback((data: Partial<RentalApplicationData>) => {
    setRentalApplication((prev) => ({ ...prev, ...data }));
  }, []);

  const startApplicationForProperty = useCallback((prop?: PropertyListing) => {
    const targetProp = prop || selectedProperty || properties[0];
    if (!targetProp) {
      return;
    }

    setRentalApplication((prev) => ({
      ...prev,
      propertyId: targetProp.id,
      propertyTitle: targetProp.title,
      unit: 'Unit 402',
      address: targetProp.location,
      monthlyRent: `${targetProp.price}${targetProp.priceUnit || '/mo'}`,
      rentNumeric: targetProp.priceNumeric,
      status: 'draft',
      agreedToTerms: false,
      moveInDate: '',
      companyName: '',
      jobTitle: '',
      annualIncome: '',
    }));
    setTenantAppStep(0);
    updateCurrentScreen('tenant-new-request');
  }, [properties, selectedProperty, updateCurrentScreen]);

  const submitRentalApplication = useCallback(async () => {
    const familyTypeMap: Record<string, 'BACHELOR' | 'FAMILY' | 'STUDENT' | 'WORKING_PROFESSIONAL'> = {
      residential: 'FAMILY',
      family: 'FAMILY',
      bachelor: 'BACHELOR',
      work: 'WORKING_PROFESSIONAL',
      student: 'STUDENT',
    };

    const propertyId = rentalApplication.propertyId || selectedProperty?.id || '';

    // Validate if propertyId is a valid MongoDB ObjectId (24 hex chars)
    // Hardcoded mock IDs like 'prop-skyline-industrial' will fail this check
    const isMongoId = /^[0-9a-fA-F]{24}$/.test(propertyId);

    if (!isMongoId) {
      setLoginErrors({ general: 'Invalid property selected. Please go back and select a property from the explorer again.' });
      return false;
    }

    const rawIncome = Number.parseFloat((rentalApplication.monthlyIncome || rentalApplication.annualIncome || '0').replace(/[^\d.]/g, '')) || 0;
    const computedMonthlyIncome = Math.max(0, Math.round(rawIncome));

    const payload = {
      propertyId,
      moveInDate: rentalApplication.moveInDate || new Date().toISOString().slice(0, 10),
      durationMonths: rentalApplication.leaseDurationMonths || 12,
      occupants: rentalApplication.occupantsCount || 1,
      familyType: familyTypeMap[rentalApplication.purpose || 'residential'] || 'FAMILY',
      currentCity: rentalApplication.applicantLocation || currentUser?.email || 'Seattle',
      pets: false,
      occupation: rentalApplication.jobTitle || 'Professional',
      organization: rentalApplication.companyName || 'Independent',
      monthlyIncome: computedMonthlyIncome,
      frontDocumentUrl: (rentalApplication as any).frontDocumentUrl || undefined,
      backDocumentUrl: (rentalApplication as any).backDocumentUrl || undefined,
      paystubUrl: (rentalApplication as any).paystubUrl || undefined,
      reason: 'Looking for a long-term home in a verified rental community.',
      message: `I am applying for ${rentalApplication.propertyTitle || 'this property'} and would like to move in on ${rentalApplication.moveInDate || 'the requested date'}.`,
    };

    try {
      await apiService.submitRentRequest(payload);

      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // ignore
      }

      const nowStr = 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      setRentalApplication((prev) => ({
        ...prev,
        status: 'submitted',
        submittedAt: nowStr,
      }));
      setTenantAppStep(5);
      return true;
    } catch (error) {
      console.error('Failed to submit rental request:', error);
      const message = error instanceof Error ? error.message : 'Submission failed';
      setLoginErrors({ general: message });
      return false;
    }
  }, [currentUser, rentalApplication, selectedProperty]);

  const resetRentalApplication = useCallback(() => {
    setTenantAppStep(0);
    setRentalApplication((prev) => ({
      ...prev,
      status: 'draft',
      agreedToTerms: false,
    }));
  }, []);

  const sendChatMessage = useCallback((text: string, attachment?: any) => {
    if (!text.trim() && !attachment) return;

    const newMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: activeRole === 'landlord' ? 'landlord' : 'tenant',
      senderName: activeRole === 'landlord' ? 'Marcus Sterling' : 'You',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      attachment,
    };

    setChatMessages((prev) => [...prev, newMsg]);

    // Update conversation snippet
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeConversationId
          ? {
              ...c,
              lastMessage: text.trim() || (attachment ? attachment.title : 'Attachment'),
              timeAgo: 'Just now',
            }
          : c
      )
    );

    // Auto simulated response if tenant asks question
    if (activeRole === 'tenant') {
      setTimeout(() => {
        setChatMessages((prev) => [
          ...prev,
          {
            id: `msg_auto_${Date.now()}`,
            sender: 'landlord',
            senderName: 'Marcus Sterling',
            senderAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
            text: "Thanks for checking in! Everything is looking great on our end.",
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          },
        ]);
      }, 1500);
    }
  }, [activeRole, activeConversationId]);

  const signRentalAgreement = useCallback(() => {
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }

    setRentalApplication((prev) => ({
      ...prev,
      isLeaseSigned: true,
      signedAt: 'Signed Just Now',
      status: 'approved',
    }));

    setChatMessages((prev) => [
      ...prev,
      {
        id: `msg_system_${Date.now()}`,
        sender: 'system',
        senderName: 'RentalTrust Escrow',
        text: 'Rental Agreement successfully executed by Alex Chen and Marcus Sterling. Digital foyer keys activated (Code: 4492).',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
  }, []);

  const approveLandlordApplication = useCallback((id: string) => {
    try {
      confetti({
        particleCount: 90,
        spread: 75,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }

    setRentalApplication((prev) => ({
      ...prev,
      status: 'approved',
      decisionAt: 'Approved Just Now',
    }));
  }, []);

  const declineLandlordApplication = useCallback((id: string) => {
    setRentalApplication((prev) => ({
      ...prev,
      status: 'declined',
      decisionAt: 'Declined',
    }));
  }, []);

  // Forgot Password Modal
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState<boolean>(false);
  const [forgotIdentifier, setForgotIdentifier] = useState<string>('');
  const [forgotSuccessMessage, setForgotSuccessMessage] = useState<string | null>(null);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [isForgotSubmitting, setIsForgotSubmitting] = useState<boolean>(false);

  const openPropertyDetail = useCallback((prop: PropertyListing) => {
    setSelectedProperty(prop);
    updateCurrentScreen('property-detail');
  }, [updateCurrentScreen]);

  const toggleSaveProperty = useCallback((id: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSavedPropertyIds((prev) => {
      const isSaved = prev.includes(id);
      const next = isSaved ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('rental_saved_props', JSON.stringify(next));
      return next;
    });
  }, []);

  const toggleShowPassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const setLoginFieldValue = useCallback((field: keyof LoginFormData, value: any) => {
    setLoginData((prev) => ({ ...prev, [field]: value }));
    setLoginErrors((prev) => {
      if (!prev[field as keyof LoginFormErrors]) return prev;
      const next = { ...prev };
      delete next[field as keyof LoginFormErrors];
      delete next.general;
      return next;
    });
  }, []);

  const handleLoginSubmit = async (e?: React.FormEvent): Promise<boolean> => {
    if (e) e.preventDefault();

    const errors: LoginFormErrors = {};
    if (!loginData.identifier.trim()) {
      errors.identifier = 'Please enter your email or phone number.';
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return false;
    }

    setIsLoggingIn(true);
    setLoginErrors({});

    try {
      const response = await apiService.requestLoginOtp(loginData);
      console.log('[OTP] Full login API response:', response);
      const extractedOtp = typeof response.data?.otp === 'string' ? response.data.otp : null;
      console.log('[OTP] Extracted OTP:', extractedOtp);

      if (!extractedOtp) {
        throw new Error('The login API response did not contain an OTP.');
      }

      setPendingLoginOtp(extractedOtp);
      sessionStorage.setItem('rental_pending_login_otp', extractedOtp);
      console.log('[OTP] OTP before navigation:', extractedOtp);
      updateCurrentScreen('otp-verification');
      return true;
    } catch (err) {
      setLoginErrors({
        general: err instanceof Error ? err.message : 'Unable to request OTP. Please try again.',
      });
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

  const verifyPendingLoginOtp = useCallback(async (otp: string): Promise<boolean> => {
    setIsLoggingIn(true);
    setLoginErrors({});

    try {
      const res: LoginResponse = await apiService.verifyLoginOtp(loginData, otp);

      setCurrentUser(res.user);
      setAuthToken(res.token);
      setPortfolioSummary(res.portfolioSummary);
      setIsGuestSession(false);
      const resolvedRole: ActiveUserRole = res.user.profileType === 'admin' || res.user.profileType === 'landlord' ? res.user.profileType : 'tenant';
      setActiveRole(resolvedRole);
      localStorage.setItem('rental_active_role', resolvedRole);

      // Always persist for reload stability
      localStorage.setItem('rental_user', JSON.stringify(res.user));
      localStorage.setItem('rental_token', res.token);
      localStorage.setItem('rental_portfolio', JSON.stringify(res.portfolioSummary));

      if (loginData.rememberDevice) {
        localStorage.setItem('rental_saved_identifier', loginData.identifier);
      } else {
        localStorage.removeItem('rental_saved_identifier');
      }

      if (returnToScreenAfterAuth) {
        updateCurrentScreen(returnToScreenAfterAuth);
        setReturnToScreenAfterAuth(null);
      } else {
        updateCurrentScreen(res.user.profileType === 'landlord' || res.user.profileType === 'admin' ? 'dashboard' : 'tenant-home');
      }

      try {
        confetti({
          particleCount: 60,
          spread: 60,
          origin: { y: 0.6 },
          colors: ['#0e1628', '#2563eb', '#14b8a6', '#60a5fa'],
        });
      } catch {
        // optional confetti
      }

      return true;
    } catch (err) {
      setLoginErrors({
        general: err instanceof Error ? err.message : 'Invalid OTP. Please try again.',
      });
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  }, [loginData, returnToScreenAfterAuth]);

  const handleSocialLogin = async (provider: 'google' | 'apple'): Promise<boolean> => {
    setIsSocialLoading(provider);
    setLoginErrors({});

    try {
      const res = await apiService.socialLogin(provider);
      setCurrentUser(res.user);
      setAuthToken(res.token);
      setPortfolioSummary(res.portfolioSummary);
      setIsGuestSession(false);

      localStorage.setItem('rental_user', JSON.stringify(res.user));
      localStorage.setItem('rental_token', res.token);
      localStorage.setItem('rental_portfolio', JSON.stringify(res.portfolioSummary));

      if (returnToScreenAfterAuth) {
        updateCurrentScreen(returnToScreenAfterAuth);
        setReturnToScreenAfterAuth(null);
      } else {
        updateCurrentScreen('dashboard');
      }

      try {
        confetti({
          particleCount: 70,
          spread: 65,
          origin: { y: 0.6 },
          colors: provider === 'google' ? ['#ea4335', '#4285f4', '#fbbc05', '#34a853'] : ['#111827', '#6b7280', '#e5e7eb'],
        });
      } catch {
        // optional confetti
      }

      return true;
    } catch (err) {
      setLoginErrors({
        general: err instanceof Error ? err.message : `Failed to sign in with ${provider}.`,
      });
      return false;
    } finally {
      setIsSocialLoading(null);
    }
  };

  const handleGuestLogin = async (): Promise<boolean> => {
    setIsGuestLoading(true);
    setLoginErrors({});

    setCurrentUser(null);
    setAuthToken(null);
    setPortfolioSummary(null);
    setIsGuestSession(true);
    localStorage.removeItem('rental_user');
    localStorage.removeItem('rental_token');
    localStorage.removeItem('rental_portfolio');
    updateCurrentScreen('guest-home');
    setGuestTab('home');
    setIsGuestLoading(false);
    return true;
  };

  const openForgotPassword = useCallback(() => {
    setForgotIdentifier(loginData.identifier || '');
    setForgotSuccessMessage(null);
    setForgotError(null);
    setIsForgotPasswordOpen(true);
  }, [loginData.identifier]);

  const closeForgotPassword = useCallback(() => {
    setIsForgotPasswordOpen(false);
    setForgotSuccessMessage(null);
    setForgotError(null);
  }, []);

  const handleForgotPasswordSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!forgotIdentifier.trim()) {
      setForgotError('Please enter your email or phone number.');
      return;
    }

    setIsForgotSubmitting(true);
    setForgotError(null);

    try {
      const res = await apiService.forgotPassword(forgotIdentifier);
      setForgotSuccessMessage(res.message);
    } catch (err) {
      setForgotError(err instanceof Error ? err.message : 'Failed to send reset link. Please try again.');
    } finally {
      setIsForgotSubmitting(false);
    }
  };

  const logout = useCallback(() => {
    setCurrentUser(null);
    setAuthToken(null);
    setPortfolioSummary(null);
    setIsGuestSession(true);
    localStorage.removeItem('rental_user');
    localStorage.removeItem('rental_token');
    localStorage.removeItem('rental_portfolio');
    localStorage.removeItem('rental_current_screen');
    localStorage.removeItem('rental_registration_form');
    localStorage.removeItem('rental_list_property_form');
    localStorage.removeItem('rental_list_property_step');
    localStorage.removeItem('rental_application');
    localStorage.removeItem('rental_tenant_app_step');
    updateCurrentScreen('login');
  }, [updateCurrentScreen]);

  return (
    <AuthContext.Provider
      value={{
        currentScreen,
        setCurrentScreen: updateCurrentScreen,
        guestTab,
        setGuestTab,
        guestHomeVariant,
        setGuestHomeVariant,
        selectedProperty,
        setSelectedProperty,
        openPropertyDetail,
        properties,
        isPropertiesLoading,
        propertiesError,
        refreshProperties,
        savedPropertyIds,
        toggleSaveProperty,
        searchFilterText,
        setSearchFilterText,
        selectedCategory,
        setSelectedCategory,
        isFilterModalOpen,
        setIsFilterModalOpen,
        returnToScreenAfterAuth,
        setReturnToScreenAfterAuth,
        loginData,
        loginErrors,
        pendingLoginOtp,
        isLoggingIn,
        isSocialLoading,
        isGuestLoading,
        showPassword,
        toggleShowPassword,
        setLoginFieldValue,
        handleLoginSubmit,
        verifyPendingLoginOtp,
        handleSocialLogin,
        handleGuestLogin,
        isForgotPasswordOpen,
        forgotIdentifier,
        forgotSuccessMessage,
        forgotError,
        isForgotSubmitting,
        openForgotPassword,
        closeForgotPassword,
        setForgotIdentifier,
        handleForgotPasswordSubmit,
        activeRole,
        setActiveRole,
        switchRole,
        rentalApplication,
        tenantAppStep,
        setTenantAppStep,
        updateRentalApplication,
        submitRentalApplication,
        resetRentalApplication,
        startApplicationForProperty,
        chatMessages,
        sendChatMessage,
        conversations,
        activeConversationId,
        setActiveConversationId,
        signRentalAgreement,
        selectedRentRequest,
        setSelectedRentRequest: updateSelectedRentRequest,
        approveLandlordApplication,
        declineLandlordApplication,
        currentUser,
        authToken,
        portfolioSummary,
        isGuestSession,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

