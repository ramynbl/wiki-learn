import { motion } from 'framer-motion';
import styles from './ProgressBar.module.css';

/**
 * ProgressBar — La barre de progression réutilisable sur les fiches ET le quiz.
 * Elle accepte `total` (nombre total d'étapes) et `current` (index en cours, base 0).
 *
 * Comment ça marche :
 * - Les étapes avant `current` sont des petits blocs noirs (passées)
 * - L'étape `current` est une pill noire avec un fill blanc animé à l'intérieur
 * - Les étapes après `current` sont des petits blocs noirs aussi (futures)
 *
 * Le fill blanc de la pill montre la progression "en cours" sur cette étape.
 * Quand on est sur la dernière question par ex, le fill est à 100%.
 */
export default function ProgressBar({ total, current }) {
  // Le fill de la pill représente la position dans la séquence
  // Carte 0 → 0%, dernière carte → 100%
  const fillPercent = total > 1
    ? Math.round((current / (total - 1)) * 100)
    : 100;

  return (
    <div className={styles.wrapper}>
      {Array.from({ length: total }).map((_, i) => {
        if (i === current) {
          // C'est l'étape en cours : on affiche la pill avec le fill blanc
          return (
            <div key={i} className={styles.pill}>
              <motion.div
                className={styles.pillFill}
                animate={{ width: `${fillPercent}%` }}
                initial={{ width: '0%' }}
                transition={{ type: 'spring', stiffness: 200, damping: 28 }}
              />
            </div>
          );
        }
        // Étape passée ou future : un simple bloc noir
        return <div key={i} className={styles.dot} />;
      })}
    </div>
  );
}
