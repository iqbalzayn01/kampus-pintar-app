import { HomeIcon, CircleQuestionMark, ChartBar } from 'lucide-react';

export const navLinks = {
  navMain: [
    {
      title: 'Questions',
      url: '/',
      icon: CircleQuestionMark,
      isActive: false,
    },
    {
      title: 'Leaderboards',
      url: '/leaderboards',
      icon: ChartBar,
      isActive: false,
    },
  ],
};
