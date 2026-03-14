"use client";

import { use, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Typography from '../../../components/atoms/Typography/Typography';
import Button from '../../../components/atoms/Button/Button';
import { useAppStore } from '../../../store/useAppStore';
import styles from './Results.module.css';

/**
 * Page de fin de parcours : /results/[topicId]
 *
 * 3 phases internes :
 * 1. "bravo" → le livre apparaît avec un zoom rebond + titre
 * 2. "engage" → texte pour motiver l'utilisateur + CTA continuer
 * 3. "choice" → 2 options : continuer sans save OU se connecter
 */
export default function ResultsPage({ params }) {
  const { topicId } = use(params);
  const router = useRouter();
  const resetAll = useAppStore((state) => state.resetAll);

  // On gère les 3 écrans avec un simple state string
  const [phase, setPhase] = useState('bravo');

  // Phase 1 → Phase 2 automatiquement après 3.5 secondes
  useEffect(() => {
    if (phase === 'bravo') {
      const timer = setTimeout(() => setPhase('engage'), 3500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  // "Continuer" sans sauvegarder → on réinitialise tout et on retourne au menu
  const handleContinue = () => {
    resetAll();
    router.push('/learn');
  };

  // "Se connecter" → placeholder pour le futur système d'auth → Renvoi vers learn pour le moment
  const handleLogin = () => {
    router.push('/learn');
  };

  const handleClose = () => {
    resetAll();
    router.push('/learn');
  };

  return (
    <div className={styles.page}>

      {/* Header : globe + croix (comme partout) */}
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

      {/* ===== PHASE 1 : BRAVO — Le livre zoom + titre ===== */}
      {phase === 'bravo' && (
        <div className={styles.centerContent}>
          {/* Container pour le livre + explosion */}
          <div className={styles.rewardWrapper}>

            {/* Explosion en arrière-plan (statique pour le centrage, motion pour l'anime) */}
            <div className={styles.explosionContainer}>
              <motion.div
                className={styles.explosionWrapper}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <Image
                  src="/assets/components/explosion-2.png"
                  alt="Explosion"
                  width={400}
                  height={400}
                  className={styles.explosionImage}
                  unoptimized
                />
              </motion.div>
            </div>

            {/* Le livre apparaît en zoomant et commence directement son rebond */}
            <motion.div
              className={styles.bookWrapper}
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
                }
              }}
            >
              <Image
                src="/assets/icons/livre.png"
                alt="Livre récupéré"
                width={160}
                height={160}
                className={styles.heroImage}
                unoptimized
              />
            </motion.div>
          </div>

          {/* Le titre slide en dessous */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
          >
            <Typography variant="h2" className={styles.mainTitle} cartoon>
              Bravo ! Tu as récupéré un livre !
            </Typography>
          </motion.div>
        </div>
      )}

      {/* ===== PHASE 2 : ENGAGE ===== */}
      {phase === 'engage' && (
        <div className={styles.centerContent}>
          {/* Container pour le livre + explosion (Phase Engage) */}
          <div className={styles.rewardWrapper}>
            <div className={styles.explosionContainer}>
              <motion.div
                className={styles.explosionWrapper}
                animate={{
                  rotate: 360,
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  rotate: { duration: 10, repeat: Infinity, ease: 'linear' },
                  scale: { duration: 2.5, repeat: Infinity, ease: 'easeInOut' },
                }}
              >
                <Image
                  src="/assets/components/explosion-2.png"
                  alt="Explosion"
                  width={400}
                  height={400}
                  className={styles.explosionImage}
                  unoptimized
                />
              </motion.div>
            </div>

            <motion.div
              className={styles.bookWrapper}
              animate={{ y: [0, -12, 0] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: [0.34, 1.56, 0.64, 1],
                repeatType: 'loop',
              }}
            >
              <Image
                src="/assets/icons/livre.png"
                alt="Livre"
                width={160}
                height={160}
                className={styles.heroImage}
                unoptimized
              />
            </motion.div>
          </div>

          {/* Texte d'engagement + fade in */}
          <motion.p
            className={styles.engageText}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 22 }}
          >
            Continue à apprendre pour enrichir ta collection de livres et remporter des récompenses !
          </motion.p>

          {/* CTA "Continuer" → passe à la phase choix */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.45 }}
          >
            <Button variant="secondary" fullWidth onClick={() => setPhase('choice')}>
              Continuer
            </Button>
          </motion.div>
        </div>
      )}

      {/* ===== PHASE 3 : CHOIX — Continuer ou se connecter ===== */}
      {phase === 'choice' && (
        <div className={styles.centerContent}>
          {/* Globe rebond */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -10, 0] }}
            transition={{
              scale: { type: 'spring', stiffness: 260, damping: 18 },
              opacity: { duration: 0.35 },
              y: { duration: 1.8, repeat: Infinity, ease: [0.34, 1.56, 0.64, 1], repeatType: 'loop', delay: 0.5 },
            }}
          >
            <Image
              src="/assets/illustrations/planete.png"
              alt="Globe"
              width={160}
              height={160}
              className={styles.heroImage}
              unoptimized
            />
          </motion.div>

          {/* Titre */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }}
          >
            <Typography variant="h2" className={styles.mainTitle} cartoon>
              Bien joué ! Tu as fini ta leçon
            </Typography>
          </motion.div>

          {/* Les 2 blocs de choix */}
          <motion.div
            className={styles.choiceSection}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 180, damping: 20, delay: 0.5 }}
          >
            {/* Option 1 : Continuer sans sauvegarder */}
            <div className={styles.choiceBlock}>
              <p className={styles.choiceLabel}>Continuer d&apos;apprendre</p>
              <p className={styles.choiceDescription}>Ne sauvegarde pas la progression</p>
              <Button variant="secondary" fullWidth onClick={handleContinue}>
                Continuer
              </Button>
            </div>

            {/* Option 2 : Se connecter pour sauvegarder */}
            <div className={styles.choiceBlock}>
              <p className={styles.choiceLabel}>Se connecter / Créer un compte</p>
              <p className={styles.choiceDescription}>
                Sauvegarde ta progression pour remporter des récompenses
              </p>
              <Button variant="primary" fullWidth onClick={handleLogin}>
                Se connecter
              </Button>
            </div>
          </motion.div>
        </div>
      )}

    </div>
  );
}
