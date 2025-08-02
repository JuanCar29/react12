import React from 'react';
import AppLayout from '@/layouts/app-layout'; // Asegúrate de que esta ruta es correcta
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { type BreadcrumbItem } from '@/types'; // Asumo que defines BreadcrumbItem en '@/types'

export default function ProductShow({ auth, product }) {
    // 'auth' podría ser necesario si tu AppLayout lo usa para mostrar info del usuario, si no, puedes quitarlo.

    const breadcrumbsShow: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Productos',
            href: '/products', // O route('products.index')
        },
        {
            title: product.name,
            href: route('products.show', product.id),
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbsShow}>
            <Head title={`Detalles de ${product.name}`} />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>{product.name}</CardTitle>
                            <CardDescription>Aquí están los detalles completos de este producto.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <h3 className="font-semibold text-lg">Stock:</h3>
                                <p className="text-gray-700">{product.stock}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Precio:</h3>
                                <p className="text-gray-700">${product.price ? product.price.toFixed(2) : 'N/A'}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg">Descripción:</h3>
                                <p className="text-gray-700">{product.description || 'No hay descripción disponible.'}</p>
                            </div>
                            <div className="flex justify-between mt-6">
                                <Button asChild variant="secondary">
                                    <Link href={route('products.index')}>Volver a Productos</Link>
                                </Button>
                                <Button asChild>
                                    <Link href={route('products.edit', product.id)}>Editar Producto</Link>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}