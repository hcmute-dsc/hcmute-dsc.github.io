export type Milestone = {
  date: { vi: string; en: string };
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  link?: string;
};

// Newest last. Keep entries short: one title + one or two sentences.
export const TIMELINE: Milestone[] = [
  {
    date: { vi: '07/2021', en: 'Jul 2021' },
    title: { vi: 'Khởi đầu với tên GDSC HCMUTE', en: 'Starting out as GDSC HCMUTE' },
    description: {
      vi: 'CLB bắt đầu hành trình với tên Google Developer Student Clubs – HCMUTE, kết nối sinh viên yêu thích công nghệ tại HCMUTE.',
      en: 'The club starts its journey as Google Developer Student Clubs – HCMUTE, bringing together tech-loving students at HCMUTE.',
    },
  },
  {
    date: { vi: '10/10/2021', en: 'Oct 10, 2021' },
    title: { vi: 'Ra mắt video giới thiệu CLB', en: 'Club introduction video' },
    description: {
      vi: 'Video giới thiệu đầu tiên của CLB được công bố.',
      en: 'The first introduction video of the club is released.',
    },
    link: 'https://www.youtube.com/watch?v=hdXo_brnj9M',
  },
  {
    date: { vi: '07/2023', en: 'Jul 2023' },
    title: { vi: 'Website & blog của CLB', en: 'Club website & blog' },
    description: {
      vi: 'Ra mắt website, nơi chia sẻ bài viết, tài liệu và các dự án của thành viên.',
      en: 'The club website launches as a home for articles, tutorials and member projects.',
    },
  },
  {
    date: { vi: '2024', en: '2024' },
    title: { vi: 'Dự án Study Jam', en: 'Study Jam project' },
    description: {
      vi: 'Thành viên xây dựng web app Study Jam (Next.js + Spring Boot) và công khai mã nguồn để cùng học hỏi.',
      en: 'Members build the Study Jam web app (Next.js + Spring Boot) and open-source it for everyone to learn from.',
    },
    link: '/showcase',
  },
  {
    date: { vi: '2025', en: '2025' },
    title: { vi: 'Trở thành HCMUTE Developer Student Club', en: 'Becoming HCMUTE Developer Student Club' },
    description: {
      vi: 'CLB đổi tên thành HCMUTE Developer Student Club (HCMUTE DSC) với nhận diện mới, cùng loạt dự án ứng dụng AI như Web CV Boots AI và AI CheckFace.',
      en: 'The club is renamed HCMUTE Developer Student Club (HCMUTE DSC) with a new identity, alongside AI projects such as Web CV Boots AI and AI CheckFace.',
    },
  },
  {
    date: { vi: '10/2026', en: 'Oct 2026' },
    title: { vi: 'ClubDay 2026 & website mới', en: 'ClubDay 2026 & new website' },
    description: {
      vi: 'Ra mắt ClubDay – bộ mini game cho sự kiện CLB – và website mới tại hcmute-dsc.io.vn.',
      en: 'Launch of ClubDay – mini games for club events – and the new website at hcmute-dsc.io.vn.',
    },
    link: 'https://club-day.hcmute-dsc.io.vn',
  },
];
