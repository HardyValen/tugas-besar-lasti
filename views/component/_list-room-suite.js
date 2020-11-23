const React = require('react')

const FormListSuite = () => {
  return (
    <div className="form-group">
      <p className="form-text">Suite</p>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Suite_1101" value="Suite_1101"/>
          <label htmlFor="Suite_1101" className="form-check-label">Ruang 1101</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Suite_1102" value="Suite_1102"/>
          <label htmlFor="Suite_1102" className="form-check-label">Ruang 1102</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Suite_1103" value="Suite_1103"/>
          <label htmlFor="Suite_1103" className="form-check-label">Ruang 1103</label>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Suite_2101" value="Suite_2101"/>
          <label htmlFor="Suite_2101" className="form-check-label">Ruang 2101</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Suite_2102" value="Suite_2102"/>
          <label htmlFor="Suite_2102" className="form-check-label">Ruang 2102</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="Suite_2103" value="Suite_2103"/>
          <label htmlFor="Suite_2103" className="form-check-label">Ruang 2103</label>
        </div>
      </div>
    </div>
  )
}

module.exports = FormListSuite;