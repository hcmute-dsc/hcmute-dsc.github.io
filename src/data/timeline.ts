export type Milestone = {
  date: { vi: string; en: string };
  title: { vi: string; en: string };
  description: { vi: string; en: string };
  link?: string;
};

// Oldest first. Sources: the club's Facebook posts, archived under /news.
export const TIMELINE: Milestone[] = [
  {
    date: { vi: '20/07/2021', en: 'Jul 20, 2021' },
    title: { vi: 'Ra đời với tên GDSC HCMUTE', en: 'Founded as GDSC HCMUTE' },
    description: {
      vi: 'CLB Sinh viên Lập trình Google – HCMUTE (Google Developer Student Clubs – HCMUTE) được thành lập tại khoa Công nghệ Thông tin.',
      en: 'Google Developer Student Clubs – HCMUTE is founded at the Faculty of Information Technology.',
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
    date: { vi: '08/2022', en: 'Aug 2022' },
    title: { vi: 'Cuộc thi HCMUTE CTF đầu tiên', en: 'First HCMUTE CTF' },
    description: {
      vi: 'Tổ chức cuộc thi học thuật "Sinh viên với An toàn Thông tin" (HCMUTE CTF) lần thứ nhất.',
      en: 'The club runs the first "Students and Information Security" contest (HCMUTE CTF).',
    },
    link: '/news/2022/08/26/kick-off-cuoc-thi-hoc-thuat-sinh-vien-voi-an-toan-thong-tin',
  },
  {
    date: { vi: '2023', en: '2023' },
    title: { vi: 'Workshop Git & GitHub, GDSC Vietnam Hackathon', en: 'Git & GitHub workshop, GDSC Vietnam Hackathon' },
    description: {
      vi: 'Workshop Git & GitHub đầu tiên, đồng hành cùng GDSC Vietnam Hackathon 2023 và ra mắt website của CLB.',
      en: 'First Git & GitHub workshop, GDSC Vietnam Hackathon 2023 and the launch of the club website.',
    },
    link: '/news/2023/02/20/workshop-git-github-recap',
  },
  {
    date: { vi: '02–04/2024', en: 'Feb–Apr 2024' },
    title: { vi: 'Git & GitHub Study Jam', en: 'Git & GitHub Study Jam' },
    description: {
      vi: 'Chương trình học và thực hành Git & GitHub theo đội cho sinh viên khoa CNTT, đồng hành cùng KMS Healthcare.',
      en: 'A team-based Git & GitHub learning program for IT students, sponsored by KMS Healthcare.',
    },
    link: '/news/2024/04/06/tong-ket-git-github-study-jam',
  },
  {
    date: { vi: '10/2024', en: 'Oct 2024' },
    title: { vi: 'Trở thành HCMUTE Developer Student Club', en: 'Becoming HCMUTE Developer Student Club' },
    description: {
      vi: 'Rời chương trình Google Developer Student Clubs, CLB đổi tên thành CLB Sinh viên Lập trình HCMUTE (HCMUTE DSC) với định hướng và bộ nhận diện mới, đồng thời kỷ niệm 3 năm thành lập.',
      en: 'Leaving the Google Developer Student Clubs program, the club becomes HCMUTE Developer Student Club (HCMUTE DSC) with a new direction and identity, and celebrates its 3rd anniversary.',
    },
    link: '/news/2024/10/14/thong-bao-quan-trong-tu-clb-gdsc-hcmute',
  },
  {
    date: { vi: '2025', en: '2025' },
    title: { vi: 'SQL Challenge & Git & GitHub Study Jam 2025', en: 'SQL Challenge & Git & GitHub Study Jam 2025' },
    description: {
      vi: 'Learning Sprint SQL Challenge, workshop Bảo vệ quyền lợi lao động trong ngành CNTT và Git & GitHub Study Jam 2025 với các sản phẩm của từng đội.',
      en: 'Learning Sprint SQL Challenge, a workshop on labour rights in IT, and Git & GitHub Study Jam 2025 with products from every team.',
    },
    link: '/news/2025/12/15/tong-ket-git-github-study-jam-2025-hcmute-dsc',
  },
  {
    date: { vi: '2026', en: '2026' },
    title: { vi: 'InterviewPrep101, ClubDay & tuyển Gen 7', en: 'InterviewPrep101, ClubDay & Gen 7' },
    description: {
      vi: 'Chuỗi InterviewPrep101, SQL Challenge 2026, tuyển thành viên Gen 7, ra mắt ClubDay và website mới tại hcmute-dsc.io.vn.',
      en: 'The InterviewPrep101 series, SQL Challenge 2026, Gen 7 recruitment, ClubDay and the new website at hcmute-dsc.io.vn.',
    },
    link: '/news/tags/tuyen-thanh-vien',
  },
  {
    date: { vi: '20/07/2026', en: 'Jul 20, 2026' },
    title: { vi: 'Tròn 5 năm & Memoryland', en: '5 years & Memoryland' },
    description: {
      vi: 'CLB tròn 5 năm thành lập và ra mắt Memoryland, kho ký ức số lưu giữ hành trình, các thế hệ và câu chuyện của HCMUTE DSC, cùng chiến dịch #WeWereThere mời các thế hệ góp ký ức.',
      en: 'The club turns 5 and launches Memoryland, a digital archive of the journey, generations and stories of HCMUTE DSC, with the #WeWereThere campaign inviting every generation to share memories.',
    },
    link: 'https://memoryland.hcmute-dsc.io.vn',
  },
];
