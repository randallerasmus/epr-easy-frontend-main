
import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useEprStore } from '@/store/useEprStore';
import { generateReport, getLevyQuote, submitPayment } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { Check, CreditCard, FileText, Loader2 } from 'lucide-react';
import LevySummaryCard from './LevySummaryCard';

const LevySummary: React.FC = () => {
  const { uploadId, classifyData, setCurrentStep, setReportReady, setCurrentQuoteId } = useEprStore();
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [quoteData, setQuoteData] = useState<{ quoteId: string, totalAmount: number, breakdown: any[] } | null>(null);
  
  React.useEffect(() => {
    const fetchQuote = async () => {
      if (!classifyData || !uploadId) return;
      
      setIsLoading(true);
      try {
        // Convert classifyData to format expected by API
        const rows = classifyData.materials.map(material => ({
          sku: material.sku,
          material: material.materialCode as 'PET'|'HDPE'|'PP'|'GLASS'|'OTHER',
          mass_g: material.massKg * 1000 // Convert kg to g
        }));
        
        const response = await getLevyQuote({
          rows,
          org_id: '12345' // Mock org_id for demo
        });
        
        if (response.data) {
          const quoteId = `quote-${Date.now()}`;
          setCurrentQuoteId(quoteId);
          setQuoteData({
            quoteId,
            totalAmount: response.data.total_rand,
            breakdown: response.data.breakdown
          });
        }
      } catch (error) {
        console.error('Error fetching quote:', error);
        toast({
          title: 'Error fetching quote',
          description: 'Failed to fetch levy quote. Please try again.',
          variant: 'destructive',
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuote();
  }, [classifyData, uploadId, toast, setCurrentQuoteId]);
  
  if (!classifyData || !uploadId) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center p-6">
          <div className="text-center">
            <p className="text-gray-600">No levy data available.</p>
            <Button className="mt-4" onClick={() => setCurrentStep(1)}>
              Return to Upload
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  const { petKg, hdpeKg, glassKg, amountDueRand } = classifyData.levyTotals;
  
  const chartData = [
    { name: 'PET', value: petKg },
    { name: 'HDPE', value: hdpeKg },
    { name: 'Glass', value: glassKg },
  ].filter((item) => item.value > 0);
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b'];
  
  const handleGenerateReport = async () => {
    if (!uploadId) return;
    
    setIsGenerating(true);
    
    try {
      const response = await generateReport(uploadId);
      
      if (response.error) {
        toast({
          title: 'Error generating report',
          description: response.error,
          variant: 'destructive',
        });
        return;
      }
      
      toast({
        title: 'Report generated successfully',
        description: 'Your EPR report is ready for download.',
      });
      
      setReportReady(true);
    } catch (error) {
      toast({
        title: 'Error generating report',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>EPR Levy Summary</CardTitle>
        <CardDescription>
          Summary of your Extended Producer Responsibility levy
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="p-6 border rounded-lg bg-gray-50">
            <h3 className="text-lg font-medium">Material Distribution</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor={x > cx ? 'start' : 'end'}
                          dominantBaseline="central"
                        >
                          {`${(percent * 100).toFixed(0)}%`}
                        </text>
                      );
                    }}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    formatter={(value) => {
                      // Ensure value is a number before calling toFixed
                      return typeof value === 'number' ? `${value.toFixed(2)} kg` : `${value} kg`;
                    }} 
                  />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          <div className="flex flex-col space-y-6">
            <div className="p-6 border rounded-lg bg-gray-50">
              <h3 className="mb-4 text-lg font-medium">Material Totals</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">PET</span>
                  <span className="font-medium">{petKg.toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">HDPE</span>
                  <span className="font-medium">{hdpeKg.toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Glass</span>
                  <span className="font-medium">{glassKg.toFixed(2)} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Material</span>
                  <span className="font-medium">
                    {(petKg + hdpeKg + glassKg).toFixed(2)} kg
                  </span>
                </div>
              </div>
            </div>
            
            {!quoteData && isLoading ? (
              <div className="flex items-center justify-center p-6 border rounded-lg bg-blue-50">
                <Loader2 className="w-6 h-6 mr-2 text-blue-500 animate-spin" />
                <p>Calculating levy fees...</p>
              </div>
            ) : (
              <div className="p-6 border rounded-lg bg-blue-50">
                <h3 className="mb-4 text-lg font-medium text-blue-800">EPR Levy Due</h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-700">Total Amount Due</span>
                  <span className="text-2xl font-bold text-blue-800">
                    R {amountDueRand.toFixed(2)}
                  </span>
                </div>
                <p className="mt-2 text-sm text-blue-600">
                  Due by the end of the current quarter
                </p>
              </div>
            )}

            {quoteData && (
              <div className="border rounded-lg bg-green-50 p-4">
                <h3 className="mb-2 text-lg font-medium text-green-800">Payment Ready</h3>
                <p className="mb-4 text-sm text-green-600">
                  Your payment details have been calculated based on your material classification.
                </p>
                <Button
                  className="w-full"
                  onClick={() => handleGenerateReport()}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay & Generate Report
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Compliance Features Section */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-xl font-medium mb-4">Compliance Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Multi-PRO Support</h4>
              <p className="text-sm text-gray-600">
                Our system supports multiple Producer Responsibility Organizations (PROs) 
                and their different fee structures, allowing you to calculate accurate levies.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Historical Compliance Data</h4>
              <p className="text-sm text-gray-600">
                All your compliance data is securely stored for auditing purposes,
                with easy access to historical reports and submissions.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">Regulatory Updates</h4>
              <p className="text-sm text-gray-600">
                Stay compliant with automatic updates when regulations change,
                ensuring your reports always meet the latest requirements.
              </p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-medium mb-2">ERP Integration</h4>
              <p className="text-sm text-gray-600">
                Seamlessly connect with your existing ERP systems or use our bulk
                CSV upload feature for efficient data management.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={() => setCurrentStep(2)}>
          Back to Classification
        </Button>
        <Button
          onClick={handleGenerateReport}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <FileText className="w-4 h-4 mr-2" />
              Generate EPR Report
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LevySummary;
