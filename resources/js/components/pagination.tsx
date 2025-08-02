import { Link } from "@inertiajs/react";

interface Link {
    url: string;
    label: string;
    active?: boolean;
}

export default function Pagination({ links }: { links: Link[] }) {
    return (
        <div className='my-4'>
            <div className="flex justify-center space-x-2">
                {links.map((link, index) => (
                    <Link
                        key={index}
                        href={link.url ?? '#'}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 text-sm rounded border 
                            ${link.active ? 'bg-accent-foreground text-white' : 'bg-white text-gray-700'} 
                            ${!link.url ? 'opacity-50 pointer-events-none' : 'hover:bg-gray-100'}`}
                    />
                ))}
            </div>
        </div>
    );
}