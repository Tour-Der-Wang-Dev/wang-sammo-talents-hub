import React from 'react';
import ImageUploader from '@/components/ImageUploader';
import { FormLabel } from '@/components/ui/form';

interface ImageUploadFormProps {
  logoImage: string | null;
  setLogoImage: (image: string | null) => void;
  jobImages: string[];
  setJobImages: (images: string[]) => void;
}

const ImageUploadForm: React.FC<ImageUploadFormProps> = ({
  logoImage,
  setLogoImage,
  jobImages,
  setJobImages,
}) => {
  return (
    <div className="space-y-4">
      <div>
        <FormLabel>โลโก้บริษัท</FormLabel>
        <div className="mt-2">
          <ImageUploader image={logoImage} onImageChange={setLogoImage} maxImages={1} />
        </div>
      </div>
      <div>
        <FormLabel>รูปภาพประกอบ (สูงสุด 5 รูป)</FormLabel>
        <div className="mt-2">
          <ImageUploader images={jobImages} onImagesChange={setJobImages} maxImages={5} />
        </div>
      </div>
    </div>
  );
};

export default ImageUploadForm;