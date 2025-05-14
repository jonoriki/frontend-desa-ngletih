import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BeritaForm from '../../components/BeritaForm';
import BeritaList from '../../components/BeritaList';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_BASE_URL;

// === FORM GANTI PASSWORD ADMIN ===
function GantiPasswordForm() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);

    try {
      const res = await axios.put(`${API}/api/admin/password`, {
        currentPassword,
        newPassword,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
        }
      });

      setMsg(res.data.message || 'Password berhasil diubah');
      setCurrentPassword('');
      setNewPassword('');
    } catch (err) {
      setMsg(err.response?.data?.error || 'Gagal mengubah password');
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-2xl shadow-md mb-6 max-w-md space-y-4 dark:bg-gray-800 dark:text-white">
      <h2 className="text-lg font-semibold">🔐 Ubah Password Admin</h2>
      {msg && <p className="text-sm text-center text-blue-600">{msg}</p>}

      <input
        type="password"
        placeholder="Password Lama"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <input
        type="password"
        placeholder="Password Baru"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? 'Memproses...' : 'Simpan Password Baru'}
      </button>
    </form>
  );
}

// === DASHBOARD ADMIN ===
export default function DashboardAdmin() {
  const [berita, setBerita] = useState([]);
  const [editData, setEditData] = useState(null);
  const [stats, setStats] = useState(null);
  const [adminList, setAdminList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 6;
  const navigate = useNavigate();

  const fetchBerita = async () => {
    try {
      const res = await axios.get(`${API}/api/berita?page=${currentPage}&limit=${itemsPerPage}&includeDraft=true`);
      setBerita(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
    } catch {
      toast.error('Gagal memuat berita');
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await axios.get(`${API}/api/admin/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch {
      console.error('Gagal memuat statistik');
    }
  };

  const fetchAdminList = async () => {
    try {
      const token = localStorage.getItem('admin_token');
      const res = await axios.get(`${API}/api/admin/list`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAdminList(res.data);
    } catch {
      console.error('Gagal memuat daftar admin');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Yakin ingin menghapus berita ini?')) return;
    try {
      await axios.delete(`${API}/api/berita/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("admin_token")}`,
        },
      });
      fetchBerita();
      toast.success("✅ Berita berhasil dihapus.");
    } catch {
      toast.error("❌ Gagal menghapus berita.");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    window.location.href = '/admin/login';
  };

  useEffect(() => {
    fetchBerita();
    fetchStats();
    fetchAdminList();
  }, [currentPage]);

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-primary dark:text-green-300">🛠️ Dashboard Admin</h1>
        <button onClick={handleLogout} className="text-sm text-red-600 hover:underline dark:text-red-400">
          Logout
        </button>
      </div>

      {stats && (
        <div className="grid md:grid-cols-4 gap-4 mb-6 text-center">
          <div className="bg-white p-4 rounded-2xl shadow-md dark:bg-gray-800 dark:text-white">📦 Total Berita<br /><b>{stats.total}</b></div>
          <div className="bg-white p-4 rounded-2xl shadow-md dark:bg-gray-800 dark:text-white">🗓️ Hari Ini<br /><b>{stats.beritaHariIni}</b></div>
          <div className="bg-white p-4 rounded-2xl shadow-md dark:bg-gray-800 dark:text-white">🏷️ Kategori<br /><b>{stats.jumlahKategori}</b></div>
          <div className="bg-white p-4 rounded-2xl shadow-md dark:bg-gray-800 dark:text-white">✍️ Penulis<br /><b>{stats.jumlahPenulis}</b></div>
        </div>
      )}

      {adminList.length > 0 && (
        <div className="bg-white rounded-2xl shadow-md p-4 mb-6 dark:bg-gray-800 dark:text-white">
          <h2 className="text-lg font-semibold mb-2">👥 Daftar Admin</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {adminList.map((admin) => (
              <li key={admin.id}>{admin.username}</li>
            ))}
          </ul>

          <form
  onSubmit={async (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    if (!username || !password) return;

    try {
      await axios.post(`${API}/api/admin/tambah`, { username, password }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('admin_token') }` }
      });
      toast.success('✅ Admin berhasil ditambahkan');
      fetchAdminList();
      e.target.reset();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Gagal tambah admin');
    }
  }}
  className="mt-4 space-y-2"
>
  <input
    name="username"
    placeholder="Username baru"
    className="w-full p-2 border rounded text-sm"
    required
  />
  <input
    type="password"
    name="password"
    placeholder="Password baru"
    className="w-full p-2 border rounded text-sm"
    required
  />
  <button
    type="submit"
    className="bg-primary text-white px-3 py-1 rounded text-sm hover:bg-primary-dark"
  >
    ➕ Tambah Admin
  </button>
</form>

<hr className="my-4" />

<ul className="list-disc pl-5 text-sm text-gray-700">
  {adminList.map((admin) => (
    <li key={admin.id} className="flex items-center justify-between">
      <span>{admin.username}</span>
      {admin.id !== parseInt(localStorage.getItem('admin_id')) && (
        <button
          onClick={async () => {
            if (!confirm('Yakin ingin hapus admin ini?')) return;
            try {
              await axios.delete(`${API}/api/admin/${admin.id}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('admin_token')}`,
                },
              });
              toast.success('✅ Admin dihapus');
              fetchAdminList();
            } catch {
              toast.error('❌ Gagal hapus admin');
            }
          }}
          className="text-red-600 hover:underline text-xs"
        >
          Hapus
        </button>
      )}
    </li>
  ))}
</ul>

        </div>
      )}

      {/* 🔐 Form Ganti Password */}
      <GantiPasswordForm />

      {/* 📝 Form Tambah/Edit Berita */}
      <BeritaForm onSukses={fetchBerita} editData={editData} setEditData={setEditData} />
      <hr className="my-6" />

      {/* 📚 Daftar Berita + Pagination */}
      <BeritaList
        berita={berita}
        onEdit={setEditData}
        onDelete={handleDelete}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}
