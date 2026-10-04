import React, { useEffect, useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Levering({ auth, product, leverancier, leveringen, hasStock, verwachteLevering }) {
    const [secondsLeft, setSecondsLeft] = useState(4);

    // Scenario 02: Indien er geen voorraad aanwezig is, na 4 seconden doorverwijzen naar Overzicht Magazijn Jamin
    useEffect(() => {
        if (!hasStock) {
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
    }, [hasStock]);

    const formattedVerwachteDatum = verwachteLevering || '30-04-2023';

    const content = (
        <div className="py-8">
            <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
                {/* Header & Back link */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-4 sm:flex-row sm:items-center">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 underline decoration-blue-500 decoration-4 underline-offset-8">
                            LeveringsInformatie
                        </h1>
                        <p className="mt-1 text-sm text-gray-600">
                            Product: <span className="font-semibold text-gray-900">{product.naam}</span> (Barcode: {product.barcode})
                        </p>
                    </div>

                    <Link
                        href="/magazijn"
                        className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    >
                        &larr; Terug naar overzicht
                    </Link>
                </div>

                {/* Leveranciergegevens boven de tabel conform Wireframe 2 */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
                    <h2 className="mb-3 text-sm font-bold uppercase tracking-wider text-gray-500">
                        Leveranciergegevens
                    </h2>
                    <div className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
                        <div>
                            <span className="font-medium text-gray-700">Naam Leverancier: </span>
                            <span className="font-semibold text-gray-900">{leverancier.naam}</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Contactpersoon leverancier: </span>
                            <span className="font-semibold text-gray-900">{leverancier.contactpersoon}</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Leverancier nummer: </span>
                            <span className="font-semibold text-gray-900">{leverancier.leveranciernummer}</span>
                        </div>
                        <div>
                            <span className="font-medium text-gray-700">Mobiel: </span>
                            <span className="font-semibold text-gray-900">{leverancier.mobiel}</span>
                        </div>
                    </div>
                </div>

                {/* Tabel of melding conform Wireframe 2 en Scenario 01 & 02 */}
                <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow">
                    <table className="min-w-full divide-y divide-gray-300 text-left">
                        <thead className="bg-gray-100">
                            <tr>
                                <th scope="col" className="py-3.5 pl-6 pr-3 text-sm font-bold text-gray-900">
                                    Naam Product
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-sm font-bold text-gray-900">
                                    Datum laatste levering
                                </th>
                                <th scope="col" className="px-3 py-3.5 text-sm font-bold text-gray-900">
                                    Aantal
                                </th>
                                <th scope="col" className="py-3.5 pl-3 pr-6 text-sm font-bold text-gray-900">
                                    Eerstvolgende levering
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {hasStock ? (
                                // Scenario 01: Producten voorradig -> toon leveringen gesorteerd op DatumLevering oplopend
                                leveringen && leveringen.length > 0 ? (
                                    leveringen.map((lev) => (
                                        <tr key={lev.id} className="transition hover:bg-blue-50/30">
                                            <td className="whitespace-nowrap py-4 pl-6 pr-3 text-sm font-medium text-gray-900">
                                                {lev.productNaam}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700">
                                                {lev.datumLevering}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-900">
                                                {lev.aantal}
                                            </td>
                                            <td className="whitespace-nowrap py-4 pl-3 pr-6 text-sm text-gray-700">
                                                {lev.datumEerstVolgendeLevering}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="4" className="py-6 text-center text-sm text-gray-500">
                                            Geen leveringsgegevens gevonden voor dit product.
                                        </td>
                                    </tr>
                                )
                            ) : (
                                // Scenario 02: Geen voorraad aanwezig -> specifieke tekst in de tabel
                                <tr>
                                    <td
                                        colSpan="4"
                                        className="bg-amber-50/60 py-8 px-6 text-center text-base font-medium text-amber-900"
                                        id="geen-voorraad-melding"
                                    >
                                        <div className="flex flex-col items-center justify-center gap-2">
                                            <p className="font-semibold">
                                                Er is van dit product op dit moment geen voorraad aanwezig, de verwachte eerstvolgende levering is: {formattedVerwachteDatum}
                                            </p>
                                            <p className="text-xs text-amber-700">
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
            <Head title="Levering Informatie" />
            {auth && auth.user ? (
                <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Levering Informatie</h2>}>
                    {content}
                </AuthenticatedLayout>
            ) : (
                <div className="min-h-screen bg-gray-50 text-gray-900">
                    <header className="border-b border-gray-200 bg-white shadow-sm">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                            <Link href="/" className="flex items-center gap-2 text-xl font-black text-pink-600 tracking-wider">
                                JAMIN <span className="text-sm font-normal text-gray-500">| Magazijn</span>
                            </Link>
                            <Link
                                href="/magazijn"
                                className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-pink-600"
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
