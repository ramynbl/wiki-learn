import ImageWrapper from '../../atoms/ImageWrapper/ImageWrapper';
import styles from './HeaderLogo.module.css';

/**
 * HeaderLogo : Notre en-tête qui contient le logo et le globe terrestre animé.
 */
export default function HeaderLogo() {
  return (
    <header className={styles.header}>
      {/* On affiche directement le PNG du logo car il contient déjà la bonne police et couleur */}
      <div className={styles.logoWrapper}>
        <ImageWrapper 
          src="/assets/logo/WikiLearn-black2.png" 
          alt="WikiLearn Logo"
          width={300}
          height={80}
          priority={true}
          className={styles.logoImage}
        />
      </div>
      
      <div className={styles.illustrationWrapper}>
        <ImageWrapper 
          src="/assets/illustrations/planete.png" 
          alt="WikiLearn Globe"
          width={180}
          height={180}
          priority={true}
          className={styles.globeImage}
        />
      </div>
    </header>
  );
}
