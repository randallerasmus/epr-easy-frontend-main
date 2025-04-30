
import React, { useState } from 'react';
import { ArrowLeft, MessageSquare, Send, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useEprStore } from '@/store/useEprStore';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const { companyInfo } = useEprStore();
  const [name, setName] = useState(companyInfo?.contactPerson || '');
  const [email, setEmail] = useState(companyInfo?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [category, setCategory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, we would send this to an API
    console.log({ name, email, subject, message, category });
    
    // Show toast
    toast({
      title: "Message Sent",
      description: "We've received your message and will respond shortly.",
    });
    
    // Reset form and show success state
    setIsSubmitted(true);
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Contact Support</h1>
        <Button variant="outline" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Contact Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center">
                <MessageSquare className="w-6 h-6 mr-2 text-blue-600" />
                <CardTitle>Get in Touch</CardTitle>
              </div>
              <CardDescription>
                Fill out the form below and our support team will respond as soon as possible.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setCategory(value)} required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Payments</SelectItem>
                          <SelectItem value="compliance">EPR Compliance</SelectItem>
                          <SelectItem value="reporting">Reporting Issues</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="Subject of your inquiry"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="How can we help you?"
                      rows={6}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      required
                    />
                  </div>
                  
                  <Button type="submit" className="w-full">
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-green-100 p-3 mb-4">
                    <CheckCircle className="h-12 w-12 text-green-600" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">Message Sent Successfully!</h3>
                  <p className="text-gray-600 mb-6 max-w-md">
                    Thank you for contacting us. We've received your message and will get back to you within 24-48 hours.
                  </p>
                  <Button onClick={() => setIsSubmitted(false)}>Send Another Message</Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
        
        {/* Contact Information */}
        <div>
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-lg">Contact Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-medium">Phone Support</p>
                <p className="text-gray-600">+27 (0)21 555 1234</p>
                <p className="text-sm text-gray-500">Monday - Friday: 8:00 - 17:00 SAST</p>
              </div>
              
              <div>
                <p className="font-medium">Email Support</p>
                <p className="text-gray-600">support@epr-system.co.za</p>
                <p className="text-sm text-gray-500">24/7 response within 48 hours</p>
              </div>
              
              <div>
                <p className="font-medium">Office Address</p>
                <p className="text-gray-600">
                  100 Long Street<br />
                  Cape Town, 8001<br />
                  South Africa
                </p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Urgent Support</CardTitle>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4">
                <AlertDescription>
                  For urgent matters related to EPR filing deadlines or compliance issues, please call our dedicated hotline.
                </AlertDescription>
              </Alert>
              <Button variant="destructive" className="w-full">
                Call Urgent Support Line
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
