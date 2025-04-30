
import Papa, { ParseResult } from 'papaparse';
import { MaterialRow, LevyTotals } from '@/store/useEprStore';

interface CSVParseResult {
  success: boolean;
  data: any[];
  errors: string[];
}

interface ValidationResult {
  valid: boolean;
  errors: string[];
  data?: any[];
}

/**
 * Parses CSV content using PapaParse
 */
export const parseCSV = (csvContent: string): Promise<CSVParseResult> => {
  return new Promise((resolve) => {
    Papa.parse(csvContent, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<any>) => {
        resolve({
          success: true,
          data: results.data,
          errors: results.errors.map(err => err.message)
        });
      },
      error: (error: any) => {
        resolve({
          success: false,
          data: [],
          errors: [error.message]
        });
      }
    });
  });
};

/**
 * Validates parsed CSV data to ensure it has the required columns
 */
export const validateCSVData = (data: any[]): ValidationResult => {
  if (!data || data.length === 0) {
    return {
      valid: false,
      errors: ['No data found in the CSV file']
    };
  }
  
  const requiredColumns = ['SKU', 'Description', 'Mass (kg)'];
  const headerRow = Object.keys(data[0]);
  
  // Check for required columns
  const missingColumns = requiredColumns.filter(col => !headerRow.includes(col));
  if (missingColumns.length > 0) {
    return {
      valid: false,
      errors: missingColumns.map(col => `Missing required column: ${col}`)
    };
  }
  
  // Check for empty values in required fields
  const errors: string[] = [];
  data.forEach((row, index) => {
    requiredColumns.forEach(col => {
      if (row[col] === undefined || row[col] === null || row[col] === '') {
        errors.push(`Row ${index + 1}: ${col} cannot be empty`);
      }
    });
    
    // Validate that Mass is a number
    if (typeof row['Mass (kg)'] !== 'number' || isNaN(row['Mass (kg)'])) {
      errors.push(`Row ${index + 1}: Mass (kg) must be a valid number`);
    }
  });
  
  if (errors.length > 0) {
    return {
      valid: false,
      errors
    };
  }
  
  // Transform data to the format expected by the application
  const transformedData = data.map(row => ({
    sku: row.SKU,
    description: row.Description,
    massKg: row['Mass (kg)'],
    materialCode: ''  // Initially empty, to be filled in classification step
  }));
  
  return {
    valid: true,
    errors: [],
    data: transformedData
  };
};

/**
 * Calculate levy totals based on classified materials
 */
export const calculateTotals = (materials: MaterialRow[]): LevyTotals => {
  // Initialize totals
  const totals: LevyTotals = {
    petKg: 0,
    hdpeKg: 0,
    glassKg: 0,
    amountDueRand: 0
  };
  
  // Levy rates per kg (in Rand)
  const levyRates = {
    PET: 0.34,
    HDPE: 0.31,
    GLASS: 0.25,
    OTHER: 0.28,
    PAPER: 0.22,
    METAL: 0.40
  };
  
  // Calculate totals by material code
  materials.forEach(material => {
    switch (material.materialCode) {
      case 'PET':
        totals.petKg += material.massKg;
        break;
      case 'HDPE':
        totals.hdpeKg += material.massKg;
        break;
      case 'GLASS':
        totals.glassKg += material.massKg;
        break;
    }
    
    // Calculate levy amount
    if (material.materialCode && levyRates[material.materialCode as keyof typeof levyRates]) {
      totals.amountDueRand += material.massKg * levyRates[material.materialCode as keyof typeof levyRates];
    }
  });
  
  // Round to 2 decimal places
  totals.petKg = Number(totals.petKg.toFixed(2));
  totals.hdpeKg = Number(totals.hdpeKg.toFixed(2));
  totals.glassKg = Number(totals.glassKg.toFixed(2));
  totals.amountDueRand = Number(totals.amountDueRand.toFixed(2));
  
  return totals;
};
