import React from 'react'

export default function AdmissionsHeader(
  { areaName, date, latest, average } = this.props) {

  return (
    < div className="card mb-3" >
      {/* Headline Result */}
      < div className="card-header pt-2 pb-1 bg-info" >
        <div className="d-flex flex-row justify-content-between text-white rounded">
          <span className="text-left">
            <h6 className="font-weight-bold">{areaName} - {date}</h6>
          </span>
          <span className="text-right">
            <h6 className="font-weight-bold">{latest}</h6>
          </span>
        </div>
      </div >
      {/* Other Stats */}
      < div className="card-body py-1" >
        <div className="d-flex flex-row justify-content-between">
          <span className="text-left">
            7 Day Average
          </span>
          <span className="text-right">
            {average}
          </span>
        </div>
      </div >
    </div >

  )
}
