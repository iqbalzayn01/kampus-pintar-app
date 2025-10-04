import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { Header } from './_components/header';
import { TopicCard } from './topics/_components/topic-card';
import Link from 'next/link';

const mockTopics = [
  {
    id: '1',
    title:
      'What are the key differences between supervised and unsupervised learning in machine learning?',
    authorName: 'Dr. Sarah Chen',
    authorImage: undefined,
    tags: ['Machine Learning', 'AI', 'Data Science'],
    voteCount: 42,
    responseCount: 8,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    title:
      'How does quantum entanglement challenge our understanding of classical physics?',
    authorName: 'Prof. Marcus Williams',
    authorImage: undefined,
    tags: ['Quantum Physics', 'Theoretical Physics'],
    voteCount: 38,
    responseCount: 12,
    createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    title:
      'Best practices for conducting literature reviews in social sciences research',
    authorName: 'Emma Rodriguez',
    authorImage: undefined,
    tags: ['Research Methods', 'Social Sciences', 'Academia'],
    voteCount: 25,
    responseCount: 15,
    createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    title:
      'The role of CRISPR-Cas9 in modern genetic engineering: ethical considerations',
    authorName: 'Dr. James Park',
    authorImage: undefined,
    tags: ['Genetics', 'Bioethics', 'CRISPR'],
    voteCount: 56,
    responseCount: 23,
    createdAt: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '5',
    title: 'Understanding the impact of climate change on marine biodiversity',
    authorName: 'Dr. Olivia Martinez',
    authorImage: undefined,
    tags: ['Climate Science', 'Marine Biology', 'Environment'],
    voteCount: 33,
    responseCount: 9,
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
  },
];

export default function Home() {
  return (
    <div className="relative font-sans flex flex-col items-center justify-items-center gap-10">
      <Header />

      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div className="space-y-4">
          {mockTopics.map((topic) => (
            <TopicCard key={topic.id} {...topic} />
          ))}
        </div>
      </main>
    </div>
  );
}
