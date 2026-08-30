import {
  CommunityStats,
  LegalDocument,
  LoginFormData,
  LoginResponse,
  RecentUserItem,
  RegistrationFormData,
  RegistrationResponse,
  RoleDetail,
} from '../types';
import {
  authApi,
  bookingApi,
  invoiceApi,
  landlordRentRequestApi,
  leaseApi,
  propertiesApi,
  rentRequestApi,
} from '../api';
import { toPropertyListings, toPropertyListing } from '../adapters/property.adapter';
import { toUserProfile } from '../adapters/user.adapter';
import { PropertyQuery, CreatePropertyRequest } from '../types/property.types';
import {
  BackendRentRequest,
  CreateRentRequestPayload,
  RentRequestFamilyType,
  RentRequestStatus,
} from '../api/rentRequests.api';
import { BackendBooking, CreateBookingPayload } from '../api/bookings.api';
import { BackendInvoice, CreateInvoicePayload, InvoiceStatus } from '../api/invoices.api';
import { BackendLease, CreateLeasePayload, LeaseStatus } from '../api/leases.api';

const getLoginIdentity = (identifier: string) => {
  const value = identifier.trim();
  return value.includes('@') ? { email: value } : { phone: value };
};

const onboardingForRole = (role: 'tenant' | 'landlord' | 'admin') =>
  role === 'landlord'
    ? [
        {
          step: 1,
          title: 'Complete landlord profile',
          status: 'ready' as const,
          description: 'Add business contact and verification details.',
        },
        {
          step: 2,
          title: 'List your first property',
          status: 'pending' as const,
          description: 'Create a verified rental listing when ready.',
        },
      ]
    : role === 'admin'
      ? [
          {
            step: 1,
            title: 'Complete admin setup',
            status: 'ready' as const,
            description: 'Review operational access, trust controls, and escalation workflow.',
          },
          {
            step: 2,
            title: 'Monitor marketplace health',
            status: 'pending' as const,
            description: 'Approve issues, resolve escalations, and track platform activity.',
          },
        ]
      : [
          {
            step: 1,
            title: 'Complete tenant profile',
            status: 'ready' as const,
            description: 'Add income, occupation, and rental preferences.',
          },
          {
            step: 2,
            title: 'Browse verified rentals',
            status: 'pending' as const,
            description: 'Find a property and submit a rental request.',
          },
        ];

