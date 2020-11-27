const { Fragment } = require('react');
const React = require('react');
const FormListPresidentSuite = require('./_list-president-suite');
const FormListKelas1 = require('./_list-room-kelas1');
const FormListKelas2 = require('./_list-room-kelas2');
const FormListKelas3 = require('./_list-room-kelas3');
const FormListSuite = require('./_list-room-suite');
const FormListSVIP = require('./_list-room-svip');
const FormListVIP = require('./_list-room-vip');

const FormPengunjungCreate = () => {
  return (
    <Fragment>
      <div className="form-group">
        <label htmlFor="nama_pengunjung">Nama Pengunjung</label>
        <input type="text" name="nama_pengunjung" id="nama_pengunjung" className="form-control" aria-describedby="namaHelp" required/>
        <small id="namaHelp" className="form-text text-muted">Jika pengunjung lebih dari satu, masukkan nama perwakilan saja</small>
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="jumlah_pengunjung">Jumlah Pengunjung</label>
            <input type="number" min="1" max="100" name="jumlah_pengunjung" id="jumlah_pengunjung" className="form-control" required/>
          </div>
        </div>
        <div className="col-md-6">
          <div className="form-group">
            <label htmlFor="expired_date">Waktu Expire</label>
            <input type="datetime-local" 
              name="expired_date" 
              id="expired_date" 
              className="form-control"
              required
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
    </Fragment>
  )
}

module.exports = FormPengunjungCreate