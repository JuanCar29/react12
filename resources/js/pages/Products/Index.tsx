import AppLayout from '@/layouts/app-layout'; // Asegúrate de que esta ruta es correcta
import { Head, Link, router } from '@inertiajs/react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { type BreadcrumbItem } from '@/types'; // Asumo que defines BreadcrumbItem en '@/types'
import { CheckCircleIcon, XCircleIcon, Pencil, Eye, Trash2, CirclePlus } from 'lucide-react';
import Pagination from '@/components/pagination';

const breadcrumbsIndex: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
    {
        title: 'Productos',
        href: '/products', // O route('products.index')
    },
];

interface Product {
    id: number;
    name: string;
    stock: number;
    price: number;
    description: string;
}

interface Link {
    url: string;
    label: string;
    active?: boolean;
}

interface ProductsPaginated {
    data: Product[];
    links: Link[];
}

export default function Index({ products }: { products: ProductsPaginated }, flash: any) {

    return (
        <AppLayout breadcrumbs={breadcrumbsIndex}>
            <Head title="Listado de Productos" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">
                            {/* --- Mensajes Flash con Shadcn UI Alert --- */}
                            {flash && flash.success && (
                                <Alert className="mb-4 bg-green-50 border-green-200 text-green-700">
                                    <CheckCircleIcon className="h-4 w-4 inline mr-2 text-green-500" /> {/* O tu icono de éxito */}
                                    <AlertTitle>¡Éxito!</AlertTitle>
                                    <AlertDescription>
                                        {flash.success}
                                    </AlertDescription>
                                </Alert>
                            )}
                            {flash && flash.error && (
                                <Alert className="mb-4 bg-red-50 border-red-200 text-red-700">
                                    <XCircleIcon className="h-4 w-4 inline mr-2 text-red-500" /> {/* O tu icono de error */}
                                    <AlertTitle>¡Error!</AlertTitle>
                                    <AlertDescription>
                                        {flash.error}
                                    </AlertDescription>
                                </Alert>
                            )}
                            {/* --- Fin Mensajes Flash --- */}
                            <div className="flex justify-end mb-4">
                                <Button asChild size="sm" className="mr-3">
                                    <Link href={route('products.create')}><CirclePlus />Añadir Nuevo Producto</Link>
                                </Button>
                            </div>

                            {products.data.length > 0 ? (
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Nombre</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Precio</TableHead>
                                            <TableHead>Descripción</TableHead>
                                            <TableHead className="text-right">Acciones</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {products.data.map((product) => (
                                            <TableRow key={product.id}>
                                                <TableCell className="font-medium">{product.name}</TableCell>
                                                <TableCell>{product.stock}</TableCell>
                                                <TableCell className="text-right">
                                                    {new Intl.NumberFormat('es-ES', {
                                                        style: 'currency',
                                                        currency: 'EUR',
                                                        minimumFractionDigits: 2,
                                                        maximumFractionDigits: 2
                                                    }).format(product.price)}
                                                </TableCell>
                                                <TableCell className="max-w-xs truncate">{product.description || 'N/A'}</TableCell>
                                                <TableCell className="text-right whitespace-nowrap">
                                                    <Button asChild variant="secondary" size="sm" className="mr-3">
                                                        <Link href={route('products.show', product.id)}><Eye />Ver</Link>
                                                    </Button>
                                                    <Button asChild size="sm" className="mr-3">
                                                        <Link href={route('products.edit', product.id)}><Pencil />Editar</Link>
                                                    </Button>
                                                    <Button
                                                        variant="destructive"
                                                        size="sm"
                                                        className="mr-3"
                                                        onClick={() => {
                                                            if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
                                                                // Con la nueva API de Inertia, se usa `router` en lugar de `window.Inertia`.
                                                                router.delete(route('products.destroy', product.id));
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 />Eliminar
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            ) : (
                                <p className="text-center text-gray-500 mt-8">No hay productos disponibles.</p>
                            )}
                        </div>
                        <Pagination links={products.links} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}