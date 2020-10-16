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
    <div className="col-md-4 col-sm-6">
      <div className="card mb-5 h-100">

        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold">Intensive Care Beds Occupied</h5>
          <ul className="nav nav-tabs" id="intensivecare-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="intensivecare-tab" data-toggle="tab" href="#intensivecare" role="tab" aria-controls="intensivecare" aria-selected="true">Intensive Care</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="intensivecare-data-tab" data-toggle="tab" href="#intensivecaredata" role="tab" aria-controls="intensivecaredata" aria-selected="false">Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="regions-intensivecare-data-tab" data-toggle="tab" href="#regionsintensivecaredata" role="tab" aria-controls="regionsintensivecaredata" aria-selected="false">Regions</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="intensivecare-content">
            <div className="tab-pane fade show active" id="intensivecare" role="tabpanel"
              aria-labelledby="intensivecare-tab">

              <div className="card mb-3">
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="row text-white p-0 m-0 rounded">
                    <span className="col-sm-6 text-left">
                      <h6 className="font-weight-bold">{date}</h6>
                    </span>
                    <span className="col-sm-6 text-right">
                      <h6 className="font-weight-bold">{latest}</h6>
                    </span>
                  </div>
                </div>
                <div className="card-body p-2 mx-4">
                  <div className="row">
                    <span className="col-sm-6 text-left">
                      7 Day Average
                </span>
                    <span className="col-sm-6 text-right">
                      {average}
                    </span>
                  </div>
                </div>
              </div>
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Patients in Intensive Care</h6>
                </span>
              </div>
              <div className="row">
                <Chart data={intensiveCareSorted} desc={['Intensive Care']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            <div className="tab-pane fade" id="intensivecaredata" role="tabpanel" aria-labelledby="intensivecare-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Patients in Intensive Care</h6>
                </span>
              </div>
              <TableData data={intensiveCare} cols={['Date', 'Day', 'Beds']} id="intensivecaretable" />
            </div>

            <div className="tab-pane fade" id="regionsintensivecaredata" role="tabpanel"
              aria-labelledby="regions-intensivecare-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>All Regions Patients in Intensive Care</h6>
                </span>
              </div>
              <div className="row">
                <Graph data={regionsSorted} desc={ukRegionsNhs} />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}

