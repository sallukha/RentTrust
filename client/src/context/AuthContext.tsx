import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { apiService } from '../services/api';
import { PROPERTY_LISTINGS } from '../data/properties';
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
  handleSocialLogin: (provider: 'google' | 'apple') => Promise<boolean>;
  handleGuestLogin: () => Promise<boolean>;
  quickDemoLogin: (role: ActiveUserRole) => void;
  
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
  password: '',
  rememberDevice: true,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('logo-splash');
  
  // Guest Experience State
  const [guestTab, setGuestTab] = useState<GuestBottomTab>('home');
  const [guestHomeVariant, setGuestHomeVariant] = useState<'rental' | 'stays'>('rental');
  const [selectedProperty, setSelectedProperty] = useState<PropertyListing | null>(PROPERTY_LISTINGS[0]);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_saved_props');
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return ['prop-echo-lake', 'prop-skyline-industrial'];
        }
      }
    }
    return ['prop-echo-lake', 'prop-skyline-industrial'];
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
    return {
      id: 'usr_alex_chen',
      fullName: 'Alex Chen',
      email: 'alex.chen@designhub.io',
      phoneNumber: '+1 (555) 234-5678',
      profileType: 'tenant',
      termsAccepted: true,
      registeredAt: '2024-01-15',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      status: 'active',
    };
  });
  const [authToken, setAuthToken] = useState<string | null>(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('rental_token') || 'demo_token_xyz';
    }
    return 'demo_token_xyz';
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
    return {
      totalNetWorth: '$1,240,000',
      monthlyRentalIncome: '$14,800',
      propertiesTracked: 4,
      portfolioGrowthYOY: '+12.4%',
      creditPassportScore: 842,
    };
  });
  const [isGuestSession, setIsGuestSession] = useState<boolean>(false);

  const [loginData, setLoginData] = useState<LoginFormData>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('rental_saved_identifier');
      if (saved) {
        return { identifier: saved, password: '', rememberDevice: true };
      }
    }
    return initialLoginData;
  });

  const [loginErrors, setLoginErrors] = useState<LoginFormErrors>({});
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isSocialLoading, setIsSocialLoading] = useState<'google' | 'apple' | null>(null);
  const [isGuestLoading, setIsGuestLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active Role ('tenant' | 'landlord')
  const [activeRole, setActiveRole] = useState<ActiveUserRole>('tenant');

  // Tenant Rental Application State
  const [rentalApplication, setRentalApplication] = useState<RentalApplicationData>(() => {
    return {
      id: 'app_skyline_402',
      propertyId: 'prop-skyline-industrial',
      propertyTitle: 'Skyline Vista Apartments',
      unit: 'Unit 402',
      address: '128 Harbor St.',
      monthlyRent: '$3,200.00',
      rentNumeric: 3200,
      applicantName: 'Alex Chen',
      applicantAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      applicantOccupation: 'Senior Product Designer at Stripe',
      applicantLocation: 'Seattle, WA',
      reputationScore: 942,
      reputationBadge: 'ELITE PREFERRED',
      moveInDate: '2024-10-15',
      leaseDurationMonths: 12,
      occupantsCount: 1,
      purpose: 'residential',
      documentType: 'drivers_license',
      frontDocumentName: 'drivers_license_front.png',
      backDocumentName: 'drivers_license_back.png',
      faceMatchCompleted: true,
      employmentType: 'full_time',
      companyName: 'Stripe',
      jobTitle: 'Senior Product Designer',
      annualIncome: '$165,000',
      paystubUploaded: true,
      linkedinUrl: 'https://linkedin.com/in/alexchen',
      portfolioUrl: 'https://alexchen.design',
      agreedToTerms: true,
      status: 'shortlisted',
      submittedAt: 'Oct 12, 09:30 AM',
      viewedAt: 'Oct 13, 02:15 PM',
      shortlistedAt: 'Oct 14, 11:00 AM',
      isLeaseSigned: false,
      digitalKeyCode: '4492',
      lockboxCode: '8842',
    };
  });

  const [tenantAppStep, setTenantAppStep] = useState<number>(0);

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
    if (newRole === 'landlord') {
      setCurrentScreen('dashboard');
    } else {
      setCurrentScreen('tenant-home');
    }
  }, []);

  const updateRentalApplication = useCallback((data: Partial<RentalApplicationData>) => {
    setRentalApplication((prev) => ({ ...prev, ...data }));
  }, []);

  const startApplicationForProperty = useCallback((prop?: PropertyListing) => {
    const targetProp = prop || selectedProperty || PROPERTY_LISTINGS[0];
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
    }));
    setTenantAppStep(0);
    setCurrentScreen('tenant-new-request');
  }, [selectedProperty]);

  const submitRentalApplication = useCallback(() => {
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
    setTenantAppStep(5); // Show "What happens next" confirmed screen
  }, []);

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
    setCurrentScreen('property-detail');
  }, []);

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
    if (!loginData.password) {
      errors.password = 'Please enter your password.';
    } else if (loginData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters.';
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return false;
    }

    setIsLoggingIn(true);
    setLoginErrors({});

    try {
      const res: LoginResponse = await apiService.loginUser(loginData);
      
      setCurrentUser(res.user);
      setAuthToken(res.token);
      setPortfolioSummary(res.portfolioSummary);
      setIsGuestSession(false);

      if (loginData.rememberDevice) {
        localStorage.setItem('rental_saved_identifier', loginData.identifier);
        localStorage.setItem('rental_user', JSON.stringify(res.user));
        localStorage.setItem('rental_token', res.token);
        localStorage.setItem('rental_portfolio', JSON.stringify(res.portfolioSummary));
      } else {
        localStorage.removeItem('rental_saved_identifier');
      }

      if (returnToScreenAfterAuth) {
        setCurrentScreen(returnToScreenAfterAuth);
        setReturnToScreenAfterAuth(null);
      } else {
        setCurrentScreen('dashboard');
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
    } catch (err: any) {
      setLoginErrors({
        general: err.message || 'Invalid credentials. Please try again.',
      });
      return false;
    } finally {
      setIsLoggingIn(false);
    }
  };

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
        setCurrentScreen(returnToScreenAfterAuth);
        setReturnToScreenAfterAuth(null);
      } else {
        setCurrentScreen('dashboard');
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
    } catch (err: any) {
      setLoginErrors({
        general: err.message || `Failed to sign in with ${provider}.`,
      });
      return false;
    } finally {
      setIsSocialLoading(null);
    }
  };

  const handleGuestLogin = async (): Promise<boolean> => {
    setIsGuestLoading(true);
    setLoginErrors({});

    try {
      const res = await apiService.guestLogin();
      setCurrentUser(res.user);
      setAuthToken(res.token);
      setPortfolioSummary(res.portfolioSummary);
      setIsGuestSession(true);

      setCurrentScreen('guest-home');
      setGuestTab('home');
      return true;
    } catch (err: any) {
      setLoginErrors({
        general: err.message || 'Failed to start guest session.',
      });
      return false;
    } finally {
      setIsGuestLoading(false);
    }
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
    } catch (err: any) {
      setForgotError(err.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsForgotSubmitting(false);
    }
  };

  const quickDemoLogin = useCallback((role: ActiveUserRole) => {
    setIsGuestSession(false);
    setActiveRole(role);
    setLoginErrors({});

    if (role === 'tenant') {
      const tenantUser: UserProfile = {
        id: 'usr_alex_chen',
        profileType: 'tenant',
        fullName: 'Alex Chen',
        email: 'alex.chen@designhub.io',
        phoneNumber: '+1 (555) 234-5678',
        termsAccepted: true,
        registeredAt: new Date().toISOString(),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
        status: 'active',
      };
      setCurrentUser(tenantUser);
      setAuthToken('mock_tenant_token_842');
      localStorage.setItem('rental_user', JSON.stringify(tenantUser));
      localStorage.setItem('rental_token', 'mock_tenant_token_842');
      localStorage.setItem('rental_active_role', 'tenant');

      if (returnToScreenAfterAuth) {
        setCurrentScreen(returnToScreenAfterAuth);
        setReturnToScreenAfterAuth(null);
      } else {
        setCurrentScreen('tenant-home');
      }
    } else {
      const landlordUser: UserProfile = {
        id: 'usr_marcus_sterling',
        profileType: 'landlord',
        fullName: 'Marcus Sterling',
        email: 'marcus@sterlingholdings.com',
        phoneNumber: '+1 (555) 890-1234',
        termsAccepted: true,
        registeredAt: new Date().toISOString(),
        avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
        status: 'active',
      };
      const landlordPortfolio: PortfolioSummary = {
        totalNetWorth: '$2.4M',
        monthlyRentalIncome: '$14,800',
        propertiesTracked: 4,
        portfolioGrowthYOY: '+14.2%',
        creditPassportScore: 942,
      };
      setCurrentUser(landlordUser);
      setAuthToken('mock_landlord_token_942');
      setPortfolioSummary(landlordPortfolio);
      localStorage.setItem('rental_user', JSON.stringify(landlordUser));
      localStorage.setItem('rental_token', 'mock_landlord_token_942');
      localStorage.setItem('rental_portfolio', JSON.stringify(landlordPortfolio));
      localStorage.setItem('rental_active_role', 'landlord');

      if (returnToScreenAfterAuth) {
        setCurrentScreen(returnToScreenAfterAuth);
        setReturnToScreenAfterAuth(null);
      } else {
        setCurrentScreen('dashboard');
      }
    }

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.5 },
      });
    } catch {
      // ignore
    }
  }, [returnToScreenAfterAuth]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    setAuthToken(null);
    setPortfolioSummary(null);
    setIsGuestSession(true);
    localStorage.removeItem('rental_user');
    localStorage.removeItem('rental_token');
    localStorage.removeItem('rental_portfolio');
    setCurrentScreen('login');
  }, []);

  return (
    <AuthContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        guestTab,
        setGuestTab,
        guestHomeVariant,
        setGuestHomeVariant,
        selectedProperty,
        setSelectedProperty,
        openPropertyDetail,
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
        isLoggingIn,
        isSocialLoading,
        isGuestLoading,
        showPassword,
        toggleShowPassword,
        setLoginFieldValue,
        handleLoginSubmit,
        handleSocialLogin,
        handleGuestLogin,
        quickDemoLogin,
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

