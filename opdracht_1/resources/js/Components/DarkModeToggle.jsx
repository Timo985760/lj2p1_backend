import React, { useEffect, useState } from 'react';

export default function DarkModeToggle({ className = '' }) {
    const [isDark, setIsDark] = useState(() => {
        if (typeof window !== 'undefined') {
            return (
                localStorage.theme === 'dark' ||
                (!('theme' in localStorage) &&
                    window.matchMedia('(prefers-color-scheme: dark)').matches)
            );
        }
        return false;
    });

    useEffect(() => {
        if (isDark) {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        } else {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        }
    }, [isDark]);

    const toggleDark = () => {
        setIsDark((prev) => !prev);
    };

    return (
        <button
            type="button"
            onClick={toggleDark}
            title={isDark ? 'Schakel over naar lichte modus' : 'Schakel over naar donkere modus'}
            aria-label="Toggle dark mode"
            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 bg-white text-gray-700 shadow-sm transition hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700 ${className}`}
            id="dark-mode-toggle"
        >
            {isDark ? (
                // Sun Icon (No emojis)
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-amber-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                </svg>
            ) : (
                // Moon Icon (No emojis)
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-zinc-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                </svg>
            )}
        </button>
    );
}
