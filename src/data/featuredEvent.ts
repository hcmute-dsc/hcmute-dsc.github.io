/* eslint-disable global-require */

/**
 * The event featured at the top of the home page.
 *
 * To feature the next event: replace the values below and the image in `src/data/featured/`.
 * To hide the section: set FEATURED_EVENT to `null`.
 */
export interface FeaturedEvent {
  /** Small line above the title. */
  kicker: string;
  /** First line of the title (white). */
  title: string;
  /** Second line of the title (orange). */
  titleAccent: string;
  description: string;
  /** Wide 16:9 image. */
  image: string;
  imageAlt: string;
  stats: { label: string; value: string }[];
  primary: { label: string; to: string };
  /** Extra outline buttons, shown after the primary one. */
  secondary?: { label: string; to: string }[];
}

export const FEATURED_EVENT: FeaturedEvent | null = {
  kicker: 'Sự kiện nổi bật · 22/11 – 13/12/2026',
  title: 'Git & GitHub',
  titleAccent: 'Study Jam 2026',
  description:
    'Cùng nhóm 3 – 5 bạn hoàn thành nhiệm vụ theo tuần, học Git & GitHub qua thực hành, có mentor đồng hành. ' +
    'Nhóm hoàn thành nhận giấy chứng nhận, các nhóm dẫn đầu nhận tiền thưởng. ' +
    'CLB đã công bố 5 nhóm tham gia với tổng 22 bạn sinh viên.',
  image: require('./featured/study-jam-2026.webp').default,
  imageAlt: 'Git & GitHub Study Jam 2026: 5 nhóm, 22 bạn sinh viên',
  stats: [
    { label: 'Nhóm tham gia', value: '5' },
    { label: 'Bạn sinh viên', value: '22' },
    { label: 'Mentor', value: '3' },
    { label: 'Tuần học', value: '3' },
  ],
  primary: {
    label: 'Xem danh sách các nhóm',
    to: '/news/2026/11/21/cong-bo-danh-sach-cac-nhom-tham-gia-git-github-study-jam',
  },
  secondary: [
    { label: 'Xem lại buổi kick-off', to: 'https://youtu.be/xnzdZfYWrTk' },
    { label: 'Thể lệ chương trình', to: 'https://mentoring.hcmute-dsc.io.vn/git-github-rules/' },
  ],
};
