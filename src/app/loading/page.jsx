"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useAppStore } from '../../store/useAppStore';
import HeaderLogo from '../../components/organisms/HeaderLogo/HeaderLogo';
import Typography from '../../components/atoms/Typography/Typography';
import styles from './Loading.module.css';

export default function LoadingPage() {
  const router = useRouter();
  const selectedTopicId = useAppStore((state) => state.selectedTopicId);

  useEffect(() => {
    // C'est une sécurité : si on n'a pas de thème en mémoire, on rembobine vers l'accueil
    if (!selectedTopicId) {
      router.push('/learn');
      return;
    }

    // On fait semblant que le serveur met 1.5 secondes à nous répondre
    const timer = setTimeout(() => {
      router.push(`/topic/${selectedTopicId}`);
    }, 1500);

    return () => clearTimeout(timer);
  }, [selectedTopicId, router]);

  return (
    <div className={styles.page}>
      <HeaderLogo />
      
      <main className={styles.container}>
        <motion.div 
          className={styles.loaderDots}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Quelques divs qui rebondissent pour faire patienter l'utilisateur */}
          {[...Array(3)].map((_, i) => (
            <motion.div 
              key={i}
              className={styles.dot}
              animate={{ y: [0, -15, 0] }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>
        
        <Typography variant="h3" style={{ marginTop: '24px' }}>
          Préparation des fiches...
        </Typography>
      </main>
    </div>
  );
}
