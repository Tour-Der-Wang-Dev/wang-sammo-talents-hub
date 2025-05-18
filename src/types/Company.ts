
export interface Company {
  id: string;
  name: string;
  nameEn: string;
  logo: string;
  coverImage: string;
  description: string;
  descriptionEn: string;
  industry: string;
  location: string;
  employeeCount: string;
  website: string;
  founded: number;
  openPositions: number;
  verified: boolean;
  contactEmail: string;
  contactPhone: string;
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
  };
}
