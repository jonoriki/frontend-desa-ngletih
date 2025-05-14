import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_BASE_URL;

export default function AgendaAdmin() {
  const [agenda, setAgenda] = useState([]);
  const [form, setForm] = useState({ judul: '', tanggal: '', lokasi: '', deskripsi: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchAgenda = async () => {
    try {
      const res = await axios.get(`${API}/api/agenda`);
      setAgenda(res.data);
    } catch {
      toast.error('Gagal memuat agenda');
    }
  };

  useEffect(() => { fetchAgenda(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    try {
      if (editingId) {
        await axios.put(`${API}/api/agenda/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('✅ Agenda diperbarui');
      } else {
        await axios.post(`${API}/api/agenda`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('✅ Agenda ditambahkan');
      }

      setForm({ judul: '', tanggal: '', lokasi: '', deskripsi: '' });
      setEditingId(null);
      fetchAgenda();
    } catch {
      toast.error('❌ Gagal menyimpan agenda');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Hapus agenda ini?')) return;
    const token = localStorage.getItem('admin_token');

    try {
      await axios.delete(`${API}/api/agenda/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('🗑️ Agenda dihapus');
      fetchAgenda();
    } catch {
      toast.error('❌ Gagal hapus agenda');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold mb-4">🛠️ Kelola Agenda Kegiatan</h1>

      <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Judul"
          value={form.judul}
          onChange={(e) => setForm({ ...form, judul: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="date"
          value={form.tanggal}
          onChange={(e) => setForm({ ...form, tanggal: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Lokasi"
          value={form.lokasi}
          onChange={(e) => setForm({ ...form, lokasi: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Deskripsi"
          value={form.deskripsi}
          onChange={(e) => setForm({ ...form, deskripsi: e.target.value })}
          className="w-full p-2 border rounded"
        />
        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId ? 'Update' : 'Tambah'}
          </button>
          {editingId && (
            <button type="button" onClick={() => {
              setEditingId(null);
              setForm({ judul: '', tanggal: '', lokasi: '', deskripsi: '' });
            }} className="bg-gray-300 px-4 py-2 rounded">
              Batal
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-2">
        {agenda.map((item) => (
          <li key={item.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{item.judul}</p>
              <p className="text-sm text-gray-600">{item.tanggal} @ {item.lokasi}</p>
              <p className="text-sm">{item.deskripsi}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                setEditingId(item.id);
                setForm({ ...item });
              }} className="text-blue-600 text-sm">Edit</button>
              <button onClick={() => handleDelete(item.id)} className="text-red-600 text-sm">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
