import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import { getNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage({ params }: { params: Promise<{ slug: string[] }> }) {
  const queryClient = new QueryClient();

  const { slug } = await params;

  const tag = slug[0];

  await queryClient.prefetchQuery({
    queryKey: ['notes', 1, '', tag],
    queryFn: () => getNotes(1, '', tag),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}
