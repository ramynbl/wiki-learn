import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useAppStore = create(
  persist(
    (set) => ({
      // Memo local de la matière sélectionnée (ex: 'geographie')
      selectedTopicId: null,
      setTopic: (id) => set({ selectedTopicId: id }),
      
      // Tout ce qui concerne le score du quiz
      score: 0,
      incrementScore: () => set((state) => ({ score: state.score + 1 })),
      resetScore: () => set({ score: 0 }),
      
      // Pour tout vider (ex: bouton 'Changer de thème' à la fin)
      resetAll: () => set({ selectedTopicId: null, score: 0 }),
    }),
    {
      name: 'wikilearn-storage', // C'est sous ce nom que c'est enregistré dans l'onglet Application (stockage local) du navigateur
    }
  )
);
