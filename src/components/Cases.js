import React from 'react'
import Graph from '../utilities/Graph'
import DataTable from '../components/DataTable'
import { compare } from '../utilities/Utils'

export default function Cases({ date, latest, cumulative, rate, cases,
  dateActual, latestActual, cumulativeActual, rateActual, casesActual }
  = this.props) {

  const casesSorted = [...cases].sort(compare())
  const casesActualSorted = [...casesActual].sort(compare())

  console.log(date, latest, cumulative, rate, cases,
    dateActual, latestActual, cumulativeActual, rateActual, casesActual)

  return (
    <div className="col-md-4">
      <div className="card h-100">

        <div className="card-header text-center">
          Cases
          <ul className="nav nav-tabs" id="cases-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="published-cases-tab" data-toggle="tab" href="#publishedcases" role="tab" aria-controls="publishedcases" aria-selected="true">Published Date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="published-cases-data-tab" data-toggle="tab" href="#publishedcasesdata" role="tab" aria-controls="publishedcasesdata" aria-selected="false">Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-cases-tab" data-toggle="tab" href="#actualcases" role="tab" aria-controls="actualcases" aria-selected="false">Actual Date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-cases-data-tab" data-toggle="tab" href="#actualcasesdata" role="tab" aria-controls="actualcasesdata" aria-selected="false">Data</a>
            </li>
          </ul>
        </div>

        <div className="card-body">
          <div className="tab-content" id="cases-content">
            <div className="tab-pane fade show active" id="publishedcases" role="tabpanel"
              aria-labelledby="published-cases-tab">
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
              <Graph data={casesSorted} />
            </div>

            <div className="tab-pane fade" id="publishedcasesdata" role="tabpanel" aria-labelledby="published-cases-data-tab">
              <DataTable data={cases} />
            </div>

            <div className="tab-pane fade" id="actualcases" role="tabpanel" aria-labelledby="actual-cases-tab">
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
              <Graph data={casesActualSorted} />
            </div>

            <div className="tab-pane fade" id="actualcasesdata" role="tabpanel" aria-labelledby="actual-cases-data-tab">
              <DataTable data={casesActual} />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}
