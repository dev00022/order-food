'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserTabs({isAdmin}){
    const path = usePathname();
    return (
        <div className="md:flex grid grid-cols-2 justify-center gap-2 tabs">
        <Link className={path === '/profile' ? 'active' : ''} href={'/profile'}>Profile</Link>
        {isAdmin && (
          <>
          <Link className={path === '/categories' ? 'active' : ''} href={'/categories'}>Catogaries</Link>
          <Link className={path.includes('/menu-items') ? 'active' : ''} href={'/menu-items'}>Menu Items</Link>
          <Link className={path.includes('/users') ? 'active' : ''} href={'/users'}>Users</Link>
          </>
        )}
      </div>
    )
}