import styles from './Typography.module.css';

/**
 * Composant Typography : Centralise toutes nos polices (Lexend pour les textes, Poppins pour les titres).
 * On l'utilise partout à la place des balises <h1> ou <p> classiques pour garder un design cohérent.
 */
export default function Typography({ 
  variant = 'p', 
  children, 
  className = '', 
  cartoon = false,
  ...props 
}) {
  const Component = variant;
  
  // On ajoute la classe 'cartoon-text' si la prop 'cartoon' est vraie
  // Exception pour h1/h2 : ces titres ont déjà leur propre effet dans notre module CSS
  const applyCartoonLayer = cartoon && variant !== 'h2' && variant !== 'h1';
  const baseClasses = `${styles[variant]} ${applyCartoonLayer ? 'cartoon-text' : ''}`;
  const finalClasses = `${baseClasses} ${className}`.trim();

  return (
    <Component className={finalClasses} {...props}>
      {children}
    </Component>
  );
}
