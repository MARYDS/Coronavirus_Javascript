import React from 'react'
import Chart from '../utilities/Chart'
import Graph from '../utilities/Graph'
import Barchart from '../utilities/Barchart'
import TableData from '../utilities/TableData'
import { compare, ukNations, ukRegions } from '../utilities/Utils'

export default function Cases(
  { areaType, areaName, datePub, newPub, cumPub, ratePub, averPub, casesPub,
    dateAct, newAct, cumAct, rateAct, averAct, casesAct, casesLoc,
    regions, nations, nationsAct, casesByGender, maleCases, femaleCases,
    totalGenderCases, genderDate, caseAgeRanges }
    = this.props) {

  if (casesPub === undefined) casesPub = []
  if (casesAct === undefined) casesAct = []
  if (regions === undefined) regions = []
  if (nations === undefined) nations = []
  if (nationsAct === undefined) nationsAct = []
  if (casesByGender === undefined) casesByGender = []
  if (caseAgeRanges === undefined) caseAgeRanges = []
  if (areaName === '') areaName = 'UK'
  const casesPubSorted = [...casesPub].sort(compare())
  let casesActSorted = [...casesAct].sort(compare())
  const regionsSorted = [...regions].sort(compare())
  let descAct = ['Cases by Specimen Date']

  // UK overall numbers from API are incorrect - replace with sum of nations
  if (areaType === "overview") {
    descAct = ukNations
    const nationsActSorted = [...nationsAct].sort(compare())
    casesAct = [...nationsAct]
    cumAct = casesAct.reduce((tot, val) => tot + val.counts[0], 0)
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

    casesActSorted = nationsActSorted.map((nat) => {
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
      <div className="card card-main shadow h-100">

        {/* Card Header and Navigation */}
        <div className="card-header text-center">
          <h5 className="card-title font-weight-bold">Cases</h5>

          {/* Navigation */}
          <ul className="nav nav-tabs" id="cases-list" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="published-cases-tab" data-toggle="tab" href="#publishedcases" role="tab" aria-controls="publishedcases" aria-selected="true">Daily</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="published-cases-data-tab" data-toggle="tab" href="#publishedcasesdata" role="tab" aria-controls="publishedcasesdata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="area-cases-tab" data-toggle="tab" href="#areacases" role="tab" aria-controls="areacases" aria-selected="false">Loc</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-cases-tab" data-toggle="tab" href="#actualcases" role="tab" aria-controls="actualcases" aria-selected="false">Date</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="actual-cases-data-tab" data-toggle="tab" href="#actualcasesdata" role="tab" aria-controls="actualcasesdata" aria-selected="false">#</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="case-ages-tab" data-toggle="tab" href="#caseages" role="tab" aria-controls="caseages" aria-selected="false">Age</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" id="case-regions-data-tab" data-toggle="tab" href="#caseregionsdata" role="tab" aria-controls="caseregionsdata" aria-selected="false">Reg</a>
            </li>
          </ul>
        </div>

        {/* Card Body */}
        <div className="card-body">

          {/* Tabs Content */}
          <div className="tab-content" id="cases-content">

            {/* First Tab - Published Deaths with Chart */}
            <div className="tab-pane fade show active" id="publishedcases" role="tabpanel" aria-labelledby="published-cases-tab">

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
                </div>
              </div>
              {/* Graph with results */}
              <div>
                <h6 className="text-center">Cases by Published Date - {areaName}</h6>
                <Chart data={casesPubSorted} desc={['Cases by Published Date']} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Second Tab - Published Cases Table */}
            <div className="tab-pane fade" id="publishedcasesdata" role="tabpanel" aria-labelledby="published-cases-data-tab">
              <h6 className="text-center">Cases by Published Date - {areaName}</h6>
              <TableData data={casesPub} cols={['Date', 'Day', 'Cases', 'Cum.Rate']} id="casespubtable" />
            </div>

            {/* Third Tab - Cases by Area Table */}
            <div className="tab-pane fade" id="areacases" role="tabpanel" aria-labelledby="area-cases-tab">
              <h6 className="text-center">Cases by Location by Published Date - {areaName}</h6>
              {(areaType === 'overview' || areaType === 'nation')
                ?
                <TableData data={casesLoc} cols={['Date', 'Location', 'Cases']} id="casesareatable" />
                :
                <div className="text-info font-weight-bold mt-5 ml-3">
                  No Data Available for this level
                </div>}
            </div>

            {/* Forth Tab - Cases by specimen date */}
            <div className="tab-pane fade" id="actualcases" role="tabpanel" aria-labelledby="actual-cases-tab">

              {/* Card with summary details */}
              <div className="card mb-3">
                {/* Headline Result */}
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="d-flex flex-row justify-content-between text-white p-0 m-0 rounded">
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

              {/* Chart with results */}
              <div>
                <h6 className="text-center">Cases by Specimen Date - {areaName}</h6>
                <Chart data={casesActSorted} desc={descAct} linesDesc={['7 Day Average']} />
              </div>
            </div>

            {/* Fifth Tab - Cases by Specimen Date Table */}
            <div className="tab-pane fade" id="actualcasesdata" role="tabpanel"
              aria-labelledby="actual-cases-data-tab">
              <h6 className="text-center">Cases by Specimen Date {areaName}</h6>
              <TableData data={casesAct} cols={['Date', 'Day', 'Cases']} id="casesacttable" />
            </div>

            {/* Sixth Tab - Cases by Ages Graph */}
            <div className="tab-pane fade" id="caseages" role="tabpanel" aria-labelledby="case-ages-tab">
              {/* Card with summary details */}
              <div className="card mb-3">
                {/* Headline Result */}
                <div className="card-header pt-2 pb-1 bg-info">
                  <div className="d-flex flex-row justify-content-between text-white p-0 m-0 rounded">
                    <span className="text-left">
                      <h6 className="font-weight-bold">{genderDate}</h6>
                    </span>
                    <span className="text-left">
                      <h6 className="font-weight-bold">{totalGenderCases}</h6>
                    </span>
                  </div>
                </div>
                {/* Other Stats */}
                <div className="card-body py-1">
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-left">
                      Male Cases
                    </span>
                    <span className="text-right">
                      {maleCases}
                    </span>
                  </div>
                  <div className="d-flex flex-row justify-content-between">
                    <span className="text-right">
                      Female Cases
                    </span>
                    <span className="text-right">
                      {femaleCases}
                    </span>
                  </div>
                </div>
              </div>
              {/* Chart with results */}
              <div>
                <h6 className="text-center">Cumulative Cases by Age and Gender - {areaName}</h6>
                <p className="text-muted text-center">Available for England and English Regions</p>
                <Barchart data={casesByGender} desc={["Male", "Female"]} xaxis="age" />
              </div>
            </div>

            {/* Seventh Tab - Cases by Region Graph */}
            <div className="tab-pane fade" id="caseregionsdata" role="tabpanel" aria-labelledby="case-regions-data-tab">
              <h6 className="text-center">All Regions Cases by Region</h6>
              <Graph data={regionsSorted} desc={ukRegions} />
            </div>

          </div>
        </div>
      </div>

    </div >
  )
}
