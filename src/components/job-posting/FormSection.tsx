import React from 'react';

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, children }) => (
  <div className="space-y-4 pt-6 border-t first:border-t-0 first:pt-0">
    <h2 className="font-prompt text-xl font-semibold text-wang-blue">{title}</h2>
    {children}
  </div>
);

export default FormSection;