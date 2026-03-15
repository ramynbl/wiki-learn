"use client";

import useSound from 'use-sound';
import { useEffect } from 'react';

export default function AudioPlayer() {
    const [play, { stop }] = useSound('/assets/sounds/theme_song.wav', {
        volume: 0.2,
        loop: true
    });

    useEffect(() => {
        const startMusic = () => play();
        const stopMusic = () => stop();
        window.addEventListener('start-theme-song', startMusic);
        window.addEventListener('stop-theme-song', stopMusic);

        return () => {
            window.removeEventListener('start-theme-song', startMusic);
            window.removeEventListener('stop-theme-song', stopMusic);
            stop();
        };
    }, [play, stop]);

    return null;
}