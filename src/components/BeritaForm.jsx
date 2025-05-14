import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_BASE_URL;

export default function BeritaForm({ onSukses, editData, setEditData }) {
  const [form, setForm] = useState({
    judul: "",
    konten: "",
    tanggal_publikasi: "",
    penulis: "",
    kategori: "",
    status: "terbit",
  });

  const [gambar, setGambar] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editData) {
      setForm({
        judul: editData.judul || "",
        konten: editData.konten || "",
        tanggal_publikasi: editData.tanggal_publikasi?.split("T")[0] || "",
        penulis: editData.penulis || "",
        kategori: editData.kategori || "",
        status: editData.status || "terbit",
      });
      if (editData.url_gambar) {
        setPreviewUrl(`${API}${editData.url_gambar}`);
      }
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGambarChange = (e) => {
    const file = e.target.files[0];
    setGambar(file);
    setPreviewUrl(file ? URL.createObjectURL(file) : null);
  };

  const resetForm = () => {
    setForm({
      judul: "",
      konten: "",
      tanggal_publikasi: "",
      penulis: "",
      kategori: "",
      status: "terbit",
    });
    setGambar(null);
    setPreviewUrl(null);
    setEditData?.(null);
    setErrors({});
    setShowPreview(false);
  };

  const validate = () => {
    const newErrors = {};
    if (!form.judul.trim()) newErrors.judul = "Judul wajib diisi";
    else if (form.judul.length < 5) newErrors.judul = "Judul minimal 5 karakter";

    if (!form.konten.trim()) newErrors.konten = "Konten wajib diisi";
    else if (form.konten.length < 20) newErrors.konten = "Konten minimal 20 karakter";

    if (!form.penulis.trim()) newErrors.penulis = "Penulis wajib diisi";
    if (!form.kategori.trim()) newErrors.kategori = "Kategori wajib diisi";
    if (!form.tanggal_publikasi) newErrors.tanggal_publikasi = "Tanggal wajib diisi";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);

    try {
      const token = localStorage.getItem("admin_token");
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => formData.append(key, val));
      if (gambar) formData.append("gambar", gambar);

      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (editData) {
        await axios.put(`${API}/api/berita/${editData.id}`, formData, config);
        toast.success("✅ Berita berhasil diupdate.");
      } else {
        await axios.post(`${API}/api/berita`, formData, config);
        toast.success("✅ Berita berhasil ditambahkan.");
      }

      onSukses?.();
      resetForm();
    } catch (err) {
      toast.error("❌ Gagal menyimpan berita.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
      <input name="judul" value={form.judul} onChange={handleChange} placeholder="Judul" className="w-full p-2 border rounded" />
      {errors.judul && <p className="text-red-500 text-sm">{errors.judul}</p>}

      <textarea name="konten" value={form.konten} onChange={handleChange} placeholder="Konten" className="w-full p-2 border rounded" />
      {errors.konten && <p className="text-red-500 text-sm">{errors.konten}</p>}

      <input name="penulis" value={form.penulis} onChange={handleChange} placeholder="Penulis" className="w-full p-2 border rounded" />
      {errors.penulis && <p className="text-red-500 text-sm">{errors.penulis}</p>}

      <input name="kategori" value={form.kategori} onChange={handleChange} placeholder="Kategori" className="w-full p-2 border rounded" />
      {errors.kategori && <p className="text-red-500 text-sm">{errors.kategori}</p>}

      <input type="date" name="tanggal_publikasi" value={form.tanggal_publikasi} onChange={handleChange} className="w-full p-2 border rounded" />
      {errors.tanggal_publikasi && <p className="text-red-500 text-sm">{errors.tanggal_publikasi}</p>}

      <div className="flex gap-4">
        <label className="flex items-center gap-1">
          <input type="radio" name="status" value="terbit" checked={form.status === 'terbit'} onChange={handleChange} />
          Terbit
        </label>
        <label className="flex items-center gap-1">
          <input type="radio" name="status" value="draft" checked={form.status === 'draft'} onChange={handleChange} />
          Draft
        </label>
      </div>

      <input type="file" accept="image/*" onChange={handleGambarChange} className="w-full p-2 border rounded" />
      {previewUrl && <img src={previewUrl} alt="Preview" className="max-h-64 rounded border mt-2" />}

      <div className="flex gap-2">
        <button type="submit" disabled={submitting} className={`px-4 py-2 text-white rounded ${submitting ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"}`}>
          {submitting ? "Menyimpan..." : editData ? "Update Berita" : "Tambah Berita"}
        </button>

        {!editData && (
          <button type="button" onClick={() => setShowPreview(true)} className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
            👁️ Preview
          </button>
        )}

        {editData && (
          <button type="button" onClick={resetForm} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Batal
          </button>
        )}
      </div>

      {showPreview && (
        <div className="bg-white p-4 border rounded shadow mt-6">
          <h2 className="text-xl font-bold mb-2">{form.judul}</h2>
          <p className="text-sm text-gray-500">{form.tanggal_publikasi}</p>
          <p className="text-sm text-gray-600 mb-2">
            Oleh <b>{form.penulis}</b> | Kategori: <i>{form.kategori}</i>
          </p>
          {previewUrl && <img src={previewUrl} alt="Preview" className="w-full max-h-64 object-cover rounded mb-4" />}
          <p className="whitespace-pre-line">{form.konten}</p>

          <button onClick={() => setShowPreview(false)} className="mt-4 text-sm text-blue-600 hover:underline">
            ✖️ Tutup Preview
          </button>
        </div>
      )}
    </form>
  );
}
