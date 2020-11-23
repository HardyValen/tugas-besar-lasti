const React = require('react');
const FrontendRoutes = require('../constants/FrontendRoutes');
const DefaultLayout = require('./layouts/default');

const QRScannerPage = (props) => {
  return (
    <DefaultLayout title={props.title}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">QR Scanner</h3>
            </div>
            <div className="card-body">
              <div className="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Warning: Host doesn't use HTTPS!</strong><br/>
                Untuk menjalankan QR scanner, host harus dijalankan dengan HTTPS. Sayangnya untuk mockup ini tidak dapat menggunakan QR Scanner. Anda dapat scan QR Code pengunjung yang telah terdaftar dengan aplikasi QR code scanner lainnya (seperti pada LINE atau Gojek). Kemudian, catat UUID yang dibaca pada scanner tersebut ke form dibawah ini. 
                <button type="button" className="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <p>UUID Akan otomatis digenerate jika QR Code Scanner pada aplikasi ini jalan. Jika tidak bisa, silahkan input secara manual data yang diperlukan untuk HTTP requestnya.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6 col-12 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Get Visitor Data</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.Visitor} method="get">
                <div className="form-group">
                  <label htmlFor="id_pengunjung_get">ID Pengunjung</label>
                  <input type="text" name="id_pengunjung" id="id_pengunjung_get" className="form-control" aria-describedby="pengunjung_get_text"/>
                  <small id="pengunjung_get_text" className="form-text text-muted">
                    Untuk keperluan testing, Hanya UUID dibawah ini yang valid:
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

        <div className="col-md-6 col-12 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Visitor Check In</h5>
            </div>
            <div className="card-body">
              <h6>Skenario</h6>
              <p>Ruangan yang ingin dicek in adalah ruang "Kelas1_1702". Pada masing-masing scanner akan diberikan ruang unik sebagai form data yang bersifat hidden.</p>
              
              <h6>Form</h6>
              <form action={FrontendRoutes.VisitorCheckIn} method="post">
                <div className="form-group">
                  <label htmlFor="id_pengunjung_checkin">ID Pengunjung</label>
                  <input type="text" name="id_pengunjung" id="id_pengunjung_checkin" className="form-control" aria-describedby="pengunjung_checkin_text"/>
                  <small id="pengunjung_checkin_text" className="form-text text-muted">
                    Untuk keperluan testing, Disarankan menggunakan UUID dibawah sebagai berikut:
                    <ul>
                      <li>b1d42a9f-0a58-44ec-824e-a56929d7fa3a</li>
                      <li>1f17841a-8c57-4026-8e08-003a98092853</li>
                      <li>ba440a58-4300-4a16-a646-28d70b15af95</li>
                      <li>4f5c9fcc-4b37-4db5-be24-750d657ee7bb</li>
                    </ul>
                  </small>
                </div>
                
                <input type="hidden" name="id_ruangan" value="Kelas1_1702"/>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Visitor Check Out</h5>
            </div>
            <div className="card-body">
              <h6>Skenario</h6>
              <p>Ruangan yang ingin dicek in adalah ruang "Kelas1_1702". Pada masing-masing scanner akan diberikan ruang unik sebagai form data yang bersifat hidden.</p>

              <form action={FrontendRoutes.VisitorCheckOut} method="post">
                <div className="form-group">
                  <label htmlFor="id_pengunjung_checkout">ID Pengunjung</label>
                  <input type="text" name="id_pengunjung" id="id_pengunjung_checkout" className="form-control" aria-describedby="pengunjung_checkout_text"/>
                  <small id="pengunjung_checkout_text" className="form-text text-muted">
                    Untuk keperluan testing, Disarankan menggunakan UUID dibawah sebagai berikut:
                    <ul>
                      <li>b1d42a9f-0a58-44ec-824e-a56929d7fa3a</li>
                      <li>1f17841a-8c57-4026-8e08-003a98092853</li>
                      <li>ba440a58-4300-4a16-a646-28d70b15af95</li>
                      <li>4f5c9fcc-4b37-4db5-be24-750d657ee7bb</li>
                    </ul>
                  </small>
                </div>
                
                <input type="hidden" name="id_ruangan" value="Kelas1_1702"/>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-6 col-12 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Visitor Log</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.VisitorLog} method="get">
                <div className="form-group">
                  <label htmlFor="id_pengunjung_log">ID Pengunjung</label>
                  <input type="text" name="id_pengunjung" id="id_pengunjung_log" className="form-control" aria-describedby="pengunjung_log_text"/>
                  <small id="pengunjung_log_text" className="form-text text-muted">
                    Untuk keperluan testing, Disarankan menggunakan UUID dibawah sebagai berikut:
                    <ul>
                      <li>4f5c9fcc-4b37-4db5-be24-750d657ee7bb</li>
                    </ul>
                  </small>
                </div>
                
                <input type="hidden" name="id_ruangan" value="Kelas1_1702"/>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </DefaultLayout>
  )
}

module.exports = QRScannerPage;