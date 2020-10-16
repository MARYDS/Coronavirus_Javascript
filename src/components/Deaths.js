import React from 'react'
import Chart from '../utilities/Chart'
import Graph from '../utilities/Graph'
import TableData from '../utilities/TableData'
import { compare, ukRegions } from '../utilities/Utils'

export default function Deaths(
  { areaType, datePub, newPub, cumPub, ratePub, averPub, deathsPub,
    dateAct, newAct, cumAct, rateAct, averAct, deathsAct, deathsLoc,
    regions }
    = this.props) {

  if (deathsPub === undefined) deathsPub = []
  if (deathsAct === undefined) deathsAct = []
  if (regions === undefined) regions = []
  const deathsPubSorted = [...deathsPub].sort(compare())
  const deathsActSorted = [...deathsAct].sort(compare())
  const regionsSorted = [...regions].sort(compare())

  return (
    <div className="col-md-4 col-sm-6 mb-3">
      <div className="card h-100">

        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold">Deaths</h5>

          <ul className="nav nav-tabs" id="deaths-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="published-tab" data-toggle="tab" href="#published" role="tab" aria-controls="published" aria-selected="true">Published</a>
            </li>
            {(areaType === 'overview' || areaType === 'nation')
              ?
              <li className="nav-item">
                <a className="nav-link" id="area-deaths-tab" data-toggle="tab" href="#areadeaths" role="tab" aria-controls="areadeaths" aria-selected="false">Areas</a>
              </li>
              : null}
            <li className="nav-item">
              <a className="nav-link" id="published-data-tab" data-toggle="tab" href="#publisheddata" role="tab" aria-controls="publisheddata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-tab" data-toggle="tab" href="#actual" role="tab" aria-controls="actual" aria-selected="false">Actual</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-data-tab" data-toggle="tab" href="#actualdata" role="tab" aria-controls="actualdata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="death-regions-data-tab" data-toggle="tab" href="#deathregionsdata" role="tab" aria-controls="deathregionsdata" aria-selected="false">Regions</a>
            </li>
          </ul>
        </div>

        <div className="card-body">

          <div className="tab-content" id="deaths-content">

            <div className="tab-pane fade show active" id="published" role="tabpanel"
              aria-labelledby="published-tab">

              <div className="row">
                <span className="col-12 text-center">
                  <h6>Deaths by Published Date</h6>
                </span>
              </div>

              <div className="row bg-info text-white pt-2 mb-1 rounded">
                <span className="col-sm-6 text-left">
                  <h6 className="font-weight-bold">{datePub}</h6>
                </span>
                <span className="col-sm-6 text-right">
                  <h6 className="font-weight-bold">{newPub}</h6>
                </span>
              </div>
              <div className="row">
                <span className="col-sm-6 text-left">
                  7 Day Average
                    </span>
                <span className="col-sm-6 text-right">
                  {averPub}
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
                <Chart data={deathsPubSorted} desc={['Deaths by Published Date']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            <div className="tab-pane fade" id="publisheddata" role="tabpanel" aria-labelledby="published-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Deaths by Published Date</h6>
                </span>
              </div>
              <TableData data={deathsPub} cols={['Date', 'Day', 'Deaths', 'Cum.Rate']} id="deathspubtable" />
            </div>

            {(areaType === 'overview' || areaType === 'nation')
              ?
              <div className="tab-pane fade" id="areadeaths" role="tabpanel" aria-labelledby="area-deaths-tab">
                <div className="row">
                  <span className="col-12 text-center">
                    <h6>Deaths by Location by Published Date</h6>
                  </span>
                </div>
                <TableData data={deathsLoc} cols={['Date', 'Location', 'Deaths']} id="casesareatable" />
              </div>
              : null}

            <div className="tab-pane fade" id="actual" role="tabpanel" aria-labelledby="actual-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Deaths by Date of Death</h6>
                </span>
              </div>

              <div className="row bg-info text-white pt-2 mb-1 rounded">
                <span className="col-sm-6 text-left">
                  <h6 className="font-weight-bold">{dateAct}</h6>
                </span>
                <span className="col-sm-6 text-right">
                  <h6 className="font-weight-bold">{newAct}</h6>
                </span>
              </div>

              <div className="row">
                <span className="col-sm-6 text-left">
                  7 Day Average
                     </span>
                <span className="col-sm-6 text-right">
                  {averAct}
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
                <Chart data={deathsActSorted} desc={['Deaths by Date of Death']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            <div className="tab-pane fade" id="actualdata" role="tabpanel" aria-labelledby="actual-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>Deaths by Date of Death</h6>
                </span>
              </div>
              <TableData data={deathsAct} cols={['Date', 'Day', 'Deaths', 'Cum.Rate']} id="casesacttable" />
            </div>

            <div className="tab-pane fade" id="deathregionsdata" role="tabpanel" aria-labelledby="death-regions-data-tab">
              <div className="row">
                <span className="col-12 text-center">
                  <h6>All Regions Deaths by Region</h6>
                </span>
              </div>
              <div className="row">
                <Graph data={regionsSorted} desc={ukRegions} />
              </div>
            </div>

          </div>
        </div>
      </div>

    </div >

  )
}
