var React = require('react');
const FrontendRoutes = require('../constants/FrontendRoutes');
const DefaultLayout = require('./layouts/default');
 
function Landing(props) {
  return (
    <DefaultLayout title={props.title}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Rumah Sakit Advent Bandung QR Code API Prototype</h3>
              <p className="card-text">Tugas Besar II3120 Layanan Sistem dan Teknologi Informasi, Kelompok 4, Institut Teknologi Bandung, 2020</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>NIM</th>
                    <th>Nama</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>18218004</td>
                    <td>Hardy Valenthio Amansyah</td>
                  </tr>
                  <tr>
                    <td>18218018</td>
                    <td>Patrick Segara</td>
                  </tr>
                  <tr>
                    <td>18218034</td>
                    <td>Vincentius Ian Widi Nugroho</td>
                  </tr>
                  <tr>
                    <td>18218036</td>
                    <td>Sulis Tiana</td>
                  </tr>
                </tbody>
              </table>
              <a href={FrontendRoutes.APIDocs} className="card-link">
                API Docs
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 col-md-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">QR Code Generator</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                Simple QR Generator for Rumah Sakit Advent
              </p>
              <a href={FrontendRoutes.QRGeneratorPage} className="card-link">
                QR Generator
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">QR Scanner</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                QR Scanner dengan pilihan untuk API Call 
              </p>
              <a href={FrontendRoutes.QRScannerPage} className="card-link">
                QR Scanner
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Dashboard Pengunjung</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                Semacam view untuk data pengunjung
              </p>
              <a href={FrontendRoutes.PengunjungPage} className="card-link">
                Pengunjung
              </a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Dashboard Ruangan</h5>
            </div>
            <div className="card-body">
              <p className="card-text">
                Semacam view untuk data ruangan
              </p>
              <a href={FrontendRoutes.RuanganPage} className="card-link">
                Ruangan
              </a>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}
 
module.exports = Landing;