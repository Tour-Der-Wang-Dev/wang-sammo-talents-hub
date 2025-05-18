
import { Company } from "../types/Company";

export const companies: Company[] = [
  {
    id: "1",
    name: "วังสามหมอรีสอร์ท",
    nameEn: "Wang Sam Mo Resort",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    description: "รีสอร์ทและที่พักหรูริมทะเล ให้บริการห้องพักและกิจกรรมท่องเที่ยวในพื้นที่วังสามหมอ",
    descriptionEn: "A luxury resort and accommodation by the sea, offering rooms and tourism activities in the Wang Sam Mo area",
    industry: "Hospitality",
    location: "วังสามหมอ, อุดรธานี",
    employeeCount: "51-200",
    website: "https://wangsammo-resort.example.com",
    founded: 2010,
    openPositions: 5,
    verified: true,
    contactEmail: "info@wangsammo-resort.example.com",
    contactPhone: "02-123-4567",
    socialMedia: {
      facebook: "https://facebook.com/wangsammo-resort",
      instagram: "https://instagram.com/wangsammo-resort"
    }
  },
  {
    id: "2",
    name: "วังสามหมอเทคโนโลยี",
    nameEn: "Wang Sam Mo Tech",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    description: "บริษัทพัฒนาซอฟต์แวร์และเทคโนโลยีที่ใหญ่ที่สุดในวังสามหมอ เชี่ยวชาญด้านแอปพลิเคชันมือถือและเว็บแอปพลิเคชัน",
    descriptionEn: "The largest software and technology development company in Wang Sam Mo, specializing in mobile and web applications",
    industry: "Technology",
    location: "วังสามหมอ, อุดรธานี",
    employeeCount: "11-50",
    website: "https://wangsammo-tech.example.com",
    founded: 2015,
    openPositions: 3,
    verified: true,
    contactEmail: "info@wangsammo-tech.example.com",
    contactPhone: "02-765-4321",
    socialMedia: {
      facebook: "https://facebook.com/wangsammo-tech",
      twitter: "https://twitter.com/wangsammo-tech"
    }
  },
  {
    id: "3",
    name: "วังสามหมออาหาร",
    nameEn: "Wang Sam Mo Food",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    description: "ร้านอาหารและบริการจัดเลี้ยงในพื้นที่วังสามหมอ เชี่ยวชาญด้านอาหารพื้นเมืองและอาหารนานาชาติ",
    descriptionEn: "Restaurant and catering services in the Wang Sam Mo area, specializing in local and international cuisine",
    industry: "Food & Beverage",
    location: "วังสามหมอ, อุดรธานี",
    employeeCount: "1-10",
    website: "https://wangsammo-food.example.com",
    founded: 2018,
    openPositions: 8,
    verified: false,
    contactEmail: "info@wangsammo-food.example.com",
    contactPhone: "02-987-6543",
    socialMedia: {
      facebook: "https://facebook.com/wangsammo-food",
      instagram: "https://instagram.com/wangsammo-food"
    }
  },
  {
    id: "4",
    name: "วังสามหมอทัวร์",
    nameEn: "Wang Sam Mo Tours",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    description: "บริษัททัวร์ท่องเที่ยวที่มีความเชี่ยวชาญในการนำเที่ยวในพื้นที่วังสามหมอและจังหวัดใกล้เคียง",
    descriptionEn: "Tourism company specializing in guided tours in the Wang Sam Mo area and neighboring provinces",
    industry: "Tourism",
    location: "วังสามหมอ, อุดรธานี",
    employeeCount: "11-50",
    website: "https://wangsammo-tours.example.com",
    founded: 2012,
    openPositions: 4,
    verified: true,
    contactEmail: "info@wangsammo-tours.example.com",
    contactPhone: "02-345-6789",
    socialMedia: {
      facebook: "https://facebook.com/wangsammo-tours",
      instagram: "https://instagram.com/wangsammo-tours"
    }
  },
  {
    id: "5",
    name: "วังสามหมอโรงแรม",
    nameEn: "Wang Sam Mo Hotel",
    logo: "/placeholder.svg",
    coverImage: "/placeholder.svg",
    description: "โรงแรมระดับ 4 ดาวใจกลางเมืองวังสามหมอ ให้บริการห้องพักหรูพร้อมสิ่งอำนวยความสะดวกครบครัน",
    descriptionEn: "A 4-star hotel in the heart of Wang Sam Mo, offering luxurious rooms with full amenities",
    industry: "Hospitality",
    location: "วังสามหมอ, อุดรธานี",
    employeeCount: "51-200",
    website: "https://wangsammo-hotel.example.com",
    founded: 2008,
    openPositions: 6,
    verified: true,
    contactEmail: "info@wangsammo-hotel.example.com",
    contactPhone: "02-456-7890",
    socialMedia: {
      facebook: "https://facebook.com/wangsammo-hotel",
      instagram: "https://instagram.com/wangsammo-hotel",
      twitter: "https://twitter.com/wangsammo-hotel"
    }
  }
];

export const industries = [
  "Hospitality",
  "Tourism",
  "Food & Beverage",
  "Retail",
  "Technology",
  "Education",
  "Healthcare",
  "Agriculture",
  "Construction",
  "Manufacturing",
  "Transportation"
];

export const employeeSizes = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+"
];
