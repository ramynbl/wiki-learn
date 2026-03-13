"use client";

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import TopicCard from '../../molecules/TopicCard/TopicCard';
import styles from './TopicCarousel.module.css';

/**
 * TopicCarousel : Conteneur pour nos TopicCards.
 * Ajout de flèches de navigation pour le scroll horizontal sur desktop.
 */
export default function TopicCarousel({ topics, onSelectTopic }) {
  const scrollRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Gère l'affichage des flèches en fonction de la position du scroll
  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll);
      handleScroll(); // Vérification initiale
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -300 : 300;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    show: { 
      opacity: 1, 
      x: 0,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Flèche Gauche */}
      {showLeftArrow && (
        <button 
          className={`${styles.arrow} ${styles.left}`} 
          onClick={() => scroll('left')}
          aria-label="Précédent"
        >
          ‹
        </button>
      )}

      <motion.div 
        ref={scrollRef}
        className={`${styles.carousel} scroll-snap-x-mandatory`}
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        <div className={styles.spacer}></div>

        {topics.map((topic) => (
          <motion.div key={topic.id} variants={itemVariants}>
            <TopicCard 
              topic={topic} 
              onSelect={onSelectTopic} 
            />
          </motion.div>
        ))}

        <div className={styles.spacer}></div>
      </motion.div>

      {/* Flèche Droite */}
      {showRightArrow && (
        <button 
          className={`${styles.arrow} ${styles.right}`} 
          onClick={() => scroll('right')}
          aria-label="Suivant"
        >
          ›
        </button>
      )}
    </div>
  );
}
