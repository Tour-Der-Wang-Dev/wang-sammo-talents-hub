
export interface Job {
  id: string;
  title: string;
  titleThai?: string;
  company: string;
  companyLogo?: string;
  location: string;
  salary: string;
  employmentType: 'Full-time' | 'Part-time' | 'Contract' | 'Internship';
  description: string;
  descriptionThai?: string;
  requirements: string[];
  datePosted: string;
  isHot?: boolean;
  categories: string[];
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Tour Guide",
    titleThai: "มัคคุเทศก์",
    company: "Wang Sam Mo Tourism",
    companyLogo: "/lovable-uploads/dbc20659-751f-4e70-9ce3-49e4dc99bc25.png",
    location: "Wang Sam Mo, Udon Thani",
    salary: "฿18,000 - ฿25,000 per month",
    employmentType: "Full-time",
    description: "Looking for an enthusiastic tour guide who has excellent knowledge of Wang Sam Mo's history, culture, and attractions. Must be fluent in Thai and English.",
    descriptionThai: "กำลังมองหามัคคุเทศก์ที่มีความกระตือรือร้นซึ่งมีความรู้ที่ดีเกี่ยวกับประวัติศาสตร์ วัฒนธรรม และสถานที่ท่องเที่ยวของวังสามหมอ ต้องพูดภาษาไทยและภาษาอังกฤษได้คล่อง",
    requirements: [
      "2+ years experience as a tour guide",
      "Fluent in Thai and English",
      "Knowledge of local history and culture",
      "Strong communication skills",
      "First aid certification is a plus"
    ],
    datePosted: "2025-05-01",
    isHot: true,
    categories: ["Tourism", "Hospitality"]
  },
  {
    id: "2",
    title: "Hotel Receptionist",
    titleThai: "พนักงานต้อนรับโรงแรม",
    company: "Sam Mo Resort",
    location: "Wang Sam Mo, Udon Thani",
    salary: "฿15,000 - ฿20,000 per month",
    employmentType: "Full-time",
    description: "We are seeking a professional and friendly receptionist for our resort. The ideal candidate will have excellent customer service skills and be able to handle guest inquiries, bookings, and check-ins/check-outs efficiently.",
    descriptionThai: "เรากำลังมองหาพนักงานต้อนรับที่มีความเป็นมืออาชีพและเป็นมิตรสำหรับรีสอร์ทของเรา ผู้สมัครที่เหมาะสมจะมีทักษะการบริการลูกค้าที่ยอดเยี่ยมและสามารถจัดการกับข้อสงสัยของแขก การจอง และการเช็คอิน/เช็คเอาต์ได้อย่างมีประสิทธิภาพ",
    requirements: [
      "Previous experience in hospitality",
      "Excellent customer service skills",
      "Basic computer proficiency",
      "Available to work shifts including weekends and holidays"
    ],
    datePosted: "2025-05-02",
    categories: ["Hospitality", "Customer Service"]
  },
  {
    id: "3",
    title: "Restaurant Chef",
    titleThai: "เชฟร้านอาหาร",
    company: "Wang Traditional Cuisine",
    location: "Wang Sam Mo, Udon Thani",
    salary: "฿25,000 - ฿35,000 per month",
    employmentType: "Full-time",
    description: "Hiring a talented chef specialized in traditional Thai cuisine, particularly dishes from the Isan region. The chef will be responsible for menu planning, food preparation, and kitchen management.",
    descriptionThai: "กำลังรับสมัครเชฟที่มีความสามารถเฉพาะทางด้านอาหารไทยดั้งเดิม โดยเฉพาะอาหารจากภาคอีสาน เชฟจะรับผิดชอบการวางแผนเมนู การเตรียมอาหาร และการจัดการครัว",
    requirements: [
      "5+ years experience as a chef",
      "Specialization in Thai cuisine, particularly Isan dishes",
      "Kitchen management experience",
      "Food hygiene certification"
    ],
    datePosted: "2025-05-03",
    isHot: true,
    categories: ["Food & Beverage", "Hospitality"]
  },
  {
    id: "4",
    title: "Cultural Heritage Officer",
    titleThai: "เจ้าหน้าที่มรดกทางวัฒนธรรม",
    company: "Wang Sam Mo Cultural Center",
    location: "Wang Sam Mo, Udon Thani",
    salary: "฿22,000 - ฿28,000 per month",
    employmentType: "Full-time",
    description: "Join our team as a Cultural Heritage Officer responsible for preserving and promoting the rich cultural heritage of Wang Sam Mo. The role includes conducting research, organizing cultural events, and developing educational programs.",
    descriptionThai: "เข้าร่วมทีมของเราในฐานะเจ้าหน้าที่มรดกทางวัฒนธรรมที่รับผิดชอบการอนุรักษ์และส่งเสริมมรดกทางวัฒนธรรมอันอุดมสมบูรณ์ของวังสามหมอ บทบาทนี้รวมถึงการทำวิจัย การจัดงานทางวัฒนธรรม และการพัฒนาโปรแกรมการศึกษา",
    requirements: [
      "Degree in Cultural Studies, Anthropology, or related field",
      "Knowledge of Thai cultural heritage",
      "Strong organizational and event planning skills",
      "Excellent communication and presentation abilities"
    ],
    datePosted: "2025-05-01",
    categories: ["Education", "Culture"]
  },
  {
    id: "5",
    title: "Marketing Coordinator",
    titleThai: "ผู้ประสานงานการตลาด",
    company: "Wang Sam Mo Tourism Board",
    location: "Wang Sam Mo, Udon Thani",
    salary: "฿20,000 - ฿28,000 per month",
    employmentType: "Full-time",
    description: "We are looking for a Marketing Coordinator to help promote Wang Sam Mo as a premier tourist destination. Responsibilities include developing marketing campaigns, managing social media accounts, and coordinating with local businesses.",
    descriptionThai: "เรากำลังมองหาผู้ประสานงานการตลาดเพื่อช่วยส่งเสริมวังสามหมอให้เป็นจุดหมายปลายทางท่องเที่ยวชั้นนำ ความรับผิดชอบรวมถึงการพัฒนาแคมเปญการตลาด การจัดการบัญชีสื่อสังคม และการประสานงานกับธุรกิจท้องถิ่น",
    requirements: [
      "Bachelor's degree in Marketing or related field",
      "Experience in tourism marketing preferred",
      "Strong digital marketing skills",
      "Creative thinking and excellent communication abilities"
    ],
    datePosted: "2025-04-28",
    categories: ["Marketing", "Tourism"]
  },
  {
    id: "6",
    title: "Adventure Tour Operator",
    titleThai: "ผู้ดำเนินการทัวร์ผจญภัย",
    company: "Wang Adventure Co.",
    location: "Wang Sam Mo, Udon Thani",
    salary: "฿18,000 - ฿25,000 per month",
    employmentType: "Full-time",
    description: "Join our team as an Adventure Tour Operator to lead exciting outdoor activities including hiking, kayaking, and wildlife tours around Wang Sam Mo. The ideal candidate has outdoor experience and a passion for adventure.",
    descriptionThai: "เข้าร่วมทีมของเราในฐานะผู้ดำเนินการทัวร์ผจญภัยเพื่อนำกิจกรรมกลางแจ้งที่น่าตื่นเต้น รวมถึงการเดินป่า การพายเรือคายัค และทัวร์ชมสัตว์ป่ารอบวังสามหมอ ผู้สมัครที่เหมาะสมมีประสบการณ์กลางแจ้งและมีความหลงใหลในการผจญภัย",
    requirements: [
      "Experience leading outdoor activities",
      "First aid and CPR certification",
      "Physical fitness and outdoor skills",
      "Knowledge of local geography and wildlife"
    ],
    datePosted: "2025-04-25",
    isHot: true,
    categories: ["Tourism", "Outdoor Recreation"]
  }
];

export const categories = [
  "Tourism",
  "Hospitality",
  "Food & Beverage",
  "Customer Service",
  "Education",
  "Culture",
  "Marketing",
  "Outdoor Recreation"
];

export const employmentTypes = [
  "Full-time",
  "Part-time",
  "Contract",
  "Internship"
];
