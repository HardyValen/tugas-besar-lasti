const FrontendRoutes = {
  Home: "/",
  QRGeneratorPage: "/qr/qr-generator/page",
  QRScannerPage: "/qr/qr-scanner/page",
  PengunjungPage: "/pengunjung/page",
  RuanganPage: "/ruangan/page",

  QRCheckIn: "/qr/qr-scanner/checkin",
  QRCheckOut: "/qr/qr-scanner/checkout",
  QRGenerator: "/qr/qr-generator",
  
  PengunjungGet: "/pengunjung",
  PengunjungCreate: "/pengunjung",
  PengunjungUpdate: "/pengunjung/update",
  PengunjungLog: "/pengunjung/log",
  
  RuanganGet: "/ruangan",
  RuanganCreate: "/ruangan",
  RuanganUpdate: "/ruangan/update",
  RuanganDelete: "/ruangan/delete",
  RuanganLog: "/ruangan/log",
  RuanganJumlahPengunjung: "/ruangan/jumlah-pengunjung",

  APIDocs: "/api-docs",
}

module.exports = FrontendRoutes;