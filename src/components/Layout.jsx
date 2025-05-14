// === src/components/Layout.jsx ===
import { Link, Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-primary-light text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <header className="bg-primary text-white py-4 shadow-md sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 flex justify-between items-center">
          <Link to="/" className="text-xl font-bold tracking-wide">🏡 Desa Ngletih</Link>
          <nav className="space-x-4 text-sm">
            <Link to="/" className="hover:underline">Beranda</Link>
            <Link to="/berita" className="hover:underline">Berita</Link>
            <Link to="/profil" className="hover:underline">Profil</Link>
            <Link to="/agenda" className="hover:underline">Agenda</Link>
            <Link to="/aparatur" className="hover:underline">Aparatur</Link>
            <Link to="/tentang" className="hover:underline">Tentang</Link>
          </nav>
        </div>
      </header>

      <main className="flex-grow max-w-5xl mx-auto w-full px-4 py-6">
        <Outlet />
      </main>

      <footer className="bg-primary-light text-center text-sm text-primary-dark py-4 border-t dark:bg-gray-800 dark:text-gray-300">
        © {new Date().getFullYear()} Desa Ngletih — Sistem Informasi Desa
      </footer>
    </div>
  );
}
