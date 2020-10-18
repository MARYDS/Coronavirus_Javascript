import React from 'react'
import Graph from '../utilities/Graph'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare, ukRegionsNhs } from '../utilities/Utils'

export default function IntensiveCare({ date, latest, average, intensiveCare, regions } = this.props) {
  if (intensiveCare === undefined) intensiveCare = []
  if (regions === undefined) regions = []
  const intensiveCareSorted = [...intensiveCare].sort(compare())
  const regionsSorted = [...regions].sort(compare())

  return (
    <div className="col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card card-main h-100">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold">Ventilator Beds Occupied</h5>
          <ul className="nav nav-tabs" id="intensivecare-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="intensivecare-tab" data-toggle="tab" href="#intensivecare" role="tab" aria-controls="intensivecare" aria-selected="true">Ventilator Beds</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="intensivecare-data-tab" data-toggle="tab" href="#intensivecaredata" role="tab" aria-controls="intensivecaredata" aria-selected="false">Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="regions-intensivecare-data-tab" data-toggle="tab" href="#regionsintensivecaredata" role="tab" aria-controls="regionsintensivecaredata" aria-selected="false">Regions</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="intensivecare-content">

            {/* First Tab - Patients in Intensive Care with Chart */}
            <div className="tab-pane fade show active" id="intensivecare" role="tabpanel" aria-labelledby="intensivecare-tab">

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
                <h6 className="text-center">Patients in Ventilator Beds</h6>
                <Chart data={intensiveCareSorted} desc={['Ventilator Beds']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Second Tab - Intensive Care Data Table */}
            <div className="tab-pane fade" id="intensivecaredata" role="tabpanel" aria-labelledby="intensivecare-data-tab">
              <h6 className="text-center">Patients in Ventilator Beds</h6>
              <TableData data={intensiveCare} cols={['Date', 'Day', 'Beds']} id="intensivecaretable" />
            </div>

            {/* Third Tab - Intensive Care beds by Region */}
            <div className="tab-pane fade" id="regionsintensivecaredata" role="tabpanel" aria-labelledby="regions-intensivecare-data-tab">
              <h6 className="text-center">All Regions Patients in Ventilator Beds</h6>
              <Graph data={regionsSorted} desc={ukRegionsNhs} />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}

