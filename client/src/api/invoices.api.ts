import { apiRequest } from './client';
import { ApiSuccess } from '../types/api.types';

export type InvoiceStatus = 'unpaid' | 'paid' | 'overdue' | 'cancelled';

export interface InvoiceLineItem {
  description?: string;
  amount?: number;
}

export interface BackendInvoice {
  _id?: string;
  id?: string;
  invoiceNumber?: string;
  leaseId?: string;
  tenantId?: string;
  landlordId?: string;
  amountDue?: number;
  dueDate?: string | Date;
  lineItems?: InvoiceLineItem[];
  status?: InvoiceStatus;
  issuedAt?: string | Date;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateInvoicePayload {
  leaseId: string;
  tenantId: string;
  landlordId: string;
  amountDue: number;
  dueDate: string;
  lineItems: InvoiceLineItem[];
}

export interface ListInvoicesApiData {
  invoices: BackendInvoice[];
}

export interface InvoiceApiData {
  invoice: BackendInvoice;
}

export const invoiceApi = {
  list() {
    return apiRequest<ApiSuccess<ListInvoicesApiData>>('/invoices', {
      auth: true,
    });
  },

  getById(id: string) {
    return apiRequest<ApiSuccess<InvoiceApiData>>(`/invoices/${id}`, {
      auth: true,
    });
  },

  generate(payload: CreateInvoicePayload) {
    return apiRequest<ApiSuccess<InvoiceApiData>>('/invoices/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
      auth: true,
    });
  },

  updateStatus(id: string, status: InvoiceStatus) {
    return apiRequest<ApiSuccess<InvoiceApiData>>(`/invoices/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
      auth: true,
    });
  },

  downloadPdf(id: string) {
    return apiRequest<Blob>(`/invoices/${id}/pdf`, {
      auth: true,
    });
  },
};
