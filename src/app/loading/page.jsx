"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useAppStore } from '../../store/useAppStore';
import styles from './Loading.module.css';

// C'est le nombre de petits ronds qu'on affiche en bas pour le chargement.
const DOT_COUNT = 7;

export default function LoadingPage() {
  const router = useRouter();
  const selectedTopicId = useAppStore((state) => state.selectedTopicId);

  useEffect(() => {
    // Petite sécu : si jamais on arrive ici sans avoir choisi de thème, on repart en arrière.
    if (!selectedTopicId) {
      router.push('/learn');
      return;
    }

    // Fake loading de 2 secondes pour faire genre le serveur réfléchit.
    const timer = setTimeout(() => {
      router.push(`/topic/${selectedTopicId}`);
    }, 2000);

    return () => clearTimeout(timer);
  }, [selectedTopicId, router]);

  return (
    <div className={styles.page}>
      
      {/* Notre logo en haut de l'écran */}
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

      {/* Le globe qui flotte au centre */}
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

      {/* Les petits ronds qui s'animent tout seuls avec les styles CSS */}
      <div className={styles.dotsWrapper}>
        {[...Array(DOT_COUNT)].map((_, i) => (
          <div key={i} className={styles.dot} />
        ))}
      </div>

    </div>
  );
}
