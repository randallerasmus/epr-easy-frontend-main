import axios from 'axios';
import { supabase } from '@/lib/supabase';
import { 
  ClassifyData, 
  ClassifyRequest, 
  ClassifyResponse, 
  QuoteRequest, 
  QuoteResponse, 
  PaymentRequest, 
  PaymentResponse,
  ReportResponse
} from '@/store/useEprStore';
import { MaterialRow } from '@/types/api-types';

const API_BASE = import.meta.env.VITE_API_BASE;

const api = axios.create({
  baseURL: API_BASE,
});

// Auth interceptor
api.interceptors.request.use(async (config) => {
  const { data, error } = await supabase.auth.getSession();
  
  if (data.session && !error) {
    config.headers.Authorization = `Bearer ${data.session.access_token}`;
  }
  
  return config;
});

// Error interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      console.error('Unauthorized access. Redirecting to login.');
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

export interface ApiResponse<T> {
  data: T;
  status: number;
  error?: string;
}

// Mock API for demonstration purposes
const mockApi = {
  classify: (data: ClassifyRequest): Promise<ClassifyResponse> => {
    console.log('Mock API: classify called with', data);
    
    // Convert mass_g to kg for easier processing
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          rows: data.rows.map(row => ({
            sku: row.sku,
            material: ['PET', 'HDPE', 'PP', 'GLASS', 'OTHER'][Math.floor(Math.random() * 5)] as any,
            mass_g: row.mass_g
          }))
        });
      }, 1000);
    });
  },
  
  getQuote: (data: QuoteRequest): Promise<QuoteResponse> => {
    console.log('Mock API: getQuote called with', data);
    
    const materials = ['PET', 'HDPE', 'PP', 'GLASS', 'OTHER'];
    const rates = [2.5, 3.0, 2.0, 1.5, 3.5]; // Rand per kg
    
    // Calculate totals per material
    const materialGroups = data.rows.reduce((acc, row) => {
      const material = row.material;
      if (!acc[material]) {
        acc[material] = 0;
      }
      acc[material] += row.mass_g / 1000; // Convert g to kg
      return acc;
    }, {} as Record<string, number>);
    
    // Create breakdown
    const breakdown = Object.entries(materialGroups).map(([material, kg]) => {
      const materialIndex = materials.indexOf(material);
      const rate = rates[materialIndex >= 0 ? materialIndex : 4];
      const rand = kg * rate;
      
      return { material, kg, rate, rand };
    });
    
    // Calculate total
    const total_rand = breakdown.reduce((total, item) => total + item.rand, 0);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          total_rand,
          breakdown
        });
      }, 1000);
    });
  },
  
  submitPayment: (data: PaymentRequest): Promise<PaymentResponse> => {
    console.log('Mock API: submitPayment called with', data);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          payfast_url: `https://sandbox.payfast.co.za/eng/process?mockquote=${data.quote_id}`
        });
      }, 1000);
    });
  },
  
  getReportStatus: (reportId: string): Promise<ReportResponse> => {
    console.log('Mock API: getReportStatus called with', reportId);
    
    return new Promise((resolve) => {
      setTimeout(() => {
        // For demo, return processing first time, then ready
        const status = localStorage.getItem(`report_${reportId}_status`);
        
        if (!status || status === 'processing') {
          localStorage.setItem(`report_${reportId}_status`, 'ready');
          resolve({
            status: 'processing'
          });
        } else {
          resolve({
            status: 'ready',
            pdf_url: `https://example.com/reports/${reportId}.pdf`,
            xml_url: `https://example.com/reports/${reportId}.xml`,
            csv_url: `https://example.com/reports/${reportId}.csv`
          });
        }
      }, 1000);
    });
  }
};

