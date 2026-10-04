import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ auth, products }) {
    const content = (
        <div className="py-8">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-gray-200 pb-5 sm:flex-row sm:items-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <span className="rounded bg-pink-100 px-2.5 py-0.5 text-xs font-semibold text-pink-800">
                                Jamin Magazijn
                            </span>
                        </div>
                        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 underline decoration-pink-500 decoration-4 underline-offset-8">
                            Overzicht Magazijn Jamin
                        </h1>
                        <p className="mt-2 text-sm text-gray-600">
                            Overzicht van alle in het magazijn aanwezige producten, gesorteerd op Barcode (oplopend).
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <Link
                            href="/"
                            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3.5 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                        >
                            &larr; Homepage
                        </Link>
                    </div>
                </div>

                {/* Table Container according to Wireframe 1 */}
                <div className="overflow-hidden rounded-lg border border-gray-300 bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-300 text-left">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th scope="col" className="py-3.5 pl-6 pr-3 text-sm font-bold text-gray-900">
                                        Barcode
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-sm font-bold text-gray-900">
                                        Naam
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-sm font-bold text-gray-900">
                                        Verpakkingseenheid
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-sm font-bold text-gray-900">
                                        Aantalaanwezig
                                    </th>
                                    <th scope="col" className="px-3 py-3.5 text-center text-sm font-bold text-gray-900">
                                        Allergenen Info
                                    </th>
                                    <th scope="col" className="py-3.5 pl-3 pr-6 text-center text-sm font-bold text-gray-900">
                                        Leverantie Info
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {products && products.length > 0 ? (
                                    products.map((product) => {
                                        const formattedKg = product.VerpakkingsEenheid
                                            ? `${String(product.VerpakkingsEenheid).replace('.', ',')} kg`
                                            : '-';
                                        const aantal = product.AantalAanwezig !== null && product.AantalAanwezig !== undefined
                                            ? product.AantalAanwezig
                                            : '';

                                        return (
                                            <tr
                                                key={product.ProductId}
                                                className="transition hover:bg-pink-50/40"
                                                id={`product-row-${product.ProductId}`}
                                            >
                                                <td className="whitespace-nowrap py-4 pl-6 pr-3 font-mono text-sm text-gray-900">
                                                    {product.Barcode}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm font-medium text-gray-900">
                                                    {product.Naam}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-600">
                                                    {formattedKg}
                                                </td>
                                                <td className="whitespace-nowrap px-3 py-4 text-sm font-semibold text-gray-800">
                                                    {aantal}
                                                </td>
                                                {/* Allergenen Info (Red Cross) */}
                                                <td className="whitespace-nowrap px-3 py-4 text-center">
                                                    <Link
                                                        href={`/magazijn/allergenen/${product.ProductId}`}
                                                        title={`Bekijk allergenen info van ${product.Naam}`}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-red-600 transition hover:bg-red-50 hover:text-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
                                                        id={`allergenen-btn-${product.ProductId}`}
                                                    >
                                                        {/* Red Cross Icon (Wireframe X) */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 stroke-current"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="2.5"
                                                        >
                                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                                {/* Leverantie Info (Blue Question Mark) */}
                                                <td className="whitespace-nowrap py-4 pl-3 pr-6 text-center">
                                                    <Link
                                                        href={`/magazijn/levering/${product.ProductId}`}
                                                        title={`Bekijk leverantie info van ${product.Naam}`}
                                                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-blue-600 transition hover:bg-blue-50 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                        id={`levering-btn-${product.ProductId}`}
                                                    >
                                                        {/* Blue Question Mark Icon (Wireframe ?) */}
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            className="h-6 w-6 fill-current"
                                                            viewBox="0 0 24 24"
                                                        >
                                                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 16h-2v-2h2v2zm1.07-7.75l-.9.92C12.45 11.9 12 12.5 12 14h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
                                                        </svg>
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="py-8 text-center text-sm text-gray-500">
                                            Geen producten gevonden in het magazijn.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <>
            <Head title="Overzicht Magazijn Jamin" />
            {auth && auth.user ? (
                <AuthenticatedLayout header={<h2 className="text-xl font-semibold leading-tight text-gray-800">Magazijnbeheer</h2>}>
                    {content}
                </AuthenticatedLayout>
            ) : (
                <div className="min-h-screen bg-gray-50 text-gray-900">
                    <header className="border-b border-gray-200 bg-white shadow-sm">
                        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                            <Link href="/" className="flex items-center gap-2 text-xl font-black text-pink-600 tracking-wider">
                                JAMIN <span className="text-sm font-normal text-gray-500">| Magazijn</span>
                            </Link>
                            <div className="flex items-center gap-3">
                                <Link
                                    href="/login"
                                    className="rounded-md px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-pink-600"
                                >
                                    Inloggen
                                </Link>
                            </div>
                        </div>
                    </header>
                    <main>{content}</main>
                </div>
            )}
        </>
    );
}
