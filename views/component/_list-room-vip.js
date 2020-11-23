const React = require('react')

const FormListVIP = () => {
  return (
    <div className="form-group">
      <p className="form-text">VIP</p>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="VIP_1302" value="VIP_1302"/>
          <label htmlFor="VIP_1301" className="form-check-label">Ruang 1301</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="VIP_1302" value="VIP_1302"/>
          <label htmlFor="VIP_1302" className="form-check-label">Ruang 1302</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="VIP_1303" value="VIP_1303"/>
          <label htmlFor="VIP_1303" className="form-check-label">Ruang 1303</label>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="VIP_2301" value="VIP_2301"/>
          <label htmlFor="VIP_2301" className="form-check-label">Ruang 2301</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="VIP_2302" value="VIP_2302"/>
          <label htmlFor="VIP_2302" className="form-check-label">Ruang 2302</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="VIP_2303" value="VIP_2303"/>
          <label htmlFor="VIP_2303" className="form-check-label">Ruang 2303</label>
        </div>
      </div>
    </div>
  )
}

module.exports = FormListVIP;