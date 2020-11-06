import React, { useState } from 'react'
import HospitalHeader from './HospitalHeader'
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
    <div className="col-12 col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card card-main">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold heading">Hospital Patients</h5>

          {/* Navigation */}
          <ul className="nav nav-tabs" id="patients-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="regions-data-tab" data-toggle="tab" href="#regionsdata" role="tab" aria-controls="regionsdata" aria-selected="true">Regions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="patients-tab" data-toggle="tab" href="#patients" role="tab" aria-controls="patients" aria-selected="false">Patients</a>
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

            {/* First Tab - Patients by Region */}
            <div className="tab-pane fade show active" id="regionsdata" role="tabpanel"
              aria-labelledby="regions-data-tab">

              {/* Card with summary details */}
              <HospitalHeader
                areaName={areaName}
                date={date}
                latest={latest}
                average={average}
              />
              <div>
                <h6 className="text-center">
                  All Regions Hospital Patients - {regAve ? "7 Day Average" : "Actual"}
                </h6>
                <Graph
                  data={regAve ? regionsAveSorted : regionsSorted}
                  desc={ukRegionsNhs}
                />
                <button
                  type="button"
                  className="btn btn-outline-info btn-sm float-right mt-5"
                  onClick={switchMode}>
                  {regAve ? "Actual" : "7 Day Average"}
                </button>
              </div>
            </div>

            {/* Second Tab - Hospital Patients with Chart */}
            <div className="tab-pane fade" id="patients" role="tabpanel" aria-labelledby="patients-tab">
              {/* Card with summary details */}
              <HospitalHeader
                areaName={areaName}
                date={date}
                latest={latest}
                average={average}
              />
              {/* Graph with results */}
              <div>
                <h6 className="text-center">Patients in Hospital - {areaName}</h6>
                <Chart
                  data={patientsSorted}
                  desc={['Patients']}
                  linesDesc={['7 Day Average']}
                />
              </div>
            </div>

            {/* Third Tab - Patients data table*/}
            <div className="tab-pane fade" id="patientsdata" role="tabpanel" aria-labelledby="patients-data-tab">
              <h6 className="text-center">Patients in Hospital - {areaName}</h6>
              <TableData
                data={patients}
                cols={['Date', 'Day', 'Patients']}
                id="hospitaltable"
              />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}