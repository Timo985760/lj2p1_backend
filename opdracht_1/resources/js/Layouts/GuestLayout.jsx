import ApplicationLogo from '@/Components/ApplicationLogo';
import DarkModeToggle from '@/Components/DarkModeToggle';
import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="relative flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0 dark:bg-zinc-950">
            {/* Dark mode toggle top right */}
            <div className="absolute right-4 top-4">
                <DarkModeToggle />
            </div>

            <div>
                <Link href="/">
                    <ApplicationLogo className="h-20 w-20 fill-current text-pink-600 dark:text-pink-500" />
                </Link>
            </div>

            <div className="mt-6 w-full overflow-hidden border border-transparent bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100">
                {children}
            </div>
        </div>
    );
}
