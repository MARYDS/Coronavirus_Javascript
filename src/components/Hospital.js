import React, { useState } from 'react'
import Graph from '../utilities/Graph'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare, ukRegionsNhs } from '../utilities/Utils'

export default function Hospital({ areaName, date, latest, average, patients, regions, regionsAve } = this.props) {
  if (patients === undefined) patients = []
  if (regions === undefined) regions = []
  if (regionsAve === undefined) regionsAve = []
  if (areaName === '') areaName = 'UK'
  const patientsSorted = [...patients].sort(compare())
  const regionsSorted = [...regions].sort(compare())
  const regionsAveSorted = [...regionsAve].sort(compare())

  const [regAve, setRegAve] = useState(true)
  const switchMode = () => setRegAve(!regAve)

  return (
    <div className="col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card card-main h-100">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold heading">Hospital Patients</h5>

          {/* Navigation */}
          <ul className="nav nav-tabs" id="patients-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="regions-data-tab" data-toggle="tab" href="#regionsdata" role="tab" aria-controls="regionsdata" aria-selected="false">Regions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="patients-tab" data-toggle="tab" href="#patients" role="tab" aria-controls="patients" aria-selected="true">Patients</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="patients-data-tab" data-toggle="tab" href="#patientsdata" role="tab" aria-controls="patientsdata" aria-selected="false">#</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="patients-content">

            {/* First Tab - Hospital Patients with Chart */}
            <div className="tab-pane fade show active" id="patients" role="tabpanel" aria-labelledby="patients-tab">

              {/* Card with summary details */}
              <div className="card mb-3">
                {/* Headline Result */}
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="d-flex flex-row justify-content-between text-white rounded">
                    <span className="text-left">
                      <h6 className="font-weight-bold">{date}</h6>
                    </span>
                    <span className="text-right">
                      <h6 className="font-weight-bold">{latest}</h6>
                    </span>
                  </div>
                </div>
                {/* Other Stats */}
                <div className="card-body py-1">
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left">
                      7 Day Average
                    </span>
                    <span className="text-right">
                      {average}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graph with results */}
              <div>
                <h6 className="text-center">Patients in Hospital - {areaName}</h6>
                <Chart data={patientsSorted} desc={['Patients']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Second Tab - Patients data table*/}
            <div className="tab-pane fade" id="patientsdata" role="tabpanel" aria-labelledby="patients-data-tab">
              <h6 className="text-center">Patients in Hospital - {areaName}</h6>
              <TableData data={patients} cols={['Date', 'Day', 'Patients']} id="hospitaltable" />
            </div>

            {/* Third Tab - Patients by Region */}
            <div className="tab-pane fade" id="regionsdata" role="tabpanel"
              aria-labelledby="regions-data-tab">
              <h6 className="text-center">All Regions Hospital Patients - {regAve ? "7 Day Average" : "Actual"}</h6>
              <Graph data={regAve ? regionsAveSorted : regionsSorted} desc={ukRegionsNhs} />
              <button type="button" className="btn btn-outline-info btn-sm float-right mt-5" onClick={switchMode}>{regAve ? "Actual" : "7 Day Average"}</button>
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}