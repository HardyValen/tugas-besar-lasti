const React = require('react')

const FormListKelas2 = () => {
  return (
    <div className="form-group">
      <p className="form-text">Kelas 2</p>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas2_1801" value="Kelas2_1801"/>
          <label htmlFor="Kelas2_1801" className="form-check-label">Ruang 1801</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas2_1802" value="Kelas2_1802"/>
          <label htmlFor="Kelas2_1802" className="form-check-label">Ruang 1802</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas2_1803" value="Kelas2_1803"/>
          <label htmlFor="Kelas2_1803" className="form-check-label">Ruang 1803</label>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas2_2801" value="Kelas2_2801"/>
          <label htmlFor="Kelas2_2801" className="form-check-label">Ruang 2801</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas2_2802" value="Kelas2_2802"/>
          <label htmlFor="Kelas2_2802" className="form-check-label">Ruang 2802</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas2_2803" value="Kelas2_2803"/>
          <label htmlFor="Kelas2_2803" className="form-check-label">Ruang 2803</label>
        </div>
      </div>
    </div>
  )
}

module.exports = FormListKelas2;