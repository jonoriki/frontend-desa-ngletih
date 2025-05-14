import { motion } from 'framer-motion';

const HoverCard = ({ children }) => (
  <motion.div
    whileHover={{ scale: 1.05 }}
    transition={{ duration: 0.2 }}
    className="bg-white shadow rounded-xl p-4 w-56 cursor-pointer"
  >
    {children}
  </motion.div>
);

export default function Aparatur() {
  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12 bg-emerald-50 min-h-screen">
      <h1 className="text-2xl font-bold text-center text-emerald-700">
        👥 Struktur Aparatur Desa
      </h1>

      {/* Kepala Desa */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.2 }}
        className="flex justify-center"
      >
        <div className="bg-white rounded-xl shadow-md px-6 py-3 text-center cursor-pointer">
          <h2 className="font-bold text-lg text-gray-800">Agus Priyono</h2>
          <p className="text-sm text-gray-600">Kepala Desa</p>
        </div>
      </motion.div>

      {/* Sekretaris Desa */}
<div className="flex justify-center">
  <div className="text-center">
    <h3 className="text-emerald-700 font-semibold mb-2">Sekretaris Desa</h3>
    <HoverCard>
      <h4 className="font-medium text-indigo-700">Danang Setya Pinardi</h4>
      <p className="text-sm text-gray-600">Sekretaris Desa</p>
    </HoverCard>
  </div>
</div>

      {/* Kepala Dusun */}
      <div className="text-center">
        <h3 className="text-emerald-700 font-semibold mb-2">Kepala Dusun</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <HoverCard>
            <h4 className="font-medium">Vikry Aghnas Saharja</h4>
            <p className="text-sm text-gray-600">Dusun Barat</p>
          </HoverCard>
          <HoverCard>
            <h4 className="font-medium">Ubaidillah</h4>
            <p className="text-sm text-gray-600">Dusun Timur</p>
          </HoverCard>
        </div>
      </div>

      {/* Kasi */}
      <div className="text-center">
        <h3 className="text-emerald-700 font-semibold mb-2">Kasi</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <HoverCard>
            <h4 className="font-medium">Abas Syakur</h4>
            <p className="text-sm text-gray-600">Kesejahteraan Rakyat</p>
          </HoverCard>
          <HoverCard>
            <h4 className="font-medium">Ahmad Fauzi</h4>
            <p className="text-sm text-gray-600">Pemerintahan</p>
          </HoverCard>
        </div>
      </div>

      {/* Kaur */}
      <div className="text-center">
        <h3 className="text-emerald-700 font-semibold mb-2">Kaur</h3>
        <div className="flex flex-wrap justify-center gap-4">
          <HoverCard>
            <h4 className="font-medium">Johan Rizky Triosaputra</h4>
            <p className="text-sm text-gray-600">Umum</p>
          </HoverCard>
          <HoverCard>
            <h4 className="font-medium">Gunawan Hamid Abdullah</h4>
            <p className="text-sm text-gray-600">Keuangan</p>
          </HoverCard>
          <HoverCard>
            <h4 className="font-medium">Heru Gunawan</h4>
            <p className="text-sm text-gray-600">Perencanaan</p>
          </HoverCard>
        </div>
      </div>
    </div>
  );
}
