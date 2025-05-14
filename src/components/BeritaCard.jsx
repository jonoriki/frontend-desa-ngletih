import { Link } from 'react-router-dom';
import { formatTanggal } from '../utils/formatTanggal';

const API = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

function BeritaCard({ data, onEdit, onDelete }) {
  const {
    id,
    judul,
    konten,
    tanggal_publikasi,
    penulis,
    kategori,
    url_gambar,
  } = data;

  const isBaru = (tanggal) => {
    const now = new Date();
    const pubDate = new Date(tanggal);
    return now.toDateString() === pubDate.toDateString();
  };

  return (
    <div className="border p-4 rounded mb-4 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 bg-white">
      <h2 className="text-xl font-bold text-blue-700 mb-2 hover:underline">
        <Link to={`/berita/${id}`} className="hover:underline cursor-pointer">
          {judul}
        </Link>
      </h2>

      {url_gambar && (
        <img
          src={`${API}${url_gambar}`}
          alt={judul}
          className="mb-2 w-full max-h-64 object-cover rounded"
        />
      )}

      <p className="text-sm text-gray-600 mb-2">
        <strong>Kategori:</strong> {kategori} | <strong>Penulis:</strong> {penulis}
      </p>

      <p className="text-gray-500 italic mb-2">
        {formatTanggal(tanggal_publikasi)}
        {isBaru(tanggal_publikasi) && (
          <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
            Baru
          </span>
        )}
      </p>

      <p className="mb-2">
        {konten.slice(0, 100)}...
        <Link to={`/berita/${id}`} className="text-blue-600 text-sm hover:underline">
          [Lihat selengkapnya]
        </Link>
      </p>

      <div className="flex gap-2">
        <button onClick={() => onEdit(data)} className="text-blue-600 hover:underline">
          Edit
        </button>
        <button onClick={() => onDelete(data.id)} className="text-red-600 hover:underline">
          Hapus
        </button>
      </div>
    </div>
  );
}

export default BeritaCard;
