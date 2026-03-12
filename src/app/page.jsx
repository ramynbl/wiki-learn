import { redirect } from 'next/navigation';

export default async function Home() {
  // Une simple redirection côté serveur vers la vue /learn
  redirect('/learn');
  return null;
}
