export function formatTanggal(tanggal) {
  const tgl = new Date(tanggal);
  return tgl.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
