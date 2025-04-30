
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEprStore } from '@/store/useEprStore';
import CSVDropzone from '@/components/CSVDropzone';
import ClassifyTable from '@/components/ClassifyTable';
import LevySummary from '@/components/LevySummary';
import PDFDownload from '@/components/PDFDownload';
import { 
  Card,
  CardHeader,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import { Steps, Step } from '@/components/Steps';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Database, FileSpreadsheet, FileText } from 'lucide-react';

const UploadWizard: React.FC = () => {
  const { currentStep, isAuthenticated, reportReady } = useEprStore();
  const navigate = useNavigate();
  const [uploadMethod, setUploadMethod] = useState<string>('csv');
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);
  
  return (
    <div className="container py-8 mx-auto">
      <h1 className="mb-6 text-3xl font-bold">EPR Levy Report Generator</h1>
      
      <Card className="mb-8">
        <CardHeader className="pb-4">
          <Steps currentStep={currentStep}>
            <Step title="Upload Data" description="Upload your product data" />
            <Step title="Classify Materials" description="Review and classify materials" />
            <Step title="Generate Report" description="Summary and report generation" />
          </Steps>
        </CardHeader>
      </Card>
      
      <div className="mb-10">
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <h2 className="text-xl font-semibold">Choose Upload Method</h2>
              <p className="text-sm text-gray-500">Select how you want to provide your product data</p>
            </CardHeader>
            <CardContent>
              <Tabs value={uploadMethod} onValueChange={setUploadMethod}>
                <TabsList className="grid w-full grid-cols-3 mb-6">
                  <TabsTrigger value="csv">CSV Upload</TabsTrigger>
                  <TabsTrigger value="erp">ERP Integration</TabsTrigger>
                  <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
                </TabsList>
                
                <TabsContent value="csv">
                  <CSVDropzone />
                </TabsContent>
                
                <TabsContent value="erp">
                  <div className="py-8 text-center">
                    <Database className="w-16 h-16 mx-auto mb-4 text-blue-500" />
                    <h3 className="mb-2 text-lg font-medium">Connect to ERP System</h3>
                    <p className="mb-6 text-gray-600">
                      Integrate directly with your Enterprise Resource Planning system
                      to automatically import product data.
                    </p>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-3 max-w-xl mx-auto">
                      <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                        <img src="https://via.placeholder.com/40" alt="SAP" className="mb-2 w-10 h-10" />
                        <span className="text-sm">SAP</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                        <img src="https://via.placeholder.com/40" alt="Oracle" className="mb-2 w-10 h-10" />
                        <span className="text-sm">Oracle</span>
                      </Button>
                      <Button variant="outline" className="flex flex-col items-center justify-center h-24 p-2">
                        <img src="https://via.placeholder.com/40" alt="Microsoft Dynamics" className="mb-2 w-10 h-10" />
                        <span className="text-sm">MS Dynamics</span>
                      </Button>
                    </div>
                    <p className="mt-6 text-sm text-gray-500">
                      Contact support to set up custom ERP integrations.
                    </p>
                  </div>
                </TabsContent>
                
                <TabsContent value="bulk">
                  <div className="py-8 text-center">
                    <FileSpreadsheet className="w-16 h-16 mx-auto mb-4 text-green-500" />
                    <h3 className="mb-2 text-lg font-medium">Bulk Upload</h3>
                    <p className="mb-6 text-gray-600">
                      Upload multiple CSV files or a ZIP archive containing multiple data files.
                    </p>
                    <div className="max-w-md p-6 mx-auto border-2 border-dashed rounded-lg border-gray-300 bg-gray-50">
                      <p className="mb-4 text-sm text-gray-500">
                        Drag and drop multiple CSV files or a ZIP archive here
                      </p>
                      <Button className="mb-2">
                        Select Files
                      </Button>
                      <p className="text-xs text-gray-500">
                        Supports CSV, ZIP, and Excel files up to 50MB
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => alert('This would process the selected upload method')}>
                Continue
              </Button>
            </CardFooter>
          </Card>
        )}
        
        {currentStep === 2 && <ClassifyTable />}
        
        {currentStep === 3 && !reportReady && <LevySummary />}
        
        {currentStep === 3 && reportReady && <PDFDownload />}
      </div>
    </div>
  );
};

export default UploadWizard;
