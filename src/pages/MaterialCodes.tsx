
import React from 'react';
import { FileText, ArrowLeft, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';

const materialCodes = [
  { code: 'PET', name: 'Polyethylene Terephthalate', examples: 'Water bottles, soft drink bottles', resinCode: '1', color: 'blue' },
  { code: 'HDPE', name: 'High-Density Polyethylene', examples: 'Milk jugs, detergent bottles', resinCode: '2', color: 'green' },
  { code: 'PVC', name: 'Polyvinyl Chloride', examples: 'Pipes, shower curtains, medical tubing', resinCode: '3', color: 'gray' },
  { code: 'LDPE', name: 'Low-Density Polyethylene', examples: 'Plastic bags, food wraps', resinCode: '4', color: 'pink' },
  { code: 'PP', name: 'Polypropylene', examples: 'Yogurt containers, medicine bottles', resinCode: '5', color: 'purple' },
  { code: 'PS', name: 'Polystyrene', examples: 'Foam cups, packing peanuts', resinCode: '6', color: 'yellow' },
  { code: 'OTHER', name: 'Other Plastics', examples: 'Various products, multi-layer packaging', resinCode: '7', color: 'red' },
  { code: 'GLASS', name: 'Glass', examples: 'Bottles, jars', resinCode: '', color: 'cyan' },
  { code: 'PAPER', name: 'Paper', examples: 'Cardboard, paper packaging', resinCode: '', color: 'orange' },
  { code: 'METAL', name: 'Metal', examples: 'Cans, containers', resinCode: '', color: 'slate' },
];

const MaterialCodes: React.FC = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredCodes = materialCodes.filter(item =>
    item.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.examples.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const getBadgeColor = (color: string) => {
    const colorMap: Record<string, string> = {
      blue: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      green: "bg-green-100 text-green-800 hover:bg-green-100",
      gray: "bg-gray-100 text-gray-800 hover:bg-gray-100",
      pink: "bg-pink-100 text-pink-800 hover:bg-pink-100",
      purple: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      yellow: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100",
      red: "bg-red-100 text-red-800 hover:bg-red-100",
      cyan: "bg-cyan-100 text-cyan-800 hover:bg-cyan-100",
      orange: "bg-orange-100 text-orange-800 hover:bg-orange-100",
      slate: "bg-slate-100 text-slate-800 hover:bg-slate-100",
    };
    
    return colorMap[color] || "bg-gray-100 text-gray-800 hover:bg-gray-100";
  };

  return (
    <div className="container py-8 mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Material Classification Codes</h1>
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
            <CardTitle>Reference Guide for Material Codes</CardTitle>
          </div>
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search material codes, names or examples..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Material Code</TableHead>
                <TableHead>Full Name</TableHead>
                <TableHead>Resin Code</TableHead>
                <TableHead>Common Examples</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCodes.length > 0 ? (
                filteredCodes.map((material) => (
                  <TableRow key={material.code}>
                    <TableCell>
                      <Badge className={getBadgeColor(material.color)}>
                        {material.code}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-medium">{material.name}</TableCell>
                    <TableCell>
                      {material.resinCode && (
                        <div className="w-8 h-8 rounded-full border-2 border-gray-400 flex items-center justify-center">
                          {material.resinCode}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{material.examples}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-gray-500 py-4">
                    No material codes found matching your search criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          
          <div className="bg-blue-50 p-6 rounded-lg mt-6">
            <h4 className="text-lg font-semibold mb-2">Material Code Usage</h4>
            <p className="text-gray-700">
              When classifying your products for EPR reporting, use the material codes 
              specified in this reference guide. If your product contains multiple materials,
              classify it based on the predominant material by weight.
            </p>
            <div className="mt-4">
              <Button>
                <FileText className="w-4 h-4 mr-2" />
                Download Complete Reference
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MaterialCodes;
