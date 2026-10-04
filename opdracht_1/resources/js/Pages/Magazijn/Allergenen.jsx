import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Allergenen({ auth, product, allergenen, hasAllergens }) {
    const [secondsLeft, setSecondsLeft] = useState(4);

    // Scenario 02: Indien er geen allergenen zijn, na 4 seconden doorverwijzen naar Overzicht Magazijn Jamin
    useEffect(() => {
        if (!hasAllergens) {
            const interval = setInterval(() => {
                setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
            }, 1000);

            const timer = setTimeout(() => {
                router.visit('/magazijn');
            }, 4000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [hasAllergens]);

    const content = (
        <div className="py-8">
            <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                {/* Header & Back link */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center dark:border-zinc-800">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-zinc-100 underline decoration-red-500 decoration-4 underline-offset-8">
                            Overzicht Allergenen
                        </h1>
                        <p className="mt-1 text-sm text-gray-600 dark:text-zinc-400">
                            Allergeneninformatie voor magazijnmedewerkers.
                        </p>
                    </div>

                    <Link
                        href="/magazijn"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700"
                    >
                        &larr; Terug naar overzicht
                    </Link>
                </div>

                {/* Productgegevens boven de tabel conform Wireframe 3 */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="space-y-1 text-base">
                        <div>
                            <span className="font-semibold text-gray-800 dark:text-zinc-400">Naam: </span>
                            <span className="font-bold text-gray-900 dark:text-zinc-100" id="product-naam">{product.naam}</span>
                        </div>
                        <div>
                            <span className="font-semibold text-gray-800 dark:text-zinc-400">Barcode: </span>
                            <span className="font-mono font-medium text-gray-900 dark:text-zinc-100" id="product-barcode">{product.barcode}</span>
                        </div>
                    </div>
                </div>

                {/* Tabel of melding conform Wireframe 3 en Scenario 01 & 02 */}
                <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow dark:border-zinc-700 dark:bg-zinc-900">
                    <table className="min-w-full divide-y divide-gray-300 text-left dark:divide-zinc-700">
                        <thead className="bg-gray-100 dark:bg-zinc-800">
                            <tr>
                                <th scope="col" className="w-1/3 py-3.5 pl-6 pr-3 text-sm font-bold text-gray-900 dark:text-zinc-100">
                                    Naam
                                </th>
                                <th scope="col" className="py-3.5 pl-3 pr-6 text-sm font-bold text-gray-900 dark:text-zinc-100">
                                    Omschrijving
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
                            {hasAllergens ? (
                                // Scenario 01: Product bevat allergenen -> toon rijen gesorteerd op Naam oplopend
                                allergenen && allergenen.length > 0 ? (
                                    allergenen.map((alg) => (
                                        <tr key={alg.id} className="transition hover:bg-red-50/30 dark:hover:bg-zinc-800/60">
                                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-semibold text-gray-900 dark:text-zinc-100">
                                                {alg.naam}
                                            </td>
                                            <td className="whitespace-normal py-4 pl-3 pr-6 text-sm text-gray-700 dark:text-zinc-300">
                                                {alg.omschrijving}
                                            </td>
                                        </tr>
                                    ))
                                ) : null
                            ) : (
                                // Scenario 02: Geen allergenen -> specifieke tekst in de tabel
                                <tr>
                                    <td
                                        colSpan="2"
                                        className="bg-emerald-50/60 py-8 px-6 text-center text-base font-medium text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200"
                                        id="geen-allergenen-melding"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <p className="font-semibold">
                                                In dit product zitten geen stoffen die een allergische reactie kunnen veroorzaken
                                            </p>
                                            <p className="text-xs text-emerald-700 dark:text-emerald-300">
                                                U wordt na {secondsLeft} seconde{secondsLeft === 1 ? '' : 'n'} automatisch doorverwezen naar de pagina Overzicht Magazijn Jamin...
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Overzicht Allergenen" />
            {auth && auth.user ? (
                <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-zinc-100">Overzicht Allergenen</h2>}>
                    {content}
                </AuthenticatedLayout>
            ) : (
                <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-zinc-950 dark:text-zinc-100">
                    <header className="border-b border-gray-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                            <Link href="/" className="flex items-center gap-2 text-xl font-black text-pink-600 tracking-wider">
                                JAMIN <span className="text-sm font-normal text-gray-500 dark:text-zinc-400">| Magazijn</span>
                            </Link>
                            <Link
                                href="/magazijn"
                                className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-pink-600 dark:text-zinc-200 dark:hover:text-pink-400"
                            >
                                &larr; Naar Overzicht
                            </Link>
                        </div>
                    </header>
                    <main>{content}</main>
                </div>
            )}
        </>
    );
}
