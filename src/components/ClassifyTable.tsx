
import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useEprStore, MaterialRow, QuoteRequest, QuoteResponse } from '@/store/useEprStore';
import { getClassificationData, updateClassificationData, getLevyQuote } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Search, Save, Loader } from 'lucide-react';
import LevySummaryCard from './LevySummaryCard';

// Material code options
const MATERIAL_OPTIONS = [
  { value: 'PET', label: 'PET - Polyethylene Terephthalate' },
  { value: 'HDPE', label: 'HDPE - High-Density Polyethylene' },
  { value: 'PP', label: 'PP - Polypropylene' },
  { value: 'GLASS', label: 'GLASS - Glass Packaging' },
  { value: 'OTHER', label: 'OTHER - Other Materials' },
];

const ClassifyTable: React.FC = () => {
  const { 
    uploadId, 
    classifyData, 
    setClassifyData, 
    setCurrentStep,
    companyInfo,
    setCurrentQuoteId
  } = useEprStore();
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMaterials, setFilteredMaterials] = useState<MaterialRow[]>([]);
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteResponse, setQuoteResponse] = useState<QuoteResponse | null>(null);
  const [quoteId, setQuoteId] = useState<string | null>(null);
  
  useEffect(() => {
    if (!uploadId) return;
    
    const loadClassificationData = async () => {
      setLoading(true);
      
      try {
        const response = await getClassificationData(uploadId);
        
        if (response.error) {
          toast({
            title: 'Error loading data',
            description: response.error,
            variant: 'destructive',
          });
          return;
        }
        
        setClassifyData(response.data);
        setFilteredMaterials(response.data.materials);
      } catch (error) {
        toast({
          title: 'Error loading data',
          description: 'An unexpected error occurred. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };
    
    loadClassificationData();
  }, [uploadId, setClassifyData, toast]);
  
  useEffect(() => {
    if (!classifyData?.materials) return;
    
    const filtered = classifyData.materials.filter(
      (material) =>
        material.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        material.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    setFilteredMaterials(filtered);
  }, [searchTerm, classifyData]);
  
  const handleMaterialChange = (index: number, materialCode: string) => {
    if (!classifyData) return;
    
    const updatedMaterials = [...classifyData.materials];
    updatedMaterials[index].materialCode = materialCode;
    
    setClassifyData({
      ...classifyData,
      materials: updatedMaterials,
    });
  };
  
  const handleSaveAndGetQuote = async () => {
    if (!uploadId || !classifyData || !companyInfo) return;
    
    setSaving(true);
    
    try {
      // First, save the classification data
      const saveResponse = await updateClassificationData(uploadId, classifyData);
      
      if (saveResponse.error) {
        toast({
          title: 'Error saving classification',
          description: saveResponse.error,
          variant: 'destructive',
        });
        return;
      }
      
      // Update store with latest data including updated levy totals
      setClassifyData(saveResponse.data);
      
      // Now, get the levy quote
      setQuoteLoading(true);
      
      // Convert MaterialRows to ClassifiedRows for the API
      const quoteRequest: QuoteRequest = {
        rows: classifyData.materials.map(material => ({
          sku: material.sku,
          // Convert to the format expected by the API
          material: material.materialCode as 'PET'|'HDPE'|'PP'|'GLASS'|'OTHER',
          mass_g: Math.round(material.massKg * 1000) // Convert kg to g
        })),
        org_id: companyInfo.orgId
      };
      
      const quoteResponse = await getLevyQuote(quoteRequest);
      
      if (quoteResponse.error) {
        toast({
          title: 'Error getting levy quote',
          description: quoteResponse.error,
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Quote generated successfully',
        description: 'Your EPR levy quote has been generated.',
      });
      
      // Generate a mock quote ID for demo purposes
      const mockQuoteId = `quote-${uploadId}-${Date.now()}`;
      setQuoteId(mockQuoteId);
      setCurrentQuoteId(mockQuoteId);
      
      // Set the quote response
      setQuoteResponse(quoteResponse.data);
      
    } catch (error) {
      toast({
        title: 'Error processing request',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
      setQuoteLoading(false);
    }
  };
  
  // Check if all items are classified
  const allClassified = classifyData?.materials.every(
    (material) => material.materialCode && material.materialCode !== ''
  );
  
  if (loading) {
    return (
      <Card className="w-full">
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <Loader className="w-10 h-10 mx-auto text-blue-500 animate-spin" />
            <p className="mt-4 text-gray-600">Loading classification data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  if (!classifyData || classifyData.materials.length === 0) {
    return (
      <Card className="w-full">
        <CardContent className="p-6">
          <div className="text-center">
            <p className="text-gray-600">No data available for classification.</p>
            <Button
              className="mt-4"
              onClick={() => setCurrentStep(1)}
            >
              Go Back to Upload
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  // If we have a quote response, show the levy summary card
  if (quoteResponse && quoteId) {
    return (
      <LevySummaryCard 
        quoteId={quoteId} 
        totalAmount={quoteResponse.total_rand} 
        breakdown={quoteResponse.breakdown} 
      />
    );
  }
  
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Classify Materials</CardTitle>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search SKU or description..."
              className="w-64 pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="border rounded-md">
          <div className="max-h-[500px] overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>SKU</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead className="text-right">Mass (kg)</TableHead>
                  <TableHead className="text-center">Material Type</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMaterials.map((material, index) => (
                  <TableRow key={material.sku}>
                    <TableCell className="font-medium">{material.sku}</TableCell>
                    <TableCell>{material.description}</TableCell>
                    <TableCell className="text-right">{material.massKg.toFixed(2)}</TableCell>
                    <TableCell>
                      <Select
                        value={material.materialCode || ''}
                        onValueChange={(value) => handleMaterialChange(
                          classifyData.materials.findIndex(m => m.sku === material.sku),
                          value
                        )}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select Material" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Materials</SelectLabel>
                            {MATERIAL_OPTIONS.map((option) => (
                              <SelectItem key={option.value} value={option.value}>
                                {option.label}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
        <div className="flex justify-between mt-6">
          <Button 
            variant="outline" 
            onClick={() => setCurrentStep(1)}
          >
            Back
          </Button>
          <Button
            onClick={handleSaveAndGetQuote}
            disabled={saving || quoteLoading || !allClassified || !companyInfo}
          >
            {saving || quoteLoading ? (
              <>
                <Loader className="w-4 h-4 mr-2 animate-spin" />
                {saving ? 'Saving...' : 'Generating Quote...'}
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save & Get Quote
              </>
            )}
          </Button>
        </div>
        {!allClassified && (
          <p className="mt-2 text-sm text-amber-600">
            All items must be classified before continuing.
          </p>
        )}
        {!companyInfo && (
          <p className="mt-2 text-sm text-amber-600">
            Please complete your company profile in Settings before continuing.
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ClassifyTable;
