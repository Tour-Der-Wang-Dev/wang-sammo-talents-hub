import React from 'react';
import Layout from '@/components/Layout';
import SEO from '@/components/SEO';
import { Construction } from 'lucide-react';

interface PlaceholderPageProps {
  title: string;
  message: string;
}

const PlaceholderPage: React.FC<PlaceholderPageProps> = ({ title, message }) => {
  return (
    <Layout>
      <SEO title={title} description={message} />
      <div className="container mx-auto px-4 py-16 flex-grow flex items-center justify-center">
        <div className="text-center">
          <Construction className="mx-auto h-12 w-12 text-wang-orange mb-4" />
          <h1 className="text-2xl font-prompt font-bold text-wang-blue mb-2">{title}</h1>
          <p className="text-gray-600">{message}</p>
        </div>
      </div>
    </Layout>
  );
};

export default PlaceholderPage;