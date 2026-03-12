import styles from './ProgressBar.module.css';

/**
 * ProgressBar : La barre de progression en haut des fiches de cours.
 * - Les étapes passées deviennent des traits pleins
 * - L'étape courante affiche un "blop" (point animé)
 * - Les étapes à venir restent des petites pastilles vides
 */
export default function ProgressBar({ total, current }) {
  return (
    <div className={styles.wrapper}>
      {Array.from({ length: total }).map((_, i) => {
        let segmentClass;
        if (i < current) {
          // Cette étape est déjà passée → trait plein
          segmentClass = styles.done;
        } else if (i === current) {
          // C'est l'étape en cours → le blop
          segmentClass = styles.current;
        } else {
          // Étape future → pastille vide
          segmentClass = styles.upcoming;
        }
        return <div key={i} className={`${styles.segment} ${segmentClass}`} />;
      })}
    </div>
  );
}
