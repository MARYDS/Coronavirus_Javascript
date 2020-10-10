import React from 'react'
import Graph from '../utilities/Graph'
import DataTable from '../components/DataTable'
import { compare } from '../utilities/Utils'

export default function IntensiveCare({ date, latest, intensiveCare } = this.props) {
  const intensiveCareSorted = [...intensiveCare].sort(compare())
  return (
    <div className="col-md-4">
      <div className="card mb-5 h-100">

        <div className="card-header text-center">
          Intensive Care Beds Occupied
          <ul className="nav nav-tabs" id="intensivecare-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="intensivecare-tab" data-toggle="tab" href="#intensivecare" role="tab" aria-controls="intensivecare" aria-selected="true">Intensive Care</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="intensivecare-data-tab" data-toggle="tab" href="#intensivecaredata" role="tab" aria-controls="intensivecaredata" aria-selected="false">Data</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="intensivecare-content">
            <div className="tab-pane fade show active" id="intensivecare" role="tabpanel"
              aria-labelledby="intensivecare-tab">
              <div className="row">
                <span className="col-sm-8 text-left">
                  {date}
                </span>
                <span className="col-sm-4 text-right">
                  {latest}
                </span>
              </div>
              <Graph data={intensiveCareSorted} />
            </div>

            <div className="tab-pane fade" id="intensivecaredata" role="tabpanel" aria-labelledby="intensivecare-data-tab">
              <DataTable data={intensiveCare} />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}

