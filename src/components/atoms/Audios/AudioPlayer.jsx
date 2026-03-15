"use client";

import useSound from 'use-sound';
import { useEffect } from 'react';

export default function AudioPlayer() {
    const [play, { stop }] = useSound('/assets/sounds/theme_song.wav', {
        volume: 0.4,
        loop: true
    });

    useEffect(() => {
        const startMusic = () => play();
        window.addEventListener('start-theme-song', startMusic);

        return () => {
            window.removeEventListener('start-theme-song', startMusic);
            stop();
        };
    }, [play, stop]);

    return null;
}