import Image from 'next/image';
import styles from './ImageWrapper.module.css';

/**
 * ImageWrapper : Ce composant nous sert de conteneur générique pour les images Next.js.
 * Ça nous permet de ne pas avoir à réécrire la propriété 'fill' partout et de gérer l'aspect ratio facilement.
 */
export default function ImageWrapper({ 
  src, 
  alt, 
  width, 
  height, 
  priority = false,
  className = '' 
}) {
  return (
    <div className={`${styles.wrapper} cartoon-border ${className}`}>
      <Image 
        src={src} 
        alt={alt} 
        width={width} 
        height={height}
        priority={priority}
        className={styles.image}
        // On gère une couleur de secours en cas de problème de chargement
        unoptimized
      />
    </div>
  );
}
