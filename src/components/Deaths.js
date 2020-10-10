import React from 'react'
import Graph from '../utilities/Graph'
import DataTable from '../components/DataTable'
import { compare } from '../utilities/Utils'

export default function Deaths({ date, latest, cumulative, rate, deaths,
  dateActual, latestActual, cumulativeActual, rateActual, deathsActual }
  = this.props) {

  const deathsSorted = [...deaths].sort(compare())
  const deathsActualSorted = [...deathsActual].sort(compare())

  return (
    <div className="col-md-4">
      <div className="card h-100">

        <div className="card-header text-center">
          Deaths
          <ul className="nav nav-tabs" id="deaths-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="published-tab" data-toggle="tab" href="#published" role="tab" aria-controls="published" aria-selected="true">Published Date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="published-data-tab" data-toggle="tab" href="#publisheddata" role="tab" aria-controls="publisheddata" aria-selected="false">Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-tab" data-toggle="tab" href="#actual" role="tab" aria-controls="actual" aria-selected="false">Actual Date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-data-tab" data-toggle="tab" href="#actualdata" role="tab" aria-controls="actualdata" aria-selected="false">Data</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="deaths-content">
            <div className="tab-pane fade show active" id="published" role="tabpanel"
              aria-labelledby="published-tab">
              <div className="row">
                <span className="col-sm-8 text-left">
                  {date}
                </span>
                <span className="col-sm-4 text-right">
                  {latest}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-8 text-left">
                  Cumulative
            </span>
                <span className="col-sm-4 text-right">
                  {cumulative}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-8 text-left">
                  Rate
            </span>
                <span className="col-sm-4 text-right">
                  {rate}
                </span>
              </div>
              <Graph data={deathsSorted} />
            </div>

            <div className="tab-pane fade" id="publisheddata" role="tabpanel" aria-labelledby="published-data-tab">
              <DataTable data={deaths} />
            </div>

            <div className="tab-pane fade" id="actual" role="tabpanel" aria-labelledby="actual-tab">
              <div className="row">
                <span className="col-sm-8 text-left">
                  {dateActual}
                </span>
                <span className="col-sm-4 text-right">
                  {latestActual}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-8 text-left">
                  Cumulative
                </span>
                <span className="col-sm-4 text-right">
                  {cumulativeActual}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-8 text-left">
                  Rate
                </span>
                <span className="col-sm-4 text-right">
                  {rateActual}
                </span>
              </div>
              <Graph data={deathsActualSorted} />
            </div>

            <div className="tab-pane fade" id="actualdata" role="tabpanel" aria-labelledby="actual-data-tab">
              <DataTable data={deathsActual} />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}
