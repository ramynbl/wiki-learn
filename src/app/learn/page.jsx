"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import HeaderLogo from '../../components/organisms/HeaderLogo/HeaderLogo';
import TopicCarousel from '../../components/organisms/TopicCarousel/TopicCarousel';
import Typography from '../../components/atoms/Typography/Typography';
import { useAppStore } from '../../store/useAppStore';

// Import de nos fausses données (Simulation API)
import topicsMock from '../../data/topicsMock.json';
import styles from './Learn.module.css';

export default function LearnPage() {
  const router = useRouter();
  const setTopic = useAppStore((state) => state.setTopic);
  
  // Petite astuce Zustand : on met un state local monté
  // pour éviter les erreurs d'hydratation côté SSR
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSelectTopic = (topicId) => {
    // 1. Sauvegarde dans Zustand (et LocalStorage automatiquement)
    setTopic(topicId);
    
    // 2. Navigation vers le faux écran de chargement "Loader"
    router.push('/loading');
  };

  if (!isMounted) return null; // Prévention hydratation

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
