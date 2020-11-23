const React = require('react')

const FormListSVIP = () => {
  return (
    <div className="form-group">
      <p className="form-text">SVIP</p>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="SVIP_1201" value="SVIP_1201"/>
          <label htmlFor="SVIP_1201" className="form-check-label">Ruang 1201</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="SVIP_1202" value="SVIP_1202"/>
          <label htmlFor="SVIP_1202" className="form-check-label">Ruang 1202</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="SVIP_1203" value="SVIP_1203"/>
          <label htmlFor="SVIP_1203" className="form-check-label">Ruang 1203</label>
        </div>
      </div>

      <div className="form-group">
        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="SVIP_2201" value="SVIP_2201"/>
          <label htmlFor="SVIP_2201" className="form-check-label">Ruang 2201</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="SVIP_2202" value="SVIP_2202"/>
          <label htmlFor="SVIP_2202" className="form-check-label">Ruang 2202</label>
        </div>

        <div className="form-check">
          <input type="checkbox" className="form-check-input" name="permissions" id="SVIP_2203" value="SVIP_2203"/>
          <label htmlFor="SVIP_2203" className="form-check-label">Ruang 2203</label>
        </div>
      </div>
    </div>
  )
}

module.exports = FormListSVIP;