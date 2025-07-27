import React from 'react';
import { MapPin } from 'lucide-react';
import { Company } from '@/types/Company';

interface CompanyMapProps {
  company: Company;
}

const CompanyMap: React.FC<CompanyMapProps> = ({ company }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-lg font-prompt font-medium mb-4">
        Location Map
      </h2>
      <div className="h-[300px] bg-gray-100 rounded-md flex items-center justify-center">
        <div className="text-center p-4">
          <MapPin size={36} className="mx-auto mb-2 text-wang-blue" />
          <p className="text-gray-600 font-sarabun">{company.location}</p>
          <p className="text-sm text-gray-500 mt-1">
            Interactive map feature coming soon
          </p>
        </div>
      </div>
    </div>
  );
};

export default CompanyMap;