import Image from 'next/image';
import styles from './ImageWrapper.module.css';

/**
 * Encapsule logiquement les images/covers dans l'application
 * Applique une bordure cartoon autour.
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
        // Fallback placeholder during load if needed
        unoptimized
      />
    </div>
  );
}
