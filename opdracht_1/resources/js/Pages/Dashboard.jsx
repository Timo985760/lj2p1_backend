import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Dashboard({ auth }) {
    const isMagazijnmedewerker = auth?.user?.rolename === 'Magazijnmedewerker';

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-zinc-100">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:border dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="p-6 text-gray-900 dark:text-zinc-100">
                            Welkom terug, <span className="font-semibold">{auth?.user?.name}</span>! Je bent ingelogd als <span className="font-semibold text-pink-600 dark:text-pink-400">{auth?.user?.rolename || 'Gebruiker'}</span>.
                        </div>
                    </div>

                    {isMagazijnmedewerker && (
                        <div className="overflow-hidden rounded-xl border border-pink-200 bg-white p-6 shadow-sm dark:border-pink-900/40 dark:bg-zinc-900">
                            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
                                <div>
                                    <span className="inline-block rounded-full bg-pink-100 px-3 py-1 text-xs font-semibold text-pink-700 dark:bg-pink-950 dark:text-pink-300">
                                        Magazijnbeheer
                                    </span>
                                    <h3 className="mt-2 text-xl font-bold text-gray-900 dark:text-zinc-100">
                                        Overzicht Magazijn Jamin
                                    </h3>
                                    <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
                                        Bekijk alle magazijnproducten, actuele voorraad, leveringsinformatie en allergenen.
                                    </p>
                                </div>
                                <Link
                                    href="/magazijn"
                                    className="inline-flex items-center gap-2 rounded-lg bg-pink-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-pink-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink-600"
                                >
                                    Naar Magazijn Overzicht &rarr;
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
