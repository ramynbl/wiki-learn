import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // État de sélection du thème
      selectedTopicId: null,
      setTopic: (id) => set({ selectedTopicId: id }),
      
      // État du Quiz
      score: 0,
      incrementScore: () => set((state) => ({ score: state.score + 1 })),
      resetScore: () => set({ score: 0 }),
      
      // Reset global (ex: quand on clique sur "Changer de thème")
      resetAll: () => set({ selectedTopicId: null, score: 0 }),
    }),
    {
      name: 'wikilearn-storage', // Nom de la clé dans le localStorage
    }
  )
);
