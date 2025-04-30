
import { describe, it, expect, vi } from 'vitest';
import { parseCSV, validateCSVData, calculateTotals } from '../csv-parser';

// Mock data
const validCSVContent = `SKU,Description,Mass (kg)
A123,Plastic Bottle,0.5
B456,Glass Container,0.75
C789,Cardboard Box,0.25`;

const invalidCSVContent = `SKU,Description
A123,Plastic Bottle
B456,Glass Container`;

describe('CSV Parsing Utilities', () => {
  describe('parseCSV', () => {
    it('should parse valid CSV content', async () => {
      const result = await parseCSV(validCSVContent);
      
      expect(result.success).toBe(true);
      expect(result.data).toHaveLength(3);
      expect(result.data[0]).toHaveProperty('SKU', 'A123');
      expect(result.data[0]).toHaveProperty('Description', 'Plastic Bottle');
      expect(result.data[0]).toHaveProperty('Mass (kg)', 0.5);
    });
    
    it('should handle invalid CSV content', async () => {
      const result = await parseCSV(invalidCSVContent);
      
      expect(result.success).toBe(true); // Parsing itself succeeds
      expect(result.data).toHaveLength(2); // 2 rows
      // But validation will fail later
    });
  });
  
  describe('validateCSVData', () => {
    it('should validate CSV data with required columns', () => {
      const parsedData = [
        { 'SKU': 'A123', 'Description': 'Plastic Bottle', 'Mass (kg)': 0.5 },
        { 'SKU': 'B456', 'Description': 'Glass Container', 'Mass (kg)': 0.75 }
      ];
      
      const result = validateCSVData(parsedData);
      
      expect(result.valid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });
    
    it('should reject CSV data missing required columns', () => {
      const parsedData = [
        { 'SKU': 'A123', 'Description': 'Plastic Bottle' },
        { 'SKU': 'B456', 'Description': 'Glass Container' }
      ];
      
      const result = validateCSVData(parsedData);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Missing required column: Mass (kg)');
    });
    
    it('should reject CSV data with empty values in required fields', () => {
      const parsedData = [
        { 'SKU': '', 'Description': 'Plastic Bottle', 'Mass (kg)': 0.5 },
        { 'SKU': 'B456', 'Description': 'Glass Container', 'Mass (kg)': 0.75 }
      ];
      
      const result = validateCSVData(parsedData);
      
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Row 1: SKU cannot be empty');
    });
  });
  
  describe('calculateTotals', () => {
    it('should calculate material totals correctly', () => {
      const materials = [
        { sku: 'A123', description: 'Plastic Bottle', massKg: 0.5, materialCode: 'PET' },
        { sku: 'B456', description: 'Plastic Container', massKg: 0.3, materialCode: 'HDPE' },
        { sku: 'C789', description: 'Glass Bottle', massKg: 0.75, materialCode: 'GLASS' },
        { sku: 'D012', description: 'Another Plastic Bottle', massKg: 0.45, materialCode: 'PET' }
      ];
      
      const result = calculateTotals(materials);
      
      expect(result.petKg).toBe(0.95); // 0.5 + 0.45
      expect(result.hdpeKg).toBe(0.3);
      expect(result.glassKg).toBe(0.75);
      // Use a range check for floating point calculations
      expect(result.amountDueRand).toBeCloseTo(0.95 * 0.34 + 0.3 * 0.31 + 0.75 * 0.25, 2);
    });
    
    it('should handle empty materials array', () => {
      const result = calculateTotals([]);
      
      expect(result.petKg).toBe(0);
      expect(result.hdpeKg).toBe(0);
      expect(result.glassKg).toBe(0);
      expect(result.amountDueRand).toBe(0);
    });
  });
});
