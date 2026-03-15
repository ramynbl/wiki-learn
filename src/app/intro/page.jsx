"use client";

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './Intro.module.css';

/**
 * Page d'introduction : on joue la vidéo intro_mobile.mp4 avant d'envoyer
 * l'utilisateur sur la page de sélection des thèmes.
 *
 * Comportement :
 * - La vidéo démarre automatiquement en muet (les navigateurs bloquent l'autoplay avec le son)
 * - L'utilisateur peut activer le son avec le bouton Son
 * - Il peut aussi sauter directement avec le bouton Skip
 * - Quand la vidéo finit (ou au skip), on fait un fondu vers le noir puis on redirige
 */
export default function IntroPage() {
  const videoRef = useRef(null);
  const router = useRouter();

  // On détecte la source de la vidéo selon la taille de l'écran
  const [videoSrc, setVideoSrc] = useState("/assets/videos/intro_mobile.mp4");

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setVideoSrc(isDesktop ? "/assets/videos/intro_desktop.mp4" : "/assets/videos/intro_mobile.mp4");
    };

    // Vérification initiale
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On force le rechargement de la vidéo quand la source change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  // Est-ce que la vidéo est en muet ?
  // NOTE : Les navigateurs bloquent l'autoplay sans interaction si le son est activé.
  // On démarre donc Muted pour que la vidéo SE LANCE, puis l'utilisateur demute s'il veut.
  const [isMuted, setIsMuted] = useState(true);

  // Tentative de lecture forcée à chaque changement
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // L'autoplay est parfois capricieux même en muted
        console.log("Lecture auto bloquée par le navigateur");
      });
    }
  }, [videoSrc]);

  // Contrôle l'overlay noir pour la transition de sortie
  const [isFading, setIsFading] = useState(false);

  /**
   * Déclenche le fondu vers le noir puis redirige vers /learn
   */
  const handleExit = () => {
    // On envoie le signal → AudioPlayer lancera la musique à l'arrivée sur /learn
    window.dispatchEvent(new Event('start-theme-song'));

    setIsFading(true);
    // On attend la fin de l'animation (0.4s) avant de changer de page
    setTimeout(() => {
      router.push('/learn');
    }, 400);
  };

  /**
   * Quand la vidéo se termine, on lance la transition automatiquement
   */
  const handleVideoEnd = () => {
    handleExit();
  };

  /**
   * Toggle le son de la vidéo
   */
  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={styles.page}>

      {/* La vidéo plein écran — autoPlay + muted obligatoires ensemble pour que ça marche dans Chrome/Safari */}
      <video
        ref={videoRef}
        className={styles.video}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Boutons de contrôle en overlay (en haut à droite) */}
      <div className={styles.controls}>

        {/* Bouton Son / Muet */}
        <button
          className={styles.ctaBtn}
          onClick={handleToggleMute}
          aria-label={isMuted ? 'Activer le son' : 'Couper le son'}
        >
          <Image
            src={isMuted ? "/assets/components/muet.png" : "/assets/components/du-son.png"}
            alt="Toggle Son"
            width={80}
            height={40}
            unoptimized
          />
        </button>

        {/* Bouton Skip avec l'image skip.png */}
        <button
          className={styles.skipBtn}
          onClick={handleExit}
          aria-label="Passer l'intro"
        >
          <Image
            src="/assets/components/skip.png"
            alt="Skip"
            width={80}
            height={40}
            unoptimized
          />
        </button>
      </div>

      {/* Overlay noir qui apparaît pour la transition de sortie */}
      <AnimatePresence>
        {isFading && (
          <motion.div
            className={styles.fadeOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
