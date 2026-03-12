import Typography from '../../atoms/Typography/Typography';
import Button from '../../atoms/Button/Button';
import ImageWrapper from '../../atoms/ImageWrapper/ImageWrapper';
import styles from './TopicCard.module.css';

/**
 * Molecule représentant une carte de Thème.
 * Combine Typography, ImageWrapper et Button.
 * Propriété "irregularBorder" pour le style spécifique dessiné à la main.
 */
export default function TopicCard({ topic, onSelect }) {
  return (
    <article className={`${styles.card} scroll-snap-align-center`}>
      <div className={styles.imageContainer}>
        {/* Résolution placeholder si on a pas les images pour l'instant */}
        <ImageWrapper 
          src={topic.coverImage} 
          alt={`Illustration pour ${topic.title}`} 
          width={200} 
          height={140}
        />
      </div>
      
      <div className={styles.content}>
        <Typography variant="h2" className={styles.title} cartoon>
          {topic.title}
        </Typography>
        <Button onClick={() => onSelect(topic.id)} className={styles.button}>
          Apprendre
        </Button>
      </div>
    </article>
  );
}
