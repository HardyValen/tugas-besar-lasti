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
              <h1 className="card-title">Hello There</h1>
              <p className="card-text">Tugas Besar LaSTI Kelompok 4</p>
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
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-3">
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


      </div>
    </DefaultLayout>
  )
}
 
module.exports = Landing;