"use client";

import useSound from 'use-sound';
import { useEffect } from 'react';

// Un composant invisible, il sert juste à mettre l'ambiance sonore globale.
export default function AudioPlayer() {
    // J'utilise useSound pour charger le fichier et le mettre en boucle facilement.
    const [play, { stop }] = useSound('/assets/sounds/theme_song.wav', {
        volume: 0.2,
        loop: true
    });

    // Ici je surveille si d'autres parties du site m'envoient des signaux pour lancer ou couper la musique.
    useEffect(() => {
        const startMusic = () => play();
        const stopMusic = () => stop();

        // On écoute les événements 'start-theme-song' et 'stop-theme-song'
        window.addEventListener('start-theme-song', startMusic);
        window.addEventListener('stop-theme-song', stopMusic);

        // Nettoyage si on quitte la page (pour pas que ça tourne en boucle dans le vide)
        return () => {
            window.removeEventListener('start-theme-song', startMusic);
            window.removeEventListener('stop-theme-song', stopMusic);
            stop();
        };
    }, [play, stop]);

    return null;
}