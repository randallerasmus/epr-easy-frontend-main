
import React, { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEprStore } from '@/store/useEprStore';
import { submitPayment } from '@/services/api';
import { useToast } from '@/hooks/use-toast';
import { CreditCard, Loader } from 'lucide-react';

interface LevySummaryCardProps {
  quoteId: string;
  totalAmount: number;
  breakdown: {
    material: string;
    kg: number;
    rate: number;
    rand: number;
  }[];
}

const LevySummaryCard: React.FC<LevySummaryCardProps> = ({ quoteId, totalAmount, breakdown }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { uploadId } = useEprStore();
  
  const handlePayment = async () => {
    if (!quoteId) {
      toast({
        title: 'Payment Error',
        description: 'Quote ID is missing',
        variant: 'destructive'
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await submitPayment({ quote_id: quoteId });
      
      if (response.error) {
        toast({
          title: 'Payment Error',
          description: response.error,
          variant: 'destructive'
        });
        return;
      }
      
      // Redirect to PayFast
      const reportId = `report-${uploadId}`; // For demo purposes
      window.location.href = `${response.data.payfast_url}&return_url=${window.location.origin}/payment-success?reportId=${reportId}`;
    } catch (error) {
      toast({
        title: 'Payment Error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl">EPR Levy Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="p-6 mb-4 border rounded-lg bg-blue-50">
          <h3 className="mb-4 text-xl font-medium text-blue-800">Total Due</h3>
          <div className="flex items-center justify-between">
            <span className="text-blue-700">Amount Due</span>
            <span className="text-2xl font-bold text-blue-800">
              R {totalAmount.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div className="border rounded-lg">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="font-medium">Material Breakdown</h3>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {breakdown.map((item, index) => (
                <div key={index} className="flex justify-between py-2 border-b last:border-0">
                  <div>
                    <span className="font-medium">{item.material}</span>
                    <div className="text-sm text-gray-500">
                      {item.kg.toFixed(2)} kg × R {item.rate.toFixed(2)}/kg
                    </div>
                  </div>
                  <span className="font-medium">
                    R {item.rand.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={handlePayment}
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Pay & Generate Report
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default LevySummaryCard;
