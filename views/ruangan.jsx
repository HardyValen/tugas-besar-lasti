const React = require('react');
const FrontendRoutes = require('../constants/FrontendRoutes');
const FormPengunjungCreate = require('./component/_form-pengunjung-create');
const DefaultLayout = require('./layouts/default');

const RuanganPage = (props) => {
  return (
    <DefaultLayout title={props.title}>
      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Dashboard Ruangan</h3>
            </div>
            <div className="card-body">
              <p>
                Semua data form yang ditembak ke endpoint akan memberikan respons non html dan page<br/>
                ini tidak akan render hasil response tersebut. Mohon maaf atas ketidaknyamanannya
              </p>
              <p>
                Data Ruangan itu terdiri atas id_ruangan dan tipe_ruangan.<br/>
                Contoh: id_ruangan: "Test_1234", tipe_ruangan: "Test Room"
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-4 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Buat Ruangan Baru</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.RuanganCreate} method="post">
                <div className="form-group">
                  <label htmlFor="id_ruangan_1">ID Ruangan</label>
                  <input type="text" name="id_ruangan" id="id_ruangan_1" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="tipe_ruangan_1">Tipe Ruangan</label>
                  <input type="text" name="tipe_ruangan" id="tipe_ruangan_1" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Data Ruangan</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.RuanganGet} method="get">
                <div className="form-group">
                  <label htmlFor="id_ruangan_2">ID Ruangan</label>
                  <input type="text" name="id" id="id_ruangan_2" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Update Ruangan</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.RuanganUpdate} method="post">
                <div className="form-group">
                  <label htmlFor="id_ruangan_3">ID Ruangan Lama</label>
                  <input type="text" name="id" id="id_ruangan_3" className="form-control"/>
                  <small className="form-text">Untuk Keperluan Searching</small>
                </div>
                <div className="form-group">
                  <label htmlFor="id_ruangan_4">ID Ruangan Baru</label>
                  <input type="text" name="id_ruangan" id="id_ruangan_4" className="form-control"/>
                </div>
                <div className="form-group">
                  <label htmlFor="tipe_ruangan_2">Tipe Ruangan</label>
                  <input type="text" name="tipe_ruangan" id="tipe_ruangan_2" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Delete Ruangan</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.RuanganDelete} method="post">
                <div className="form-group">
                  <label htmlFor="id_ruangan_5">ID Ruangan</label>
                  <input type="text" name="id_ruangan" id="id_ruangan_5" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Log Ruangan Saat Ini</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.RuanganLog} method="get">
                <div className="form-group">
                  <label htmlFor="id_ruangan_6">ID Ruangan</label>
                  <input type="text" name="id" id="id_ruangan_6" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

        <div className="col-md-4 p-3">
          <div className="card">
            <div className="card-header">
              <h5 className="card-title">Jumlah Pengunjung Ruangan Saat Ini</h5>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.RuanganJumlahPengunjung} method="get">
                <div className="form-group">
                  <label htmlFor="id_ruangan_7">ID Ruangan</label>
                  <input type="text" name="id_ruangan" id="id_ruangan_7" className="form-control"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </DefaultLayout>
  )
}

module.exports = RuanganPage;