import React, { useState } from 'react'
import VentilatorBedsHeader from './VentilatorBedsHeader'
import Graph from '../utilities/Graph'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare, ukRegionsNhs } from '../utilities/Utils'

export default function VentilatorBeds({ areaName, date, latest, average, ventilatorBeds, regions, regionsAve } = this.props) {
  if (ventilatorBeds === undefined) ventilatorBeds = []
  if (regions === undefined) regions = []
  if (regionsAve === undefined) regionsAve = []
  if (areaName === '') areaName = 'UK'
  const ventilatorBedsSorted = [...ventilatorBeds].sort(compare())
  const regionsSorted = [...regions].sort(compare())
  const regionsAveSorted = [...regionsAve].sort(compare())

  const [regAve, setRegAve] = useState(true)
  const switchMode = () => setRegAve(!regAve)

  return (
    <div className="h-100 col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card card-main">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold heading">Ventilator Beds Occupied</h5>
          <ul className="nav nav-tabs" id="intensivecare-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="regions-intensivecare-data-tab" data-toggle="tab" href="#regionsintensivecaredata" role="tab" aria-controls="regionsintensivecaredata" aria-selected="true">Regions</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="intensivecare-tab" data-toggle="tab" href="#intensivecare" role="tab" aria-controls="intensivecare" aria-selected="false">Ventilator Beds</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="intensivecare-data-tab" data-toggle="tab" href="#intensivecaredata" role="tab" aria-controls="intensivecaredata" aria-selected="false">Data</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="intensivecare-content">

            {/* First Tab - Intensive Care beds by Region */}
            <div className="tab-pane fade show active" id="regionsintensivecaredata" role="tabpanel" aria-labelledby="regions-intensivecare-data-tab">
              {/* Card with summary details */}
              <VentilatorBedsHeader
                areaName={areaName}
                date={date}
                latest={latest}
                average={average}
              />
              <h6 className="text-center">
                All Regions Ventilator Beds - {regAve ? "7 Day Average" : "Actual"}
              </h6>
              <div className="mb-5 mb-sm-0">
                <Graph
                  data={regAve ? regionsAveSorted : regionsSorted}
                  desc={ukRegionsNhs}
                />
              </div>
              <button
                type="button"
                className="btn btn-outline-info btn-sm float-right mt-5"
                onClick={switchMode}
              >
                {regAve ? "Actual" : "7 Day Average"}
              </button>
            </div>

            {/* First Tab - Patients in Intensive Care with Chart */}
            <div className="tab-pane fade" id="intensivecare" role="tabpanel" aria-labelledby="intensivecare-tab">
              {/* Card with summary details */}
              <VentilatorBedsHeader
                areaName={areaName}
                date={date}
                latest={latest}
                average={average}
              />
              {/* Graph with results */}
              <h6 className="text-center">Patients in Ventilator Beds - {areaName}</h6>
              <Chart
                data={ventilatorBedsSorted}
                desc={['Ventilator Beds']}
                linesDesc={['7 Day Average']}
              />
            </div>

            {/* Second Tab - Intensive Care Data Table */}
            <div className="tab-pane fade" id="intensivecaredata" role="tabpanel" aria-labelledby="intensivecare-data-tab">
              <h6 className="text-center">Patients in Ventilator Beds - {areaName}</h6>
              <TableData
                data={ventilatorBeds}
                cols={['Date', 'Day', 'Beds']}
                id="intensivecaretable"
              />
            </div>
          </div>
        </div>
      </div>

    </div >
  )
}

