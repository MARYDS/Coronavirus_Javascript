import React from 'react'
import Graph from '../utilities/Graph'
import DataTable from '../components/DataTable'
import { compare } from '../utilities/Utils'

export default function Hospital({ date, latest, patients } = this.props) {
  const patientsSorted = [...patients].sort(compare())
  return (

    <div className="col-md-4">
      <div className="card mb-5 h-100">

        <div className="card-header text-center">
          Patients in Hospital
          <ul className="nav nav-tabs" id="patients-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="patients-tab" data-toggle="tab" href="#patients" role="tab" aria-controls="patients" aria-selected="true">Patients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="patients-data-tab" data-toggle="tab" href="#patientsdata" role="tab" aria-controls="patientsdata" aria-selected="false">Data</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="patients-content">
            <div className="tab-pane fade show active" id="patients" role="tabpanel"
              aria-labelledby="patients-tab">
              <div className="row">
                <span className="col-sm-8 text-left">
                  {date}
                </span>
                <span className="col-sm-4 text-right">
                  {latest}
                </span>
              </div>
              <Graph data={patientsSorted} />
            </div>

            <div className="tab-pane fade" id="patientsdata" role="tabpanel" aria-labelledby="patients-data-tab">
              <DataTable data={patients} />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}