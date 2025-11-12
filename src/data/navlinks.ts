import { HomeIcon, CircleQuestionMark, ChartBar } from 'lucide-react';

export const navLinks = {
  navMain: [
    {
      title: 'Home',
      url: '/',
      icon: HomeIcon,
      isActive: true,
    },
    {
      title: 'Questions',
      url: '#',
      icon: CircleQuestionMark,
      isActive: false,
    },
    {
      title: 'Leaderboards',
      url: '#',
      icon: ChartBar,
      isActive: false,
    },
  ],
};
