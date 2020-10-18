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
    <div className="col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card card-main shadow h-100">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold">Deaths</h5>

          {/* Navigation */}
          <ul className="nav nav-tabs" id="deaths-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="published-tab" data-toggle="tab" href="#published" role="tab" aria-controls="published" aria-selected="true">Latest</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="published-data-tab" data-toggle="tab" href="#publisheddata" role="tab" aria-controls="publisheddata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-tab" data-toggle="tab" href="#actual" role="tab" aria-controls="actual" aria-selected="false">Date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-data-tab" data-toggle="tab" href="#actualdata" role="tab" aria-controls="actualdata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="area-deaths-tab" data-toggle="tab" href="#areadeaths" role="tab" aria-controls="areadeaths" aria-selected="false">Area</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="death-regions-data-tab" data-toggle="tab" href="#deathregionsdata" role="tab" aria-controls="deathregionsdata" aria-selected="false">Region</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="deaths-content">

            {/* First Tab - Published Deaths with Chart */}
            <div className="tab-pane fade show active" id="published" role="tabpanel"
              aria-labelledby="published-tab">

              {/* Card with summary details */}
              <div className="card mb-3">
                {/* Headline Result */}
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="d-flex flex-row justify-content-between text-white rounded">
                    <span className="text-left">
                      <h6 className="font-weight-bold">{datePub}</h6>
                    </span>
                    <span className="text-right">
                      <h6 className="font-weight-bold">{newPub}</h6>
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
                      {averPub}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left">
                      Cumulative
                    </span>
                    <span className="text-right">
                      {cumPub}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left">
                      Rate
                    </span>
                    <span className="text-right">
                      {ratePub}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left">
                    </span>
                    <span className="text-right">
                    </span>
                  </div>
                </div>
              </div>

              {/* Graph with results */}
              <div>
                <h6 className="text-center">Deaths by Published Date</h6>
                <Chart data={deathsPubSorted} desc={['Deaths by Published Date']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Second Tab - Deaths by Area Table */}
            {(areaType === 'overview' || areaType === 'nation')
              ?
              <div className="tab-pane fade" id="areadeaths" role="tabpanel" aria-labelledby="area-deaths-tab">
                <h6 className="text-center">Deaths by Location by Published Date</h6>
                <TableData data={deathsLoc} cols={['Date', 'Location', 'Deaths']} id="casesareatable" />
              </div>
              : null}

            {/* Third Tab - Published Deaths Table */}
            <div className="tab-pane fade" id="publisheddata" role="tabpanel" aria-labelledby="published-data-tab">
              <h6 className="text-center">Deaths by Published Date</h6>
              <div>
                <TableData data={deathsPub} cols={['Date', 'Day', 'Deaths', 'Cum.Rate']} id="deathspubtable" />
              </div>
            </div>


            {/* Forth Tab - Deaths by Date of Death */}
            <div className="tab-pane fade" id="actual" role="tabpanel" aria-labelledby="actual-tab">

              {/* Card with summary details */}
              <div className="card mb-3">
                {/* Headline Result */}
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="d-flex flex-row justify-content-between text-white rounded">
                    <span className="text-left">
                      <h6 className="font-weight-bold">{dateAct}</h6>
                    </span>
                    <span className="text-right">
                      <h6 className="font-weight-bold">{newAct}</h6>
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
                      {averAct}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left">
                      Cumulative
                     </span>
                    <span className="text-right">
                      {cumAct}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left">
                      Rate
                     </span>
                    <span className="text-right">
                      {rateAct}
                    </span>
                  </div>
                </div>
              </div>

              {/* Graph with results */}
              <div>
                <h6 className="text-center">Deaths by Date of Death</h6>
                <Chart data={deathsActSorted} desc={['Deaths by Date of Death']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Fifth Tab - Date of Death Table */}
            <div className="tab-pane fade" id="actualdata" role="tabpanel" aria-labelledby="actual-data-tab">
              <h6 className="text-center">Deaths by Date of Death</h6>
              <TableData data={deathsAct} cols={['Date', 'Day', 'Deaths', 'Cum.Rate']} id="casesacttable" />
            </div>

            {/* Sixth Tab - Deaths by Region Graph */}
            <div className="tab-pane fade" id="deathregionsdata" role="tabpanel" aria-labelledby="death-regions-data-tab">
              <h6 className="text-center">All Regions Deaths by Region</h6>
              <Graph data={regionsSorted} desc={ukRegions} />
            </div>

          </div>
        </div>
      </div>

    </div >

  )
}
