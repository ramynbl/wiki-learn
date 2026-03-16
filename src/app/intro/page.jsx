"use client";

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './Intro.module.css';

// La page d'intro : on balance la petite vidéo avant le choix des thèmes.
export default function IntroPage() {
  const videoRef = useRef(null);
  const router = useRouter();

  // Hop, je check la taille de l'écran pour savoir quelle vidéo lancer (mobile ou ordi)
  const [videoSrc, setVideoSrc] = useState("/assets/videos/intro_mobile.mp4");

  useEffect(() => {
    const handleResize = () => {
      const isDesktop = window.innerWidth >= 1024;
      setVideoSrc(isDesktop ? "/assets/videos/intro_desktop.mp4" : "/assets/videos/intro_mobile.mp4");
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On force la vidéo à se recharger si on change de source
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

  // On lance en muet par défaut because les navigateurs sont relous avec l'autoplay.
  const [isMuted, setIsMuted] = useState(true);

  // On essaie de forcer la lecture quand la vidéo change
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        console.log("Lecture auto bloquée par le navigateur");
      });
    }
  }, [videoSrc]);

  // Pour l'effet de fondu à la fin
  const [isFading, setIsFading] = useState(false);

  // Transition vers la suite : on lance la musique et on fait un fondu vers le noir
  const handleExit = () => {
    window.dispatchEvent(new Event('start-theme-song'));
    setIsFading(true);
    
    // Un petit délai pour laisser l'animation de fondu se finir (0.4s)
    setTimeout(() => {
      router.push('/learn');
    }, 400);
  };

  // Si la vidéo finit toute seule, on enchaîne direct
  const handleVideoEnd = () => {
    handleExit();
  };

  // Petit bouton pour couper ou remettre le son de l'intro
  const handleToggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div className={styles.page}>

      {/* La vidéo en plein écran */}
      <video
        ref={videoRef}
        className={styles.video}
        src={videoSrc}
        autoPlay
        muted={isMuted}
        playsInline
        onEnded={handleVideoEnd}
      />

      {/* Les boutons de contrôle en haut à droite */}
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

        {/* Bouton Skip pour passer l'intro si on est pressé */}
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
