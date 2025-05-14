// === frontend/src/pages/ProfilDesa.jsx ===
export default function ProfilDesa() {
  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-white shadow rounded">
      <h1 className="text-2xl font-bold text-blue-700">ℹ️ Profil Desa Ngletih</h1>

      <section>
        <h2 className="text-lg font-semibold text-blue-600">Sejarah Singkat</h2>
        <p>
          Desa Ngletih merupakan salah satu desa tua di wilayah Kecamatan Kandat yang telah ada sejak zaman kolonial.
          Dahulu dikenal sebagai sentra pertanian dan kerajinan anyaman bambu.
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-blue-600">Luas Wilayah</h2>
        <p>Total luas wilayah Desa Ngletih adalah sekitar <strong>250 hektar</strong> yang terdiri dari lahan pertanian, permukiman, dan fasilitas umum.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-blue-600">Jumlah Penduduk</h2>
        <p>Berdasarkan data tahun 2025, jumlah penduduk Desa Ngletih mencapai sekitar <strong>2.150 jiwa</strong> dengan mayoritas berprofesi sebagai petani, pedagang, dan buruh.</p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-blue-600">Visi</h2>
        <p>
          <em>"Mewujudkan Desa Ngletih yang Maju, Mandiri, dan Sejahtera Berbasis Kearifan Lokal."</em>
        </p>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-blue-600">Misi</h2>
        <ul className="list-disc pl-5 text-sm space-y-1">
          <li>Meningkatkan kualitas pendidikan dan kesehatan masyarakat.</li>
          <li>Mendorong perekonomian desa berbasis pertanian dan UMKM.</li>
          <li>Memperkuat tata kelola pemerintahan yang transparan dan partisipatif.</li>
          <li>Melestarikan budaya dan lingkungan hidup desa.</li>
        </ul>
      </section>
    </div>
  );
}
