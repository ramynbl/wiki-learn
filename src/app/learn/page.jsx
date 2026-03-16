"use client";

import { useRouter } from 'next/navigation';
import HeaderLogo from '../../components/organisms/HeaderLogo/HeaderLogo';
import TopicCarousel from '../../components/organisms/TopicCarousel/TopicCarousel';
import Typography from '../../components/atoms/Typography/Typography';
import { useAppStore } from '../../store/useAppStore';

// On importe notre faux JSON pour faire semblant d'avoir une vraie base de données en attendant.
import topicsMock from '../../data/topicsMock.json';
import styles from './Learn.module.css';

export default function LearnPage() {
  const router = useRouter();
  // Je récupère l'outil pour changer le thème dans la mémoire globale (Zustand)
  const setTopic = useAppStore((state) => state.setTopic);

  // Dès qu'on clique sur un thème (genre l'Histoire)...
  const handleSelectTopic = (topicId) => {
    // On mémorise quel thème a été sélectionné
    setTopic(topicId);
    
    // On lance le petit écran de chargement (pour l'effet de suspense)
    router.push('/loading');
  };

  return (
    <div className={styles.page}>
      <HeaderLogo />

      <main className={styles.mainContent}>
        <Typography variant="h3" className={styles.prompt} cartoon>
          Que voulez-vous apprendre aujourd&apos;hui ?
        </Typography>

        <TopicCarousel
          topics={topicsMock}
          onSelectTopic={handleSelectTopic}
        />
      </main>
    </div>
  );
}
