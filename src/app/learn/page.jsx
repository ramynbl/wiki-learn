"use client";

import { useRouter } from 'next/navigation';
import HeaderLogo from '../../components/organisms/HeaderLogo/HeaderLogo';
import TopicCarousel from '../../components/organisms/TopicCarousel/TopicCarousel';
import Typography from '../../components/atoms/Typography/Typography';
import { useAppStore } from '../../store/useAppStore';

// On importe notre faux JSON qui nous sert de base de données temporaire
import topicsMock from '../../data/topicsMock.json';
import styles from './Learn.module.css';

export default function LearnPage() {
  const router = useRouter();
  const setTopic = useAppStore((state) => state.setTopic);

  const handleSelectTopic = (topicId) => {
    // 1. On donne l'ID du thème sélectionné à Zustand (ça va de suite dans le localStorage)
    setTopic(topicId);
    
    // 2. On redirige vers notre fausse page de chargement pour faire passer le temps
    router.push('/loading');
  };

  return (
    <div className={styles.page}>
      <HeaderLogo />
      
      <main className={styles.mainContent}>
        <Typography variant="h3" className={styles.prompt} cartoon>
          Que voulez-vous apprendre aujourd'hui ?
        </Typography>

        <TopicCarousel 
          topics={topicsMock} 
          onSelectTopic={handleSelectTopic} 
        />
      </main>
    </div>
  );
}
