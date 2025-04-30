
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { uploadCSV } from '@/services/api';
import { useEprStore } from '@/store/useEprStore';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

const CSVDropzone: React.FC = () => {
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const { setUploadId, setIsUploading, setCurrentStep } = useEprStore();
  
  const processCSV = useCallback(async (file: File) => {
    if (!file) return;
    
    setIsProcessing(true);
    setIsUploading(true);
    
    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress((prev) => {
        const newProgress = prev + 5;
        if (newProgress >= 90) {
          clearInterval(progressInterval);
          return 90;
        }
        return newProgress;
      });
    }, 300);
    
    try {
      const response = await uploadCSV(file);
      
      if (response.error) {
        toast({
          title: 'Upload failed',
          description: response.error,
          variant: 'destructive',
        });
        setIsUploading(false);
        setIsProcessing(false);
        clearInterval(progressInterval);
        return;
      }
      
      setUploadProgress(100);
      
      setTimeout(() => {
        setUploadId(response.data.id);
        setIsUploading(false);
        setIsProcessing(false);
        setCurrentStep(2); // Move to step 2
        toast({
          title: 'Upload successful',
          description: 'Your file has been uploaded successfully.',
        });
      }, 500);
    } catch (error) {
      setIsUploading(false);
      setIsProcessing(false);
      clearInterval(progressInterval);
      toast({
        title: 'Upload failed',
        description: 'An unexpected error occurred. Please try again.',
        variant: 'destructive',
      });
    }
  }, [setUploadId, setIsUploading, toast, setCurrentStep]);
  
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (!acceptedFiles.length) return;
    
    const file = acceptedFiles[0];
    
    if (file.type !== 'text/csv' && !file.name.endsWith('.csv')) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload a CSV file.',
        variant: 'destructive',
      });
      return;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload a file smaller than 10MB.',
        variant: 'destructive',
      });
      return;
    }
    
    processCSV(file);
  }, [processCSV, toast]);
  
  const { getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv'],
    },
    disabled: isProcessing,
    maxFiles: 1,
  });
  
  let borderColor = 'border-gray-300';
  if (isDragAccept) borderColor = 'border-green-500';
  if (isDragReject) borderColor = 'border-red-500';
  
  return (
    <Card className="w-full">
      <div className="p-6">
        <div
          {...getRootProps({
            className: `flex flex-col items-center justify-center p-10 border-2 border-dashed rounded-lg ${borderColor} transition-all ${
              isDragActive ? 'bg-blue-50' : 'bg-gray-50'
            } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`,
          })}
        >
          <input {...getInputProps()} />
          
          {isProcessing ? (
            <div className="text-center">
              <UploadCloud className="w-12 h-12 mx-auto text-blue-500 animate-pulse" />
              <p className="mt-4 text-sm font-medium text-gray-600">Processing your file...</p>
              <div className="w-full mt-4">
                <Progress value={uploadProgress} className="w-full" />
              </div>
            </div>
          ) : isDragReject ? (
            <div className="text-center">
              <AlertCircle className="w-12 h-12 mx-auto text-red-500" />
              <p className="mt-4 text-sm font-medium text-red-500">
                Only CSV files are accepted
              </p>
            </div>
          ) : (
            <div className="text-center">
              <UploadCloud className="w-12 h-12 mx-auto text-blue-500" />
              <p className="mt-4 text-sm font-medium text-gray-700">
                Drag & drop your CSV file here, or click to select
              </p>
              <p className="mt-2 text-xs text-gray-500">
                Supports CSV format up to 10MB
              </p>
              <Button className="mt-4" variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                Select File
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p className="font-medium">CSV Format Requirements:</p>
          <ul className="pl-5 mt-1 list-disc">
            <li>Must contain columns: SKU, Description, Mass (kg)</li>
            <li>First row should be column headers</li>
            <li>No empty rows or columns</li>
          </ul>
        </div>
      </div>
    </Card>
  );
};

export default CSVDropzone;
