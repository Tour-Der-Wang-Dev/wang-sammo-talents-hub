
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import JobCard from '@/components/JobCard';
import { useLanguage } from '@/components/SiteNavigation';
import SEO from '@/components/SEO';
import { companies } from '@/data/companies';
import { jobs } from '@/data/jobs';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Building2, Users, MapPin, Globe, Mail, Phone, Calendar, ArrowLeft, Facebook, Twitter, Instagram, Linkedin, AlertTriangle } from 'lucide-react';

// Add CompanyMap component for displaying location
const CompanyMap = ({ company, showMap = true }) => {
  if (!showMap) return null;
  
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

// Add JobListingSection component
const JobListingSection = ({ jobs, language }) => {
  return (
    <>
      {jobs.length > 0 ? (
        <div className="space-y-4">
          {jobs.map(job => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      ) : (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600">
            {language === 'th' 
              ? 'ไม่มีตำแหน่งงานที่เปิดรับในขณะนี้' 
              : 'No open positions at the moment'}
          </p>
        </div>
      )}
    </>
  );
};

// Add ErrorDisplay component
const ErrorDisplay = ({ error }) => {
  if (!error) return null;
  
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertTriangle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{error}</AlertDescription>
    </Alert>
  );
};

const CompanyDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const { language } = useLanguage();
  const [error, setError] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(true);
  
  // Find company by ID
  const company = companies.find(c => c.id === id);
  
  useEffect(() => {
    if (id && !company) {
      setError(language === 'th' 
        ? 'ไม่พบข้อมูลบริษัทที่ค้นหา' 
        : 'The company you are looking for does not exist');
    } else {
      setError(null);
    }
  }, [id, company, language]);
  
  // If company not found, show a message
  if (error) {
    return (
      <>
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <ErrorDisplay error={error} />
          <h1 className="text-2xl font-prompt font-bold text-gray-800">
            {language === 'th' ? 'ไม่พบข้อมูลบริษัท' : 'Company Not Found'}
          </h1>
          <Link to="/companies">
            <Button className="mt-6">
              {language === 'th' ? 'กลับไปหน้าบริษัททั้งหมด' : 'Back to Companies'}
            </Button>
          </Link>
        </div>
        <Footer />
      </>
    );
  }
  
  // Filter jobs for this company
  const companyJobs = jobs.filter(job => job.company === company?.name);
  
  return (
    <>
      <SEO 
        title={language === 'th' ? company?.name : company?.nameEn}
        description={language === 'th' ? company?.description : company?.descriptionEn}
      />
      
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Display any errors */}
        <ErrorDisplay error={error} />
      
        {/* Back button */}
        <div className="mb-6">
          <Link to="/companies" className="inline-flex items-center text-gray-600 hover:text-wang-blue">
            <ArrowLeft size={16} className="mr-1" />
            <span className="font-prompt">
              {language === 'th' ? 'กลับไปหน้าบริษัททั้งหมด' : 'Back to Companies'}
            </span>
          </Link>
        </div>
        
        {/* Company header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="h-48 w-full overflow-hidden relative">
            <img 
              src={company?.coverImage || '/placeholder.svg'} 
              alt={language === 'th' ? company?.name : company?.nameEn}
              className="w-full h-full object-cover" 
            />
            {company?.verified && (
              <div className="absolute top-4 right-4">
                <Badge className="bg-wang-blue text-white">
                  {language === 'th' ? 'ยืนยันแล้ว' : 'Verified'}
                </Badge>
              </div>
            )}
          </div>
          
          <div className="p-6 relative">
            <div className="absolute -top-16 left-6 bg-white rounded-full p-2 border-4 border-white shadow-md">
              <img 
                src={company?.logo || '/placeholder.svg'} 
                alt={`โลโก้ ${company?.name}`}
                className="w-24 h-24 rounded-full object-contain bg-white" 
              />
            </div>
            
            <div className="mt-12">
              <h1 className="text-2xl md:text-3xl font-prompt font-bold text-gray-900">
                {language === 'th' ? company?.name : company?.nameEn}
              </h1>
              
              <div className="mt-4 space-y-2">
                <div className="flex items-center text-gray-600">
                  <Building2 size={18} className="mr-2" />
                  <span>{company?.industry}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <MapPin size={18} className="mr-2" />
                  <span>{company?.location}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Users size={18} className="mr-2" />
                  <span>{company?.employeeCount} {language === 'th' ? 'พนักงาน' : 'employees'}</span>
                </div>
                
                <div className="flex items-center text-gray-600">
                  <Calendar size={18} className="mr-2" />
                  <span>{language === 'th' ? 'ก่อตั้ง' : 'Founded'} {company?.founded}</span>
                </div>
              </div>
              
              <div className="mt-6 flex gap-2">
                <Button asChild variant="default">
                  <a href={company?.website} target="_blank" rel="noopener noreferrer" className="flex items-center">
                    <Globe size={16} className="mr-1" />
                    {language === 'th' ? 'เว็บไซต์' : 'Website'}
                  </a>
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => setShowMap(!showMap)}
                >
                  <MapPin size={16} className="mr-1" />
                  {showMap 
                    ? (language === 'th' ? 'ซ่อนแผนที่' : 'Hide Map') 
                    : (language === 'th' ? 'แสดงแผนที่' : 'Show Map')}
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Company details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="about">
              <TabsList className="mb-6">
                <TabsTrigger value="about">
                  {language === 'th' ? 'ข้อมูลบริษัท' : 'About'}
                </TabsTrigger>
                <TabsTrigger value="jobs">
                  {language === 'th' ? 'ตำแหน่งงาน' : 'Jobs'} ({companyJobs.length})
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="about">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-prompt font-medium mb-4">
                    {language === 'th' ? 'เกี่ยวกับบริษัท' : 'About the Company'}
                  </h2>
                  
                  <p className="text-gray-700 whitespace-pre-wrap">
                    {language === 'th' ? company?.description : company?.descriptionEn}
                  </p>
                </div>
              </TabsContent>
              
              <TabsContent value="jobs">
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h2 className="text-xl font-prompt font-medium mb-4">
                    {language === 'th' ? 'ตำแหน่งงานที่เปิดรับ' : 'Open Positions'}
                  </h2>
                  
                  <JobListingSection jobs={companyJobs} language={language} />
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Map component */}
            <CompanyMap company={company} showMap={showMap} />
            
            {/* Contact information */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-lg font-prompt font-medium mb-4">
                {language === 'th' ? 'ข้อมูลติดต่อ' : 'Contact Information'}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={18} className="mr-3 text-wang-blue" />
                  <div>
                    <div className="text-gray-600 text-sm">Email</div>
                    <a href={`mailto:${company?.contactEmail}`} className="hover:text-wang-blue">
                      {company?.contactEmail}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Phone size={18} className="mr-3 text-wang-blue" />
                  <div>
                    <div className="text-gray-600 text-sm">
                      {language === 'th' ? 'โทรศัพท์' : 'Phone'}
                    </div>
                    <a href={`tel:${company?.contactPhone}`} className="hover:text-wang-blue">
                      {company?.contactPhone}
                    </a>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Globe size={18} className="mr-3 text-wang-blue" />
                  <div>
                    <div className="text-gray-600 text-sm">Website</div>
                    <a 
                      href={company?.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-wang-blue"
                    >
                      {company?.website?.replace('https://', '')}
                    </a>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Social media */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-prompt font-medium mb-4">
                {language === 'th' ? 'โซเชียลมีเดีย' : 'Social Media'}
              </h2>
              
              <div className="flex flex-wrap gap-3">
                {company?.socialMedia?.facebook && (
                  <a 
                    href={company.socialMedia.facebook} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                    aria-label="Facebook"
                  >
                    <Facebook size={20} />
                  </a>
                )}
                
                {company?.socialMedia?.twitter && (
                  <a 
                    href={company.socialMedia.twitter} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500"
                    aria-label="Twitter"
                  >
                    <Twitter size={20} />
                  </a>
                )}
                
                {company?.socialMedia?.instagram && (
                  <a 
                    href={company.socialMedia.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700"
                    aria-label="Instagram"
                  >
                    <Instagram size={20} />
                  </a>
                )}
                
                {company?.socialMedia?.linkedin && (
                  <a 
                    href={company.socialMedia.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="bg-blue-700 text-white p-2 rounded-full hover:bg-blue-800"
                    aria-label="LinkedIn"
                  >
                    <Linkedin size={20} />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default CompanyDetailPage;
