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

const API_BASE = '/api';

export const apiService = {
  async fetchStats(): Promise<CommunityStats> {
    try {
      const res = await fetch(`${API_BASE}/stats`);
      if (!res.ok) throw new Error('Failed to fetch community statistics');
      return await res.json();
    } catch (err) {
      console.warn('Using fallback stats data', err);
      return {
        verifiedUsersCount: 12480,
        formattedCount: '12,000+',
        satisfactionRate: '99.4%',
        activeProperties: 3540,
        averageMatchTimeDays: 2.4,
        featuredMembers: [
          {
            id: 'mem_1',
            name: 'Sarah Chen',
            role: 'Verified Tenant',
            location: 'San Francisco, CA',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=240&auto=format&fit=crop&q=80',
            quote: 'Found my dream apartment in Hayes Valley in under 3 days. The verified landlord badge gave me total confidence.',
            joinedYears: '2023',
          },
          {
            id: 'mem_2',
            name: 'David Miller',
            role: 'Property Owner',
            location: 'Austin, TX',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=240&auto=format&fit=crop&q=80',
            quote: 'Zero vacancies for 2 straight years. Background checks and automated rent collection make management effortless.',
            joinedYears: '2022',
          },
          {
            id: 'mem_3',
            name: 'Alex Rivera',
            role: 'Verified Tenant',
            location: 'Brooklyn, NY',
            avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80',
            quote: 'Transparent lease terms, no hidden agent markups, and instant communication. The gold standard for renting.',
            joinedYears: '2024',
          },
        ],
      };
    }
  },

  async fetchRoles(): Promise<Record<'tenant' | 'landlord', RoleDetail>> {
    try {
      const res = await fetch(`${API_BASE}/roles`);
      if (!res.ok) throw new Error('Failed to fetch roles');
      return await res.json();
    } catch (err) {
      console.warn('Using fallback roles data', err);
      return {
        tenant: {
          id: 'tenant',
          title: 'I am a Tenant',
          headline: 'Looking to find your next home',
          description: 'Browse verified listings, schedule seamless video tours, and submit direct applications with zero broker fees.',
          benefits: [
            'Direct contact with vetted landlords',
            'Instant identity & credit score passport',
            'Digital lease signing & automated rent payments',
          ],
          iconName: 'home',
        },
        landlord: {
          id: 'landlord',
          title: 'I am a Landlord',
          headline: 'Looking to rent out your property',
          description: 'List properties in minutes, screen high-quality tenants, and manage leases with bank-grade security.',
          benefits: [
            'Pre-screened tenant applicants with verified income',
            'Guaranteed on-time direct deposit rent collection',
            'Automated maintenance requests & lease renewals',
          ],
          iconName: 'building',
        },
      };
    }
  },

  async validateField(field: string, value: string): Promise<{ valid: boolean; message?: string }> {
    try {
      const res = await fetch(`${API_BASE}/validate-field`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ field, value }),
      });
      return await res.json();
    } catch {
      return { valid: true };
    }
  },

  async registerUser(data: RegistrationFormData): Promise<RegistrationResponse> {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to create account. Please check your information.');
    }
    return result;
  },

  async loginUser(data: LoginFormData): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to log in. Please check your credentials.');
    }
    return result;
  },

  async forgotPassword(identifier: string): Promise<{ success: boolean; message: string }> {
    const res = await fetch(`${API_BASE}/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ identifier }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to request password reset.');
    }
    return result;
  },

  async socialLogin(provider: 'google' | 'apple'): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE}/social-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ provider }),
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || `Failed to authenticate with ${provider}.`);
    }
    return result;
  },

  async guestLogin(): Promise<LoginResponse> {
    const res = await fetch(`${API_BASE}/guest-login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const result = await res.json();
    if (!res.ok) {
      throw new Error(result.error || 'Failed to start guest session.');
    }
    return result;
  },

  async fetchRecentUsers(): Promise<RecentUserItem[]> {
    try {
      const res = await fetch(`${API_BASE}/users/recent`);
      if (!res.ok) return [];
      const data = await res.json();
      return data.recentUsers || [];
    } catch {
      return [];
    }
  },

  async fetchLegalDoc(type: 'terms' | 'privacy'): Promise<LegalDocument> {
    try {
      const res = await fetch(`${API_BASE}/legal/${type}`);
      if (!res.ok) throw new Error('Failed to fetch legal document');
      return await res.json();
    } catch {
      return {
        title: type === 'terms' ? 'Terms of Service' : 'Privacy Policy',
        lastUpdated: 'August 2026',
        sections: [
          {
            heading: 'Community Commitment',
            content: 'Our platform is dedicated to creating a safe, verified, and transparent rental marketplace for all members.',
          },
        ],
      };
    }
  },
};