// CSV Upload
export const uploadCSV = async (file: File): Promise<ApiResponse<{ id: string }>> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/v1/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log('Using mock data for CSV upload');
    // For demo, generate a random ID
    const mockId = `upload-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return { 
      data: { id: mockId }, 
      status: 200
    };
  }
};

// Classification API
export const classifyMaterials = async (data: ClassifyRequest): Promise<ApiResponse<ClassifyResponse>> => {
  try {
    const response = await api.post('/classify', data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log('Using mock data for classification');
    // Use mock API for demo
    const mockResponse = await mockApi.classify(data);
    return { 
      data: mockResponse, 
      status: 200 
    };
  }
};

// Quote API
export const getLevyQuote = async (data: QuoteRequest): Promise<ApiResponse<QuoteResponse>> => {
  try {
    const response = await api.post('/levy/quote', data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log('Using mock data for levy quote');
    // Use mock API for demo
    const mockResponse = await mockApi.getQuote(data);
    return {
      data: mockResponse,
      status: 200
    };
  }
};

// Payment API
export const submitPayment = async (data: PaymentRequest): Promise<ApiResponse<PaymentResponse>> => {
  try {
    const response = await api.post('/levy/pay', data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log('Using mock data for payment');
    // Use mock API for demo
    const mockResponse = await mockApi.submitPayment(data);
    return {
      data: mockResponse,
      status: 200
    };
  }
};

// Report API
export const getReportStatus = async (reportId: string): Promise<ApiResponse<ReportResponse>> => {
  try {
    const response = await api.get(`/reports/${reportId}`);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log('Using mock data for report status');
    // Use mock API for demo
    const mockResponse = await mockApi.getReportStatus(reportId);
    return {
      data: mockResponse,
      status: 200
    };
  }
};

export const getClassificationData = async (id: string): Promise<ApiResponse<ClassifyData>> => {
  try {
    const response = await api.get(`/v1/uploads/${id}/classify`);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    // For demo, generate mock classification data
    console.log('Using mock data for classification');
    
    const mockMaterials: MaterialRow[] = [
      { sku: 'SKU001', description: 'Plastic Water Bottle', massKg: 0.05, materialCode: '' },
      { sku: 'SKU002', description: 'Glass Soda Bottle', massKg: 0.3, materialCode: '' },
      { sku: 'SKU003', description: 'Plastic Milk Container', massKg: 0.1, materialCode: '' },
      { sku: 'SKU004', description: 'Cereal Box', massKg: 0.15, materialCode: '' },
      { sku: 'SKU005', description: 'Aluminum Can', massKg: 0.02, materialCode: '' },
      { sku: 'SKU006', description: 'Yogurt Container', massKg: 0.03, materialCode: '' },
    ];
    
    return { 
      data: { 
        materials: mockMaterials, 
        levyTotals: { petKg: 0, hdpeKg: 0, glassKg: 0, amountDueRand: 0 } 
      }, 
      status: 200
    };
  }
};

export const updateClassificationData = async (id: string, data: ClassifyData): Promise<ApiResponse<ClassifyData>> => {
  try {
    const response = await api.put(`/v1/uploads/${id}/classify`, data);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log('Using mock data for update classification');
    
    // For demo, calculate levy totals based on provided materials
    const petKg = data.materials.reduce((total, mat) => {
      return mat.materialCode === 'PET' ? total + mat.massKg : total;
    }, 0);
    
    const hdpeKg = data.materials.reduce((total, mat) => {
      return mat.materialCode === 'HDPE' ? total + mat.massKg : total;
    }, 0);
    
    const glassKg = data.materials.reduce((total, mat) => {
      return mat.materialCode === 'GLASS' ? total + mat.massKg : total;
    }, 0);
    
    // Calculate levy amount (simple mock calculation)
    const petRate = 3.5; // Rand per kg
    const hdpeRate = 2.8; // Rand per kg
    const glassRate = 1.2; // Rand per kg
    
    const amountDueRand = (petKg * petRate) + (hdpeKg * hdpeRate) + (glassKg * glassRate);
    
    return { 
      data: {
        ...data,
        levyTotals: {
          petKg,
          hdpeKg,
          glassKg,
          amountDueRand
        }
      },
      status: 200
    };
  }
};

export const generateReport = async (id: string): Promise<ApiResponse<{ reportId: string }>> => {
  try {
    const response = await api.post(`/v1/reports/generate/${id}`);
    return { data: response.data, status: response.status };
  } catch (error: any) {
    console.log('Using mock data for report generation');
    return { 
      data: { reportId: `report-${id}` }, 
      status: 200
    };
  }
};

export const getReportDownloadUrl = (id: string): string => {
  return `${API_BASE}/v1/reports/${id}`;
};
