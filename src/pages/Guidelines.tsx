
import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Guidelines: React.FC = () => {
  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">EPR Guidelines</h1>
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
            <FileText className="w-6 h-6 mr-2 text-blue-600" />
            <CardTitle>Official EPR Guidelines for South Africa</CardTitle>
          </div>
          <CardDescription>
            These guidelines provide essential information about EPR compliance in South Africa
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-3">What is EPR?</h3>
            <p className="text-gray-700">
              Extended Producer Responsibility (EPR) is an environmental policy approach in which a 
              producer's responsibility for a product is extended to the post-consumer stage of a 
              product's life cycle. EPR shifts responsibility upstream to the producer and away from 
              municipalities, and provides incentives to producers to incorporate environmental 
              considerations into the design of their products.
            </p>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Key Requirements</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Register as a producer or producer responsibility organization (PRO)</li>
              <li>Submit EPR plans for approval</li>
              <li>Keep records of the quantity of identified products placed on the market</li>
              <li>Pay the required EPR levy for materials produced or imported</li>
              <li>Submit regular reports on the implementation of EPR measures</li>
              <li>Meet targets for the collection, recycling, and recovery of waste</li>
            </ol>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Reporting Periods</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="border-blue-100">
                <CardContent className="pt-6">
                  <p className="font-semibold">Quarterly Reporting</p>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Q1: January - March (Due: April 30)</li>
                    <li>Q2: April - June (Due: July 31)</li>
                    <li>Q3: July - September (Due: October 31)</li>
                    <li>Q4: October - December (Due: January 31)</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="border-green-100">
                <CardContent className="pt-6">
                  <p className="font-semibold">Annual Reporting</p>
                  <ul className="list-disc list-inside text-gray-700 mt-2">
                    <li>Annual Report (Due: March 31 of the following year)</li>
                    <li>Financial Audit Report (Due: June 30 of the following year)</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-xl font-semibold mb-3">Penalties for Non-Compliance</h3>
            <p className="text-gray-700 mb-2">
              Failure to comply with EPR regulations may result in the following penalties:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              <li>Fines up to R10 million or 10% of annual turnover, whichever is greater</li>
              <li>Imprisonment up to 10 years</li>
              <li>Both fine and imprisonment for serious violations</li>
              <li>Revocation of registration and permits</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h4 className="text-lg font-semibold mb-2">Need More Information?</h4>
            <p className="text-gray-700">
              For detailed guidance on EPR compliance, please download the comprehensive 
              guidelines document or contact our support team for assistance.
            </p>
            <div className="mt-4">
              <Button className="mr-4">
                <FileText className="w-4 h-4 mr-2" />
                Download Full Guidelines
              </Button>
              <Button variant="outline">
                Contact Support
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Guidelines;
