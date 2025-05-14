// === Tentang.jsx ===
export default function Tentang() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-blue-700">📖 Tentang Website Desa Ngletih</h1>

      <p>
        Website ini dibuat sebagai pusat informasi resmi dari <strong>Kantor Desa Ngletih</strong>.
        Masyarakat dapat mengakses berita terbaru, agenda kegiatan, serta informasi aparatur desa
        secara cepat dan transparan.
      </p>

      <div>
        <h2 className="text-lg font-semibold text-blue-600">📍 Alamat Kantor Desa</h2>
        <p>Jl. Raya Ngletih No. 123, Kec. Kandat, Kab. Kediri, Jawa Timur 64173</p>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-blue-600">📱 Media Sosial Resmi</h2>
        <ul className="list-disc pl-5 text-sm">
          <li>
            Instagram: <a href="https://instagram.com/desa_ngletih" target="_blank" className="text-blue-600 underline">instagram.com/desa_ngletih</a>
          </li>
          <li>
            Facebook: <a href="https://facebook.com/desa_ngletih" target="_blank" className="text-blue-600 underline">facebook.com/desa_ngletih</a>
          </li>
        </ul>
      </div>

      <div>
        <h2 className="text-lg font-semibold text-blue-600">✉️ Email & Kontak</h2>
        <p>Email: <a href="mailto:kantordesa@ngletih.id" className="text-blue-600 underline">kantordesa@ngletih.id</a></p>
        <p>Telepon: (0354) 123456</p>
      </div>
    </div>
  );
}