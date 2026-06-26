export const SITE = {
  name: 'DJ FOOL Wuilin',
  tagline: 'Scratch the World',
  description:
    'The home of scratch-the-world portablism — scratch tutorials, gear guides, a Q&A knowledge base, and a city-by-city scratch travel diary from Taipei turntablist DJ FOOL Wuilin.',
  url: 'https://foolwuilin.github.io',
  author: 'Yilin Wu',
  altNames: ['DJ 負我', '吳奕霖', 'Yilin Wu', 'foolwuilin'],
  email: 'iichizero@yahoo.com.tw',
  socials: {
    instagram: 'https://www.instagram.com/foolwuilin/',
    youtube: 'https://www.youtube.com/user/ichizero',
    soundcloud: 'https://soundcloud.com/foolwuilin',
    mixcloud: 'https://www.mixcloud.com/foolwuilin/',
    facebook: 'https://www.facebook.com/foolwuilin',
    linkedin: 'https://www.linkedin.com/in/yilin-william-wu',
    wordpress: 'https://foolwuilin.wordpress.com/',
  },
};

export const NAV = [
  { href: '/scratch-the-world', label: 'Scratch the World' },
  { href: '/tutorials', label: 'Tutorials' },
  { href: '/gear', label: 'Gear' },
  { href: '/qa', label: 'Q&A' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export const sameAs = Object.values(SITE.socials);
