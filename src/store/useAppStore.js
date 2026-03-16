import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // Ici je garde le thème séléctionné (ex: Histoire ou Géo)
      selectedTopicId: null,
      setTopic: (id) => set({ selectedTopicId: id }),

      // L'ID du cours qu'on a pioché au hasard dans la liste
      selectedCourseId: null,
      setCourse: (id) => set({ selectedCourseId: id }),

      // Petit compteur pour les points gagnés pendant le quiz
      score: 0,
      incrementScore: () => set((state) => ({ score: state.score + 1 })),
      resetScore: () => set({ score: 0 }),

      // Pour faire table rase et tout remettre à zéro à la fin
      resetAll: () => set({ selectedTopicId: null, selectedCourseId: null, score: 0 }),
    }),
    {
      name: 'wikilearn-storage', // C'est le nom de notre "boîte" dans la mémoire du navigateur
    }
  )
);
