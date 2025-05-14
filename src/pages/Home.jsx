// === src/pages/Home.jsx ===
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { formatTanggal } from '../utils/formatTanggal';
import { motion } from 'framer-motion';

const API = import.meta.env.VITE_API_BASE_URL;

export default function Home() {
  const [berita, setBerita] = useState([]);
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/berita?page=1&limit=3`).then(res => setBerita(res.data.data || []));
    axios.get(`${API}/api/agenda`).then(res => setAgenda(res.data.slice(0, 2) || []));
  }, []);

  return (
    <motion.div
      className="space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="text-center bg-primary text-white p-10 rounded-2xl shadow-xl">
        <h1 className="text-3xl font-bold mb-2">Selamat Datang di Desa Ngletih</h1>
        <p className="text-emerald-100">Informasi publik desa untuk warga dan pengunjung.</p>
      </section>

      <motion.section
        className="bg-white rounded-2xl shadow p-6 dark:bg-gray-800"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary-dark">📰 Berita Terbaru</h2>
          <Link to="/berita" className="text-sm text-primary hover:underline">Lihat Semua</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {berita.map(item => (
            <div key={item.id} className="bg-primary-light p-4 rounded-2xl shadow hover:shadow-lg transition">
              <h3 className="font-semibold text-primary-dark">{item.judul}</h3>
              <p className="text-xs text-gray-600">{formatTanggal(item.tanggal_publikasi)}</p>
              <p className="text-sm text-gray-800 dark:text-gray-300 line-clamp-3">{item.konten.slice(0, 100)}...</p>
              <Link to={`/berita/${item.id}`} className="text-primary text-xs hover:underline">Lihat Detail</Link>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        className="bg-white rounded-2xl shadow p-6 dark:bg-gray-800"
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: 50 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary-dark">📅 Agenda Kegiatan</h2>
          <Link to="/agenda" className="text-sm text-primary hover:underline">Lihat Semua</Link>
        </div>
        <ul className="space-y-3">
          {agenda.map(a => (
            <li key={a.id} className="bg-primary-light rounded-2xl p-4 shadow">
              <p className="font-semibold text-primary-dark">{a.judul}</p>
              <p className="text-sm text-gray-600">{formatTanggal(a.tanggal)} — {a.lokasi}</p>
              <p className="text-sm text-gray-700 dark:text-gray-300">{a.deskripsi.slice(0, 100)}...</p>
            </li>
          ))}
        </ul>
      </motion.section>
    </motion.div>
  );
}