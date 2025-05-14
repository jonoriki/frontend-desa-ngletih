import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { formatTanggal } from '../utils/formatTanggal';

const API = import.meta.env.VITE_API_BASE_URL;

function BeritaDetail() {
  const { id } = useParams();
  const [berita, setBerita] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${API}/api/berita/${id}`)
      .then(res => {
        setBerita(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError('Berita tidak ditemukan');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-6">Memuat...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-lg space-y-6">
      <Link to="/" className="text-blue-600 underline mb-4 inline-block">← Kembali ke Beranda</Link>

      <h1 className="text-3xl font-bold text-gray-800">{berita.judul}</h1>

      <p className="text-sm text-gray-500">
        {formatTanggal(berita.tanggal_publikasi)}
      </p>
      <p className="text-sm text-gray-600">
        Oleh <span className="font-semibold">{berita.penulis}</span> | Kategori: <span className="italic">{berita.kategori}</span>
      </p>

      {berita.url_gambar && (
        <img
          src={`${API}${berita.url_gambar}`}
          alt={berita.judul}
          className="w-full rounded-md border max-h-[400px] object-cover"
        />
      )}

      <div className="prose max-w-none prose-blue">
        <p>{berita.konten}</p>
      </div>
    </div>
  );
}

export default BeritaDetail;
