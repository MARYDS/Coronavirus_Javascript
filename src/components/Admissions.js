import React from 'react'
import Graph from '../utilities/Graph'
import DataTable from '../components/DataTable'
import { compare } from '../utilities/Utils'

export default function Admissions({ date, latest, cumulative, admissions } = this.props) {
  const admissionsSorted = [...admissions].sort(compare())
  return (
    <div className="col-md-4">
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
                <span className="col-sm-8 text-left">
                  {date}
                </span>
                <span className="col-sm-4 text-right">
                  {latest}
                </span>
              </div>
              <Graph data={admissionsSorted} />
            </div>

            <div className="tab-pane fade" id="admissionsdata" role="tabpanel" aria-labelledby="admissions-data-tab">
              <DataTable data={admissions} />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}

