
export type NavigationLink = {
  text: string;
  textEn: string;
  href: string;
  isButton?: boolean;
  isHighlighted?: boolean;
};

export type NavigationSection = {
  title: string;
  titleEn: string;
  links: NavigationLink[];
};

export const navigationStructure: NavigationSection[] = [
  {
    title: 'หางาน',
    titleEn: 'Job Seeker',
    links: [
      { text: 'ค้นหางาน', textEn: 'Search Jobs', href: '/jobs' },
      { text: 'สร้างโปรไฟล์', textEn: 'Create Profile', href: '/profile' },
      { text: 'งานที่บันทึกไว้', textEn: 'Saved Jobs', href: '/saved-jobs' },
      { text: 'แจ้งเตือนงาน', textEn: 'Job Alerts', href: '/job-alerts' },
    ],
  },
  {
    title: 'สำหรับนายจ้าง',
    titleEn: 'Employers',
    links: [
      { text: 'ลงประกาศงาน', textEn: 'Post a Job', href: '/post-job', isButton: true, isHighlighted: true },
      { text: 'ราคาและแพ็คเกจ', textEn: 'Pricing & Packages', href: '/pricing' },
      { text: 'สร้างโปรไฟล์บริษัท', textEn: 'Create Company Profile', href: '/company-profile' },
    ],
  },
  {
    title: 'เกี่ยวกับเรา',
    titleEn: 'About',
    links: [
      { text: 'เกี่ยวกับเรา', textEn: 'About Us', href: '/about' },
      { text: 'ติดต่อเรา', textEn: 'Contact Us', href: '/contact' },
      { text: 'นโยบายความเป็นส่วนตัว', textEn: 'Privacy Policy', href: '/privacy' },
      { text: 'ข้อกำหนดการใช้งาน', textEn: 'Terms of Use', href: '/terms' },
    ],
  },
];
