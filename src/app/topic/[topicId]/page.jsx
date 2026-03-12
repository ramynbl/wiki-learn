"use client";

import { use, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '../../../store/useAppStore';
import coursesMock from '../../../data/coursesMock.json';
import styles from './Topic.module.css';

/**
 * Page /topic/[topicId] : On choisit un cours au hasard dans la liste du thème sélectionné.
 * Exemple : Géographie → tire aléatoirement "belgique" ou "venezuela" puis redirige directement.
 *
 * Note technique : en Next.js 15+, params est une Promise.
 * On utilise React.use() pour le déballer de manière synchrone dans un composant Client.
 */
export default function TopicPage({ params }) {
  // On déballle la Promise params avec React.use() — obligatoire en Next.js 15+
  const { topicId } = use(params);
  const router = useRouter();
  const setCourse = useAppStore((state) => state.setCourse);
  // On garde une ref pour éviter de déclencher deux redirections
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (hasRedirected.current) return;

    const courses = coursesMock[topicId];
    if (!courses || courses.length === 0) {
      // Si on n'a pas de cours pour ce thème, on retourne à l'accueil
      router.push('/learn');
      return;
    }

    // On tire un cours au hasard dans la liste disponible
    const randomIndex = Math.floor(Math.random() * courses.length);
    const selectedCourse = courses[randomIndex];

    // On sauvegarde le cours choisi dans Zustand
    setCourse(selectedCourse.id);

    hasRedirected.current = true;
    router.push(`/topic/${topicId}/${selectedCourse.id}`);
  }, [topicId, router, setCourse]);

  // Page de transition invisible (le loader s'en est déjà chargé)
  return null;
}
