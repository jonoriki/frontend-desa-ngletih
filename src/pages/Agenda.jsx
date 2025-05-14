import { useEffect, useState } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

export default function Agenda() {
  const [agenda, setAgenda] = useState([]);

  useEffect(() => {
    axios.get(`${API}/api/agenda`)
      .then(res => setAgenda(res.data))
      .catch(() => setAgenda([]));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-4">📅 Agenda Kegiatan Desa</h1>

      {agenda.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada agenda kegiatan.</p>
      ) : (
        <ul className="space-y-4">
          {agenda.map((item) => (
            <li key={item.id} className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">{new Date(item.tanggal).toLocaleDateString('id-ID')}</p>
              <h2 className="text-lg font-semibold">{item.judul}</h2>
              <p className="text-sm text-gray-600 italic">{item.lokasi}</p>
              <p className="mt-2 text-sm text-gray-700">{item.deskripsi}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
