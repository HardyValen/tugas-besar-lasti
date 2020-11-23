const React = require('react');
const FrontendRoutes = require('../constants/FrontendRoutes');
const FormListPresidentSuite = require('./component/_list-president-suite');
const FormListKelas1 = require('./component/_list-room-kelas1');
const FormListKelas2 = require('./component/_list-room-kelas2');
const FormListKelas3 = require('./component/_list-room-kelas3');
const FormListSuite = require('./component/_list-room-suite');
const FormListSVIP = require('./component/_list-room-svip');
const FormListVIP = require('./component/_list-room-vip');
const DefaultLayout = require('./layouts/default');

const QRGenPage = (props) => {
  let dateValue = new Date(Date.now() + ((2 + 7) * 3600000)).toISOString().slice(0, -8) // 2 Jam

  return (
    <DefaultLayout title={props.title}>
      <div className="row">
        <div className="col-md-6 offset-md-3 col-12">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Visitor Registration</h2>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.QRGenerator} method="POST">
                <div className="form-group">
                  <label htmlFor="nama_pengunjung">Nama Pengunjung</label>
                  <input type="text" name="nama_pengunjung" id="nama_pengunjung" className="form-control" aria-describedby="namaHelp"/>
                  <small id="namaHelp" className="form-text text-muted">Jika pengunjung lebih dari satu, masukkan nama perwakilan saja</small>
                </div>

                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="jumlah_pengunjung">Jumlah Pengunjung</label>
                      <input type="number" min="1" max="100" name="jumlah_pengunjung" id="jumlah_pengunjung" className="form-control" defaultValue="1"/>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="expired_time">Waktu Expire</label>
                      <input type="datetime-local" 
                        name="expired_time" 
                        id="expired_time" 
                        className="form-control" 
                        defaultValue={dateValue}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <h5 className="form-text">
                    Room Permissions<br/>
                    <small className="text-muted">Ruangan-ruangan yang dapat dikunjungi oleh pengunjung</small>
                  </h5>
                  
                  <div className="form-group mt-4">
                    <h6 className="form-text">Ruang Inap</h6>
                    
                    <div className="row mt-3">
                      <div className="col-6">
                        <FormListPresidentSuite/>
                      </div>
                      <div className="col-6">
                        <FormListSuite/>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-6">
                        <FormListSVIP/>
                      </div>
                      <div className="col-6">
                        <FormListVIP/>
                      </div>
                    </div>

                    <div className="row mt-3">
                      <div className="col-6">
                        <FormListKelas1/>
                      </div>
                      <div className="col-6">
                        <FormListKelas2/>
                      </div>
                      <div className="col-6">
                        <FormListKelas3/>
                      </div>
                    </div>
                  </div>
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

module.exports = QRGenPage;