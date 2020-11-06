import React, { useState } from 'react'
import DeathsHeader from './DeathsHeader'
import Chart from '../utilities/Chart'
import Graph from '../utilities/Graph'
import TableData from '../utilities/TableData'
import { compare, ukNations, ukRegions } from '../utilities/Utils'

export default function Deaths(
  { areaType, areaName, datePub, newPub, cumPub, ratePub, averPub, deathsPub,
    dateAct, newAct, cumAct, rateAct, averAct, deathsAct, deathsLoc,
    regions, regionsAct, regionsAve, nations, nationsAct }
    = this.props) {

  if (deathsPub === undefined) deathsPub = []
  if (deathsAct === undefined) deathsAct = []
  if (regions === undefined) regions = []
  if (regionsAct === undefined) regionsAct = []
  if (regionsAve === undefined) regionsAve = []
  if (nations === undefined) nations = []
  if (nationsAct === undefined) nationsAct = []
  if (areaType === 'overview') areaName = 'UK'
  const deathsPubSorted = [...deathsPub].sort(compare())
  let deathsActSorted = [...deathsAct].sort(compare())
  const regionsSorted = [...regions].sort(compare())
  const regionsActSorted = [...regionsAct].sort(compare())
  const regionsAveSorted = [...regionsAve].sort(compare())
  let descAct = ['Deaths by Date of Death']

  const [regAve, setRegAve] = useState(true)
  const switchMode = () => setRegAve(!regAve)

  // UK overall numbers from API are incorrect - replace with sum of nations
  if (areaType === "overview") {
    descAct = ukNations
    const nationsActSorted = [...nationsAct].sort(compare())
    deathsAct = [...nationsAct]
    cumAct = deathsAct.reduce((tot, val) => tot + val.counts[0], 0)
    cumAct = cumAct.toLocaleString()

    if (nationsAct.length > 0) {
      dateAct = (new Date(nationsAct[0].date)).toLocaleDateString()
      newAct = nationsAct[0].counts[0].toLocaleString()
      let totAct = 0
      for (let i = 0; i < 7; i++) {
        totAct = totAct + nationsAct[i].counts[0]
      }
      averAct = Math.floor(totAct / 7).toLocaleString()
    }

    deathsActSorted = nationsActSorted.map((nat) => {
      return (
        {
          date: nat.date,
          day: nat.day,
          counts: nat.counts.slice(1)
        }
      )
    })
  }

  return (
    <div className="col-sm-6 col-lg-4 mb-3">

      {/* Card */}
      <div className="card card-main h-100">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold heading">Deaths</h5>

          {/* Navigation */}
          <ul className="nav nav-tabs" id="deaths-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="published-tab" data-toggle="tab" href="#published" role="tab" aria-controls="published" aria-selected="true">Daily</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="published-data-tab" data-toggle="tab" href="#publisheddata" role="tab" aria-controls="publisheddata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="area-deaths-tab" data-toggle="tab" href="#areadeaths" role="tab" aria-controls="areadeaths" aria-selected="false">Loc</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-tab" data-toggle="tab" href="#actual" role="tab" aria-controls="actual" aria-selected="false">Date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-data-tab" data-toggle="tab" href="#actualdata" role="tab" aria-controls="actualdata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="death-regions-data-tab" data-toggle="tab" href="#deathregionsdata" role="tab" aria-controls="deathregionsdata" aria-selected="false">Reg</a>
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

              <DeathsHeader
                areaName={areaName}
                date={datePub}
                newDeaths={newPub}
                averDeaths={averPub}
                cumDeaths={cumPub}
                rateDeaths={ratePub}
              />
              {/* Graph with results */}
              <div>
                <h6 className="text-center">Deaths by Published Date - {areaName}</h6>
                <Chart
                  data={deathsPubSorted}
                  desc={['Deaths by Published Date']}
                  linesDesc={['7 Day Average']}
                />
              </div>
            </div>

            {/* Second Tab - Published Deaths Table */}
            <div className="tab-pane fade" id="publisheddata" role="tabpanel" aria-labelledby="published-data-tab">
              <h6 className="text-center">Deaths by Published Date - {areaName}</h6>
              <div>
                <TableData
                  data={deathsPub}
                  cols={['Date', 'Day', 'Deaths', 'Cum.Rate']}
                  id="deathspubtable"
                />
              </div>
            </div>

            {/* Third Tab - Deaths by Area Table */}
            {(areaType === 'overview' || areaType === 'nation')
              ?
              <div className="tab-pane fade" id="areadeaths" role="tabpanel" aria-labelledby="area-deaths-tab">
                <h6 className="text-center">Deaths by Location by Published Date - {areaName}</h6>
                <TableData
                  data={deathsLoc}
                  cols={['Date', 'Location', 'Deaths']}
                  id="casesareatable"
                />
              </div>
              : null}

            {/* Forth Tab - Deaths by Date of Death */}
            <div className="tab-pane fade" id="actual" role="tabpanel" aria-labelledby="actual-tab">

              <DeathsHeader
                areaName={areaName}
                date={dateAct}
                newDeaths={newAct}
                averDeaths={averAct}
                cumDeaths={cumAct}
                rateDeaths={rateAct}
              />

              {/* Graph with results */}
              <div>
                <h6 className="text-center">Deaths by Date of Death - {areaName}</h6>
                <Chart data={deathsActSorted} desc={descAct} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Fifth Tab - Date of Death Table */}
            <div className="tab-pane fade" id="actualdata" role="tabpanel" aria-labelledby="actual-data-tab">
              <h6 className="text-center">Deaths by Date of Death - {areaName}</h6>
              <TableData
                data={deathsAct}
                cols={['Date', 'Day', 'Deaths', 'Cum.Rate']}
                id="casesacttable"
              />
            </div>

            {/* Sixth Tab - Deaths by Region Graph */}
            <div className="tab-pane fade" id="deathregionsdata" role="tabpanel" aria-labelledby="death-regions-data-tab">
              <h6 className="text-center">All Regions Deaths - {regAve ? "7 Day Average" : "Published"}</h6>
              <div className="pb-3">
                <Graph
                  data={regAve ? regionsAveSorted : regionsSorted}
                  desc={ukRegions}
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

          </div>
        </div>
      </div>

    </div >

  )
}
