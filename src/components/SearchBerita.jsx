import { useEffect, useState, useRef } from 'react';
import axios from 'axios';

const API = import.meta.env.VITE_API_BASE_URL;

function SearchBerita({ onResult }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const skipFetchRef = useRef(false);
  const debounceRef = useRef(null);

  useEffect(() => {
    if (skipFetchRef.current) {
      skipFetchRef.current = false;
      return;
    }

    if (query.trim().length < 2) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await axios.get(`${API}/api/berita/search?keyword=${encodeURIComponent(query)}`);
        setResults(res.data);
        setShowDropdown(true);
      } catch {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300);
  }, [query]);

  const handleSelect = (item) => {
    skipFetchRef.current = true;
    setQuery(item.judul);
    setResults([]);
    setShowDropdown(false);
    if (onResult) onResult([item]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${API}/api/berita/search?keyword=${encodeURIComponent(query)}`);
      if (onResult) onResult(res.data);
      setShowDropdown(false);
    } catch {
      if (onResult) onResult([]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full max-w-xl mx-auto mb-6">
      <div className="flex items-center gap-2">
        <input
          type="text"
          placeholder="Cari judul, konten, penulis, kategori berita..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          🔍 Cari
        </button>
      </div>

      {showDropdown && results.length > 0 && (
        <div className="absolute w-full bg-white border border-gray-300 shadow-lg rounded-md z-10 max-h-60 overflow-y-auto mt-1">
          {results.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className="p-3 border-b cursor-pointer hover:bg-gray-100"
            >
              <p className="font-semibold">{item.judul}</p>
              <p className="text-sm text-gray-600 truncate">{item.konten.slice(0, 60)}...</p>
              <p className="text-xs text-gray-500">{item.penulis} | {item.kategori}</p>
            </div>
          ))}
        </div>
      )}
    </form>
  );
}

export default SearchBerita;
