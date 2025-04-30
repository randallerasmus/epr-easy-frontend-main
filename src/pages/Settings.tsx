
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Settings as SettingsIcon } from 'lucide-react';
import { useEprStore } from '@/store/useEprStore';

const Settings: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { isAuthenticated, setCompanyInfo } = useEprStore();
  const [companyName, setCompanyName] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Save company info to store
      setCompanyInfo({
        name: companyName,
        address: companyAddress,
        registrationNumber,
        contactEmail,
        orgId: 'ORG-' + Math.floor(100000 + Math.random() * 900000)
      });
      
      toast({
        title: 'Company profile saved',
        description: 'Your company information has been saved successfully.',
      });
      
      // Redirect to dashboard
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: 'Save failed',
        description: 'An error occurred while saving your company information.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 mx-auto">
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <SettingsIcon className="w-5 h-5 mr-2" />
            Company Profile Settings
          </CardTitle>
          <CardDescription>
            Please complete your company profile to continue using the EPR portal
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="companyAddress">Company Address</Label>
              <Input
                id="companyAddress"
                value={companyAddress}
                onChange={(e) => setCompanyAddress(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={registrationNumber}
                onChange={(e) => setRegistrationNumber(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading ? 'Saving...' : 'Save Company Profile'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Settings;
