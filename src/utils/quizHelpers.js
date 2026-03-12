/**
 * pickRandom — Tire N éléments au hasard dans un tableau.
 * On l'utilise pour sélectionner aléatoirement 3 questions parmi toutes celles dispo.
 *
 * Comment ça marche : on copie le tableau, on le mélange avec Fisher-Yates, et on prend les N premiers.
 * Fisher-Yates c'est l'algo de ref pour mélanger un tableau de manière vraiment aléatoire.
 */
export function pickRandom(array, count) {
  // On fait une copie pour ne pas modifier le tableau d'origine
  const shuffled = [...array];

  // Algo Fisher-Yates : on part de la fin, et on swap chaque élément avec un autre tiré au hasard
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  // On retourne les N premiers éléments du tableau mélangé
  return shuffled.slice(0, count);
}

// La règle : si TOUTES les options font 8 caractères ou moins, c'est "court".
export function isShortAnswer(options) {
  return options.every((opt) => opt.length <= 8);
}
