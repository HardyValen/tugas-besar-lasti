const React = require('react')

const FormListPresidentSuite = () => {
  return (
    <div className="form-group">
      <p className="form-text">President Suite</p>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="PS_1001" value="PS_1001"/>
          <label htmlFor="PS_1001" className="form-check-label">Ruang 1001</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="PS_1002" value="PS_1002"/>
          <label htmlFor="PS_1002" className="form-check-label">Ruang 1002</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="PS_1003" value="PS_1003"/>
          <label htmlFor="PS_1003" className="form-check-label">Ruang 1003</label>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="PS_2001" value="PS_2001"/>
          <label htmlFor="PS_2001" className="form-check-label">Ruang 2001</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="PS_2002" value="PS_2002"/>
          <label htmlFor="PS_2002" className="form-check-label">Ruang 2002</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="PS_2003" value="PS_2003"/>
          <label htmlFor="PS_2003" className="form-check-label">Ruang 2003</label>
        </div>
      </div>
    </div>
  )
}

module.exports = FormListPresidentSuite;