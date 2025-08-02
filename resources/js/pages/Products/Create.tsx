import React from 'react';
import AppLayout from '@/layouts/app-layout'; // Asegúrate de que esta ruta es correcta
import { Head, useForm, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { type BreadcrumbItem } from '@/types'; // Asumo que defines BreadcrumbItem en '@/types'

const breadcrumbsCreate: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Productos',
        href: '/products', // O route('products.index')
    },
    {
        title: 'Crear',
        href: '/products/create', // O route('products.create')
    },
];

export default function ProductCreate() {
    // 'auth' podría ser necesario si tu AppLayout lo usa para mostrar info del usuario, si no, puedes quitarlo.
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        stock: '',
        price: '',
        description: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('products.store'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbsCreate}>
            <Head title="Crear Producto" />

            <div className="py-12">
                <div className="max-w-md mx-auto sm:px-6 lg:px-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Añadir Nuevo Producto</CardTitle>
                            <CardDescription>Rellena los detalles para crear un nuevo producto.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <Label htmlFor="name">Nombre</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                        className={errors.name ? 'border-red-500' : ''}
                                    />
                                    {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="stock">Stock</Label>
                                    <Input
                                        id="stock"
                                        type="number"
                                        name="stock"
                                        value={data.stock}
                                        onChange={(e) => setData('stock', e.target.value)}
                                        required
                                        className={errors.stock ? 'border-red-500' : ''}
                                    />
                                    {errors.stock && <div className="text-red-500 text-sm mt-1">{errors.stock}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="price">Precio</Label>
                                    <Input
                                        id="price"
                                        type="number"
                                        name="price"
                                        step="0.01" // Permite decimales
                                        value={data.price}
                                        onChange={(e) => setData('price', e.target.value)}
                                        required
                                        className={errors.price ? 'border-red-500' : ''}
                                    />
                                    {errors.price && <div className="text-red-500 text-sm mt-1">{errors.price}</div>}
                                </div>
                                <div>
                                    <Label htmlFor="description">Descripción</Label>
                                    <Textarea
                                        id="description"
                                        name="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        className={errors.description ? 'border-red-500' : ''}
                                    />
                                    {errors.description && <div className="text-red-500 text-sm mt-1">{errors.description}</div>}
                                </div>
                                <div className="flex justify-end gap-2">
                                    <Button asChild variant="secondary">
                                        <Link href={route('products.index')}>Cancelar</Link>
                                    </Button>
                                    <Button asChild type="submit" disabled={processing}>
                                        {processing ? 'Guardando...' : 'Crear Producto'}
                                    </Button>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}