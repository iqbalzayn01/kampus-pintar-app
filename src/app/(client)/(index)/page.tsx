import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';
import { Header } from './_components/header';
import { TopicCard } from './_components/topic-card';
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

export default async function Home() {
  const session = await auth();

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Header />
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {session?.user ? (
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button asChild>
              <Link href="/myprofile">My Account</Link>
            </Button>
          </div>
        ) : (
          <div className="flex gap-4 items-center flex-col sm:flex-row">
            <Button asChild>
              <Link href="/signup">Sign Up</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/login">Login</Link>
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {mockTopics.map((topic) => (
            <TopicCard key={topic.id} {...topic} />
          ))}
        </div>
      </main>
    </div>
  );
}
