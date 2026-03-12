"use client";

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Typography from '../../../../components/atoms/Typography/Typography';
import coursesMock from '../../../../data/coursesMock.json';
import styles from './Course.module.css';

/**
 * Page des fiches de cours.
 * Clic droite → carte suivante. Clic gauche → carte précédente.
 * Dernière carte → redirection vers le quiz.
 */
export default function CoursePage({ params }) {
  const { topicId, courseId } = use(params);
  const router = useRouter();

  const courses = coursesMock[topicId] || [];
  const course = courses.find((c) => c.id === courseId);

  const [currentIndex, setCurrentIndex] = useState(0);
  // La direction sert à animer la carte dans le bon sens (gauche ou droite)
  const [direction, setDirection] = useState(1);

  if (!course || course.cards.length === 0) {
    router.push('/learn');
    return null;
  }

  const cards = course.cards;
  const totalCards = cards.length;
  const currentCard = cards[currentIndex];

  const fillPercent = totalCards > 1
    ? Math.round((currentIndex / (totalCards - 1)) * 100)
    : 100;

  // Carte suivante (clic sur la zone droite)
  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push(`/quiz/${topicId}`);
    }
  };

  // Carte précédente (clic sur la zone gauche)
  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const handleClose = () => router.push('/learn');

  // Variantes d'animation selon la direction (gauche ou droite)
  const slideVariants = {
    enter: { opacity: 0, x: direction > 0 ? 60 : -60, scale: 0.96 },
    center: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: direction > 0 ? -60 : 60, scale: 0.96 },
  };

  return (
    <div className={styles.page}>

      {/* Header : globe fixe + croix */}
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

      {/* Barre de progression */}
      <div className={styles.progressRow}>
        {Array.from({ length: totalCards }).map((_, i) => {
          if (i === currentIndex) {
            return (
              <div key={i} className={styles.progressPill}>
                <motion.div
                  className={styles.progressPillFill}
                  animate={{ width: `${fillPercent}%` }}
                  initial={{ width: '0%' }}
                  transition={{ type: 'spring', stiffness: 200, damping: 28 }}
                />
              </div>
            );
          }
          return <div key={i} className={styles.progressDot} />;
        })}
      </div>

      {/* Zone du stack */}
      <div className={styles.cardArea}>
        <div className={styles.ghost} />
        <div className={styles.ghost} />
        <div className={styles.ghost} />
        <div className={styles.ghost} />

        {/* La carte active avec animation directionnelle */}
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            className={styles.card}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          >
            <Typography variant="h2" className={styles.cardTitle} cartoon>
              {currentCard.title}
            </Typography>

            {/* Image (spécifique au fait OU drapeau par défaut) */}
            {currentCard.image ? (
              <Image
                src={currentCard.image}
                alt={currentCard.title}
                width={150}
                height={110}
                className={styles.cardImage}
                unoptimized
              />
            ) : (
              /* Drapeau par défaut pour le pays si pas d'image spécifique */
              <Image
                src={`/assets/icons/${courseId}.png`}
                alt="Drapeau"
                width={120}
                height={80}
                className={styles.cardImage}
                unoptimized
              />
            )}

            <p className={styles.factText}>{currentCard.fact}</p>

            <Typography variant="h2" className={styles.counter} cartoon>
              {currentIndex + 1}/{totalCards}
            </Typography>

            {/* Zones cliquables invisibles : gauche = retour, droite = suivant */}
            {currentIndex > 0 && (
              <button
                className={styles.clickZoneLeft}
                onClick={handlePrev}
                aria-label="Carte précédente"
              />
            )}
            <button
              className={styles.clickZoneRight}
              onClick={handleNext}
              aria-label="Carte suivante"
            />

            {/* Chevron ‹ visible seulement quand on peut revenir en arrière */}
            {currentIndex > 0 && (
              <span className={styles.backIndicator}>‹</span>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
