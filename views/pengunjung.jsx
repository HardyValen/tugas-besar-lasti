const React = require('react');
const FrontendRoutes = require('../constants/FrontendRoutes');
const FormPengunjungCreate = require('./component/_form-pengunjung-create');
const DefaultLayout = require('./layouts/default');

const PengunjungPage = (props) => {
  return (
    <DefaultLayout title={props.title}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Dashboard Pengunjung</h3>
            </div>
            <div className="card-body">
              Semua data form yang ditembak ke endpoint akan memberikan respons non html dan page ini tidak akan render hasil response tersebut. Mohon maaf atas ketidaknyamanannya
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-12 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Buat Pengunjung Baru</h5>
            </div>
            <div className="card-body">
              <a href={FrontendRoutes.QRGeneratorPage} className="card-link">Silahkan ke Page QR Generator</a>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Data Pengunjung</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.PengunjungGet} method="get">
                <div className="form-group">
                  <label htmlFor="id_pengunjung_1">ID Pengunjung</label>
                  <input type="text" name="id" id="id_pengunjung_1" className="form-control"/>
                  <small className="form-text">
                    Untuk ambil semua data, kosongkan saja isi input textnya. Untuk keperluan testing, Disarankan menggunakan UUID dibawah sebagai berikut:
                    <ul>
                      <li>b1d42a9f-0a58-44ec-824e-a56929d7fa3a</li>
                      <li>1f17841a-8c57-4026-8e08-003a98092853</li>
                      <li>ba440a58-4300-4a16-a646-28d70b15af95</li>
                      <li>4f5c9fcc-4b37-4db5-be24-750d657ee7bb</li>
                    </ul>
                  </small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-6 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Log Pengunjung</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.PengunjungLog} method="get">
                <div className="form-group">
                  <label htmlFor="id_pengunjung_2">ID Pengunjung</label>
                  <input type="text" name="id" id="id_pengunjung_2" className="form-control"/>
                  <small className="form-text">
                    Untuk ambil semua data log, kosongkan saja isi input textnya. Untuk keperluan testing, Disarankan menggunakan UUID dibawah sebagai berikut:
                    <ul>
                      <li>b1d42a9f-0a58-44ec-824e-a56929d7fa3a</li>
                      <li>1f17841a-8c57-4026-8e08-003a98092853</li>
                      <li>ba440a58-4300-4a16-a646-28d70b15af95</li>
                      <li>4f5c9fcc-4b37-4db5-be24-750d657ee7bb</li>
                    </ul>
                  </small>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-8 offset-md-2 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Update Pengunjung</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.PengunjungUpdate} method="POST">
                <div className="form-group">
                  <label htmlFor="id_pengunjung_3">ID Pengunjung</label>
                  <input type="text" name="id_pengunjung" id="id_pengunjung_3" className="form-control"/>
                </div>
                <FormPengunjungCreate/>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </DefaultLayout>
  )
}

module.exports = PengunjungPage;