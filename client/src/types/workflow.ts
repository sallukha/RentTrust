export type ActiveUserRole = 'tenant' | 'landlord' | 'admin';

export type RentalPurpose = 'residential' | 'family' | 'bachelor' | 'work' | 'student';
export type DocumentTypeId = 'drivers_license' | 'passport' | 'national_id';
export type EmploymentTypeId = 'full_time' | 'part_time' | 'self_employed' | 'student';

export type ApplicationStatus =
  | 'draft'
  | 'submitted'
  | 'viewed'
  | 'shortlisted'
  | 'pending_review'
  | 'approved'
  | 'declined';

export interface RentalApplicationData {
  id: string;
  propertyId: string;
  propertyTitle: string;
  unit: string;
  address: string;
  monthlyRent: string;
  rentNumeric: number;
  
  // Applicant details
  applicantName: string;
  applicantAvatar: string;
  applicantOccupation: string;
  applicantLocation: string;
  reputationScore: number;
  reputationBadge: string;
  
  // Step 1: Rental details
  moveInDate: string;
  leaseDurationMonths: number;
  occupantsCount: number;
  purpose: RentalPurpose;
  
  // Step 2: Identity
  documentType: DocumentTypeId;
  frontDocumentName?: string;
  frontDocumentUrl?: string;
  backDocumentName?: string;
  backDocumentUrl?: string;
  faceMatchCompleted: boolean;
  
  // Step 3: Employment
  employmentType: EmploymentTypeId;
  companyName: string;
  jobTitle: string;
  annualIncome: string;
  monthlyIncome?: string;
  paystubUploaded: boolean;
  paystubUrl?: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
  
  // Final Review
  agreedToTerms: boolean;
  status: ApplicationStatus;
  
  // Timestamps
  submittedAt?: string;
  viewedAt?: string;
  shortlistedAt?: string;
  decisionAt?: string;
  
  // Lease & keys
  isLeaseSigned?: boolean;
  signedAt?: string;
  digitalKeyCode?: string;
  lockboxCode?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'landlord' | 'tenant' | 'system';
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: string;
  attachment?: {
    type: 'pdf_agreement' | 'image' | 'inspection';
    title: string;
    size: string;
    url?: string;
  };
  actions?: ('sign_agreement' | 'schedule_visit' | 'ask_question')[];
}

export interface ConversationItem {
  id: string;
  participantName: string;
  participantAvatar: string;
  participantScore: number;
  participantBadge?: string;
  propertyTitle: string;
  lastMessage: string;
  timeAgo: string;
  unread: boolean;
  category: 'All' | 'Unread' | 'Properties' | 'Archive';
}
