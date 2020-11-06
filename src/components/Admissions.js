import React, { useState } from 'react'
import Graph from '../utilities/Graph'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare, ukRegionsNhs } from '../utilities/Utils'

export default function Admissions(
  { areaName, date, latest, average, cumulative, admissions, admissionsByAge, regions, regionsAve }
    = this.props) {

  if (admissions === undefined || admissions === null) admissions = []
  if (admissionsByAge === undefined || admissionsByAge === null) admissionsByAge = []
  if (regions === undefined || regions === null) regions = []
  if (regionsAve === undefined || regionsAve === null) regionsAve = []
  if (areaName === '') areaName = 'UK'
  const admissionsSorted = [...admissions].sort(compare())
  const admissionsByAgeSorted = [...admissionsByAge].sort(compare())
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
          <h5 className="card-title font-weight-bold heading">Hospital Admissions</h5>
          <ul className="nav nav-tabs" id="admissions-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="regions-admissions-data-tab" data-toggle="tab" href="#regionsadmissionsdata" role="tab" aria-controls="regionsadmissionsdata" aria-selected="false">Regions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="admissions-tab" data-toggle="tab" href="#admissions" role="tab" aria-controls="admissions" aria-selected="true">Admissions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="admissions-data-tab" data-toggle="tab" href="#admissionsdata" role="tab" aria-controls="admissionsdata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="admissions-byage-data-tab" data-toggle="tab" href="#admissionsbyagedata" role="tab" aria-controls="admissionsbyagedata" aria-selected="false">By Age</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="admissions-content">

            {/* First Tab - Published Deaths with Chart */}
            <div className="tab-pane fade show active" id="admissions" role="tabpanel" aria-labelledby="admissions-tab">

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

              {/* Chart with results */}
              <div>
                <h6 className="text-center">New Admissions to Hospital - {areaName}</h6>
                <Chart data={admissionsSorted} desc={['Admissions']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Second Tab - Admissions Data Table */}
            <div className="tab-pane fade" id="admissionsdata" role="tabpanel" aria-labelledby="admissions-data-tab">
              <h6 className="text-center">New Admissions to Hospital - {areaName}</h6>
              <TableData data={admissions} cols={['Date', 'Day', 'Admissions']} id='admissionstable' />
            </div>

            {/* Third Tab - Admissions By Age */}
            <div className="tab-pane fade" id="admissionsbyagedata" role="tabpanel" aria-labelledby="admissions-byage-data-tab">

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
                <h6 className="text-center">New Admissions to Hospital by Age - {areaName}</h6>
                <Chart data={admissionsByAgeSorted} desc={['0-5', '6-17', '18-64', '65-84', '85+']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Forth Tab - Admissions by Region */}
            <div className="tab-pane fade" id="regionsadmissionsdata" role="tabpanel" aria-labelledby="regions-admissions-data-tab">
              <h6 className="text-center">All Regions Hospital Admissions - {regAve ? "7 Day Average" : "Actual"}</h6>
              <Graph data={regAve ? regionsAveSorted : regionsSorted} desc={ukRegionsNhs} />
              <button type="button" className="btn btn-outline-info btn-sm float-right mt-5" onClick={switchMode}>{regAve ? "Actual" : "7 Day Average"}</button>
            </div>

          </div>
        </div>
      </div>
    </div >
  )
}

