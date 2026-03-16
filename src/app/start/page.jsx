"use client";

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Button from '../../components/atoms/Button/Button';
import styles from './Start.module.css';

// C'est notre porte d'entrée ! On s'en sert aussi pour "réveiller" l'audio du navigateur 
// (il bloque tout s'il n'y a pas un vrai clic humain au début).
export default function StartPage() {
  const router = useRouter();

  // Petit bouton pour lancer l'aventure
  const handleStart = () => {
    // Hop, on file vers l'intro. Le clic prépare le terrain pour la musique plus tard.
    router.push('/intro');
  };

  return (
    <div className={styles.page}>
      {/* Vidéo de fond en boucle */}
      <video
        className={styles.videoBg}
        src="/assets/videos/background-landing.mp4"
        autoPlay
        muted
        loop
        playsInline
      />

      {/* Overlay sombre pour la lisibilité */}
      <div className={styles.overlay} />

      {/* Contenu centré */}
      <div className={styles.content}>
        <Image
          src="/assets/logo/WikiLearn-black2.png"
          alt="WikiLearn"
          width={300}
          height={80}
          className={styles.logo}
          unoptimized
          priority
        />

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
            className={styles.planet}
            unoptimized
          />
        </motion.div>

        <p className={styles.tagline}>
          Sauve le savoir de l&apos;humanité, une page à la fois.
        </p>

        <div className={styles.cta}>
          <Button onClick={handleStart}>
            Apprendre
          </Button>

          <div className={styles.footer}>
            <p className={styles.text}>
              Son immersif en perspective. Pour une expérience optimale, utilisez un casque.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
