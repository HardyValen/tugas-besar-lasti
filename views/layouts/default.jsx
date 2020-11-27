var React = require('react');
const FrontendRoutes = require('../../constants/FrontendRoutes');

const DefaultLayout = (props) => {
  return (
    <html>
      <head>
        <title>{props.title}</title>
        <meta charSet="UTF-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <title>Tubes LaSTI Kelompok 4</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossOrigin="anonymous"/>
        <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossOrigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossOrigin="anonymous"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossOrigin="anonymous"></script>
        {/* <script defer type="module" src="http://localhost:9000/static/script/qr-scanner.js"></script> */}
      </head>
      <body>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a href={FrontendRoutes.Home} className="nav-link">Home</a>
              </li>
              <li className="nav-item">
                <a href={FrontendRoutes.APIDocs} className="nav-link">API Docs</a>
              </li>
              <li className="nav-item">
                <a href={FrontendRoutes.QRGeneratorPage} className="nav-link">QR Generator</a>
              </li>
              <li className="nav-item">
                <a href={FrontendRoutes.QRScannerPage} className="nav-link">QR Scanner</a>
              </li>
              <li className="nav-item">
                <a href={FrontendRoutes.PengunjungPage} className="nav-link">Pengunjung</a>
              </li>
              <li className="nav-item">
                <a href={FrontendRoutes.RuanganPage} className="nav-link">Ruangan</a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container py-5">
          {props.children}
        </div>
      </body>
    </html>
  )
}

module.exports = DefaultLayout;