export const apiService = {
  async fetchStats(): Promise<CommunityStats> {
    const result = await propertiesApi.list({ limit: 1 });
    return {
      verifiedUsersCount: 0,
      formattedCount: '0',
      satisfactionRate: '0%',
      activeProperties: result.pagination.total,
      averageMatchTimeDays: 0,
      featuredMembers: [],
    };
  },

  async fetchRoles(): Promise<Record<'tenant' | 'landlord' | 'admin', RoleDetail>> {
    return {
      tenant: {
        id: 'tenant',
        title: 'I am a Tenant',
        headline: 'Looking to find your next home',
        description: 'Browse verified listings and submit direct rental requests.',
        benefits: [
          'Direct contact with verified landlords',
          'Tenant profile and rental request tracking',
          'Digital lease workflow support',
        ],
        iconName: 'home',
      },
      landlord: {
        id: 'landlord',
        title: 'I am a Landlord',
        headline: 'Looking to rent out your property',
        description: 'Create listings, review requests, and manage leases.',
        benefits: ['Verified property listing workflow', 'Tenant request management', 'Lease and invoice tools'],
        iconName: 'building',
      },
      admin: {
        id: 'admin',
        title: 'I am an Admin',
        headline: 'Managing marketplace operations and trust',
        description: 'Review escalations, support compliance, and keep operations running smoothly.',
        benefits: ['Operational oversight', 'Escalation management', 'Trust workflow visibility'],
        iconName: 'building',
      },
    };
  },

  async validateField(field?: string, value?: string): Promise<{ valid: boolean; message?: string }> {
    const text = (value ?? '').trim();

    if (field === 'email' && text) {
      const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
      return isValid ? { valid: true } : { valid: false, message: 'Please enter a valid email address.' };
    }

    if (field === 'phoneNumber' && text) {
      const digits = text.replace(/\D/g, '');
      const isValid = digits.length >= 10;
      return isValid ? { valid: true } : { valid: false, message: 'Please enter a valid 10-digit phone number.' };
    }

    return { valid: true };
  },

  async registerUser(data: RegistrationFormData): Promise<RegistrationResponse> {
    const role = data.profileType;
    const result = await authApi.register({
      name: data.fullName,
      email: data.email,
      phone: data.phoneNumber,
      role,
    });

    return {
      success: result.success,
      message: result.message || 'Account created successfully. Please sign in with OTP.',
      user: toUserProfile(result.data.user),
      token: '',
      onboardingSteps: onboardingForRole(role),
    };
  },

  async requestLoginOtp(data: LoginFormData) {
    const payload = {
      ...getLoginIdentity(data.identifier),
      role: data.role,
    };

    return data.role === 'admin'
      ? authApi.requestAdminLoginOtp(payload)
      : authApi.requestLoginOtp(payload);
  },

  async verifyLoginOtp(data: LoginFormData, otp: string): Promise<LoginResponse> {
    const payload = {
      ...getLoginIdentity(data.identifier),
      role: data.role,
      otp,
    };

    const result = data.role === 'admin'
      ? await authApi.verifyAdminLoginOtp(payload)
      : await authApi.verifyLoginOtp(payload);

    return {
      success: result.success,
      message: result.message || 'Signed in successfully',
      user: toUserProfile(result.data.user),
      token: result.token,
      rememberDevice: data.rememberDevice,
      isGuest: false,
      portfolioSummary: {
        totalNetWorth: '$0',
        monthlyRentalIncome: '$0',
        propertiesTracked: 0,
        portfolioGrowthYOY: '0%',
        creditPassportScore: 0,
      },
    };
  },

  async loginUser(data: LoginFormData) {
    return this.requestLoginOtp(data);
  },

  async fetchProperties(query?: PropertyQuery) {
    const result = await propertiesApi.list(query);
    return {
      properties: toPropertyListings(result.data),
      pagination: result.pagination,
    };
  },

  async fetchLandlordProperties(landlordId: string, query?: Omit<PropertyQuery, 'landlordId'>) {
    const result = await propertiesApi.listByLandlord(landlordId, query);
    return {
      properties: toPropertyListings(result.data),
      pagination: result.pagination,
    };
  },

  async fetchPropertyById(id: string) {
    const result = await propertiesApi.getById(id);
    return toPropertyListings([result.data])[0];
  },

  async createProperty(payload: CreatePropertyRequest) {
    const result = await propertiesApi.create(payload);
    return toPropertyListing(result.data);
  },

  async forgotPassword(forgotIdentifier: string): Promise<{ success: boolean; message: string }> {
    throw new Error('Password reset is not available because this backend uses OTP login.');
  },

  async socialLogin(provider: string): Promise<LoginResponse> {
    throw new Error('Social login is not implemented on this backend yet.');
  },

  async guestLogin(): Promise<LoginResponse> {
    throw new Error('Guest authentication is not implemented on this backend yet.');
  },

  async submitRentRequest(payload: CreateRentRequestPayload): Promise<BackendRentRequest> {
    const result = await rentRequestApi.create(payload);
    return result.data.rentRequest;
  },

  async fetchMyRentRequests(): Promise<BackendRentRequest[]> {
    const result = await rentRequestApi.list();
    return result.data.rentRequests || [];
  },

  async fetchLandlordRentRequests(): Promise<BackendRentRequest[]> {
    const result = await landlordRentRequestApi.list();
    return result.data.rentRequests || [];
  },

  async updateLandlordRentRequestStatus(id: string, status: 'approved' | 'rejected'): Promise<BackendRentRequest> {
    const result = await landlordRentRequestApi.updateStatus(id, status);
    return result.data.rentRequest;
  },

  async fetchMyBookings(): Promise<BackendBooking[]> {
    const result = await bookingApi.list();
    return result.data.bookings || [];
  },

  async fetchBookingById(id: string): Promise<BackendBooking> {
    const result = await bookingApi.getById(id);
    return result.data.booking;
  },

  async createBooking(payload: CreateBookingPayload): Promise<BackendBooking> {
    const result = await bookingApi.create(payload);
    return result.data.booking;
  },

  async updateBookingStatus(id: string, status: 'confirmed' | 'rejected'): Promise<BackendBooking> {
    const result = await bookingApi.updateStatus(id, status);
    return result.data.booking;
  },

  async cancelBooking(id: string): Promise<BackendBooking> {
    const result = await bookingApi.cancel(id);
    return result.data.booking;
  },

  async fetchMyLeases(): Promise<BackendLease[]> {
    const result = await leaseApi.list();
    return result.data.leases || [];
  },

  async fetchLeaseById(id: string): Promise<BackendLease> {
    const result = await leaseApi.getById(id);
    return result.data.lease;
  },

  async createLease(payload: CreateLeasePayload): Promise<BackendLease> {
    const result = await leaseApi.create(payload);
    return result.data.lease;
  },

  async signLease(id: string): Promise<BackendLease> {
    const result = await leaseApi.sign(id);
    return result.data.lease;
  },

  async updateLeaseStatus(id: string, status: LeaseStatus): Promise<BackendLease> {
    const result = await leaseApi.updateStatus(id, status);
    return result.data.lease;
  },

  async fetchMyInvoices(): Promise<BackendInvoice[]> {
    const result = await invoiceApi.list();
    return result.data.invoices || [];
  },

  async fetchInvoiceById(id: string): Promise<BackendInvoice> {
    const result = await invoiceApi.getById(id);
    return result.data.invoice;
  },

  async generateInvoice(payload: CreateInvoicePayload): Promise<BackendInvoice> {
    const result = await invoiceApi.generate(payload);
    return result.data.invoice;
  },

  async updateInvoiceStatus(id: string, status: InvoiceStatus): Promise<BackendInvoice> {
    const result = await invoiceApi.updateStatus(id, status);
    return result.data.invoice;
  },

  async downloadInvoicePdf(id: string): Promise<Blob> {
    return invoiceApi.downloadPdf(id);
  },

  async fetchRecentUsers(): Promise<RecentUserItem[]> {
    return [];
  },

  async fetchLegalDoc(type: 'terms' | 'privacy'): Promise<LegalDocument> {
    return {
      title: type === 'terms' ? 'Terms of Service' : 'Privacy Policy',
      lastUpdated: 'August 2026',
      sections: [
        {
          heading: 'Trust Core Rental Marketplace',
          content: 'Legal content endpoint is not implemented on the backend yet.',
        },
      ],
    };
  },
};
