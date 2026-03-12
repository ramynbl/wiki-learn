"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAppStore } from '../../store/useAppStore';
import styles from './Loading.module.css';

// Nombre de cercles dans l'indicateur de chargement
const DOT_COUNT = 7;

export default function LoadingPage() {
  const router = useRouter();
  const selectedTopicId = useAppStore((state) => state.selectedTopicId);

  useEffect(() => {
    // C'est une sécurité : si on n'a pas de thème en mémoire, on rembobine vers l'accueil
    if (!selectedTopicId) {
      router.push('/learn');
      return;
    }

    // On fait semblant que le serveur met 2 secondes à nous répondre (7 dots = 7 * ~285ms)
    const timer = setTimeout(() => {
      router.push(`/topic/${selectedTopicId}`);
    }, 5000);

    return () => clearTimeout(timer);
  }, [selectedTopicId, router]);

  return (
    <div className={styles.page}>
      
      {/* Logo Wiki.Learn en haut */}
      <div className={styles.logoWrapper}>
        <Image
          src="/assets/logo/WikiLearn-black2.png"
          alt="WikiLearn Logo"
          width={280}
          height={80}
          priority
          unoptimized
          className={styles.logo}
        />
      </div>

      {/* Globe terrestre au centre */}
      <main className={styles.main}>
        <motion.div
          className={styles.globeWrapper}
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <Image
            src="/assets/illustrations/planete.png"
            alt="Globe WikiLearn"
            width={220}
            height={220}
            priority
            unoptimized
          />
        </motion.div>
      </main>

      {/* Les 7 cercles vides en bas - animés en CSS pur (sweep de gauche à droite) */}
      <div className={styles.dotsWrapper}>
        {[...Array(DOT_COUNT)].map((_, i) => (
          <div key={i} className={styles.dot} />
        ))}
      </div>

    </div>
  );
}
