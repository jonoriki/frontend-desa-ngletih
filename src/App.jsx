// frontend/src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home'; // ✅ Tambahkan halaman Home
import Berita from './pages/Berita';
import BeritaDetail from './pages/BeritaDetail';
import LoginAdmin from './pages/admin/LoginAdmin';
import DashboardAdmin from './pages/admin/DashboardAdmin';
import AdminRoute from './components/AdminRoute';
import Aparatur from './pages/Aparatur';
import AparaturAdmin from './pages/admin/AparaturAdmin';
import Agenda from './pages/Agenda';
import AgendaAdmin from './pages/admin/AgendaAdmin';
import Tentang from './pages/Tentang';
import ProfilDesa from './pages/ProfilDesa';


function App() {
  return (
    <Routes>
      {/* Untuk masyarakat */}
      <Route element={<Layout />}>
  <Route path="/" element={<Home />} />
  <Route path="/berita" element={<Berita />} />
  <Route path="/berita/:id" element={<BeritaDetail />} />
  <Route path="/profil" element={<ProfilDesa />} />
  <Route path="/aparatur" element={<Aparatur />} />
  <Route path="/agenda" element={<Agenda />} />
  <Route path="/tentang" element={<Tentang />} /> {/* ✅ Tambahkan baris ini */}
</Route>

      {/* Untuk admin */}
      <Route path="/admin/login" element={<LoginAdmin />} />
      <Route path="/admin/berita" element={
        <AdminRoute>
          <DashboardAdmin />
        </AdminRoute>
      } />
      <Route path="/admin/aparatur" element={
        <AdminRoute>
          <AparaturAdmin />
        </AdminRoute>
      } />
      <Route path="/admin/agenda" element={
        <AdminRoute>
          <AgendaAdmin />
        </AdminRoute>
      } />
    </Routes>
  );
}

export default App;
