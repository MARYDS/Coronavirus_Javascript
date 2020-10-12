import React from 'react'
import Graph from '../utilities/Graph'
import TableData from '../utilities/TableData'
import { compare } from '../utilities/Utils'

export default function IntensiveCare({ date, latest, intensiveCare } = this.props) {
  if (intensiveCare === undefined) intensiveCare = []
  const intensiveCareSorted = [...intensiveCare].sort(compare())

  return (
    <div className="col-md-4 col-sm-6 mb-3">
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
                <span className="col-sm-6 text-left">
                  {date}
                </span>
                <span className="col-sm-6 text-right">
                  {latest}
                </span>
              </div>
              <div className="row">
                <Graph data={intensiveCareSorted} />
              </div>
            </div>

            <div className="tab-pane fade" id="intensivecaredata" role="tabpanel" aria-labelledby="intensivecare-data-tab">
              <TableData data={intensiveCare} cols={['Date', 'Day', 'Beds']} id="intensivecaretable" />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}

