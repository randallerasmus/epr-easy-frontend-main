import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, ArrowRight, Check, FileText, Layers, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  
  const handleGetStarted = (e: React.FormEvent) => {
    e.preventDefault();
    navigate('/register');
  };
  
  return (
    <div className="flex flex-col min-h-screen">
      <header className="py-4 border-b bg-white/80 backdrop-blur-sm">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="w-6 h-6 text-blue-600" />
            <span className="text-xl font-bold">EPR-Easy</span>
          </div>
          <nav>
            <ul className="flex space-x-8">
              <li>
                <a href="#features" className="text-sm text-gray-600 hover:text-blue-600">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-sm text-gray-600 hover:text-blue-600">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#pricing" className="text-sm text-gray-600 hover:text-blue-600">
                  Pricing
                </a>
              </li>
              <li>
                <Link to="/login" className="text-sm text-gray-600 hover:text-blue-600">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  Register
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-blue-50 to-white">
          <div className="container grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-5xl">
                Simplify EPR Compliance for Your South African Business
              </h1>
              <p className="mb-8 text-lg text-gray-600">
                EPR-Easy automates Extended Producer Responsibility levy calculations 
                and Section 18 reports. Save time, ensure compliance, and focus on your business.
              </p>
              
              <div className="flex flex-col mb-6 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
                <Button onClick={handleGetStarted} className="w-full md:w-auto">
                  Register Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline" onClick={() => navigate('/login')} className="w-full md:w-auto">
                  Sign In
                </Button>
              </div>
              
              <p className="text-sm text-gray-500">
                No credit card required. Start your free 14-day trial today.
              </p>
            </div>
            <div className="relative hidden md:block">
              <div className="absolute w-40 h-40 bg-blue-100 rounded-full -z-10 -top-5 -left-5"></div>
              <div className="absolute w-20 h-20 bg-green-100 rounded-full -z-10 -bottom-5 -right-5"></div>
              <div className="p-6 bg-white border rounded-lg shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium">EPR Dashboard</h3>
                  <span className="px-2 py-1 text-xs text-green-700 bg-green-100 rounded-full">Live Demo</span>
                </div>
                <div className="mb-4">
                  <div className="p-3 mb-2 bg-gray-100 rounded">
                    <div className="w-3/4 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-3 bg-blue-100 rounded">
                      <div className="w-full h-3 mb-1 bg-blue-200 rounded"></div>
                      <div className="w-2/3 h-6 bg-blue-300 rounded"></div>
                    </div>
                    <div className="p-3 bg-green-100 rounded">
                      <div className="w-full h-3 mb-1 bg-green-200 rounded"></div>
                      <div className="w-2/3 h-6 bg-green-300 rounded"></div>
                    </div>
                    <div className="p-3 bg-amber-100 rounded">
                      <div className="w-full h-3 mb-1 bg-amber-200 rounded"></div>
                      <div className="w-2/3 h-6 bg-amber-300 rounded"></div>
                    </div>
                  </div>
                </div>
                <div className="p-3 bg-gray-100 rounded">
                  <div className="flex justify-between mb-2">
                    <div className="w-1/4 h-3 bg-gray-300 rounded"></div>
                    <div className="w-1/6 h-3 bg-gray-300 rounded"></div>
                  </div>
                  <div className="w-full h-16 bg-white rounded shadow-sm"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section id="features" className="py-16 bg-white">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Simplify EPR Compliance</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Our platform streamlines the process of EPR compliance, making it easier for South African businesses to meet regulatory requirements.
              </p>
            </div>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-blue-100 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Automated Reporting</h3>
                <p className="text-gray-600">
                  Generate Section 18 reports automatically from your product data, ensuring accuracy and compliance.
                </p>
              </div>
              
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-green-100 rounded-lg">
                  <Layers className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Material Classification</h3>
                <p className="text-gray-600">
                  Easily classify your materials with our intuitive interface, ensuring correct levy calculations.
                </p>
              </div>
              
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-amber-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="mb-2 text-xl font-medium">Compliance Monitoring</h3>
                <p className="text-gray-600">
                  Track your compliance status and upcoming deadlines to avoid penalties and ensure timely submissions.
                </p>
              </div>
              
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-lg">
                  <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium">Detailed Analytics</h3>
                <p className="text-gray-600">
                  Gain insights into your material usage and environmental impact with comprehensive dashboards.
                </p>
              </div>
              
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-red-100 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium">User Management</h3>
                <p className="text-gray-600">
                  Control access with role-based permissions for different team members involved in the EPR process.
                </p>
              </div>
              
              <div className="p-6 bg-white border rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-indigo-100 rounded-lg">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-xl font-medium">CSV Import</h3>
                <p className="text-gray-600">
                  Easily import your product data from any system using our flexible CSV import tool.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">How EPR-Easy Works</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Our simple 3-step process makes EPR compliance effortless for your business.
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                <div className="absolute hidden w-1 h-full bg-blue-200 transform -translate-x-1/2 lg:block left-1/2"></div>
                
                {/* Step 1 */}
                <div className="relative mb-8">
                  <div className="flex flex-col items-center lg:flex-row">
                    <div className="flex items-center justify-center order-first w-12 h-12 mx-auto mb-4 text-white bg-blue-500 rounded-full lg:order-last lg:ml-10 lg:mb-0">
                      <span>1</span>
                    </div>
                    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
                      <h3 className="mb-3 text-xl font-medium">Upload Your Product Data</h3>
                      <p className="text-gray-600">
                        Simply upload your product data via CSV file. Our system will process your data and prepare it for classification.
                      </p>
                      <div className="flex items-center mt-4 text-blue-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H3v12a2 2 0 002 2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">CSV file with product data</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative mb-8">
                  <div className="flex flex-col items-center lg:flex-row">
                    <div
                        className="flex items-center justify-center order-first w-12 h-12 mx-auto mb-4 text-white bg-blue-500 rounded-full lg:order-last lg:ml-10 lg:mb-0">
                      <span className="text-lg font-bold">2</span>
                    </div>
                    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
                      <h3 className="mb-3 text-xl font-medium">Classify Materials</h3>
                      <p className="text-gray-600">
                        Review and classify your products by material type. Our system provides suggestions and makes it
                        easy to edit in bulk.
                      </p>
                      <div className="flex items-center mt-4 text-blue-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd"
                                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                                clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm">Material classification table</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="relative">
                  <div className="flex flex-col items-center lg:flex-row">
                    <div
                        className="flex items-center justify-center order-first w-12 h-12 mx-auto mb-4 text-white bg-blue-500 rounded-full lg:order-last lg:ml-10 lg:mb-0">
                      <span>3</span>
                    </div>
                    <div className="w-full p-6 bg-white rounded-lg shadow-sm">
                      <h3 className="mb-3 text-xl font-medium">Generate EPR Reports</h3>
                      <p className="text-gray-600">
                        Review your levy summary and generate compliant Section 18 reports ready for submission to authorities.
                      </p>
                      <div className="flex items-center mt-4 text-blue-600">
                        <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v12a2 2 0 002 2z" clipRule="evenodd" />
                        </svg>
                        <span className="text-sm">PDF report download</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Pricing Section */}
        <section id="pricing" className="py-16 bg-white">
          <div className="container">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold">Simple, Transparent Pricing</h2>
              <p className="max-w-2xl mx-auto text-gray-600">
                Choose the plan that works best for your business needs. All plans include our core EPR compliance features.
              </p>
            </div>
            
            <div className="grid max-w-4xl grid-cols-1 gap-8 mx-auto md:grid-cols-3">
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="mb-2 text-xl font-medium">Starter</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">R999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="mb-6 text-sm text-gray-600">Perfect for small businesses with basic EPR needs</p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Up to 500 products</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Monthly EPR reports</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Basic dashboard</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Email support</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="relative p-6 border-2 rounded-lg shadow-sm border-blue-500">
                <div className="absolute top-0 px-3 py-1 text-xs font-medium text-white transform -translate-x-1/2 -translate-y-1/2 bg-blue-500 rounded-full left-1/2">
                  Most Popular
                </div>
                <h3 className="mb-2 text-xl font-medium">Business</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">R2999</span>
                  <span className="text-gray-600">/month</span>
                </div>
                <p className="mb-6 text-sm text-gray-600">Ideal for growing businesses with moderate EPR volumes</p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Up to 2,000 products</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Monthly & quarterly reports</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Advanced analytics</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Priority email support</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>3 user accounts</span>
                  </li>
                </ul>
                <Button className="w-full">
                  Start Free Trial
                </Button>
              </div>
              
              <div className="p-6 border rounded-lg shadow-sm">
                <h3 className="mb-2 text-xl font-medium">Enterprise</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold">Custom</span>
                </div>
                <p className="mb-6 text-sm text-gray-600">For large organizations with complex EPR requirements</p>
                <ul className="mb-6 space-y-3">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Unlimited products</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Custom reporting periods</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Advanced integrations</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 mr-2 text-green-500" />
                    <span>Unlimited users</span>
                  </li>
                </ul>
                <Button className="w-full" variant="outline">
                  Contact Sales
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 text-white bg-blue-600">
          <div className="container text-center">
            <h2 className="mb-4 text-3xl font-bold">Ready to simplify your EPR compliance?</h2>
            <p className="max-w-2xl mx-auto mb-8">
              Join businesses across South Africa who are saving time and ensuring compliance with EPR-Easy.
            </p>
            <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-center">
              <Button 
                onClick={() => navigate('/register')}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Create Account
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                onClick={() => navigate('/login')}
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-blue-700"
              >
                Sign In
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="py-12 bg-gray-900 text-gray-300">
        <div className="container">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-4 space-x-2">
                <Shield className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold text-white">EPR-Easy</span>
              </div>
              <p className="mb-4 text-sm text-gray-400">
                Simplifying EPR compliance for South African businesses.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33c-3.28 0-5.37 1.71-5.37 4.6v2.37h-2.5v3.93h2.5v9.1h4.97v-9.1h3.3l.67-3.93z"></path>
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.059 1.69-.073 4.949-.073zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-medium text-white">Product</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#features" className="hover:text-white">Features</a></li>
                <li><a href="#pricing" className="hover:text-white">Pricing</a></li>
                <li><Link to="/faqs" className="hover:text-white">FAQs</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-medium text-white">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/guidelines" className="hover:text-white">EPR Guidelines</Link></li>
                <li><Link to="/material-codes" className="hover:text-white">Material Codes</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="mb-4 text-lg font-medium text-white">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white">About Us</a></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 text-sm text-center text-gray-400 border-t border-gray-800">
            <p>&copy; 2025 EPR-Easy. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
