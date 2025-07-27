
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

interface JobFormPreviewProps {
  data: any;
  logoImage: string | null;
  jobImages: string[];
  onBack: () => void;
  onSubmit: () => void;
}

const JobFormPreview: React.FC<JobFormPreviewProps> = ({
  data,
  logoImage,
  jobImages,
  onBack,
  onSubmit
}) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('th-TH');
  };
  
  const workLocationMap: Record<string, string> = {
    onsite: 'ออนไซต์ (ทำงานที่บริษัท)',
    remote: 'รีโมท (ทำงานทางไกล)',
    hybrid: 'ไฮบริด (ผสมผสาน)',
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button 
          type="button" 
          variant="ghost" 
          onClick={onBack} 
          className="flex items-center gap-1"
        >
          <ArrowLeft size={18} />
          แก้ไขข้อมูล
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        {data.isHot && (
          <div className="bg-wang-orange text-white text-xs font-prompt py-1 px-3 text-center">
            งานยอดนิยม
          </div>
        )}
        
        <div className="p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="font-prompt text-2xl font-bold text-gray-900 mb-2">
                {data.titleThai || data.title}
              </h1>
              
              <div className="flex items-center gap-2 mb-4">
                <span className="text-gray-700 font-medium">{data.company}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-500">{data.location}</span>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {data.categories.map((category: string) => (
                  <Badge key={category} variant="outline" className="bg-blue-50 text-wang-blue border-blue-200">
                    {category}
                  </Badge>
                ))}
                <Badge className="bg-gray-100 text-gray-700 hover:bg-gray-100">
                  {data.employmentType}
                </Badge>
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  {workLocationMap[data.workLocation]}
                </Badge>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div>
                  <h2 className="font-prompt text-lg font-semibold mb-2 text-wang-blue">รายละเอียดงาน</h2>
                  <div className="text-gray-700 whitespace-pre-line">{data.description}</div>
                </div>
                
                <div>
                  <div className="mb-6">
                    <h2 className="font-prompt text-lg font-semibold mb-2 text-wang-blue">คุณสมบัติ</h2>
                    <div className="text-gray-700 whitespace-pre-line">{data.qualifications}</div>
                  </div>
                  
                  <div>
                    <h2 className="font-prompt text-lg font-semibold mb-2 text-wang-blue">หน้าที่ความรับผิดชอบ</h2>
                    <div className="text-gray-700 whitespace-pre-line">{data.responsibilities}</div>
                  </div>
                </div>
              </div>
              
              {data.benefits && data.benefits.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-prompt text-lg font-semibold mb-3 text-wang-blue">สวัสดิการ</h2>
                  <div className="flex flex-wrap gap-2">
                    {data.benefits.map((benefit: string) => (
                      <Badge key={benefit} variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              {jobImages.length > 0 && (
                <div className="mb-8">
                  <h2 className="font-prompt text-lg font-semibold mb-3 text-wang-blue">รูปภาพประกอบ</h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {jobImages.map((img, index) => (
                      <div key={index} className="h-40 rounded-md overflow-hidden">
                        <OptimizedImage
                          src={img}
                          alt={`Job image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h2 className="font-prompt text-lg font-semibold mb-3 text-wang-blue">ข้อมูลเพิ่มเติม</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <span className="text-gray-500 text-sm block">เงินเดือน:</span>
                    <span className="text-wang-blue font-medium">{data.salary}</span>
                  </div>
                  
                  {data.applicationDeadline && (
                    <div>
                      <span className="text-gray-500 text-sm block">วันหมดเขตรับสมัคร:</span>
                      <span className="text-gray-700">{formatDate(data.applicationDeadline)}</span>
                    </div>
                  )}
                  
                  {(data.contactEmail || data.contactPhone) && (
                    <div>
                      <span className="text-gray-500 text-sm block">ติดต่อ:</span>
                      {data.contactEmail && <span className="text-gray-700 block text-sm">{data.contactEmail}</span>}
                      {data.contactPhone && <span className="text-gray-700 block text-sm">{data.contactPhone}</span>}
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {logoImage && (
              <div className="flex-shrink-0 hidden sm:block">
                <div className="w-24 h-24 border rounded p-1">
                  <OptimizedImage
                    src={logoImage}
                    alt={`${data.company} logo`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
        
        <CardFooter className="bg-gray-50 border-t flex justify-between p-4">
          <span className="text-gray-500 text-sm">เผยแพร่เมื่อ: {new Date().toLocaleDateString('th-TH')}</span>
          <Button onClick={onSubmit} className="bg-wang-orange hover:bg-orange-600">
            ลงประกาศรับสมัครงาน
          </Button>
        </CardFooter>
      </div>
    </div>
  );
};

export default JobFormPreview;
