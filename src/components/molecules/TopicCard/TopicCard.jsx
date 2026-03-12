import Typography from '../../atoms/Typography/Typography';
import Button from '../../atoms/Button/Button';
import ImageWrapper from '../../atoms/ImageWrapper/ImageWrapper';
import styles from './TopicCard.module.css';

/**
 * TopicCard : C'est la carte qui affiche un thème (comme Géographie ou Informatique).
 * Elle regroupe une image, un titre et le bouton pour commencer.
 */
export default function TopicCard({ topic, onSelect }) {
  return (
    <article className={`${styles.card} scroll-snap-align-center`}>
      <div className={styles.imageContainer}>
        {/* Si on n'a pas d'image, on affiche simplement ce qu'on peut récupérer en attendant */}
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
