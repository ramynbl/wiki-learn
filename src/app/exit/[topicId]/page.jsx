"use client";

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Typography from '../../../components/atoms/Typography/Typography';
import Button from '../../../components/atoms/Button/Button';
import styles from './Exit.module.css';

/**
 * Page Exit : /exit/[topicId]
 *
 * Page de confirmation quand l'utilisateur clique sur la croix.
 * On affiche la planète + des points d'interrogation animés (tortillement)
 * et on demande s'il veut vraiment quitter et perdre sa série.
 *
 * - "Oui" → on retourne à /learn
 * - "Non" → on revient à la page d'avant (router.back)
 */
export default function ExitPage({ params }) {
  const { topicId } = use(params);
  const router = useRouter();

  const handleYes = () => {
    router.push('/learn');
  };

  const handleNo = () => {
    router.back();
  };

  /**
   * Animation de tortillement pour les points d'interrogation.
   * Chaque point a un délai différent pour ne pas être synchronisé.
   */
  const wobbleVariant = (delay) => ({
    animate: {
      rotate: [-8, 8, -6, 7, -8],
      opacity: [0, 1, 1, 1, 0],
    },
    transition: {
      rotate: {
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      },
      opacity: {
        duration: 3.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: delay + 0.3,
      },
    },
  });

  const wobble1 = wobbleVariant(0);
  const wobble2 = wobbleVariant(1.2);

  return (
    <div className={styles.page}>

      {/* Zone illustration */}
      <div className={styles.illustrationArea}>

        {/* Point d'interrogation gauche — tortillement + fade async */}
        <motion.div
          className={styles.questionMark1}
          animate={wobble1.animate}
          transition={wobble1.transition}
        >
          <Image
            src="/assets/components/point-dinterrogation-2.png"
            alt="?"
            width={70}
            height={70}
            unoptimized
            className={styles.questionImage}
          />
        </motion.div>

        {/* Point d'interrogation droite — tortillement + fade async (décalé) */}
        <motion.div
          className={styles.questionMark2}
          animate={wobble2.animate}
          transition={wobble2.transition}
        >
          <Image
            src="/assets/components/point-dinterrogation-3.png"
            alt="?"
            width={80}
            height={80}
            unoptimized
            className={styles.questionImage}
          />
        </motion.div>

        {/* Planète au centre avec bounce */}
        <motion.div
          className={styles.planetWrapper}
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
            width={180}
            height={180}
            unoptimized
            priority
          />
        </motion.div>
      </div>

      {/* Zone texte + boutons */}
      <div className={styles.contentArea}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.2 }}
        >
          <Typography variant="h2" className={styles.mainTitle} cartoon>
            Êtes-vous sûr de vouloir retournez à l&apos;accueil et de perdre votre série ?
          </Typography>
        </motion.div>

        {/* CTA Oui — bouton blanc → retour accueil */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.4 }}
        >
          <Button variant="secondary" fullWidth onClick={handleYes}>
            Oui
          </Button>
        </motion.div>

        {/* CTA Non — bouton bleu → retour page précédente */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.55 }}
        >
          <Button variant="primary" fullWidth onClick={handleNo}>
            Non
          </Button>
        </motion.div>
      </div>

    </div>
  );
}
