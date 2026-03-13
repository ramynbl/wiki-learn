"use client";

import { use, useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import ProgressBar from '../../../components/molecules/ProgressBar/ProgressBar';
import AnswerButton from '../../../components/atoms/AnswerButton/AnswerButton';
import Button from '../../../components/atoms/Button/Button';
import Typography from '../../../components/atoms/Typography/Typography';
import { useAppStore } from '../../../store/useAppStore';
import quizMock from '../../../data/quizMock.json';
import coursesMock from '../../../data/coursesMock.json';
import { pickRandom, isShortAnswer } from '../../../utils/quizHelpers';
import styles from './Quiz.module.css';

// Nombre de questions à poser dans le quiz
const QUIZ_COUNT = 3;

/**
 * Page Quiz : /quiz/[topicId]
 *
 * Flow complet :
 * 1. Écran de transition "Voyons ce que tu as appris !" avec un CTA
 * 2. Au clic → on affiche les questions une par une
 * 3. Bonne réponse → vert → 600ms → question suivante
 * 4. Mauvaise réponse → rouge + shake → 500ms → on peut retenter
 * 5. Fin → redirection vers /results/[topicId]
 */
export default function QuizPage({ params }) {
  const { topicId } = use(params);
  const router = useRouter();
  const selectedCourseId = useAppStore((state) => state.selectedCourseId);
  const incrementScore = useAppStore((state) => state.incrementScore);

  // Phase du quiz : "transition" (écran d'intro) ou "playing" (questions en cours)
  const [phase, setPhase] = useState('transition');

  // Index de la question en cours (0, 1, 2)
  const [questionIndex, setQuestionIndex] = useState(0);

  // État de chaque bouton de réponse : "idle", "correct" ou "wrong"
  const [buttonStates, setButtonStates] = useState({});

  // On tire 3 questions au hasard une seule fois au chargement de la page
  const questions = useMemo(() => {
    const courseQuestions = quizMock[topicId]?.[selectedCourseId] || [];
    if (courseQuestions.length <= QUIZ_COUNT) return courseQuestions;
    return pickRandom(courseQuestions, QUIZ_COUNT);
  }, [topicId, selectedCourseId]);

  const currentQuestion = questions[questionIndex];

  // L'image du drapeau dépend du cours sélectionné ou de la question spécifique
  const flagImage = useMemo(() => {
    // 1. Si la question a sa propre image (ex: dans quizMock.json)
    if (currentQuestion?.image) return currentQuestion.image;

    // 2. Sinon, on essaie de trouver l'icône du cours dans coursesMock
    const course = coursesMock[topicId]?.find(c => c.id === selectedCourseId);
    if (course?.coverImage) return course.coverImage;

    // 3. Fallback final
    return '/assets/illustrations/planete.png';
  }, [currentQuestion, topicId, selectedCourseId]);

  // La barre du quiz est séparée de celle des fiches — 3 étapes, on repart de zéro
  const progressCurrent = questionIndex;

  const handleStartQuiz = useCallback(() => {
    setPhase('playing');
  }, []);

  const handleAnswer = useCallback((option) => {
    // On ne fait rien si un bouton est déjà en état "correct" (on attend la transition)
    if (buttonStates[currentQuestion?.id] === 'correct') return;

    if (option === currentQuestion.correctAnswer) {
      // Bonne réponse : on passe le bouton en vert, on incrémente le score
      setButtonStates((prev) => ({ ...prev, [option]: 'correct' }));
      incrementScore();

      // Après 600ms on passe à la question suivante (ou on redirige vers les résultats)
      setTimeout(() => {
        if (questionIndex < questions.length - 1) {
          setQuestionIndex((prev) => prev + 1);
          setButtonStates({});
        } else {
          router.push(`/results/${topicId}`);
        }
      }, 600);
    } else {
      // Mauvaise réponse : on passe le bouton en rouge + shake
      setButtonStates((prev) => ({ ...prev, [option]: 'wrong' }));

      // Après 500ms on remet le bouton en idle pour que l'utilisateur réessaye
      setTimeout(() => {
        setButtonStates((prev) => {
          const next = { ...prev };
          delete next[option];
          return next;
        });
      }, 500);
    }
  }, [currentQuestion, questionIndex, questions, incrementScore, router, topicId, buttonStates]);

  const handleClose = () => router.push(`/exit/${topicId}`);

  // On détecte si les réponses sont courtes (grille 2×2) ou longues (liste empilée)
  const useGrid = currentQuestion ? isShortAnswer(currentQuestion.options) : true;

  return (
    <div className={styles.page}>

      {/* Header : globe à gauche, croix à droite (toujours visible) */}
      <header className={styles.header}>
        <Image
          src="/assets/illustrations/planete.png"
          alt="WikiLearn"
          width={60}
          height={60}
          className={styles.globeIcon}
          unoptimized
          priority
        />
        <button className={styles.closeBtn} onClick={handleClose} aria-label="Fermer">
          <Image
            src="/assets/components/croix.png"
            alt="Fermer"
            width={36}
            height={36}
            className={styles.closeBtnImg}
            unoptimized
          />
        </button>
      </header>

      {phase === 'transition' ? (
        /* ===== ÉCRAN DE TRANSITION ===== */
        <div className={styles.transitionScreen}>
          {/* Le globe apparaît en zoomant depuis 0, puis rebondit en boucle */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1, y: [0, -14, 0] }}
            transition={{
              scale: { type: 'spring', stiffness: 260, damping: 18, duration: 0.6 },
              opacity: { duration: 0.4 },
              y: {
                duration: 1.6,
                repeat: Infinity,
                ease: [0.34, 1.56, 0.64, 1],
                repeatType: 'loop',
                delay: 0.6, // on attend que l'entrée soit finie avant de rebondir
              },
            }}
          >
            <Image
              src="/assets/illustrations/planete.png"
              alt="Globe WikiLearn"
              width={180}
              height={180}
              className={styles.transitionGlobe}
              unoptimized
            />
          </motion.div>

          {/* Le titre glisse vers le haut avec un léger délai */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: 'spring', stiffness: 200, damping: 20, delay: 0.35 }}
          >
            <Typography variant="h2" className={styles.transitionTitle} cartoon>
              Maintenant, voyons ce que tu as appris !
            </Typography>
          </motion.div>

          {/* Le CTA apparaît en dernier, avec un rebond */}
          <motion.div
            className={styles.transitionCta}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 280, damping: 18, delay: 0.6 }}
          >
            <Button onClick={handleStartQuiz}>
              C&apos;est parti !
            </Button>
          </motion.div>
        </div>
      ) : (
        /* ===== MODE QUIZ ===== */
        <>
          <div className={styles.progressWrapper}>
            <ProgressBar total={QUIZ_COUNT} current={progressCurrent} />
          </div>

          {/* Zone question : drapeau + texte */}
          <div className={styles.questionSection}>
            <Image
              src={flagImage}
              alt="Drapeau"
              width={100}
              height={65}
              className={styles.flagImage}
              unoptimized
            />
            {currentQuestion && (
              <motion.p
                key={questionIndex}
                className={styles.questionText}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {currentQuestion.question}
              </motion.p>
            )}
          </div>

          {/* Zone réponses : grille carrée ou liste selon le type de réponse */}
          {currentQuestion && (
            <motion.div
              key={questionIndex}
              className={styles.answerSheet}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className={useGrid ? styles.gridAnswers : styles.listAnswers}>
                {currentQuestion.options.map((option) => (
                  <AnswerButton
                    key={option}
                    label={option}
                    variant={useGrid ? 'square' : 'wide'}
                    state={buttonStates[option] || 'idle'}
                    onClick={() => handleAnswer(option)}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
}
