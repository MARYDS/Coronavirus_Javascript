import React from 'react'
import Chart from '../utilities/Chart'
import TableData from '../utilities/TableData'
import { compare } from '../utilities/Utils'

export default function Cases(
  { areaType, datePub, newPub, cumPub, ratePub, casesPub,
    dateAct, newAct, cumAct, rateAct, casesAct, casesLoc }
    = this.props) {

  if (casesPub === undefined) casesPub = []
  if (casesAct === undefined) casesAct = []
  const casesPubSorted = [...casesPub].sort(compare())
  const casesActSorted = [...casesAct].sort(compare())

  return (
    <div className="col-md-4 col-sm-6 mb-3">
      <div className="card h-100">

        <div className="card-header text-center">
          Cases
          <ul className="nav nav-tabs" id="cases-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="published-cases-tab" data-toggle="tab" href="#publishedcases" role="tab" aria-controls="publishedcases" aria-selected="true">Published</a>
            </li>
            {(areaType === 'overview' || areaType === 'nation')
              ?
              <li className="nav-item">
                <a className="nav-link" id="area-cases-tab" data-toggle="tab" href="#areacases" role="tab" aria-controls="areacases" aria-selected="false">Areas</a>
              </li>
              : null}
            <li className="nav-item">
              <a className="nav-link" id="published-cases-data-tab" data-toggle="tab" href="#publishedcasesdata" role="tab" aria-controls="publishedcasesdata" aria-selected="false">Data</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-cases-tab" data-toggle="tab" href="#actualcases" role="tab" aria-controls="actualcases" aria-selected="false">Actual</a>
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
                <span className="col-sm-6 text-left">
                  {datePub}
                </span>
                <span className="col-sm-6 text-right">
                  {newPub}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  Cumulative
            </span>
                <span className="col-sm-6 text-right">
                  {cumPub}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  Rate
            </span>
                <span className="col-sm-6 text-right">
                  {ratePub}
                </span>
              </div>
              <div className="row">
                <Chart data={casesPubSorted} desc={['Cases by Published Date']} />
              </div>
            </div>

            <div className="tab-pane fade" id="publishedcasesdata" role="tabpanel" aria-labelledby="published-cases-data-tab">
              <TableData data={casesPub} cols={['Date', 'Day', 'Cases', 'Cum.Rate']} id="casespubtable" />
            </div>

            {(areaType === 'overview' || areaType === 'nation')
              ?
              <div className="tab-pane fade" id="areacases" role="tabpanel" aria-labelledby="area-cases-tab">
                <TableData data={casesLoc} cols={['Date', 'Location', 'Cases']} id="casesareatable" />
              </div>
              : null}

            <div className="tab-pane fade" id="actualcases" role="tabpanel" aria-labelledby="actual-cases-tab">
              <div className="row">
                <span className="col-sm-6 text-left">
                  {dateAct}
                </span>
                <span className="col-sm-6 text-right">
                  {newAct}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  Cumulative
                </span>
                <span className="col-sm-6 text-right">
                  {cumAct}
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  Rate
                </span>
                <span className="col-sm-6 text-right">
                  {rateAct}
                </span>
              </div>
              <div className="row">
                <Chart data={casesActSorted} desc={['Cases by Specimen Date']} />
              </div>
            </div>

            <div className="tab-pane fade" id="actualcasesdata" role="tabpanel" aria-labelledby="actual-cases-data-tab">
              <TableData data={casesAct} cols={['Date', 'Day', 'Cases', 'Cum.Rate']} id="casesacttable" />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}
