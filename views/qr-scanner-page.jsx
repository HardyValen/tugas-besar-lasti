const React = require('react');
const FrontendRoutes = require('../constants/FrontendRoutes');
const FormQRCheckin = require('./component/_form-qr-checkin');
const FormQRCheckout = require('./component/_form-qr-checkout');
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
          <FormQRCheckin/>
        </div>

        <div className="col-md-6 col-12 p-3">
          <FormQRCheckout/>
        </div>


      </div>
    </DefaultLayout>
  )
}

module.exports = QRScannerPage;