"use client";

import { motion } from 'framer-motion';
import styles from './Button.module.css';

/**
 * Bouton Primaire Pédagogique (Atom)
 * Utilise Framer Motion pour un effet Rebond (Spring)
 */
export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '',
  // Parfois un bouton dans un Quiz peut devenir rouge :
  isError = false
}) {
  
  // Combinaison des classes CSS Modules + Utilitaires globaux
  const btnClass = `
    ${styles.button} 
    ${styles[variant]} 
    ${isError ? styles.error : ''} 
    cartoon-border 
    ${className}
  `.trim();

  return (
    <motion.button
      className={btnClass}
      onClick={disabled ? null : onClick}
      disabled={disabled}
      /* Animation Framer Motion */
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <span className="cartoon-text">{children}</span>
    </motion.button>
  );
}
