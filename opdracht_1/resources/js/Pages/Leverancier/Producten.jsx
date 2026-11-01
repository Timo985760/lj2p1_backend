import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Producten({ auth, leverancier, producten, hasProducts }) {
    const [secondsLeft, setSecondsLeft] = useState(3);

    // User Story 1 - Scenario 02: Indien het bedrijf nog geen producten heeft geleverd,
    // na 3 seconden automatisch terugsturen naar Overzicht leveranciers (Wireframe-01).
    useEffect(() => {
        if (!hasProducts) {
            const interval = setInterval(() => {
                setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
            }, 1000);

            const timer = setTimeout(() => {
                router.visit('/leveranciers');
            }, 3000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [hasProducts]);

    const formatVerpakkingseenheid = (waarde) => {
        if (waarde === null || waarde === undefined) {
            return '-';
        }
        const num = Number(waarde);
        const formatted = Number.isInteger(num)
            ? String(num)
            : String(num).replace('.', ',');
        return `${formatted} kg`;
    };

    const content = (
        <div className="py-8">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 border-b border-gray-200 pb-4 dark:border-zinc-800">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 underline decoration-blue-500 decoration-4 underline-offset-8 dark:text-zinc-100">
                        Geleverde producten
                    </h1>
                </div>

                {/* Leveranciergegevens conform Wireframe-02 & Wireframe-03 */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="space-y-1.5 text-sm sm:text-base">
                        <div className="grid grid-cols-1 sm:grid-cols-12">
                            <span className="font-semibold text-gray-700 sm:col-span-3 dark:text-zinc-400">
                                Naam leverancier:
                            </span>
                            <span className="font-bold text-gray-900 sm:col-span-9 dark:text-zinc-100" id="leverancier-naam">
                                {leverancier.naam}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12">
                            <span className="font-semibold text-gray-700 sm:col-span-3 dark:text-zinc-400">
                                Contactpersoon:
                            </span>
                            <span className="font-medium text-gray-900 sm:col-span-9 dark:text-zinc-100" id="leverancier-contactpersoon">
                                {leverancier.contactpersoon}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12">
                            <span className="font-semibold text-gray-700 sm:col-span-3 dark:text-zinc-400">
                                Leverancier NR:
                            </span>
                            <span className="font-mono font-medium text-gray-900 sm:col-span-9 dark:text-zinc-100" id="leverancier-nummer">
                                {leverancier.leveranciernummer}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12">
                            <span className="font-semibold text-gray-700 sm:col-span-3 dark:text-zinc-400">
                                Mobiel:
                            </span>
                            <span className="font-medium text-gray-900 sm:col-span-9 dark:text-zinc-100" id="leverancier-mobiel">
                                {leverancier.mobiel}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tabel of Melding conform Wireframe-02 & Wireframe-03 */}
                <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow dark:border-zinc-700 dark:bg-zinc-900">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 text-left dark:divide-zinc-700">
                            <thead className="bg-gray-100 dark:bg-zinc-800">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-6 pr-3 text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Naam product
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Aantal in Magazijn
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Verpakkingseenheid
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Laatste levering
                                    </th>
                                    <th scope="col" className="py-3.5 pl-3 pr-6 text-center text-sm font-bold text-gray-900 dark:text-zinc-100">
                                        Nieuwe levering
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white dark:divide-zinc-800 dark:bg-zinc-900">
                                {hasProducts ? (
                                    producten.map((prod) => (
                                        <tr
                                            key={prod.id}
                                            className="transition hover:bg-blue-50/30 dark:hover:bg-zinc-800/60"
                                            id={`geleverd-product-row-${prod.id}`}
                                        >
                                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900 dark:text-zinc-100">
                                                {prod.naam}
                                            </td>
                                            <td
                                                className="whitespace-nowrap px-3 py-4 text-center text-sm font-semibold text-gray-900 dark:text-zinc-100"
                                                id={`aantal-magazijn-${prod.id}`}
                                            >
                                                {prod.aantalInMagazijn !== null && prod.aantalInMagazijn !== undefined
                                                    ? prod.aantalInMagazijn
                                                    : '0'}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-700 dark:text-zinc-300">
                                                {formatVerpakkingseenheid(prod.verpakkingsEenheid)}
                                            </td>
                                            <td
                                                className="whitespace-nowrap px-3 py-4 text-center text-sm text-gray-700 dark:text-zinc-300"
                                                id={`laatste-levering-${prod.id}`}
                                            >
                                                {prod.laatsteLevering}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-3 pr-6 text-center">
                                                <Link
                                                    href={`/leveranciers/${leverancier.id}/producten/${prod.id}/levering`}
                                                    title={`Nieuwe levering toevoegen voor ${prod.naam}`}
                                                    className="inline-flex h-8 w-8 items-center justify-center rounded-full text-red-600 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 dark:text-red-400 dark:hover:bg-red-950/40"
                                                    id={`nieuwe-levering-btn-${prod.id}`}
                                                >
                                                    {/* Plus Icon (Wireframe-02) */}
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="h-6 w-6 stroke-current"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        strokeWidth="2.5"
                                                    >
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    /* Wireframe-03: Scenario 02 - Geen producten geleverd */
                                    <tr>
                                        <td
                                            colSpan="5"
                                            className="bg-amber-50/60 px-6 py-8 text-center text-base font-medium text-amber-900 dark:bg-amber-950/40 dark:text-amber-200"
                                            id="geen-producten-melding"
                                        >
                                            <div className="flex flex-col items-center justify-center gap-2">
                                                <p className="font-semibold">
                                                    Dit bedrijf heeft tot nu toe geen producten geleverd aan Jamin
                                                </p>
                                                <p className="text-xs text-amber-700 dark:text-amber-300">
                                                    U wordt na {secondsLeft} seconde{secondsLeft === 1 ? '' : 'n'} automatisch doorverwezen naar het scherm Overzicht leveranciers...
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Bottom Right Terug & Home Buttons according to Wireframe-02 & Wireframe-03 */}
                <div className="mt-6 flex justify-end gap-3">
                    <Link
                        href="/leveranciers"
                        id="btn-terug"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-5 py-2 text-sm font-semibold text-gray-800 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700"
                    >
                        Terug
                    </Link>
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
            <Head title="Geleverde producten" />
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-zinc-100">
                        Geleverde producten
                    </h2>
                }
            >
                {content}
            </AuthenticatedLayout>
        </>
    );
}

