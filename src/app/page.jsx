import { redirect } from 'next/navigation';

export default function Home() {
  // Pour ce MVP, l'accueil redirige directement vers le choix du thème.
  redirect('/learn');
}
