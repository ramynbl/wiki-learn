import { redirect } from 'next/navigation';

export default async function Home() {
  // On envoie vers l'intro vidéo dès l'arrivée sur le site
  redirect('/start');
  return null;
}
