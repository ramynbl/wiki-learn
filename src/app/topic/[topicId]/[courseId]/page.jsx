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
 * Clic sur la carte → carte suivante.
 * Dernière carte → redirection vers le quiz.
 */
export default function CoursePage({ params }) {
  const { topicId, courseId } = use(params);
  const router = useRouter();

  const courses = coursesMock[topicId] || [];
  const course = courses.find((c) => c.id === courseId);

  const [currentIndex, setCurrentIndex] = useState(0);

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

  const handleNext = () => {
    if (currentIndex < totalCards - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      router.push(`/quiz/${topicId}`);
    }
  };

  const handleClose = () => router.push('/learn');

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

      {/* ===== BARRE DE PROGRESSION ===== */}
      {/*
        Logique : on reconstruit la rangée à partir de l'index courant.
        - Les indices < currentIndex  → dots noirs (passés)
        - L'indice === currentIndex   → pill noire avec fill blanc animé
        - Les indices > currentIndex  → dots noirs (futurs)
      */}
      <div className={styles.progressRow}>
        {Array.from({ length: totalCards }).map((_, i) => {
          if (i === currentIndex) {
            // Étape courante → la pill avec fill blanc animé
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
          // Étape passée ou future → simple dot noir
          return <div key={i} className={styles.progressDot} />;
        })}
      </div>

      {/* ===== ZONE DU STACK ===== */}
      <div className={styles.cardArea}>
        {/* 4 cartes fantômes décalées en arrière-plan (card-cours.png, fond transparent) */}
        <div className={styles.ghost} />
        <div className={styles.ghost} />
        <div className={styles.ghost} />
        <div className={styles.ghost} />

        {/* La carte active animée */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className={styles.card}
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            onClick={handleNext}
          >
            {/* Titre */}
            <Typography variant="h2" className={styles.cardTitle} cartoon>
              {currentCard.title}
            </Typography>

            {/* Image (si disponible) */}
            {currentCard.image && (
              <Image
                src={currentCard.image}
                alt={currentCard.title}
                width={150}
                height={110}
                className={styles.cardImage}
                unoptimized
              />
            )}

            {/* Texte du fait */}
            <p className={styles.factText}>{currentCard.fact}</p>

            {/* Compteur ex: "1/5" */}
            <Typography variant="h2" className={styles.counter} cartoon>
              {currentIndex + 1}/{totalCards}
            </Typography>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
}
