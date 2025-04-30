
import React, { useState } from 'react';
import { ArrowLeft, Search, HelpCircle, Plus, Minus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  {
    question: "What is EPR and why do I need to comply?",
    answer: "Extended Producer Responsibility (EPR) is a policy approach where producers are given a significant financial and/or physical responsibility for the treatment or disposal of post-consumer products. In South Africa, EPR regulations require producers, importers, and retailers of certain products to take responsibility for their products at the end of their life cycle. Compliance is mandatory for specified industries to promote a circular economy and reduce waste.",
    category: "general"
  },
  {
    question: "How do I determine if I need to register as a producer?",
    answer: "You need to register as a producer if you: 1) Manufacture or import packaging materials or products, 2) Place more than 10 tons of any identified products on the market annually, or 3) Have an annual turnover exceeding R1 million from the sale of identified products. If any of these criteria apply to your business, you must register with the Department of Environment, Forestry and Fisheries (DEFF) or a recognized Producer Responsibility Organization (PRO).",
    category: "registration"
  },
  {
    question: "What are the deadlines for EPR submissions?",
    answer: "Quarterly reports are due on April 30 (Q1), July 31 (Q2), October 31 (Q3), and January 31 (Q4). Annual reports must be submitted by March 31 of the following year. Financial audit reports are due by June 30 of the following year. Missing these deadlines can result in penalties, including fines and potential suspension of your producer registration.",
    category: "reporting"
  },
  {
    question: "How are EPR fees calculated?",
    answer: "EPR fees are calculated based on the type and weight of materials you place on the market. Each material category (e.g., PET, HDPE, Glass) has a specific rate per kilogram. The system calculates your total fee by multiplying the weight of each material by its corresponding rate. These rates are reviewed annually by regulatory authorities and may be adjusted based on recycling costs and recovery targets.",
    category: "billing"
  },
  {
    question: "Can I get an exemption from EPR obligations?",
    answer: "Exemptions are limited and typically apply only to very small businesses (annual turnover below R1 million and less than 10 tons of material) or specific research and educational purposes. Even if exempt from full producer registration, basic reporting may still be required. To apply for an exemption, you must submit a formal application to the Department of Environment, Forestry and Fisheries with supporting documentation.",
    category: "registration"
  },
  {
    question: "What happens if I miss a reporting deadline?",
    answer: "Missing a reporting deadline may result in penalties ranging from financial fines to suspension of your producer registration. For first-time offenders, there is usually a grace period of 14 days with a written warning. Subsequent violations may incur fines starting at R5,000 per day of non-compliance. Persistent non-compliance can lead to criminal charges in severe cases.",
    category: "reporting"
  },
  {
    question: "How do I classify materials that are composites or multi-layered?",
    answer: "Composite or multi-layered materials should be classified based on the predominant material by weight. If no single material exceeds 50% of the total weight, you should classify it under the 'OTHER' category. For complex packaging with separable components, each component should be classified and reported separately according to its material type.",
    category: "classification"
  },
  {
    question: "Can I join a Producer Responsibility Organization (PRO) instead of reporting individually?",
    answer: "Yes, joining an approved Producer Responsibility Organization (PRO) is an alternative to individual compliance. PROs handle EPR obligations collectively on behalf of their members, often resulting in administrative efficiency and cost savings. When joining a PRO, you'll pay membership fees plus material-based fees, but the PRO will handle reporting and compliance requirements on your behalf.",
    category: "general"
  },
  {
    question: "How do I make corrections to a submitted report?",
    answer: "If you need to correct a submitted report, log into your account, navigate to the Reports section, and select the specific report that needs correction. Click the 'Request Amendment' button and provide details about the necessary corrections. Amendments must be submitted within 30 days of the original submission. Significant changes may require supporting documentation.",
    category: "reporting"
  },
  {
    question: "How can I download my EPR certificates after payment?",
    answer: "EPR certificates become available for download once your payment has been processed and verified. To access your certificates, log into your dashboard, navigate to the Reports section, and look for reports with a 'Paid' status. Click on the download icon to retrieve your EPR compliance certificate, which serves as proof of your compliance with EPR regulations for the reporting period.",
    category: "billing"
  },
  {
    question: "What documentation do I need to keep for EPR audits?",
    answer: "You should maintain detailed records for at least 5 years, including: 1) Sales data showing quantities of products placed on market, 2) Material specifications for all packaging used, 3) Import/export documentation if applicable, 4) EPR fee payment receipts and certificates, 5) Correspondence with regulatory authorities, and 6) Waste management contracts if managing your own waste collection.",
    category: "compliance"
  },
  {
    question: "Is there a minimum threshold for reporting?",
    answer: "Yes, businesses with an annual turnover below R1 million from identified products AND placing less than 10 tons of these products on the market annually may qualify for exemption from full EPR requirements. However, minimal reporting obligations may still apply. If you exceed either of these thresholds, full EPR compliance is mandatory.",
    category: "reporting"
  },
];

const FAQs: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [expandedFAQs, setExpandedFAQs] = useState<{ [key: string]: boolean }>({});
  
  const toggleFAQ = (question: string) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [question]: !prev[question]
    }));
  };
  
  const filteredFAQs = faqs.filter(faq => 
    (activeTab === 'all' || faq.category === activeTab) && 
    (faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
     faq.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  
  const categories = [
    { id: 'all', name: 'All FAQs' },
    { id: 'general', name: 'General' },
    { id: 'registration', name: 'Registration' },
    { id: 'reporting', name: 'Reporting' },
    { id: 'billing', name: 'Billing & Payments' },
    { id: 'classification', name: 'Classification' },
    { id: 'compliance', name: 'Compliance' },
  ];

  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
        <Button variant="outline" asChild>
          <Link to="/dashboard">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <div className="flex items-center">
            <HelpCircle className="w-6 h-6 mr-2 text-blue-600" />
            <CardTitle>EPR System FAQs</CardTitle>
          </div>
          <CardDescription>
            Find answers to common questions about EPR compliance and reporting
          </CardDescription>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search for questions or keywords..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="mb-4 flex flex-wrap">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id}>
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {filteredFAQs.length > 0 ? (
            <div className="space-y-4">
              {filteredFAQs.map((faq, index) => (
                <div 
                  key={index}
                  className="border rounded-lg overflow-hidden"
                >
                  <div 
                    className={`px-6 py-4 flex items-center justify-between cursor-pointer ${expandedFAQs[faq.question] ? 'bg-blue-50' : 'bg-white'}`}
                    onClick={() => toggleFAQ(faq.question)}
                  >
                    <h3 className="font-medium text-lg">{faq.question}</h3>
                    <Button variant="ghost" size="sm">
                      {expandedFAQs[faq.question] ? 
                        <Minus className="h-4 w-4" /> : 
                        <Plus className="h-4 w-4" />}
                    </Button>
                  </div>
                  {expandedFAQs[faq.question] && (
                    <div className="px-6 py-4 bg-gray-50">
                      <p className="text-gray-700 whitespace-pre-line">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <HelpCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">No FAQs found</h3>
              <p className="text-gray-500">
                Try adjusting your search or filter criteria
              </p>
            </div>
          )}
          
          <div className="bg-blue-50 p-6 rounded-lg mt-8">
            <h4 className="text-lg font-semibold mb-2">Still have questions?</h4>
            <p className="text-gray-700">
              If you couldn't find the answer you were looking for, our support team is here to help.
            </p>
            <div className="mt-4">
              <Button asChild>
                <Link to="/contact">Contact Support</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FAQs;
