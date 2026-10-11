type Contact = {
  link: string;
  icon: React.ComponentType<React.ComponentProps<'svg'>>;
};

export const CONTACTS = {
  Facebook: {
    link: 'https://www.facebook.com/hcmute.dsc',
    icon: require('@site/static/img/logo/facebook.svg').default,
  } as Contact,
  Github: {
    link: 'https://github.com/hcmute-dsc',
    icon: require('@site/static/img/logo/github.svg').default,
  } as Contact,
  Email: {
    link: 'mailto:clb.dsc@student.hcmute.edu.vn',
    icon: require('@site/static/img/logo/email.svg').default,
  } as Contact,
  Website: {
    link: 'https://hcmute-dsc.io.vn',
    icon: require('@site/static/img/logo/www.svg').default,
  } as Contact,
}