import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';

interface UserRecord {
  id: string;
  profileType: 'tenant' | 'landlord';
  fullName: string;
  email: string;
  phoneNumber: string;
  termsAccepted: boolean;
  registeredAt: string;
  avatarUrl: string;
  status: 'active' | 'pending_verification';
}

const mockRegisteredUsers: UserRecord[] = [
  {
    id: 'usr_01',
    profileType: 'tenant',
    fullName: 'Elena Rostova',
    email: 'elena.r@example.com',
    phoneNumber: '+1 (555) 234-5678',
    termsAccepted: true,
    registeredAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    status: 'active',
  },
  {
    id: 'usr_02',
    profileType: 'landlord',
    fullName: 'Rajesh Mehta',
    email: 'rajesh.m@propertygroup.com',
    phoneNumber: '+1 (555) 876-5432',
    termsAccepted: true,
    registeredAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    avatarUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    status: 'active',
  },
  {
    id: 'usr_03',
    profileType: 'tenant',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@techhub.io',
    phoneNumber: '+1 (555) 432-1098',
    termsAccepted: true,
    registeredAt: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    status: 'active',
  },
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route: Health check
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
  });

  // API Route: Community statistics & testimonials
  app.get('/api/stats', (_req, res) => {
    const verifiedCount = 12480 + mockRegisteredUsers.length;
    res.json({
      verifiedUsersCount: verifiedCount,
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
    });
  });

  // API Route: Profile Role Definitions & details
  app.get('/api/roles', (_req, res) => {
    res.json({
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
    });
  });

  // API Route: Validate field on blur
  app.post('/api/validate-field', (req, res) => {
    const { field, value } = req.body;
    if (!field || typeof value !== 'string') {
      return res.status(400).json({ valid: false, message: 'Invalid payload' });
    }

    if (field === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        return res.json({ valid: false, message: 'Email address is required' });
      }
      if (!emailRegex.test(value.trim())) {
        return res.json({ valid: false, message: 'Please enter a valid email address' });
      }
      const existing = mockRegisteredUsers.find((u) => u.email.toLowerCase() === value.trim().toLowerCase());
      if (existing) {
        return res.json({ valid: false, message: 'This email is already registered' });
      }
      return res.json({ valid: true });
    }

    if (field === 'fullName') {
      if (!value.trim() || value.trim().length < 2) {
        return res.json({ valid: false, message: 'Please enter your full name (minimum 2 characters)' });
      }
      return res.json({ valid: true });
    }

    if (field === 'phoneNumber') {
      const digits = value.replace(/\D/g, '');
      if (digits.length < 10) {
        return res.json({ valid: false, message: 'Please enter a valid 10-digit phone number' });
      }
      return res.json({ valid: true });
    }

    res.json({ valid: true });
  });

  // API Route: Register new user
  app.post('/api/register', (req, res) => {
    const { profileType, fullName, email, phoneNumber, termsAccepted, preferences } = req.body;

    // Strict validation
    if (!profileType || !['tenant', 'landlord'].includes(profileType)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid profile selection. Please select Tenant or Landlord.',
      });
    }

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid full name.',
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.trim())) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address.',
      });
    }

    const digits = (phoneNumber || '').replace(/\D/g, '');
    if (digits.length < 10) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid 10-digit phone number.',
      });
    }

    if (!termsAccepted) {
      return res.status(400).json({
        success: false,
        error: 'You must agree to the Terms of Service and Privacy Policy.',
      });
    }

    // Check duplicate email
    const duplicate = mockRegisteredUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
    if (duplicate) {
      return res.status(409).json({
        success: false,
        error: 'An account with this email address already exists. Please sign in or use a different email.',
      });
    }

    // Create new record
    const newUser: UserRecord = {
      id: `usr_${Date.now().toString(36)}`,
      profileType: profileType as 'tenant' | 'landlord',
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      phoneNumber: phoneNumber.trim(),
      termsAccepted: true,
      registeredAt: new Date().toISOString(),
      avatarUrl:
        profileType === 'tenant'
          ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80'
          : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
      status: 'active',
    };

    mockRegisteredUsers.unshift(newUser);

    // Return successful payload with onboarding metadata
    res.status(201).json({
      success: true,
      message: 'Account created successfully! Welcome to the rental community.',
      user: newUser,
      token: `jwt_mock_${Date.now()}`,
      onboardingSteps:
        profileType === 'tenant'
          ? [
              { step: 1, title: 'Identity Verification', status: 'ready', description: 'Upload government-issued ID for instant verification' },
              { step: 2, title: 'Rental Preferences', status: 'pending', description: 'Set your preferred locations, budget, and move-in timeline' },
              { step: 3, title: 'Browse Verified Listings', status: 'pending', description: 'Explore verified apartments with 3D virtual walkthroughs' },
            ]
          : [
              { step: 1, title: 'Ownership & Property Details', status: 'ready', description: 'Add your property address and basic features' },
              { step: 2, title: 'Pricing & Availability', status: 'pending', description: 'Set monthly rent, deposit terms, and lease start date' },
              { step: 3, title: 'Publish & Receive Applicants', status: 'pending', description: 'Begin receiving background-checked tenant requests' },
            ],
    });
  });

  // API Route: Recent activity / social proof ticker
  app.get('/api/users/recent', (_req, res) => {
    res.json({
      recentUsers: mockRegisteredUsers.slice(0, 6).map((u) => ({
        id: u.id,
        initials: u.fullName
          .split(' ')
          .map((n) => n[0])
          .join('')
          .toUpperCase()
          .slice(0, 2),
        name: u.fullName,
        role: u.profileType === 'tenant' ? 'Tenant' : 'Landlord',
        timeAgo: 'Just now',
        avatar: u.avatarUrl,
      })),
    });
  });

  // API Route: Legal / Terms & Privacy
  app.get('/api/legal/terms', (_req, res) => {
    res.json({
      title: 'Terms of Service',
      lastUpdated: 'August 2026',
      sections: [
        {
          heading: '1. Community Standards',
          content:
            'All members of the Rental Community platform agree to uphold standards of honesty, fairness, and mutual respect. Landlords pledge non-discriminatory listing practices in strict adherence to fair housing regulations.',
        },
        {
          heading: '2. Identity Verification',
          content:
            'To protect tenants and property owners, identity credentials and contact information are validated via encrypted banking and telecom partners.',
        },
        {
          heading: '3. Digital Leasing & Transactions',
          content:
            'Lease agreements executed through the platform are legally binding electronic contracts. Security deposits and rent payments are held in insured trust accounts.',
        },
      ],
    });
  });

  app.get('/api/legal/privacy', (_req, res) => {
    res.json({
      title: 'Privacy Policy',
      lastUpdated: 'August 2026',
      sections: [
        {
          heading: '1. Information We Collect',
          content:
            'We collect registration details (full name, email address, phone number) and profile selection to deliver tailored matching services and verify account authenticity.',
        },
        {
          heading: '2. Data Protection & Encryption',
          content:
            'All personal data is encrypted at rest using AES-256 and in transit via TLS 1.3. We never sell your personal contact details to third-party marketing brokers.',
        },
        {
          heading: '3. Communication Preferences',
          content:
            'We use SMS and email for transaction notifications, security alerts, and showing confirmations. You may customize your notification frequency at any time.',
        },
      ],
    });
  });

  // API Route: User Login
  app.post('/api/login', (req, res) => {
    const { identifier, password, rememberDevice } = req.body;

    if (!identifier || typeof identifier !== 'string' || !identifier.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your email or phone number.',
      });
    }

    if (!password || typeof password !== 'string' || password.length < 6) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your password (minimum 6 characters).',
      });
    }

    const cleanId = identifier.trim().toLowerCase();
    // Check if matching user in mock list
    let matchedUser = mockRegisteredUsers.find(
      (u) =>
        u.email.toLowerCase() === cleanId ||
        u.phoneNumber.replace(/\D/g, '') === cleanId.replace(/\D/g, '')
    );

    // If not found in mock list, generate an authenticated user session dynamically
    if (!matchedUser) {
      const isEmail = cleanId.includes('@');
      matchedUser = {
        id: `usr_${Date.now().toString(36)}`,
        profileType: 'tenant',
        fullName: isEmail ? cleanId.split('@')[0].replace(/[._]/g, ' ') : 'Verified Member',
        email: isEmail ? cleanId : `${cleanId.replace(/\D/g, '')}@sms.rentals.io`,
        phoneNumber: isEmail ? '+1 (555) 349-2041' : cleanId,
        termsAccepted: true,
        registeredAt: new Date().toISOString(),
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        status: 'active',
      };
      mockRegisteredUsers.push(matchedUser);
    }

    res.json({
      success: true,
      message: 'Login successful! Welcome back to your portfolio.',
      user: matchedUser,
      token: `jwt_session_${Date.now()}_${Math.random().toString(36).substring(7)}`,
      rememberDevice: !!rememberDevice,
      portfolioSummary: {
        totalNetWorth: '$485,250',
        monthlyRentalIncome: '$6,450',
        propertiesTracked: 4,
        portfolioGrowthYOY: '+14.8%',
        creditPassportScore: 785,
        recentTransactions: [
          { id: 'tx_1', label: 'Rent Direct Deposit - Apt 4B', amount: '+$2,450.00', date: 'Yesterday', type: 'credit' },
          { id: 'tx_2', label: 'Maintenance Escrow Hold', amount: '-$180.00', date: 'Aug 21, 2026', type: 'debit' },
          { id: 'tx_3', label: 'Yield Dividend Distribution', amount: '+$340.50', date: 'Aug 18, 2026', type: 'credit' },
        ],
      },
    });
  });

  // API Route: Forgot Password Request
  app.post('/api/forgot-password', (req, res) => {
    const { identifier } = req.body;
    if (!identifier || typeof identifier !== 'string' || !identifier.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please enter your registered email address or phone number.',
      });
    }

    res.json({
      success: true,
      message: `A secure password reset link has been sent to ${identifier.trim()}. Please check your inbox or SMS.`,
      resetToken: `rst_${Date.now()}`,
    });
  });

  // API Route: Social OAuth Login (Google & Apple)
  app.post('/api/social-login', (req, res) => {
    const { provider } = req.body;
    if (!provider || !['google', 'apple'].includes(provider)) {
      return res.status(400).json({ success: false, error: 'Unsupported social provider.' });
    }

    const providerName = provider === 'google' ? 'Google' : 'Apple';
    const mockUser: UserRecord = {
      id: `usr_${provider}_${Date.now().toString(36)}`,
      profileType: 'tenant',
      fullName: provider === 'google' ? 'Alex Rivera (Google)' : 'Alex Rivera (Apple ID)',
      email: `alex.rivera@${provider === 'google' ? 'gmail.com' : 'icloud.com'}`,
      phoneNumber: '+1 (555) 443-8902',
      termsAccepted: true,
      registeredAt: new Date().toISOString(),
      avatarUrl: provider === 'google'
        ? 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=240&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=240&auto=format&fit=crop&q=80',
      status: 'active',
    };

    mockRegisteredUsers.push(mockUser);

    res.json({
      success: true,
      message: `Successfully authenticated with ${providerName}!`,
      user: mockUser,
      token: `jwt_${provider}_${Date.now()}`,
      portfolioSummary: {
        totalNetWorth: '$320,800',
        monthlyRentalIncome: '$3,800',
        propertiesTracked: 2,
        portfolioGrowthYOY: '+11.2%',
        creditPassportScore: 760,
      },
    });
  });

  // API Route: Guest Login
  app.post('/api/guest-login', (_req, res) => {
    const guestUser: UserRecord = {
      id: `usr_guest_${Date.now().toString(36)}`,
      profileType: 'tenant',
      fullName: 'Guest Explorer',
      email: 'guest@rentalcommunity.demo',
      phoneNumber: '+1 (555) 000-DEMO',
      termsAccepted: true,
      registeredAt: new Date().toISOString(),
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80',
      status: 'active',
    };

    res.json({
      success: true,
      message: 'Logged in as Guest! Welcome to the preview discovery hub.',
      user: guestUser,
      token: `jwt_guest_${Date.now()}`,
      isGuest: true,
      portfolioSummary: {
        totalNetWorth: '$210,000',
        monthlyRentalIncome: '$2,200',
        propertiesTracked: 1,
        portfolioGrowthYOY: '+8.4%',
        creditPassportScore: 740,
      },
    });
  });

  // Vite middleware setup
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
