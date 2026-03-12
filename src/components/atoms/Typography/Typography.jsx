import styles from './Typography.module.css';

/**
 * Pédagogie : On sépare la typographie en un "Atom" unique
 * pour centraliser le paramétrage des fonts (Lexend pour le texte, Poppins pour les titres)
 * et s'assurer que si le design change, on modifie à un seul endroit.
 */
export default function Typography({ 
  variant = 'p', 
  children, 
  className = '', 
  cartoon = false,
  ...props 
}) {
  const Component = variant;
  
  // Si le style 'cartoon' est activé, on ajoute la classe globale `cartoon-text`
  const baseClasses = `${styles[variant]} ${cartoon ? 'cartoon-text' : ''}`;
  const finalClasses = `${baseClasses} ${className}`.trim();

  return (
    <Component className={finalClasses} {...props}>
      {children}
    </Component>
  );
}
