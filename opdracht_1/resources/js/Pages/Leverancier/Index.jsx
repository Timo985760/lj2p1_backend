import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, leveranciers }) {
    const content = (
        <div className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center dark:border-zinc-800">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                                Jamin Magazijn
                            </span>
                        </div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 underline decoration-blue-500 decoration-4 underline-offset-8 dark:text-zinc-100">
                            Overzicht leveranciers
                        </h1>
                        <div className="mt-2 flex items-center gap-3">
                            <p className="text-sm text-gray-600 dark:text-zinc-400">
                                Overzicht van alle leveranciers en het aantal verschillende producten dat zij aan Jamin leveren (gesorteerd aflopend).
                            </p>
                            <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800 dark:bg-blue-950/60 dark:text-blue-300">
                                {leveranciers ? leveranciers.length : 0} leveranciers
                            </span>
                        </div>
                    </div>
                </div>

                {/* Table Container according to Wireframe-01 */}
                <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow dark:border-zinc-700 dark:bg-zinc-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 text-left dark:divide-zinc-700">
                            <thead className="bg-gray-100 dark:bg-zinc-800">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-6 pr-3 text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Naam
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Contactpersoon
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Leveranciernummer
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Mobiel
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Aantal verschillende producten
                                    </th>
                                    <th scope="col" className="py-3.5 pl-3 pr-6 text-center text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Toon producten
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
                                {leveranciers && leveranciers.length > 0 ? (
                                    leveranciers.map((lev) => (
                                        <tr
                                            key={lev.Id}
                                            className="transition hover:bg-blue-50/40 dark:hover:bg-zinc-800/60"
                                            id={`leverancier-row-${lev.Id}`}
                                        >
                                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-semibold text-gray-900 dark:text-zinc-100">
                                                {lev.Naam}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-zinc-300">
                                                {lev.ContactPersoon}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 font-mono text-sm text-gray-800 dark:text-zinc-200">
                                                {lev.LeverancierNummer}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 dark:text-zinc-300">
                                                {lev.Mobiel}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-center text-sm font-bold text-gray-900 dark:text-zinc-100">
                                                {lev.AantalVerschillendeProducten}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-3 pr-6 text-center">
                                                <Link
                                                    href={`/leveranciers/${lev.Id}/producten`}
                                                    title={`Toon geleverde producten van ${lev.Naam}`}
                                                    className="inline-flex h-9 w-9 items-center justify-center rounded-md text-amber-700 transition hover:bg-amber-50 hover:text-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-500 dark:text-amber-400 dark:hover:bg-amber-950/40"
                                                    id={`toon-producten-btn-${lev.Id}`}
                                                >
                                                    {/* Box Icon (Wireframe-01) */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 stroke-current"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9"
                                                        />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-sm text-gray-500 dark:text-zinc-400">
                                            Geen leveranciers gevonden.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Right Home Button according to Wireframe-01 */}
                <div className="mt-6 flex justify-end">
                    <Link
                        href="/dashboard"
                        id="btn-home"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                    >
                        Home
                    </Link>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Overzicht leveranciers" />
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-zinc-100">
                        Overzicht leveranciers
                    </h2>
                }
            >
                {content}
            </AuthenticatedLayout>
        </>
    );
}

