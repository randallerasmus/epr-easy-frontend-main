
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// API types based on the contracts
export interface MaterialRow {
  sku: string;
  description: string;
  massKg: number;
  materialCode: string;
}

export interface ClassifyRequest {
  rows: {
    sku: string;
    mass_g: number;
    desc: string;
  }[];
}

export interface ClassifyResponse {
  rows: {
    sku: string;
    material: 'PET'|'HDPE'|'PP'|'GLASS'|'OTHER';
    mass_g: number;
  }[];
}

export interface ClassifiedRow {
  sku: string;
  material: 'PET'|'HDPE'|'PP'|'GLASS'|'OTHER';
  mass_g: number;
}

export interface QuoteRequest {
  rows: ClassifiedRow[];
  org_id: string;
}

export interface QuoteResponse {
  total_rand: number;
  breakdown: {
    material: string;
    kg: number;
    rate: number;
    rand: number;
  }[];
}

export interface PaymentRequest {
  quote_id: string;
}

export interface PaymentResponse {
  payfast_url: string;
}

export interface ReportResponse {
  status: 'processing'|'ready';
  pdf_url?: string;
  xml_url?: string;
  csv_url?: string;
}

export interface LevyTotals {
  petKg: number;
  hdpeKg: number;
  glassKg: number;
  amountDueRand: number;
}

export interface ClassifyData {
  materials: MaterialRow[];
  levyTotals: LevyTotals;
}

export interface UploadedMonth {
  id: string;
  month: string;
  year: number;
  status: 'pending' | 'classified' | 'complete' | 'paid';
  dateUploaded: string;
  amountDueRand?: number;
}

export interface CompanyInfo {
  name: string;
  address: string;
  registrationNumber: string;
  regNumber: string;
  contactEmail: string;
  email: string;
  contactPerson: string;
  phone: string;
  orgId: string;
}

export interface EprState {
  // Authentication
  isAuthenticated: boolean;
  user: any | null;
  setUser: (user: any | null) => void;
  
  // Company Info
  companyInfo: CompanyInfo | null;
  setCompanyInfo: (info: CompanyInfo) => void;

  // Quote info
  currentQuoteId: string | null;
  setCurrentQuoteId: (quoteId: string | null) => void;
  
  // Upload wizard state
  currentStep: number;
  setCurrentStep: (step: number) => void;
  
  // CSV upload
  uploadId: string | null;
  setUploadId: (id: string | null) => void;
  isUploading: boolean;
  setIsUploading: (isUploading: boolean) => void;
  
  // Classification data
  classifyData: ClassifyData | null;
  setClassifyData: (data: ClassifyData | null) => void;
  
  // Dashboard data
  uploadedMonths: UploadedMonth[];
  setUploadedMonths: (months: UploadedMonth[]) => void;
  addUploadedMonth: (month: UploadedMonth) => void;
  updateUploadedMonth: (id: string, data: Partial<UploadedMonth>) => void;
  
  // Report state
  reportReady: boolean;
  setReportReady: (ready: boolean) => void;
  
  // Reset wizard
  resetWizard: () => void;
}

export const useEprStore = create<EprState>()(
  persist(
    (set) => ({
      // Authentication
      isAuthenticated: false,
      user: null,
      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),
      
      // Company info
      companyInfo: null,
      setCompanyInfo: (info) => set({ companyInfo: info }),

      // Quote info
      currentQuoteId: null,
      setCurrentQuoteId: (quoteId) => set({ currentQuoteId: quoteId }),
      
      // Upload wizard state
      currentStep: 1,
      setCurrentStep: (step) => set({ currentStep: step }),
      
      // CSV upload
      uploadId: null,
      setUploadId: (id) => set({ uploadId: id }),
      isUploading: false,
      setIsUploading: (isUploading) => set({ isUploading }),
      
      // Classification data
      classifyData: null,
      setClassifyData: (data) => set({ classifyData: data }),
      
      // Dashboard data
      uploadedMonths: [],
      setUploadedMonths: (months) => set({ uploadedMonths: months }),
      addUploadedMonth: (month) => set((state) => ({ 
        uploadedMonths: [...state.uploadedMonths, month] 
      })),
      updateUploadedMonth: (id, data) => set((state) => ({
        uploadedMonths: state.uploadedMonths.map(month => 
          month.id === id ? { ...month, ...data } : month
        )
      })),
      
      // Report state
      reportReady: false,
      setReportReady: (ready) => set({ reportReady: ready }),
      
      // Reset wizard
      resetWizard: () => set({ 
        currentStep: 1, 
        uploadId: null, 
        classifyData: null, 
        reportReady: false 
      }),
    }),
    {
      name: 'epr-storage',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        uploadedMonths: state.uploadedMonths,
        companyInfo: state.companyInfo,
      }),
    }
  )
);
