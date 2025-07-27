import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/hooks/use-language';
import SEO from '@/components/SEO';

const CompanyRegisterPage = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <SEO 
        title={t('companyPage.register')}
        description={t('companyPage.description')}
      />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/companies" className="inline-flex items-center text-gray-600 hover:text-wang-blue">
            <ArrowLeft size={16} className="mr-1" />
            <span className="font-prompt">
              {t('companyPage.back')}
            </span>
          </Link>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h1 className="text-2xl font-prompt font-bold text-wang-blue mb-2">
              {t('companyPage.register')}
            </h1>
            
            <p className="text-gray-600 mb-6">
              {t('companyPage.description')}
            </p>
            
            <div className="text-center py-16">
              <p className="text-gray-700 mb-4">
                {t('language') === 'th' 
                  ? 'ฟีเจอร์นี้อยู่ระหว่างการพัฒนา โปรดติดต่อเราสำหรับข้อมูลเพิ่มเติม' 
                  : 'This feature is under development. Please contact us for more information.'}
              </p>
              
              <Button className="bg-wang-blue">
                {t('siteNav.contactUs')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CompanyRegisterPage;