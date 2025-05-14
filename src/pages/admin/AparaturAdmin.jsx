import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_BASE_URL;

export default function AparaturAdmin() {
  const [data, setData] = useState([]);
  const [form, setForm] = useState({ nama: '', jabatan: '', urutan: '' });
  const [editingId, setEditingId] = useState(null);

  const fetchData = async () => {
    try {
      const res = await axios.get(`${API}/api/aparatur`);
      setData(res.data);
    } catch {
      toast.error('Gagal memuat data');
    }
  };

  useEffect(() => { fetchData(); }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('admin_token');

    try {
      if (editingId) {
        await axios.put(`${API}/api/aparatur/${editingId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('✅ Berhasil diupdate');
      } else {
        await axios.post(`${API}/api/aparatur`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        toast.success('✅ Berhasil ditambahkan');
      }

      setForm({ nama: '', jabatan: '', urutan: '' });
      setEditingId(null);
      fetchData();
    } catch {
      toast.error('❌ Gagal menyimpan data');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus?')) return;
    const token = localStorage.getItem('admin_token');

    try {
      await axios.delete(`${API}/api/aparatur/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success('🗑️ Data dihapus');
      fetchData();
    } catch {
      toast.error('❌ Gagal menghapus');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-xl font-bold mb-4">🛠️ Kelola Aparatur Desa</h1>

      <form onSubmit={handleSubmit} className="space-y-2 bg-white p-4 rounded shadow">
        <input
          type="text"
          placeholder="Nama"
          value={form.nama}
          onChange={(e) => setForm({ ...form, nama: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Jabatan"
          value={form.jabatan}
          onChange={(e) => setForm({ ...form, jabatan: e.target.value })}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          placeholder="Urutan"
          value={form.urutan}
          onChange={(e) => setForm({ ...form, urutan: e.target.value })}
          className="w-full p-2 border rounded"
        />

        <div className="flex gap-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {editingId ? 'Update' : 'Tambah'}
          </button>
          {editingId && (
            <button type="button" onClick={() => {
              setEditingId(null);
              setForm({ nama: '', jabatan: '', urutan: '' });
            }} className="bg-gray-300 px-4 py-2 rounded">
              Batal
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-2">
        {data.map((a) => (
          <li key={a.id} className="bg-white p-3 rounded shadow flex justify-between items-center">
            <div>
              <p className="font-semibold">{a.nama}</p>
              <p className="text-sm text-gray-600">{a.jabatan} (urutan {a.urutan})</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => {
                setEditingId(a.id);
                setForm({ nama: a.nama, jabatan: a.jabatan, urutan: a.urutan });
              }} className="text-blue-600 text-sm">Edit</button>
              <button onClick={() => handleDelete(a.id)} className="text-red-600 text-sm">Hapus</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
