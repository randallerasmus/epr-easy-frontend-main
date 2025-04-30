
export interface MaterialRow {
  sku: string;
  description: string;
  massKg: number;
  materialCode: string;
}

export type MaterialCode = 'PET' | 'HDPE' | 'PP' | 'GLASS' | 'OTHER';

export interface CompanyInfo {
  name: string;
  regNumber: string;
  registrationNumber: string;
  address: string;
  contactPerson: string;
  email: string;
  contactEmail: string;
  phone: string;
  orgId: string;
}
