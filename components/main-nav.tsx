'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Dispatch, SetStateAction } from 'react';

interface MainNavProps {
    scrolled: boolean;
    mobile?: boolean;
    userId: string | null;
    setMobileMenuOpen?: Dispatch<SetStateAction<boolean>>;
}

const routes = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/service', label: 'Service' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact' },
];

const MainNav = ({ scrolled, mobile, userId }: MainNavProps) => {
    const pathname = usePathname();

    return (
        <div className={mobile ? 'mt-6' : 'ml-auto'}>
            <nav className={cn('flex items-center', mobile ? 'flex-col space-y-2' : 'space-x-4 lg:space-x-12 pl-6')}>
                {routes.map((route) => (
                    <Link
                        key={route.href}
                        href={route.href}
                        className={cn(
                            'text-primary font-medium transition-colors hover:text-primary',
                            pathname === route.href
                                ? 'text-primary font-bold'
                                : `${scrolled ? 'text-white' : 'text-white'}`
                        )}
                    >
                        {route.label}
                    </Link>
                ))}
                {userId && (
                    <Link
                        href="/orders"
                        className={cn(
                            'text-primary font-medium transition-colors hover:text-primary',
                            pathname === '/orders'
                                ? 'text-primary font-bold'
                                : `${scrolled ? 'text-white' : 'text-white'}`
                        )}
                    >
                        Orders
                    </Link>
                )}
            </nav>
        </div>
    );
};

export default MainNav;
