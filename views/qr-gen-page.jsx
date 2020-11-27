const React = require('react');
const FrontendRoutes = require('../constants/FrontendRoutes');
const FormPengunjungCreate = require('./component/_form-pengunjung-create');
const DefaultLayout = require('./layouts/default');

const QRGenPage = (props) => {
  return (
    <DefaultLayout title={props.title}>
      <div className="row">
        <div className="col-md-8 offset-md-2 col-12">
          <div className="card">
            <div className="card-header">
              <h2 className="card-title">Visitor Registration</h2>
            </div>
            <div className="card-body">
              <form action={FrontendRoutes.PengunjungCreate} method="POST">
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

module.exports = QRGenPage;