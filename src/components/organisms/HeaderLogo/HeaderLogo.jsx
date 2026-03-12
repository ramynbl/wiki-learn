import Typography from '../../atoms/Typography/Typography';
import ImageWrapper from '../../atoms/ImageWrapper/ImageWrapper';
import styles from './HeaderLogo.module.css';

/**
 * Organism : En-tête de la plateforme
 * Contient le titre principal "Wiki.Learn" et l'illustration centrale (Globe).
 */
export default function HeaderLogo() {
  return (
    <header className={styles.header}>
      <Typography variant="h1" className={styles.title} cartoon>
        Wiki.Learn
      </Typography>
      
      <div className={styles.illustrationWrapper}>
        <ImageWrapper 
          src="/assets/illustrations/earth-globe.png" 
          alt="WikiLearn Globe"
          width={180}
          height={180}
          priority={true}
          // The atom adds a nice border on its own! 
        />
      </div>
    </header>
  );
}
