import React from 'react'
import Graph from '../utilities/Graph'
import TableData from '../utilities/TableData'
import { compare } from '../utilities/Utils'

export default function Admissions({ date, latest, cumulative, admissions } = this.props) {
  if (admissions === undefined) admissions = []
  const admissionsSorted = [...admissions].sort(compare())

  return (
    <div className="col-md-4 col-sm-6">
      <div className="card mb-5 h-100">

        <div className="card-header text-center">
          Hospital Admissions
          <ul className="nav nav-tabs" id="admissions-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="admissions-tab" data-toggle="tab" href="#admissions" role="tab" aria-controls="admissions" aria-selected="true">Admissions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="admissions-data-tab" data-toggle="tab" href="#admissionsdata" role="tab" aria-controls="admissionsdata" aria-selected="false">Data</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="admissions-content">
            <div className="tab-pane fade show active" id="admissions" role="tabpanel"
              aria-labelledby="admissions-tab">
              <div className="row">
                <span className="col-sm-6 text-left">
                  {date}
                </span>
                <span className="col-sm-6 text-right">
                  {latest}
                </span>
              </div>
              <div className="row">
                <Graph data={admissionsSorted} />
              </div>
            </div>

            <div className="tab-pane fade" id="admissionsdata" role="tabpanel" aria-labelledby="admissions-data-tab">
              <TableData data={admissions} cols={['Date', 'Day', 'Admissions']} id='admissionstable' />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}

