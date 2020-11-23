const React = require('react')

const FormListKelas1 = () => {
  return (
    <div className="form-group">
      <p className="form-text">Kelas 1</p>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas1_1702" value="Kelas1_1702"/>
          <label htmlFor="Kelas1_1701" className="form-check-label">Ruang 1701</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas1_1702" value="Kelas1_1702"/>
          <label htmlFor="Kelas1_1702" className="form-check-label">Ruang 1702</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas1_1703" value="Kelas1_1703"/>
          <label htmlFor="Kelas1_1703" className="form-check-label">Ruang 1703</label>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas1_2701" value="Kelas1_2701"/>
          <label htmlFor="Kelas1_2701" className="form-check-label">Ruang 2701</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas1_2702" value="Kelas1_2702"/>
          <label htmlFor="Kelas1_2702" className="form-check-label">Ruang 2702</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Kelas1_2703" value="Kelas1_2703"/>
          <label htmlFor="Kelas1_2703" className="form-check-label">Ruang 2703</label>
        </div>
      </div>
    </div>
  )
}

module.exports = FormListKelas1;