"use client";

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Typography from '../../../components/atoms/Typography/Typography';
import styles from './Reward.module.css';

/**
 * Page Récompense : /reward/[topicId]
 *
 * Apparaît après les fiches de cours, avant le quiz.
 * 2 phases internes :
 * 1. "loading" → Barre de progression qui se remplit en ~3s + planète bounce
 * 2. "bravo" → explosion animée en fond + pages.png en vedette + texte + CTA
 */
export default function RewardPage({ params }) {
  const { topicId } = use(params);
  const router = useRouter();

  // Phase actuelle : "loading" ou "bravo"
  const [phase, setPhase] = useState('loading');

  // Pourcentage de la barre de progression (0 → 100)
  const [progress, setProgress] = useState(0);

  // Phase loading : la barre se remplit progressivement en ~3 secondes
  useEffect(() => {
    if (phase !== 'loading') return;

    // On incrémente le pourcentage toutes les 30ms (100 étapes × 30ms = 3s)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Petit délai avant de passer à la phase bravo pour l'effet
          setTimeout(() => setPhase('bravo'), 300);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    return () => clearInterval(interval);
  }, [phase]);

  // CTA → on passe au quiz (Désormais le quiz vient après la récompense)
  const handleContinue = () => {
    router.push(`/quiz/${topicId}`);
  };

  const handleClose = () => {
    router.push(`/exit/${topicId}`);
  };

  return (
    <div className={styles.page}>

      {/* Header : globe + croix (Ajouté car maintenant c'est une page d'étape) */}
      <header className={styles.header}>
        <Image
          src="/assets/illustrations/planete.png"
          alt="WikiLearn"
          width={60}
          height={60}
          className={styles.globeIcon}
          unoptimized
          priority
        />
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Fermer">
          <Image
            src="/assets/components/croix.png"
            alt="Fermer"
            width={36}
            height={36}
            className={styles.closeBtnImg}
            unoptimized
          />
        </button>
      </header>

      {/* ===== PHASE 1 : PRELOADER ===== */}
      {phase === 'loading' && (
        <div className={styles.centerContent}>
          {/* Planète qui bounce doucement */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: [0.34, 1.56, 0.64, 1],
              repeatType: 'loop',
            }}
          >
            <Image
              src="/assets/illustrations/planete.png"
              alt="Globe WikiLearn"
              width={160}
              height={160}
              className={styles.heroImage}
              unoptimized
              priority
            />
          </motion.div>

          {/* Barre de progression style Apple */}
          <div className={styles.progressContainer}>
            <div className={styles.progressTrack}>
              <motion.div
                className={styles.progressFill}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Texte sous la barre */}
          <Typography variant="h3" className={styles.loadingText} cartoon>
            Calcul de ta récompense...
          </Typography>
        </div>
      )}

      {/* ===== PHASE 2 : BRAVO ===== */}
      {phase === 'bravo' && (
        <div className={styles.centerContent}>

          {/* Conteneur statique avec taille fixe — l'explosion s'y positionne correctement */}
          <div className={styles.pagesWrapper}>

            {/* Container statique pour le centrage absolu — empêche les décalages d'animation */}
            <div className={styles.explosionContainer}>
              <motion.div
                className={styles.explosionWrapper}
                animate={{
                  rotate: 360,
                  scale: [1, 1.15, 1],
                }}
                transition={{
                  rotate: {
                    duration: 8,
                    repeat: Infinity,
                    ease: 'linear',
                  },
                  scale: {
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  },
                }}
              >
                <Image
                  src="/assets/components/explosion-2.png"
                  alt="Explosion"
                  width={350}
                  height={350}
                  className={styles.explosionImage}
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Pages.png DEVANT — z-index 2, bounce en boucle */}
            <motion.div
              className={styles.pagesImageWrapper}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1, y: [0, -12, 0] }}
              transition={{
                scale: { type: 'spring', stiffness: 260, damping: 16 },
                opacity: { duration: 0.3 },
                y: {
                  duration: 1.6,
                  repeat: Infinity,
                  ease: [0.34, 1.56, 0.64, 1],
                  repeatType: 'loop',
                  delay: 0.5,
                },
              }}
            >
              <Image
                src="/assets/components/pages.png"
                alt="5 pages gagnées"
                width={180}
                height={180}
                className={styles.pagesImage}
                unoptimized
              />
            </motion.div>
          </div>

          {/* Texte de félicitation (plus bas via gap/margin CSS) */}
          <motion.div
            className={styles.textContainer}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
          >
            <Typography variant="h2" className={styles.mainTitle} cartoon>
              Bravo ! Tu as gagné 5 pages !
            </Typography>
          </motion.div>

          {/* CTA Continuer */}
          <motion.button
            className={styles.ctaBlue}
            onClick={handleContinue}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.7 }}
          >
            Continuer
          </motion.button>
        </div>
      )}

    </div>
  );
}
