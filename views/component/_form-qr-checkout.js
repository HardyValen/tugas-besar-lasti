const React = require('react');
const FrontendRoutes = require('../../constants/FrontendRoutes');

const FormQRCheckout = () => {
  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Visitor Check Out</h5>
      </div>
      <div className="card-body">
        <h6>Skenario</h6>
        <p>Ruangan yang ingin dicek out adalah ruang "Kelas1_1702". Pada masing-masing scanner akan diberikan ruang unik sebagai form data yang bersifat hidden.</p>

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
  )
}

module.exports = FormQRCheckout;