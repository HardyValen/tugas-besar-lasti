const React = require('react')

const FormListKelas3 = () => {
  return (
    <div className="form-group">
      <p className="form-text">Kelas 3</p>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas3_1901" value="Kelas3_1901"/>
          <label htmlFor="Kelas3_1901" className="form-check-label">Ruang 1901</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas3_1902" value="Kelas3_1902"/>
          <label htmlFor="Kelas3_1902" className="form-check-label">Ruang 1902</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas3_1903" value="Kelas3_1903"/>
          <label htmlFor="Kelas3_1903" className="form-check-label">Ruang 1903</label>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas3_2901" value="Kelas3_2901"/>
          <label htmlFor="Kelas3_2901" className="form-check-label">Ruang 2901</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas3_2902" value="Kelas3_2902"/>
          <label htmlFor="Kelas3_2902" className="form-check-label">Ruang 2902</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas3_2903" value="Kelas3_2903"/>
          <label htmlFor="Kelas3_2903" className="form-check-label">Ruang 2903</label>
        </div>
      </div>
    </div>
  )
}

module.exports = FormListKelas3;