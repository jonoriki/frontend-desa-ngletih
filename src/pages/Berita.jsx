import { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBerita from '../components/SearchBerita';
import BeritaList from '../components/BeritaList';

const API = import.meta.env.VITE_API_BASE_URL;

function Berita() {
  const [berita, setBerita] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('terbaru');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [searchKeyword, setSearchKeyword] = useState('');

  const fetchBerita = async () => {
    try {
      const res = await axios.get(`${API}/api/berita`, {
        params: {
          page: currentPage,
          limit: itemsPerPage,
          search: searchKeyword
        }
      });

      let data = res.data.data;
      if (sort === 'terlama') {
        data.sort((a, b) => new Date(a.tanggal_publikasi) - new Date(b.tanggal_publikasi));
      } else {
        data.sort((a, b) => new Date(b.tanggal_publikasi) - new Date(a.tanggal_publikasi));
      }

      setBerita(data);
      setTotalPages(res.data.totalPages || 1);
    } catch (err) {
      console.error('❌ Gagal memuat berita:', err);
    }
  };

  useEffect(() => {
    fetchBerita();
  }, [currentPage, sort, searchKeyword]);

  const handleSearch = (results) => {
    setCurrentPage(1);
    setBerita(results);
    setTotalPages(1); // Karena hasil search tidak pakai pagination
    setSearchKeyword(''); // Reset keyword agar fetchBerita tidak bentrok
  };

  const handleShowAll = () => {
    setSearchKeyword('');
    setCurrentPage(1);
    fetchBerita();
  };

  return (
    <div className="space-y-8">
      <section className="bg-primary text-white py-10 px-6 rounded-2xl shadow-lg dark:bg-primary-dark">
        <h1 className="text-3xl font-bold mb-2">Berita Desa Ngletih</h1>
        <p className="text-blue-100 text-sm max-w-2xl">
          Dapatkan informasi terbaru seputar kegiatan dan kabar penting dari Desa Ngletih.
        </p>
      </section>

      <SearchBerita onResult={handleSearch} />

      <div className="text-primary cursor-pointer hover:underline text-sm">
        <button onClick={handleShowAll}>📄 Tampilkan Semua</button>
      </div>

      <div className="mb-4">
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border border-gray-300 p-2 rounded-md text-sm focus:ring-primary focus:border-primary dark:bg-gray-800 dark:text-white dark:border-gray-600"
        >
          <option value="terbaru">🔽 Terbaru</option>
          <option value="terlama">🔼 Terlama</option>
        </select>
      </div>

      <BeritaList
        berita={berita}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        itemsPerPage={itemsPerPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Berita;
