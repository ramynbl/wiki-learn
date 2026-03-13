/* On utilise use client pour  */
"use client";

import { motion } from 'framer-motion';
import styles from './Button.module.css';

/**
 * Composant Button : C'est notre bouton principal qui gère l'animation de rebond via Framer Motion.
 */
export default function Button({ 
  children, 
  onClick, 
  variant = 'primary',
  disabled = false,
  className = '',
  fullWidth = false,
  // Parfois un bouton dans un Quiz peut devenir rouge :
  isError = false
}) {
  
  // On fusionne les classes CSS du module avec d'éventuelles classes passées en prop
  const btnClass = `
    ${styles.button} 
    ${styles[variant]} 
    ${isError ? styles.error : ''} 
    ${fullWidth ? styles.fullWidth : ''}
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
