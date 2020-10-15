import React from 'react'
import Graph from '../utilities/Graph'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare, ukRegions } from '../utilities/Utils'

export default function Hospital({ date, latest, average, patients, regions } = this.props) {
  if (patients === undefined) patients = []
  if (regions === undefined) regions = []
  const patientsSorted = [...patients].sort(compare())
  const regionsSorted = [...regions].sort(compare())

  return (
    <div className="col-md-4 col-sm-6 mb-3">
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
            <li className="nav-item">
              <a className="nav-link" id="regions-data-tab" data-toggle="tab" href="#regionsdata" role="tab" aria-controls="regionsdata" aria-selected="false">Regions</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="patients-content">
            <div className="tab-pane fade show active" id="patients" role="tabpanel"
              aria-labelledby="patients-tab">
              <div className="row">
                <span className="col-sm-6 text-left">
                  {date}
                </span>
                <span className="col-sm-6 text-right">
                  {latest}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  7 Day Average
                </span>
                <span className="col-sm-6 text-right">
                  {average}
                </span>
              </div>
              <div className="row">
                <Chart data={patientsSorted} desc={['Patients']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            <div className="tab-pane fade" id="patientsdata" role="tabpanel" aria-labelledby="patients-data-tab">
              <TableData data={patients} cols={['Date', 'Day', 'Patients']} id="hospitaltable" />
            </div>

            <div className="tab-pane fade" id="regionsdata" role="tabpanel"
              aria-labelledby="regions-data-tab">
              <div className="row">
                <Graph data={regionsSorted} desc={ukRegions} />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}