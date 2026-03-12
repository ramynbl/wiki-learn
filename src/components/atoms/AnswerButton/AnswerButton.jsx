"use client";

import styles from './AnswerButton.module.css';

/**
 * AnswerButton — Le bouton de réponse style cartoon utilisé dans les quiz.
 * Il change de couleur en fonction de l'état :
 * - "idle" : blanc normal (état par défaut)
 * - "correct" : vert (#8ECC7F) quand c'est la bonne réponse
 * - "wrong" : rouge (#E35050) + petit tremblement quand c'est faux
 *
 * Le prop `variant` contrôle la forme :
 * - "square" : bouton carré (grille 2×2) pour les réponses courtes
 * - "wide" : bouton pleine largeur pour les réponses longues
 */
export default function AnswerButton({ label, onClick, state = 'idle', variant = 'square' }) {
  // On assemble les classes CSS en fonction de l'état et du variant
  const classNames = [
    styles.button,
    styles[variant],
    state === 'correct' && styles.correct,
    state === 'wrong' && styles.wrong,
  ].filter(Boolean).join(' ');

  return (
    <button className={classNames} onClick={onClick} disabled={state === 'correct'}>
      <span className={styles.label}>{label}</span>
    </button>
  );
}
