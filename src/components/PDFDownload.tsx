
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useEprStore } from '@/store/useEprStore';
import { getReportDownloadUrl } from '@/services/api';
import { Download, CheckCircle, ExternalLink, ArrowRight, FileSpreadsheet, FileText, Database } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PDFDownload: React.FC = () => {
  const { uploadId, resetWizard } = useEprStore();
  
  if (!uploadId) {
    return null;
  }
  
  const handleDownload = (format: string) => {
    const downloadUrl = getReportDownloadUrl(uploadId);
    window.open(`${downloadUrl}?format=${format}`, '_blank');
  };
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center text-green-700">
          <CheckCircle className="w-6 h-6 mr-2" />
          Report Generated Successfully
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="reports" className="mb-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reports" className="pt-4">
            <div className="p-6 mb-6 border-2 border-dashed rounded-lg bg-green-50 border-green-200">
              <div className="w-16 h-16 mx-auto mb-4 text-green-600">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor">
                  <path d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 224H80c8.8 0 16 7.2 16 16s-7.2 16-16 16H64c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64H80c8.8 0 16 7.2 16 16s-7.2 16-16 16H64c-8.8 0-16-7.2-16-16s7.2-16 16-16zm128 72c8.8 0 16 7.2 16 16s-7.2 16-16 16H64c-8.8 0-16-7.2-16-16s7.2-16 16-16H192zm-64-72h96c8.8 0 16 7.2 16 16s-7.2 16-16 16H128c-8.8 0-16-7.2-16-16s7.2-16 16-16z"/>
                </svg>
              </div>
              <h3 className="mb-2 text-lg font-medium text-green-700">EPR Report Downloads</h3>
              <p className="mb-4 text-green-600">
                Your Extended Producer Responsibility reports are ready in multiple formats
              </p>
              
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <Button onClick={() => handleDownload('pdf')} className="bg-red-600 hover:bg-red-700">
                  <FileText className="w-4 h-4 mr-2" />
                  PDF Report
                </Button>
                <Button onClick={() => handleDownload('csv')} className="bg-green-600 hover:bg-green-700">
                  <FileSpreadsheet className="w-4 h-4 mr-2" />
                  CSV Data
                </Button>
                <Button onClick={() => handleDownload('xml')} className="bg-blue-600 hover:bg-blue-700">
                  <Database className="w-4 h-4 mr-2" />
                  XML Format
                </Button>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="compliance" className="pt-4">
            <div className="p-6 mb-6 border rounded-lg bg-blue-50">
              <h3 className="mb-4 text-lg font-medium text-blue-700">Compliance Information</h3>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg bg-white">
                  <h4 className="text-sm font-medium mb-2">Regulation Compliance</h4>
                  <p className="text-xs text-gray-600 mb-2">
                    This report complies with the latest EPR regulations as of April 2025.
                  </p>
                  <div className="flex items-center text-green-600">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    <span className="text-xs">Compliant with all current regulations</span>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-white">
                  <h4 className="text-sm font-medium mb-2">Submission Status</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Ready for submission</span>
                    <Button size="sm" variant="outline" onClick={() => alert('This would submit to the regulatory body')}>
                      Submit to Authority
                    </Button>
                  </div>
                </div>
                
                <div className="p-4 border rounded-lg bg-white">
                  <h4 className="text-sm font-medium mb-2">PRO Fee Structures</h4>
                  <div className="text-xs text-gray-600">
                    <p className="mb-1">Multiple PRO fee structures supported:</p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>National EPR Standard (applied)</li>
                      <li>PETCO Enhanced</li>
                      <li>GlassRecycle SA</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="history" className="pt-4">
            <div className="p-6 mb-6 border rounded-lg bg-amber-50">
              <h3 className="mb-4 text-lg font-medium text-amber-700">Historical Data</h3>
              <p className="text-sm text-amber-600 mb-4">
                Your compliance data is archived and available for auditing purposes.
              </p>
              
              <div className="overflow-hidden border rounded-lg">
                <table className="min-w-full divide-y bg-white">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-4 py-2 text-xs font-medium text-left text-gray-500">Period</th>
                      <th className="px-4 py-2 text-xs font-medium text-left text-gray-500">Submission</th>
                      <th className="px-4 py-2 text-xs font-medium text-left text-gray-500">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    <tr>
                      <td className="px-4 py-2 text-xs">Q1 2025</td>
                      <td className="px-4 py-2 text-xs">Apr 15, 2025</td>
                      <td className="px-4 py-2 text-xs"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-xs">Q4 2024</td>
                      <td className="px-4 py-2 text-xs">Jan 10, 2025</td>
                      <td className="px-4 py-2 text-xs"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                    </tr>
                    <tr>
                      <td className="px-4 py-2 text-xs">Q3 2024</td>
                      <td className="px-4 py-2 text-xs">Oct 12, 2024</td>
                      <td className="px-4 py-2 text-xs"><span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">Completed</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        <div className="p-6 border rounded-lg bg-blue-50">
          <h3 className="mb-2 text-lg font-medium text-blue-700">Need Help?</h3>
          <p className="mb-4 text-blue-600">
            Learn more about how to submit your EPR report to the authorities
          </p>
          <Button variant="outline">
            <ExternalLink className="w-4 h-4 mr-2" />
            View Submission Guidelines
          </Button>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={resetWizard}>
          Start New Upload
        </Button>
        <Button asChild variant="default">
          <Link to="/dashboard">
            Return to Dashboard
            <ArrowRight className="w-4 h-4 ml-2" />
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PDFDownload;
