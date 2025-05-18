
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import OptimizedImage from './OptimizedImage';
import { toast } from '@/hooks/use-toast';

interface ImageUploaderProps {
  image?: string | null;
  images?: string[];
  onImageChange?: (image: string | null) => void;
  onImagesChange?: (images: string[]) => void;
  maxImages?: number;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  image,
  images,
  onImageChange,
  onImagesChange,
  maxImages = 1
}) => {
  const [isUploading, setIsUploading] = useState(false);
  
  // Single image mode
  const handleSingleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    
    const file = e.target.files[0];
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "ไฟล์มีขนาดใหญ่เกินไป",
        description: "ขนาดไฟล์ต้องไม่เกิน 2MB",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    // Convert to base64 for preview
    const reader = new FileReader();
    reader.onloadend = () => {
      if (onImageChange && typeof reader.result === 'string') {
        onImageChange(reader.result);
      }
      setIsUploading(false);
    };
    reader.readAsDataURL(file);
    
    // In a real implementation, you would upload to Supabase Storage here
  };
  
  // Multiple images mode
  const handleMultipleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files.length) return;
    
    const files = Array.from(e.target.files);
    const currentImages = images || [];
    
    if (currentImages.length + files.length > maxImages) {
      toast({
        title: "จำนวนรูปภาพมากเกินไป",
        description: `คุณสามารถอัปโหลดได้สูงสุด ${maxImages} รูปเท่านั้น`,
        variant: "destructive",
      });
      return;
    }
    
    for (const file of files) {
      if (file.size > 2 * 1024 * 1024) {
        toast({
          title: "ไฟล์มีขนาดใหญ่เกินไป",
          description: "ขนาดไฟล์แต่ละรูปต้องไม่เกิน 2MB",
          variant: "destructive",
        });
        return;
      }
    }
    
    setIsUploading(true);
    
    const newImages: string[] = [];
    let processed = 0;
    
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          newImages.push(reader.result);
        }
        
        processed++;
        if (processed === files.length) {
          if (onImagesChange) {
            onImagesChange([...currentImages, ...newImages]);
          }
          setIsUploading(false);
        }
      };
      reader.readAsDataURL(file);
    });
    
    // In a real implementation, you would upload to Supabase Storage here
  };
  
  const removeImage = (index: number) => {
    if (onImagesChange && images) {
      const newImages = [...images];
      newImages.splice(index, 1);
      onImagesChange(newImages);
    }
  };
  
  const removeSingleImage = () => {
    if (onImageChange) {
      onImageChange(null);
    }
  };

  // Single image uploader
  if (onImageChange !== undefined) {
    return (
      <div className="space-y-2">
        {image ? (
          <div className="relative w-32 h-32">
            <OptimizedImage
              src={image}
              alt="Uploaded image"
              className="w-full h-full object-contain border rounded-md"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              onClick={removeSingleImage}
            >
              <X size={16} />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <Upload className="w-8 h-8 mb-2 text-gray-500" />
                <p className="mb-2 text-sm text-gray-500">
                  <span className="font-semibold">คลิกเพื่ออัปโหลด</span>
                </p>
                <p className="text-xs text-gray-500">PNG, JPG สูงสุด 2MB</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleSingleImageUpload}
                disabled={isUploading}
              />
            </label>
          </div>
        )}
      </div>
    );
  }
  
  // Multiple images uploader
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {images && images.length > 0 && images.map((img, index) => (
          <div key={index} className="relative w-32 h-32">
            <OptimizedImage
              src={img}
              alt={`Uploaded image ${index + 1}`}
              className="w-full h-full object-cover border rounded-md"
            />
            <button
              type="button"
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1"
              onClick={() => removeImage(index)}
            >
              <X size={16} />
            </button>
          </div>
        ))}
        
        {(!images || images.length < maxImages) && (
          <div className="flex items-center justify-center w-32 h-32">
            <label className="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
              <div className="flex flex-col items-center justify-center pt-2 pb-2">
                <Upload className="w-6 h-6 mb-1 text-gray-500" />
                <p className="text-xs text-center text-gray-500">อัปโหลด</p>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/png, image/jpeg"
                onChange={handleMultipleImageUpload}
                disabled={isUploading}
                multiple
              />
            </label>
          </div>
        )}
      </div>
      {images && (
        <p className="text-xs text-gray-500">
          {images.length} / {maxImages} รูป
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
