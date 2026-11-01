import React, { useEffect, useState } from 'react';
import { Head, Link, router, useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Levering({
    auth,
    product,
    leverancier,
    errorMessage,
    submittedAantal,
    submittedDatum,
}) {
    const [secondsLeft, setSecondsLeft] = useState(4);

    const { data, setData, post, processing, errors } = useForm({
        aantal: submittedAantal || '',
        datumEerstVolgendeLevering: submittedDatum || '',
    });

    // User Story 2 - Scenario 02: Indien het product niet meer wordt geproduceerd (errorMessage),
    // na 4 seconden doorsturen naar Geleverde producten van deze leverancier (Wireframe-02).
    useEffect(() => {
        if (errorMessage) {
            setSecondsLeft(4);

            const interval = setInterval(() => {
                setSecondsLeft((prev) => (prev > 1 ? prev - 1 : 0));
            }, 1000);

            const timer = setTimeout(() => {
                router.visit(`/leveranciers/${leverancier.id}/producten`);
            }, 4000);

            return () => {
                clearInterval(interval);
                clearTimeout(timer);
            };
        }
    }, [errorMessage, leverancier.id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        post(`/leveranciers/${leverancier.id}/producten/${product.id}/levering`);
    };

    const content = (
        <div className="py-8">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 border-b border-gray-200 pb-4 dark:border-zinc-800">
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900 underline decoration-blue-500 decoration-4 underline-offset-8 dark:text-zinc-100">
                        Levering Product
                    </h1>
                </div>

                {/* Product- en Leveranciergegevens conform Wireframe-04 */}
                <div className="mb-6 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
                    <div className="space-y-1.5 text-sm sm:text-base">
                        <div className="grid grid-cols-1 sm:grid-cols-12">
                            <span className="font-semibold text-gray-700 sm:col-span-4 dark:text-zinc-400">
                                Product:
                            </span>
                            <span className="font-bold text-gray-900 sm:col-span-8 dark:text-zinc-100" id="levering-product-naam">
                                {product.naam}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12">
                            <span className="font-semibold text-gray-700 sm:col-span-4 dark:text-zinc-400">
                                Leverancier:
                            </span>
                            <span className="font-medium text-gray-900 sm:col-span-8 dark:text-zinc-100" id="levering-leverancier-naam">
                                {leverancier.naam}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12">
                            <span className="font-semibold text-gray-700 sm:col-span-4 dark:text-zinc-400">
                                Contactpersoon:
                            </span>
                            <span className="font-medium text-gray-900 sm:col-span-8 dark:text-zinc-100" id="levering-contactpersoon">
                                {leverancier.contactpersoon}
                            </span>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-12">
                            <span className="font-semibold text-gray-700 sm:col-span-4 dark:text-zinc-400">
                                Mobiel:
                            </span>
                            <span className="font-medium text-gray-900 sm:col-span-8 dark:text-zinc-100" id="levering-mobiel">
                                {leverancier.mobiel}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Melding bij Scenario 02 (Product wordt niet meer geproduceerd) */}
                {errorMessage && (
                    <div
                        className="mb-6 rounded-lg border border-red-300 bg-red-50 p-5 text-center shadow-sm dark:border-red-800 dark:bg-red-950/50"
                        id="product-inactief-melding"
                    >
                        <p className="text-base font-bold text-red-800 dark:text-red-200">
                            {errorMessage}
                        </p>
                        <p className="mt-1 text-xs text-red-700 dark:text-red-300">
                            U wordt na {secondsLeft} seconde{secondsLeft === 1 ? '' : 'n'} automatisch doorgestuurd naar het overzicht Geleverde producten...
                        </p>
                    </div>
                )}

                {/* Formulier conform Wireframe-04 */}
                <form
                    onSubmit={handleSubmit}
                    className="rounded-lg border border-gray-300 bg-white p-6 shadow dark:border-zinc-700 dark:bg-zinc-900"
                >
                    <div className="space-y-5">
                        {/* Aantal producteenheden */}
                        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12">
                            <label
                                htmlFor="aantal"
                                className="text-sm font-semibold text-gray-800 sm:col-span-5 dark:text-zinc-200"
                            >
                                Aantal producteenheden
                            </label>
                            <div className="sm:col-span-7">
                                <input
                                    id="aantal"
                                    name="aantal"
                                    type="number"
                                    min="1"
                                    required
                                    value={data.aantal}
                                    onChange={(e) => setData('aantal', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                                />
                                {errors.aantal && (
                                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                        {errors.aantal}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Datum eerstvolgende levering */}
                        <div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-12">
                            <label
                                htmlFor="datumEerstVolgendeLevering"
                                className="text-sm font-semibold text-gray-800 sm:col-span-5 dark:text-zinc-200"
                            >
                                Datum eerstvolgende levering
                            </label>
                            <div className="sm:col-span-7">
                                <input
                                    id="datumEerstVolgendeLevering"
                                    name="datumEerstVolgendeLevering"
                                    type="date"
                                    required
                                    value={data.datumEerstVolgendeLevering}
                                    onChange={(e) => setData('datumEerstVolgendeLevering', e.target.value)}
                                    className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
                                />
                                {errors.datumEerstVolgendeLevering && (
                                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                                        {errors.datumEerstVolgendeLevering}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Buttons Sla op | Terug | Home conform Wireframe-04 */}
                    <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 pt-5 dark:border-zinc-800">
                        <button
                            type="submit"
                            id="btn-sla-op"
                            disabled={processing}
                            className="inline-flex items-center rounded-md border border-gray-800 bg-blue-600 px-6 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                        >
                            Sla op
                        </button>

                        <div className="flex items-center gap-3">
                            <Link
                                href={`/leveranciers/${leverancier.id}/producten`}
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
                </form>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Levering Product" />
            <AuthenticatedLayout
                header={
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-zinc-100">
                        Levering Product
                    </h2>
                }
            >
                {content}
            </AuthenticatedLayout>
        </>
    );
}

