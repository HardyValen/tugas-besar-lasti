const React = require('react');
const FrontendRoutes = require('../../constants/FrontendRoutes');

const FormQRCheckout = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">QR Check Out</h5>
      </div>
      <div className="card-body">
        <form action={FrontendRoutes.QRCheckOut} method="post">
          <div className="form-group">
            <label htmlFor="id_pengunjung_checkout">ID Pengunjung</label>
            <input type="text" name="id_pengunjung" id="id_pengunjung_checkout" className="form-control"/>
          </div>

          <div className="form-group">
            <label htmlFor="id_ruangan_checkout">ID Ruangan</label>
            <input type="text" name="id_ruangan" id="id_ruangan_checkout" className="form-control"/>
          </div>

          <small className="form-text">
            Untuk keperluan testing, Disarankan menggunakan Pair UUID - ID_Ruangan dibawah sebagai berikut:
            <ul>
              <li>b1d42a9f-0a58-44ec-824e-a56929d7fa3a || Kelas1_1701</li>
              <li>1f17841a-8c57-4026-8e08-003a98092853 || Kelas1_1702</li>
              <li>ba440a58-4300-4a16-a646-28d70b15af95 || Kelas1_1701</li>
              <li>4f5c9fcc-4b37-4db5-be24-750d657ee7bb || Kelas1_1702</li>
            </ul>
          </small>
          
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    </div>
  )
}

module.exports = FormQRCheckout;