
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEprStore, UploadedMonth } from '@/store/useEprStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Download, Plus, Loader, FileText, CheckCircle, Users, HelpCircle, MessageSquare, Code } from 'lucide-react';
import { getReportDownloadUrl } from '@/services/api';

const Dashboard: React.FC = () => {
  const { isAuthenticated, uploadedMonths, setUploadedMonths, companyInfo } = useEprStore();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);
  
  useEffect(() => {
    // Simulate API call to fetch uploaded months
    const fetchUploadedMonths = async () => {
      setIsLoading(true);
      
      // In a real app, this would be an API call
      setTimeout(() => {
        // Check if we have some months already stored in the state
        if (uploadedMonths.length === 0) {
          // Mock data for the dashboard if no uploaded months exist
          const mockMonths: UploadedMonth[] = [
            {
              id: 'apr2023',
              month: 'April',
              year: 2023,
              status: 'complete',
              dateUploaded: '2023-05-10T14:30:00Z',
              amountDueRand: 4580.25,
            },
            {
              id: 'may2023',
              month: 'May',
              year: 2023,
              status: 'complete',
              dateUploaded: '2023-06-08T09:15:00Z',
              amountDueRand: 3950.75,
            },
            {
              id: 'jun2023',
              month: 'June',
              year: 2023,
              status: 'paid',
              dateUploaded: '2023-07-05T11:45:00Z',
              amountDueRand: 4210.50,
            },
            {
              id: 'jul2023',
              month: 'July',
              year: 2023,
              status: 'classified',
              dateUploaded: '2023-08-03T16:20:00Z',
              amountDueRand: 3850.25,
            },
          ];
          setUploadedMonths(mockMonths);
        }
        setIsLoading(false);
      }, 1000);
    };
    
    fetchUploadedMonths();
  }, [setUploadedMonths, uploadedMonths.length]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return (
          <Badge variant="outline" className="text-amber-500 bg-amber-50 hover:bg-amber-50">
            <Loader className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case 'classified':
        return (
          <Badge variant="outline" className="text-blue-500 bg-blue-50 hover:bg-blue-50">
            <FileText className="w-3 h-3 mr-1" />
            Classified
          </Badge>
        );
      case 'complete':
        return (
          <Badge variant="outline" className="text-green-500 bg-green-50 hover:bg-green-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            Complete
          </Badge>
        );
      case 'paid':
        return (
          <Badge variant="outline" className="text-green-700 bg-green-50 hover:bg-green-50">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const handleDownloadReport = (id: string) => {
    const downloadUrl = getReportDownloadUrl(id);
    window.open(downloadUrl, '_blank');
  };
  
  const calculateTotalDue = () => {
    return uploadedMonths
      .reduce((total, month) => total + (month.amountDueRand || 0), 0)
      .toFixed(2);
  };

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem('epr-storage');
    // Reload the page to reset the app state
    window.location.href = '/login';
  };
  
  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">EPR Dashboard</h1>
        <div className="flex items-center space-x-4">
          {companyInfo && (
            <div className="flex items-center px-4 py-2 text-sm border rounded-md bg-gray-50">
              <Users className="w-4 h-4 mr-2" />
              <span>{companyInfo.name}</span>
            </div>
          )}
          <Button asChild>
            <Link to="/upload">
              <Plus className="w-4 h-4 mr-2" />
              New Upload
            </Link>
          </Button>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base">Total Reports</CardTitle>
              <CardDescription>All time</CardDescription>
            </div>
            <FileText className="w-8 h-8 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{uploadedMonths.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base">Total Levy Due</CardTitle>
              <CardDescription>Current quarter</CardDescription>
            </div>
            <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"></path>
              <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"></path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">R {calculateTotalDue()}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <div className="space-y-0.5">
              <CardTitle className="text-base">Next Due Date</CardTitle>
              <CardDescription>EPR Filing</CardDescription>
            </div>
            <svg className="w-8 h-8 text-amber-500" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2zm-7 5h5v5h-5v-5z"></path>
            </svg>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">August 31, 2023</div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>EPR Levy History</CardTitle>
          <CardDescription>
            View and manage your EPR reports
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex items-center justify-center p-6">
              <Loader className="w-6 h-6 mr-2 text-blue-500 animate-spin" />
              <p>Loading reports...</p>
            </div>
          ) : uploadedMonths.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Period</TableHead>
                  <TableHead>Date Uploaded</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount Due (R)</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {uploadedMonths.map((month) => (
                  <TableRow key={month.id}>
                    <TableCell className="font-medium">
                      {month.month} {month.year}
                    </TableCell>
                    <TableCell>
                      {format(new Date(month.dateUploaded), 'MMM d, yyyy')}
                    </TableCell>
                    <TableCell>{getStatusBadge(month.status)}</TableCell>
                    <TableCell className="text-right">
                      {month.amountDueRand ? `R ${month.amountDueRand.toFixed(2)}` : '-'}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownloadReport(month.id)}
                        disabled={month.status !== 'complete' && month.status !== 'paid'}
                      >
                        <Download className="w-4 h-4 mr-1" />
                        Report
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="flex flex-col items-center justify-center p-6">
              <svg
                className="w-12 h-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m6.75 12l-3-3m0 0l-3 3m3-3v6m-1.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
                />
              </svg>
              <p className="mt-2 text-gray-500">No reports found</p>
              <Button className="mt-4" asChild>
                <Link to="/upload">
                  <Plus className="w-4 h-4 mr-2" />
                  New Upload
                </Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Need Help?</CardTitle>
          <CardDescription>
            Resources to help you with your EPR reporting
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">EPR Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500">
                  Official guidelines for EPR compliance in South Africa
                </p>
              </CardContent>
              <div className="px-6 pb-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/guidelines">
                    <FileText className="w-4 h-4 mr-2" />
                    View Guidelines
                  </Link>
                </Button>
              </div>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Material Codes</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500">
                  Reference guide for material classification codes
                </p>
              </CardContent>
              <div className="px-6 pb-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/material-codes">
                    <Code className="w-4 h-4 mr-2" />
                    View Codes
                  </Link>
                </Button>
              </div>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Contact Support</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500">
                  Get help with your EPR reporting needs
                </p>
              </CardContent>
              <div className="px-6 pb-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/contact">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Contact Us
                  </Link>
                </Button>
              </div>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">FAQs</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <p className="text-xs text-gray-500">
                  Answers to common questions about EPR reporting
                </p>
              </CardContent>
              <div className="px-6 pb-4">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <Link to="/faqs">
                    <HelpCircle className="w-4 h-4 mr-2" />
                    View FAQs
                  </Link>
                </Button>
              </div>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
