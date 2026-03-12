"use client";

import { motion } from 'framer-motion';
import TopicCard from '../../molecules/TopicCard/TopicCard';
import styles from './TopicCarousel.module.css';

/**
 * TopicCarousel : Conteneur pour nos TopicCards. Sur mobile ça scrolle horizontalement,
 * et sur desktop ça se met automatiquement en grille centrée grâce à notre CSS.
 */
export default function TopicCarousel({ topics, onSelectTopic }) {
  
  // Configuration de l'animation d'apparition des cartes les unes après les autres (effet d'escalier)
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
      {/* Ce div vide nous aide à garder un espace correct sur les bords quand on scrolle sur mobile */}
      <div className={styles.spacer}></div>

      {topics.map((topic) => (
        <motion.div key={topic.id} variants={itemVariants}>
          <TopicCard 
            topic={topic} 
            onSelect={onSelectTopic} 
          />
        </motion.div>
      ))}

      {/* Pareil ici, un espace vide à la fin pour pas que la dernière carte colle au bord de l'écran */}
      <div className={styles.spacer}></div>
    </motion.div>
  );
}
