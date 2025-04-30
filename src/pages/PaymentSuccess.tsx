
import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useEprStore } from '@/store/useEprStore';
import { getReportStatus } from '@/services/api';
import { CheckCircle, Loader } from 'lucide-react';

const PaymentSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const reportId = searchParams.get('reportId') || '';
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, uploadId, updateUploadedMonth } = useEprStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isPollActive, setIsPollActive] = useState(true);
  const [reportReady, setReportReady] = useState(false);
  
  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  // Poll for report status
  useEffect(() => {
    if (!reportId || !isPollActive) return;
    
    const pollReport = async () => {
      try {
        const response = await getReportStatus(reportId);
        
        if (response.status === 200) {
          if (response.data.status === 'ready') {
            setReportReady(true);
            setIsPollActive(false);
            
            // Update uploaded month status in store
            if (uploadId) {
              updateUploadedMonth(uploadId, { status: 'paid' });
            }
            
            toast({
              title: 'Report Ready',
              description: 'Your EPR report has been generated and is ready for download.'
            });
          }
        } else {
          toast({
            title: 'Error checking report status',
            description: response.error || 'An unexpected error occurred',
            variant: 'destructive'
          });
        }
      } catch (error) {
        console.error('Error polling report status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    pollReport();
    
    // Poll every 3 seconds
    const interval = setInterval(pollReport, 3000);
    
    return () => {
      clearInterval(interval);
      setIsPollActive(false);
    };
  }, [reportId, isPollActive, toast, uploadId, updateUploadedMonth]);
  
  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };
  
  return (
    <div className="container flex items-center justify-center min-h-screen py-8 mx-auto">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl text-green-600">
            <CheckCircle className="w-6 h-6 mr-2" />
            Payment Successful
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="p-6 mb-4 border-2 border-green-200 border-dashed rounded-lg bg-green-50">
            <p className="mb-4 text-green-800">
              Your payment has been successfully processed. Thank you!
            </p>
            
            {isLoading || !reportReady ? (
              <div className="flex flex-col items-center">
                <Loader className="w-8 h-8 mb-4 text-green-600 animate-spin" />
                <p className="text-green-700">Generating your EPR report...</p>
                <p className="mt-2 text-sm text-green-600">
                  This may take a moment. Please don't close this page.
                </p>
              </div>
            ) : (
              <div className="flex flex-col items-center">
                <CheckCircle className="w-12 h-12 mb-4 text-green-600" />
                <p className="text-green-700">Your EPR report is ready!</p>
                <p className="mt-2 text-sm text-green-600">
                  You can download it from the dashboard.
                </p>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full"
            onClick={handleBackToDashboard}
          >
            Return to Dashboard
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
