"use client";

import { motion } from 'framer-motion';
import TopicCard from '../../molecules/TopicCard/TopicCard';
import styles from './TopicCarousel.module.css';

/**
 * Organism gérant le listing horizontal des cartes Thèmes.
 */
export default function TopicCarousel({ topics, onSelectTopic }) {
  
  // Variantes d'animation pour l'apparition en cascade (stagger) des cartes
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
    <motion.div 
      className={`${styles.carousel} scroll-snap-x-mandatory`}
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Marge fantôme pour centrer le premier élément si besoin */}
      <div className={styles.spacer}></div>

      {topics.map((topic) => (
        <motion.div key={topic.id} variants={itemVariants}>
          <TopicCard 
            topic={topic} 
            onSelect={onSelectTopic} 
          />
        </motion.div>
      ))}

      {/* Marge fantôme pour la fin du scroll */}
      <div className={styles.spacer}></div>
    </motion.div>
  );
}
